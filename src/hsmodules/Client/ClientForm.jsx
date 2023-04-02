import React, {useContext, useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import Button from "../../components/buttons/Button";
import Input from "../../components/inputs/basic/Input";
import CustomSelect from "../../components/inputs/basic/Select";
import BasicDatePicker from "../../components/inputs/Date";
import {yupResolver} from "@hookform/resolvers/yup";
import client from "../../feathers";
import SaveIcon from "@mui/icons-material/Save";
import {FileUploader} from "react-drag-drop-files";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import {
  BottomWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
  ViewBox,
} from "../app/styles";
import ModalBox from "../../components/modal";
import {createClientSchema} from "./schema";
import Textarea from "../../components/inputs/basic/Textarea";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import {Box, Grid, Typography} from "@mui/material";
import {FormsHeaderText} from "../../components/texts";
import MuiCustomDatePicker from "../../components/inputs/Date/MuiDatePicker";
import ClientGroup from "./ClientGroup";
import {ObjectContext, UserContext} from "../../context";
import {Nigeria} from "../app/Nigeria";
import dayjs from "dayjs";
import GoogleAddressInput from "../../components/google-autocomplete";

const UploadComponent = ({}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        border: "1px dashed gray",
        cursor: "pointer",
        borderRadius: "7.5px",
      }}
    >
      <FileUploadOutlinedIcon />
      <Typography>Select Logo Image or Drag and Drop here</Typography>
    </Box>
  );
};

const ClientForm = ({closeModal, setOpen}) => {
  const ClientServ = client.service("client");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFullRegistration, setFullRegistration] = useState(false);
  // const data = localStorage.getItem("user");
  const [patList, setPatList] = useState([]);
  const [duplicateModal, setDuplicateModal] = useState(false);
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [dependant, setDependant] = useState(false);
  // const user = JSON.parse(data);
  const mpiServ = client.service("mpi");

  const {
    register,
    handleSubmit,
    formState: {isSubmitSuccessful, errors},
    control,
    getValues,
    reset,
    setValue,
    watch,
  } = useForm({
    //resolver: yupResolver(createClientSchema),
    shouldUnregister: false,
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

  const submit = async (data, e) => {
    return console.log(data);
    showActionLoader();
    setLoading(true);
    e.preventDefault();
    setSuccess(false);
    const defaultEmail = `${data.firstname}-${data.lastname}-${dayjs(
      data.dob
    ).format("DD/MM/YYY")}@healthstack.africa`;

    const clientData = {
      ...data,
      email: data.email || defaultEmail,
    };

    await ClientServ.create(clientData)
      .then(res => {
        toast.success(`Client successfully created`);

        setLoading(false);
        hideActionLoader();
      })
      .catch(err => {
        toast.error(`Sorry, You weren't able to create an client. ${err}`);
        setLoading(false);
        hideActionLoader();
      });
    setOpen(false);
    setLoading(false);
    hideActionLoader();
  };

  const checkClient = () => {
    console.log("checking client");
    const data = getValues();
    //data.dob = date;
    const obj = {
      firstname: data.firstname,
      middlename: data.middlename,
      lastname: data.lastname,
      gender: data.gender,
      email: data.email,
      phone: data.phone,
      dob: data.dob,
    };

    let query = {};

    if (!!data.phone) {
      query.phone = data.phone;
      checkQuery(query);
    }

    if (!!data.email) {
      query.email = data.email;
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
          console.log(res);
          if (res.total > 0) {
            // alert(res.total)
            setPatList(res.data);
            setDuplicateModal(true);
            return;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const dupl = client => {
    const data = getValues();
    Object.keys(data).forEach(key => {
      data[key] = null;
    });

    reset(data);
    toast.error("Client previously registered in this facility");
    setDuplicateModal(false);

    setPatList([]);
    //console.log(Client)
  };

  const reg = async client => {
    setState(prev => ({
      ...prev,
      actionLoader: {open: true, message: "Creating Client..."},
    }));
    const data = getValues();
    Object.keys(data).forEach(key => {
      data[key] = null;
    });

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
      //console.log(newPat)
      await mpiServ
        .create(newPat)
        .then(resp => {
          toast.success("Client created succesfully");
          reset(data);
          setState(prev => ({
            ...prev,
            actionLoader: {open: false, message: ""},
          }));
          setDuplicateModal(false);
        })
        .catch(err => {
          setState(prev => ({
            ...prev,
            actionLoader: {open: false, message: ""},
          }));
          toast.error("Error creating Client " + err);
        });
    }
    //reset form
    reset();
    setPatList([]);
    //cash payment
  };

  const depen = client => {
    setDependant(true);
    toast.success("You're Creating a Dependent Client");
    setDuplicateModal(false);
  };

  const handleGoogleAddressSelect = obj => {
    setValue("residentialaddress", obj.address);
    setValue("state", obj.state);
    setValue("town", obj.lga);
    setValue("lga", obj.lga);
    setValue("country", obj.country);
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

      <ModalBox></ModalBox>

      <form onSubmit={handleSubmit(submit)}>
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

                    <Grid item lg={6} md={6} sm={12}>
                      <GoogleAddressInput
                        label="Residential Address"
                        register={register("residentialaddress")}
                        getSelectedAddress={handleGoogleAddressSelect}
                      />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <Input label="Town/City" register={register("town")} />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <Input label="LGA" register={register("lga")} />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <Input label="State" register={register("state")} />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <Input label="Country" register={register("country")} />
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
                      onClick={handleSubmit(submit)}
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

                    <Grid item lg={6} md={6} sm={12}>
                      <GoogleAddressInput
                        label="Residential Address"
                        register={register("residentialaddress")}
                        getSelectedAddress={handleGoogleAddressSelect}
                      />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <Input label="Town/City" register={register("town")} />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <Input label="LGA" register={register("lga")} />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <Input label="State" register={register("state")} />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <Input label="Country" register={register("country")} />
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
                      onClick={handleSubmit(submit)}
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

export default ClientForm;
