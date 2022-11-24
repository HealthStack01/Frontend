import React, {useState} from "react";
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

const ClientForm = ({open, setOpen}) => {
  const ClientServ = client.service("client");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFullRegistration, setFullRegistration] = useState(false);
  const data = localStorage.getItem("user");
  const user = JSON.parse(data);

  const {
    register,
    handleSubmit,
    formState: {isSubmitSuccessful, errors},
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
  const showRegister = data => console.log(">>>>>>", data);

  return (
    <ModalBox open={open} onClose={setOpen}>
      <form onSubmit={handleSubmit(submit)}>
        <ToastContainer theme="colored" />

        {/* Start form */}
        <PageWrapper>
          <div>
            <HeadWrapper>
              <div>
                <h2>{`${
                  isFullRegistration
                    ? "Complete Client Registeration"
                    : "Quick Client Registeration"
                }`}</h2>
                <span>
                  Create a New client by filling out the form below to get
                  started.
                </span>
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
                  Complete Registration
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
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Middle Name"
                        register={register("middlename")}
                        errorText={errors?.middlename?.message}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Last Name"
                        register={register("lastname")}
                        errorText={errors?.lastname?.message}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Phone"
                        register={register("phone")}
                        type="tel"
                        errorText={errors?.phone?.message}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Email"
                        register={register("email")}
                        type="email"
                        errorText={errors?.email?.message}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <BasicDatePicker
                        label="dob"
                        register={register("dob")}
                        errorText={errors?.dob?.message}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <CustomSelect
                        label="Gender"
                        register={register("gender", {required: true})}
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
                      onClick={() => setOpen(false)}
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
                    <Grid item lg={3} md={4} sm={4}>
                      <Input
                        label="First Name"
                        register={register("firstname")}
                        errorText={errors?.firstname?.message}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={4}>
                      <Input
                        label="Middle Name"
                        register={register("middlename")}
                        errorText={errors?.middlename?.message}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={4}>
                      <Input
                        label="Last Name"
                        register={register("lastname")}
                        errorText={errors?.lastname?.message}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <FormsHeaderText text="Client Biodata" />
                    </Grid>
                    <Grid item lg={2} md={4} sm={6}>
                      <BasicDatePicker
                        label="Date of Birth"
                        register={register("dob")}
                        errorText={errors?.dob?.message}
                      />
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
                      <CustomSelect
                        label="Gender"
                        register={register("gender")}
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
                      />
                    </Grid>
                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label="Email"
                        register={register("email")}
                        errorText={errors?.email?.message}
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
                    <Grid item lg={2} md={4} sm={6}>
                      <Input label="Genotype" register={register("genotype")} />
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label="Disabilities"
                        register={register("disabilities")}
                      />
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label="Allergies"
                        register={register("allergies")}
                      />
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label="Co-mobidities"
                        register={register("comorbidities")}
                      />
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
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
                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label="Phone Number"
                        register={register("nok_phoneno")}
                      />
                    </Grid>
                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label=" Email"
                        register={register("nok_email")}
                        type="email"
                      />
                    </Grid>
                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label="Relationship"
                        register={register("nok_relationship")}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12}>
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
                  >
                    <GlobalCustomButton
                      color="warning"
                      onClick={() => setOpen(false)}
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
    </ModalBox>
  );
};

export default ClientForm;
