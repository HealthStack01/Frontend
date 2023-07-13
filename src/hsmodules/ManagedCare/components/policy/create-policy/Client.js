import {yupResolver} from "@hookform/resolvers/yup";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import SaveIcon from "@mui/icons-material/Save";
import {Box, Grid} from "@mui/material";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import GlobalCustomButton from "../../../../../components/buttons/CustomButton";
import Input from "../../../../../components/inputs/basic/Input/index";
import CustomSelect from "../../../../../components/inputs/basic/Select";
import MuiCustomDatePicker from "../../../../../components/inputs/Date/MuiDatePicker";
import ModalBox from "../../../../../components/modal/";
import {FormsHeaderText} from "../../../../../components/texts";
import {ObjectContext} from "../../../../../context";
import client from "../../../../../feathers";
import {PageWrapper} from "../../../../../ui/styled/styles";
import {HeadWrapper} from "../../../../app/styles";
import ClientGroup from "../../../../Client/ClientGroup";
import {createClientSchema2} from "../../../../Client/schema";

import {getBase64} from "../../../../helpers/getBase64";
import dayjs from "dayjs";
import {ClientSearch} from "../../../../helpers/ClientSearch";
import {Nigeria} from "../../../../app/Nigeria";

const PolicyClientCreate = ({closeModal}) => {
  //, watch, errors, reset
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service("client");
  const mpiServ = client.service("mpi");
  //const navigate=useNavigate()
  const [billModal, setBillModal] = useState(false);
  const [patList, setPatList] = useState([]);
  const [dependant, setDependant] = useState(false);
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(false);
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const [showdept, setShowdept] = useState(false);
  const [isFullRegistration, setFullRegistration] = useState(false);
  const data = localStorage.getItem("user");
  const [duplicateModal, setDuplicateModal] = useState(false);
  const [file, setFile] = useState(null);
  const [openDp, setOpenDp] = useState(false);
  const [imageUploadModal, setImageUploadModal] = useState(false);
  const user = JSON.parse(data);
  const [organizationName, setOrganizationName] = useState();
  const [addType, setAddType] = useState(false);
  const [clearClientSearch, setClearClientSearch] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    reset,
    watch,
    formState: {isSubmitSuccessful, errors},
  } = useForm({
    resolver: yupResolver(createClientSchema2),

    defaultValues: {
      firstname: "",
      lastname: "",
      middlename: "",
      dob: "",
      phone: "",
      email: "",
      facility: user.currentEmployee.facility,
    },
  });

  const [selectedState, setSelectedState] = useState(null);

  const states = Nigeria.map(obj => obj.state);

  //alphabetically arrange state
  const sortedStates = states.sort((a, b) => a.localeCompare(b));

  const watchedState = watch("state");

  useEffect(() => {
    setSelectedState(Nigeria.find(item => item.state === watchedState));
    setValue("facilityCity", "");
    setValue("facilityLGA", "");
  }, [watchedState]);

  // eslint-disable-next-line
  const getSearchfacility = obj => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleDate = async date => {
    setDate(date);
  };
  // useEffect(() => {
  //   setCurrentUser(user);
  //   return () => {};
  // }, [user]);

  const checkClient = () => {
    const data = getValues();
    data.dob = date;
    const obj = {
      firstname: data.firstname,
      middlename: data.middlename,
      lastname: data.lastname,
      gender: data.gender,
      email: data.email,
      phone: data.phone,
      dob: data.dob,
    };
    /* find if there is a match with the paramters entered
          run search if 
            1.phone no alone or  
            2.email alone or 
            3.both is entered
            4. all other 5 parameters

        */
    let query = {};

    if (!!data.phone) {
      query.phone = data.phone;
      checkQuery(query);
    }

    if (!!data.email) {
      query.email = data.email;
      checkQuery(query);
    }

    if (!!data.firstname && !!data.lastname && !!data.gender && !!data.dob) {
      // //console.log("simpa")
      data.middlename = data.middlename || "";
      query.gender = data.gender;
      query.dob = data.dob;

      query.$or = [
        {
          firstname: data.firstname,
          lastname: data.lastname,
          middlename: data.middlename,
        },
        {
          firstname: data.firstname,
          lastname: data.middlename,
          middlename: data.lastname,
        },
        {
          firstname: data.middlename,
          lastname: data.lastname,
          middlename: data.firstname,
        },
        {
          firstname: data.middlename,
          lastname: data.firstname,
          middlename: data.lastname,
        },
        {
          firstname: data.lastname,
          lastname: data.firstname,
          middlename: data.middlename,
        },
        {
          firstname: data.lastname,
          lastname: data.middlename,
          middlename: data.firstname,
        },
      ];
      checkQuery(query);
    }
  };

  const checkQuery = query => {
    setPatList([]);
    if (
      !(
        query &&
        Object.keys(query).length === 0 &&
        query.constructor === Object
      )
    ) {
      ClientServ.find({query: query})
        .then(res => {
          //console.log(res);
          if (res.total > 0) {
            // alert(res.total)
            setPatList(res.data);
            setBillModal(true);
            return;
          }
        })
        .catch(err => {
          //console.log(err);
        });
    }
  };

  const dupl = client => {
    toast({
      message: "Client previously registered in this facility",
      type: "is-danger",
      dismissible: true,
      pauseOnHover: true,
    });
    reset();
    setPatList([]);
  };
  const reg = async client => {
    if (
      client.relatedfacilities.findIndex(
        el => el.facility === user.currentEmployee.facilityDetail._id
      ) === -1
    ) {
      //create mpi record
      const newPat = {
        client: client._id,
        facility: user.currentEmployee.facilityDetail._id,
        mrn: client.mrn,
        clientTags: client.clientTags,
        relfacilities: client.relatedfacilities,
      };
      ////console.log(newPat)
      await mpiServ
        .create(newPat)
        .then(resp => {
          toast({
            message: "Client created succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
        })
        .catch(err => {
          toast({
            message: "Error creating Client " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
    //reset form
    reset();
    setPatList([]);
    //cash payment
  };
  const depen = client => {
    setDependant(true);
  };

  const handleChange = file => {
    ////console.log(file);
    getBase64(file)
      .then(res => {
        ////console.log(res);
        setFile(res);
      })
      .catch(err => {
        //console.log(err);
      });
  };

  // ****************************************************************************
  const onSubmit = async (data, e) => {
    // if (!date) {
    //   toast.warning("Please enter Date of Birth!");
    //   return;
    // }

    showActionLoader();

    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    checkClient();
    if (patList.length > 0) {
      if (!dependant) {
        return;
      }
      setPatList([]);
    }
    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    }
    let confirm = window.confirm(
      `You are about to register a new client ${data.firstname}  ${data.middlename} ${data.lastname} ?`
    );
    if (confirm) {
      const token = localStorage.getItem("feathers-jwt");
      if (file) {
        axios
          .post(
            "https://healthstack-backend.herokuapp.com/upload",
            {uri: file},
            {headers: {Authorization: `Bearer ${token}`}}
          )
          .then(async res => {
            const imageUrl = res.data.url;
            //data.dob = date;
            const defaultEmail = `${data.firstname}-${data.lastname}-${dayjs(
              data.dob
            ).format("DD/MM/YYY")}@healthstack.africa`;

            const clientData = {
              ...data,
              email: data.email || defaultEmail,
              imageurl: imageUrl,
            };

            // data.imageurl = imageUrl;

            await ClientServ.create(clientData)
              .then(res => {
                hideActionLoader();
                setSuccess(true);
                toast.success("Client created succesfully");
                setSuccess(false);
                setPatList([]);
                setDependant(false);
                setDate();
                reset();
                // let newBeneficiaryModule = {};
                if (state.currBeneficiary === "principal") {
                  res.type = "principal";
                  setState(prev => ({
                    ...prev,
                    Beneficiary: {
                      ...prev.Beneficiary,
                      principal: res,
                    },
                  }));
                }
                if (state.currBeneficiary === "dependent") {
                  res.type = "dependent";
                  setState(prev => ({
                    ...prev,
                    Beneficiary: {
                      ...prev.Beneficiary,
                      dependent: [...state.Beneficiary.dependent, res],
                    },
                  }));
                }
              })
              .catch(err => {
                hideActionLoader();
                toast.error("Error creating Client " + err);
                setPatList([]);
                setDependant(false);
              });
          });
      } else {
        const defaultEmail = `${data.firstname}-${data.lastname}-${dayjs(
          data.dob
        ).format("DD/MM/YYY")}@healthstack.africa`;

        const clientData = {
          ...data,
          email: data.email || defaultEmail,
        };

        await ClientServ.create(clientData)
          .then(res => {
            hideActionLoader();
            setSuccess(true);
            toast.success("Client created succesfully");
            setSuccess(false);
            setPatList([]);
            setDependant(false);
            setDate();
            reset();

            if (state.currBeneficiary === "principal") {
              res.type = "principal";
              setState(prev => ({
                ...prev,
                Beneficiary: {
                  ...prev.Beneficiary,
                  principal: res,
                },
              }));
            }
            if (state.currBeneficiary === "dependent") {
              res.type = "dependent";
              setState(prev => ({
                ...prev,
                Beneficiary: {
                  ...prev.Beneficiary,
                  dependent: [...state.Beneficiary.dependent, res],
                },
              }));
            }
          })
          .catch(err => {
            hideActionLoader();
            toast.error("Error creating Client " + err);
            setPatList([]);
            setDependant(false);
          });
      }
    }
  };

  const handleSelectClient = client => {
    //let newBeneficiaryModule = {};
    if (state.currBeneficiary === "principal") {
      client.type = "principal";
      setState(prev => ({
        ...prev,
        Beneficiary: {
          ...prev.Beneficiary,
          principal: client,
        },
      }));
    }
    if (state.currBeneficiary === "dependent") {
      client.type = "dependent";
      setState(prev => ({
        ...prev,
        Beneficiary: {
          ...prev.Beneficiary,
          dependent: [...state.Beneficiary.dependent, client],
        },
      }));
    }

    setClearClientSearch(true);
    setClearClientSearch(false);
    closeModal();
  };

  return (
    <>
      <ModalBox
        open={duplicateModal}
        onClose={() => setDuplicateModal(false)}
        header="Client With Similar Information already Exist"
      >
        <ClientGroup
          list={patList}
          closeModal={() => setDuplicateModal(false)}
          //choosen={choosen}
          dupl={dupl}
          reg={reg}
          depen={depen}
        />
      </ModalBox>

      <Box mb={2}>
        <PageWrapper>
          <ClientSearch
            getSearchfacility={handleSelectClient}
            clear={setClearClientSearch}
          />
        </PageWrapper>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <ToastContainer theme="colored" />
        <PageWrapper>
          <div>
            <HeadWrapper>
              <div>
                <h2>{`${
                  isFullRegistration
                    ? "Full Client Registeration"
                    : "Quick Client Registeration"
                }`}</h2>
                {/* <span>
                Create a New client by filling out the form below to get
                started.
              </span> */}
              </div>

              {isFullRegistration ? (
                <GlobalCustomButton onClick={() => setFullRegistration(false)}>
                  <ElectricBoltIcon
                    fontSize="small"
                    sx={{marginRight: "5px"}}
                  />
                  Quick Registration
                </GlobalCustomButton>
              ) : (
                <GlobalCustomButton onClick={() => setFullRegistration(true)}>
                  <OpenInFullIcon fontSize="small" sx={{marginRight: "5px"}} />
                  Full Registration
                </GlobalCustomButton>
              )}
            </HeadWrapper>

            <ToastContainer theme="colored" />

            {!isFullRegistration ? (
              <>
                <Box sx={{width: "85vw", maxHeight: "80vh"}}>
                  <Grid container spacing={1}>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="First Name"
                        register={register("firstname")}
                        errorText={errors?.firstname?.message}
                        onBlur={checkClient}
                        important={true}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Middle Name"
                        register={register("middlename")}
                        errorText={errors?.middlename?.message}
                        onBlur={checkClient}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Last Name"
                        register={register("lastname")}
                        errorText={errors?.lastname?.message}
                        onBlur={checkClient}
                        important={true}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Phone"
                        register={register("phone")}
                        type="tel"
                        errorText={errors?.phone?.message}
                        onBlur={checkClient}
                        important={true}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Email"
                        register={register("email")}
                        type="email"
                        errorText={errors?.email?.message}
                        onBlur={checkClient}
                        //important={true}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <MuiCustomDatePicker
                        control={control}
                        label="DOB"
                        name="dob"
                        important={true}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <CustomSelect
                        label="Gender"
                        register={register("gender", {required: true})}
                        onBlur={checkClient}
                        options={[
                          {label: "Male", value: "Male"},
                          {label: "Female", value: "Female"},
                        ]}
                        errorText={errors?.gender?.message}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <CustomSelect
                        label="Marital Status"
                        register={register("maritalstatus")}
                        options={[
                          {label: "Single", value: "Single"},
                          {label: "Married", value: "Married"},
                          {label: "Widowed", value: "Widowed"},
                          {
                            label: "Divorced/Seperated",
                            value: "Divorced/Seperated",
                          },
                        ]}
                      />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <CustomSelect
                        label="Country"
                        control={control}
                        name="country"
                        //errorText={errors?.facilityCountry?.message}
                        options={["Nigeria"]}
                      />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12}>
                      <Input
                        label="Residential Address"
                        register={register("residentialaddress")}
                      />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <CustomSelect
                        label="State"
                        control={control}
                        name="state"
                        //errorText={errors?.facilityState?.message}
                        options={sortedStates}
                      />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <CustomSelect
                        label="Town/City"
                        control={control}
                        name="town"
                        //errorText={errors?.facilityLGA?.message}
                        options={
                          selectedState
                            ? selectedState.lgas.sort((a, b) =>
                                a.localeCompare(b)
                              )
                            : []
                        }
                      />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <CustomSelect
                        label="LGA"
                        control={control}
                        name="lga"
                        //errorText={errors?.facilityLGA?.message}
                        options={
                          selectedState
                            ? selectedState.lgas.sort((a, b) =>
                                a.localeCompare(b)
                              )
                            : []
                        }
                      />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Next of Kin"
                        register={register("nextofkin")}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Next of Kin Phone"
                        register={register("nextofkinphone")}
                        type="tel"
                      />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <CustomSelect
                        label="Client Level"
                        important
                        control={control}
                        name="clientLevel"
                        options={[
                          {label: "Level 1", value: "1"},
                          {label: "Level 2", value: "2"},
                          {label: "Level 3", value: "3"},
                        ]}
                      />
                    </Grid>
                  </Grid>

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                    mt={2}
                  >
                    <GlobalCustomButton
                      color="warning"
                      onClick={closeModal}
                      sx={{marginRight: "15px"}}
                    >
                      Cancel
                    </GlobalCustomButton>

                    <GlobalCustomButton
                      type="submit"
                      loading={loading}
                      onClick={handleSubmit(onSubmit)}
                    >
                      <SaveIcon fontSize="small" sx={{marginRight: "5px"}} />
                      Register Client
                    </GlobalCustomButton>
                  </Box>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{width: "80vw", maxHeight: "80vh"}}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <FormsHeaderText text="Client Names" />
                    </Grid>
                    <Grid item lg={4} md={4} sm={4}>
                      <Input
                        label="First Name"
                        register={register("firstname")}
                        errorText={errors?.firstname?.message}
                        onBlur={checkClient}
                        important={true}
                      />
                    </Grid>
                    <Grid item lg={4} md={4} sm={4}>
                      <Input
                        label="Middle Name"
                        register={register("middlename")}
                        errorText={errors?.middlename?.message}
                        onBlur={checkClient}
                      />
                    </Grid>
                    <Grid item lg={4} md={4} sm={4}>
                      <Input
                        label="Last Name"
                        register={register("lastname")}
                        errorText={errors?.lastname?.message}
                        onBlur={checkClient}
                        important={true}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <FormsHeaderText text="Client Biodata" />
                    </Grid>
                    <Grid item lg={2} md={4} sm={6}>
                      <MuiCustomDatePicker
                        control={control}
                        label="DOB"
                        name="dob"
                        important={true}
                      />
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
                      <CustomSelect
                        label="Gender"
                        register={register("gender")}
                        onBlur={checkClient}
                        options={[
                          {label: "Male", value: "male"},
                          {label: "Female", value: "female"},
                        ]}
                      />
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label="Phone No"
                        register={register("phone")}
                        errorText={errors?.phone?.message}
                        onBlur={checkClient}
                        important={true}
                      />
                    </Grid>
                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label="Email"
                        register={register("email")}
                        errorText={errors?.email?.message}
                        onBlur={checkClient}
                        //important={true}
                      />
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
                      <CustomSelect
                        label="Marital Status"
                        register={register("maritalstatus")}
                        options={[
                          {label: "Single", value: "Single"},
                          {label: "Married", value: "Married"},
                          {label: "Widowed", value: "Widowed"},
                          {
                            label: "Divorced/Seperated",
                            value: "Divorced/Seperated",
                          },
                        ]}
                      />
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label="Medical record Number"
                        register={register("mrn")}
                      />
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
                      <CustomSelect
                        label="Religion"
                        register={register("religion")}
                        options={[
                          {label: "Buddhism", value: "Buddhism"},
                          {label: "Christianity", value: "Christianity"},
                          {label: "Hinduism", value: "Hinduism"},
                          {label: "Judaism", value: "Judaism"},
                          {label: "Islam", value: "Islam"},
                          {label: "Taoism", value: "Taoism"},
                        ]}
                      />
                      {/* <Input label="Religion" register={register("religion")} /> */}
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label="Profession"
                        register={register("profession")}
                      />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12}>
                      <Input label="Tags" register={register("clientTags")} />
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
                      <CustomSelect
                        label="Client Level"
                        control={control}
                        name="clientLevel"
                        important
                        options={[
                          {label: "Level 1", value: "1"},
                          {label: "Level 2", value: "2"},
                          {label: "Level 3", value: "3"},
                        ]}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <FormsHeaderText text="Client Address" />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <CustomSelect
                        label="Country"
                        control={control}
                        name="country"
                        //errorText={errors?.facilityCountry?.message}
                        options={["Nigeria"]}
                      />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12}>
                      <Input
                        label="Residential Address"
                        register={register("residentialaddress")}
                      />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <CustomSelect
                        label="State"
                        control={control}
                        name="state"
                        //errorText={errors?.facilityState?.message}
                        options={sortedStates}
                      />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <CustomSelect
                        label="Town/City"
                        control={control}
                        name="town"
                        //errorText={errors?.facilityLGA?.message}
                        options={
                          selectedState
                            ? selectedState.lgas.sort((a, b) =>
                                a.localeCompare(b)
                              )
                            : []
                        }
                      />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <CustomSelect
                        label="LGA"
                        control={control}
                        name="lga"
                        //errorText={errors?.facilityLGA?.message}
                        options={
                          selectedState
                            ? selectedState.lgas.sort((a, b) =>
                                a.localeCompare(b)
                              )
                            : []
                        }
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <FormsHeaderText text="Client Medical Data" />
                    </Grid>
                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label="Blood Group"
                        register={register("bloodgroup")}
                      />
                    </Grid>
                    <Grid item lg={2} md={4} sm={6}>
                      <Input label="Genotype" register={register("genotype")} />
                    </Grid>

                    <Grid item lg={8} md={6} sm={6}>
                      <Input
                        label="Disabilities"
                        register={register("disabilities")}
                      />
                    </Grid>

                    <Grid item lg={6} md={6} sm={6}>
                      <Input
                        label="Allergies"
                        register={register("allergies")}
                      />
                    </Grid>

                    <Grid item lg={6} md={4} sm={6}>
                      <Input
                        label="Co-mobidities"
                        register={register("comorbidities")}
                      />
                    </Grid>

                    <Grid item lg={12} md={4} sm={6}>
                      <Input
                        label="Specific Details "
                        register={register("specificDetails")}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <FormsHeaderText text="Client Next of Kin Information" />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12}>
                      <Input
                        label="Full Name"
                        register={register("nok_name")}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Phone Number"
                        register={register("nok_phoneno")}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label=" Email"
                        register={register("nok_email")}
                        type="email"
                      />
                    </Grid>
                    <Grid item lg={4} md={4} sm={6}>
                      <Input
                        label="Relationship"
                        register={register("nok_relationship")}
                      />
                    </Grid>
                    <Grid item lg={8} md={6} sm={12}>
                      <Input
                        label="Co-mobidities"
                        register={register("comorbidities")}
                      />
                    </Grid>
                  </Grid>

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                    mt={2}
                  >
                    <GlobalCustomButton
                      color="warning"
                      onClick={closeModal}
                      sx={{marginRight: "15px"}}
                    >
                      Cancel
                    </GlobalCustomButton>

                    <GlobalCustomButton
                      type="submit"
                      loading={loading}
                      onClick={handleSubmit(onSubmit)}
                    >
                      <SaveIcon fontSize="small" sx={{marginRight: "5px"}} />
                      Register Client
                    </GlobalCustomButton>
                  </Box>
                </Box>
              </>
            )}
          </div>
        </PageWrapper>
      </form>
    </>
  );
};

export default PolicyClientCreate;
