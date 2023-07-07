import {Box, Grid, Typography} from "@mui/material";
import {useEffect, useState, useContext} from "react";
import {useForm} from "react-hook-form";
import Input from "../inputs/basic/Input";
import dayjs from "dayjs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ModalBox from "../../components/modal";
import GlobalCustomButton from "../buttons/CustomButton";
import PoliciesList from "../../hsmodules/ManagedCare/components/policy/Lists";
import NewPolicyModule from "../../hsmodules/ManagedCare/NewPolicy";
import Claims from "../../hsmodules/ManagedCare/Claims";
import {ProviderPrintId} from "../../hsmodules/ManagedCare/components/PrintId";
import {ObjectContext, UserContext} from "../../context";
import LinkIcon from "@mui/icons-material/Link";
import SendLinkViaEmail from "../../hsmodules/ManagedCare/components/beneficiary/SendClientLink";



const malePlaceholder =
  "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg";

const placeholder =
  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";

const DefaultClientDetail = ({detail, goBack, showHeader, updateClient}) => {
  const {register, reset, handleSubmit} = useForm();
  const [view, setView] = useState("details");
  const [edit, setEdit] = useState(false);
  const [generateIdCardModal, setGenerateIdCardModal] = useState(false);
  const [sendLinkModal, setSendLinkModal] = useState(false);
  const {state, setState, hideActionLoader, showActionLoader} =   useContext(ObjectContext);
  

  useEffect(() => {
    //console.log(detail);
    const defaultValues = {
      ...detail,
      dob: dayjs(detail?.dob).format("MMM DD, YYYY"),
      createdAt: dayjs(detail?.createdAt).format("MMM DD, YYYY"),
    };

    reset(defaultValues);
  }, []);

  const handleUpdateClient = data => {
    updateClient(data);
  };

  const handleGenegrateIdCard = () => {
    setGenerateIdCardModal(true);
  };

  const handleCancelUpdate = () => {
    const defaultValues = {
      ...detail,
      dob: dayjs(detail?.dob).format("MMM DD, YYYY"),
      createdAt: dayjs(detail?.createdAt).format("MMM DD, YYYY"),
    };

    reset(defaultValues);
    setEdit(false);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          borderBottom: "1px solid #f8f8f8",
          backgroundColor: "#f8f8f8",
          position: "sticky",
          zIndex: 99,
          top: 0,
          left: 0,
        }}
        mb={2}
        p={2}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          gap={1}
        >
          <GlobalCustomButton onClick={goBack}>
            <ArrowBackIcon sx={{marginRight: "3px"}} fontSize="small" />
            Back
          </GlobalCustomButton>

          <Typography
            sx={{
              fontSize: "0.95rem",
              fontWeight: "600",
            }}
          >
            Details for Client - {detail?.firstname} {detail?.lastname}'s
          </Typography>
        </Box>

        {edit && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
            gap={1}
          >
            <GlobalCustomButton
              color="success"
              onClick={handleSubmit(handleUpdateClient)}
            >
              <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
              Update Client
            </GlobalCustomButton>

            <GlobalCustomButton color="warning" onClick={handleCancelUpdate}>
              <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
              Cancel Update
            </GlobalCustomButton>
          </Box>
        )}

        {!edit && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
            gap={1}
          >
            {view === "details" && (
              <GlobalCustomButton onClick={() => setEdit(true)}>
                <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
                Edit Client
              </GlobalCustomButton>
            )}

            <GlobalCustomButton
              onClick={() => setView("details")}
              sx={
                view === "details"
                  ? {
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      "&:hover": {
                        backgroundColor: "#ffffff",
                      },
                    }
                  : {}
              }
            >
              <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
              Client Details
            </GlobalCustomButton>
            <GlobalCustomButton
              onClick={handleGenegrateIdCard}
           
            >
              <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
              Generate ID
            </GlobalCustomButton>

            {showHeader && (
              <>
                <GlobalCustomButton
                  onClick={() => setView("policies")}
                  sx={
                    view === "policies"
                      ? {
                          backgroundColor: "#ffffff",
                          color: "#000000",
                          "&:hover": {
                            backgroundColor: "#ffffff",
                          },
                        }
                      : {}
                  }
                >
                  <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
                  Policies
                </GlobalCustomButton>

                <GlobalCustomButton
                  onClick={() => setView("claims")}
                  sx={
                    view === "claims"
                      ? {
                          backgroundColor: "#ffffff",
                          color: "#000000",
                          "&:hover": {
                            backgroundColor: "#ffffff",
                          },
                        }
                      : {}
                  }
                >
                  <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
                  Claims
                </GlobalCustomButton>
            <GlobalCustomButton
              color="info"
              onClick={() => setSendLinkModal(true)}
            >
              <LinkIcon fontSize="small" sx={{marginRight: "2px"}} /> Send Link
            </GlobalCustomButton>
              </>
            )}
             
          </Box>
        )}
      </Box>

      {view === "policies" && <NewPolicyModule beneficiary={detail} />}

      {view === "claims" && <Claims beneficiary={detail} />}

      <Box p={2}>
        {view === "details" && (
          <>
             {generateIdCardModal && (
          <>
            <ModalBox open onClose={() => setGenerateIdCardModal(false)}>
              <ProviderPrintId data={detail} />
            </ModalBox>
          </>
        )}
         <ModalBox
        open={sendLinkModal}
        onClose={() => setSendLinkModal(false)}
        header={`Send Organization Link`}
      >
        <SendLinkViaEmail
          closeModal={() => setSendLinkModal(false)}
          defaultToEmail={detail.email}
          
          id={detail._id}
        />
      </ModalBox>
            <Box
              sx={{
                display: "flex",
              }}
              gap={1}
              mb={2}
            >
              <Box
                sx={{
                  width: "8rem",
                  height: "calc(2.55rem * 3)",
                  border: "1px solid #bbbbbb",
                  p: 0.5,
                }}
              >
                <img
                  src={detail.imageurl || placeholder}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    objectFit: "cover",
                  }}
                />
              </Box>

              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("firstname")}
                    label="First Name"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("middlename")}
                    label="Middle Name"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("lastname")}
                    label="Last Name"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("dob")}
                    label="Date of Birth"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("gender")}
                    label="Gender"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("marital_status")}
                    label="Marital Status"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("phone")}
                    label="Phone Number"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("email")}
                    label="Email Address"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("createdAt")}
                    label="Registeration Date"
                    disabled={!edit}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("profession")}
                    label="Profession"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("religion")}
                    label="Religion"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("policyNo")}
                    label="Policy Number"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("phone")}
                    label="Medical Rec. Number"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("address")}
                    label="Address"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("town")}
                    label="Town"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("lga")}
                    label="Local Governement Area"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("city")}
                    label="City"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("state")}
                    label="State"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("country")}
                    label="Country"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("bloodgroup")}
                    label="Blood Group"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("genotype")}
                    label="Genotype"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("disablilities")}
                    label="Disabilies"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("allergies")}
                    label="Allergies"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("tags")}
                    label="Tags"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("specific_details")}
                    label="Specific Details"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("nok_name")}
                    label="Name of Next of Kin"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("nok_phone")}
                    label="Phone of Next of Kin"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("nok_email")}
                    label="Email of Next of Kin"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item xs={12} sm={6}  lg={3} md={4}>
                  <Input
                    register={register("nok_relationship")}
                    label="Next of Kin Relationship"
                    disabled={!edit}
                  />
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default DefaultClientDetail;
