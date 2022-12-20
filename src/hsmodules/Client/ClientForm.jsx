import React, {useContext, useState} from "react";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import Button from "../../components/buttons/Button";
import Input from "../../components/inputs/basic/Input";
import CustomSelect from "../../components/inputs/basic/Select";
import BasicDatePicker from "../../components/inputs/Date";
import {yupResolver} from "@hookform/resolvers/yup";
import client from "../../feathers";
import SaveIcon from "@mui/icons-material/Save";
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
import {Box, Grid} from "@mui/material";
import {FormsHeaderText} from "../../components/texts";
import MuiCustomDatePicker from "../../components/inputs/Date/MuiDatePicker";
import ClientGroup from "./ClientGroup";
import {ObjectContext, UserContext} from "../../context";

const ClientForm = ({closeModal, setOpen}) => {
  const ClientServ = client.service("client");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFullRegistration, setFullRegistration] = useState(false);
  // const data = localStorage.getItem("user");
  const [patList, setPatList] = useState([]);
  const [duplicateModal, setDuplicateModal] = useState(false);
  const {state, setState} = useContext(ObjectContext);
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
  } = useForm({
    resolver: yupResolver(createClientSchema),

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
    setLoading(true);
    e.preventDefault();
    setSuccess(false);

    await ClientServ.create(data)
      .then(res => {
        toast.success(`Client successfully created`);

        setLoading(false);
      })
      .catch(err => {
        toast.error(`Sorry, You weren't able to create an client. ${err}`);
        setLoading(false);
      });
    setOpen(false);
    setLoading(false);
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

    if (!!data.firstname && !!data.lastname && !!data.gender && !!data.dob) {
      // console.log("simpa")
      data.middlename = data.middlename || "";
      (query.gender = data.gender),
        (query.dob = data.dob),
        (query.$or = [
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
        ]);
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
                <Box sx={{width: "80vw", maxHeight: "80vh"}}>
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
                        important={true}
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
                          {label: "Female", value: "Memale"},
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
                      <Input
                        label="Residential Address"
                        register={register("residentialaddress")}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Town"
                        register={register("town")}
                        type="text"
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="State"
                        register={register("state")}
                        type="text"
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Country"
                        register={register("country")}
                        type="text"
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
                  </Grid>

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
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
                      <Input label="Religion" register={register("religion")} />
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label="Profession"
                        register={register("profession")}
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
                        important={true}
                      />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12}>
                      <Input label="Tags" register={register("clientTags")} />
                    </Grid>
                  </Grid>

                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <FormsHeaderText text="Client Address" />
                    </Grid>
                    <Grid item lg={4} md={6} sm={8}>
                      <Input
                        label="Residential Address"
                        register={register("address")}
                      />
                    </Grid>
                    <Grid item lg={2} md={4} sm={4}>
                      <Input label="Town/City" register={register("city")} />
                    </Grid>
                    <Grid item lg={2} md={4} sm={4}>
                      <Input label="LGA" register={register("lga")} />
                    </Grid>
                    <Grid item lg={2} md={4} sm={4}>
                      <Input label="State" register={register("state")} />
                    </Grid>
                    <Grid item lg={2} md={4} sm={4}>
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
                    <Grid item lg={2} md={4} sm={6} xs={12}>
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
                        register={register("nok_comorbidities")}
                      />
                    </Grid>
                  </Grid>

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
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
