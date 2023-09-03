import {Box, Grid, Typography} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Input from "../inputs/basic/Input";
import dayjs from "dayjs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddBoxIcon from "@mui/icons-material/AddBox";
import GlobalCustomButton from "../buttons/CustomButton";
import PoliciesList from "../../hsmodules/ManagedCare/components/policy/Lists";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import NewPolicyModule from "../../hsmodules/ManagedCare/NewPolicy";
import Claims from "../../hsmodules/ManagedCare/Claims";
import axios from "axios";
import {FileUploader} from "react-drag-drop-files";
import ModalBox from "../modal";
import {getBase64} from "../../hsmodules/helpers/getBase64";
import {toast} from "react-toastify";
import {ObjectContext, UserContext} from "../../context";
import LinkIcon from "@mui/icons-material/Link";
import {ProviderPrintId} from "../../hsmodules/ManagedCare/components/PrintId";
import SendLinkViaEmail from "../../hsmodules/ManagedCare/components/beneficiary/SendClientLink";
import PolicyDetail from "../../hsmodules/ManagedCare/components/policy/Details";
import {AppointmentCreate} from "../../hsmodules/Client/Appointments";

const placeholder =
  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";

const HmoClientDetail = ({detail, goBack, showHeader, updateClient}) => {
  const {register, reset, handleSubmit} = useForm();
  const [view, setView] = useState("details");
  const [edit, setEdit] = useState(false);
  const [appt, setAppt] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [generateIdCardModal, setGenerateIdCardModal] = useState(false);
  const [sendLinkModal, setSendLinkModal] = useState(false);

  useEffect(() => {
    //console.log(detail);
    const defaultValues = {
      ...detail,
      dob: dayjs(detail?.dob).format("MMM DD, YYYY"),
      createdAt: dayjs(detail?.createdAt).format("MMM DD, YYYY"),
    };

    reset(defaultValues);
  }, []);

  const setAppointment =()=>{

    setAppt(true)

  }

  const handleUpdateClient = data => {
    updateClient(data);
  };

  const handleChangeImageUrl = url => {
    updateClient({
      ...detail,
      imageurl: url,
    });
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
  const closebill=()=>{

  }

  return (
    <Box>


      <ModalBox
        open={appt}
        onClose={() => setAppt(false)}
      >
      <AppointmentCreate
          closeModal={() => setAppt(false)}
          openBill={closebill}
        />
      </ModalBox>

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

      <ModalBox
        open={imageModal}
        onClose={() => setImageModal(false)}
        header="Change client profile photo"
      >
        <ChangeClientImage
          closeModal={() => setImageModal(false)}
          changeImage={handleChangeImageUrl}
        />
      </ModalBox>
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
          {/* <GlobalCustomButton onClick={goBack}>
            <ArrowBackIcon sx={{marginRight: "3px"}} fontSize="small" />
            Back
          </GlobalCustomButton> */}

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
                  onClick={setAppointment}
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
                  Set Appointment
                </GlobalCustomButton>
               {/*  <GlobalCustomButton
                  color="info"
                  onClick={() => setSendLinkModal(true)}
                >
                  <LinkIcon fontSize="small" sx={{marginRight: "2px"}} /> Send
                  Link
                </GlobalCustomButton> */}

                {/* <GlobalCustomButton onClick={handleGenegrateIdCard}>
                  <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
                  Generate ID
                </GlobalCustomButton> */}
              </>
            )}
          </Box>
        )}
      </Box>

      {view === "policies" &&  <PolicyDetail
          /* goBack={handleReturn} */
         /*  beneficiary={beneficiary}
          corporate={corporate}
          corporateOrg={corporateOrg} */
          provider={true}
        />}

      {view === "claims" && <Claims beneficiary={detail} />}

      <Box p={2}>
        {view === "details" && (
          <>
            <Box
              sx={{
                display: "flex",
              }}
              gap={1}
              mb={2}
            >
              <Box
                onClick={() => setImageModal(true)}
                sx={{
                  width: "8rem",
                  height: "calc(2.55rem * 3)",
                  border: "1px solid #bbbbbb",
                  p: 0.5,
                  position: "relative",
                  "&:hover": {
                    background: "gray",
                    cursor: "pointer",
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  },
                }}
              >
                {/* <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    left: "0",
                    right: 0,
                    zIndex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "transparent",
                    "&:hover": {
                      background: "gray",
                      cursor: "pointer",
                    },
                  }}
                >
                  <GlobalCustomButton variant="text">
                    Change Image
                  </GlobalCustomButton>
                </Box> */}
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
                <Grid item lg={4}>
                  <Input
                    register={register("firstname")}
                    label="First Name"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={4}>
                  <Input
                    register={register("middlename")}
                    label="Middle Name"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={4}>
                  <Input
                    register={register("lastname")}
                    label="Last Name"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={4}>
                  <Input
                    register={register("dob")}
                    label="Date of Birth"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={4}>
                  <Input
                    register={register("gender")}
                    label="Gender"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={4}>
                  <Input
                    register={register("marital_status")}
                    label="Marital Status"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={4}>
                  <Input
                    register={register("phone")}
                    label="Phone Number"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={4}>
                  <Input
                    register={register("email")}
                    label="Email Address"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={4}>
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
                <Grid item lg={3}>
                  <Input
                    register={register("profession")}
                    label="Profession"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={3}>
                  <Input
                    register={register("religion")}
                    label="Religion"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={3}>
                  <Input
                    register={register("policyNo")}
                    label="Policy Number"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={3}>
                  <Input
                    register={register("phone")}
                    label="Medical Rec. Number"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={3}>
                  <Input
                    register={register("address")}
                    label="Address"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={3}>
                  <Input
                    register={register("town")}
                    label="Town"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={3}>
                  <Input
                    register={register("lga")}
                    label="Local Governement Area"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={3}>
                  <Input
                    register={register("city")}
                    label="City"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={3}>
                  <Input
                    register={register("state")}
                    label="State"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={3}>
                  <Input
                    register={register("country")}
                    label="Country"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={3}>
                  <Input
                    register={register("bloodgroup")}
                    label="Blood Group"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={3}>
                  <Input
                    register={register("genotype")}
                    label="Genotype"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={3}>
                  <Input
                    register={register("disablilities")}
                    label="Disabilies"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={3}>
                  <Input
                    register={register("allergies")}
                    label="Allergies"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={3}>
                  <Input
                    register={register("tags")}
                    label="Tags"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={3}>
                  <Input
                    register={register("specific_details")}
                    label="Specific Details"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={3}>
                  <Input
                    register={register("nok_name")}
                    label="Name of Next of Kin"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={3}>
                  <Input
                    register={register("nok_phone")}
                    label="Phone of Next of Kin"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={3}>
                  <Input
                    register={register("nok_email")}
                    label="Email of Next of Kin"
                    disabled={!edit}
                  />
                </Grid>

                <Grid item lg={3}>
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

export default HmoClientDetail;

const UploadComponent = ({}) => {
  return (
    <Box
      sx={{
        width: "350px",
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
      <Typography sx={{fontSize: "0.8rem"}}>
        Select Logo Image or Drag and Drop here
      </Typography>
    </Box>
  );
};

const ChangeClientImage = ({closeModal, changeImage}) => {
  const [file, setFile] = useState(null);
  const {showActionLoader, hideActionLoader} = useContext(ObjectContext);

  const handleChange = file => {
    //console.log(file);
    //setFile(file);

    getBase64(file)
      .then(res => {
        //console.log(res);
        setFile(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleUploadImage = async () => {
    if (file === null) return toast.error("Please select an Image to upload");
    showActionLoader();
    const token = localStorage.getItem("feathers-jwt");
    axios
      .post(
        "https://healthstack-backend.herokuapp.com/upload",
        {uri: file},
        {headers: {Authorization: `Bearer ${token}`}}
      )
      .then(async res => {
        const imageUrl = res.data.url;
        //const employee = user.currentEmployee;
        closeModal();
        hideActionLoader();
        return changeImage(imageUrl);

      })
      .catch(error => {
        hideActionLoader();
        toast.error(
          `An error occured whilst updating your Patient Image ${error}`
        );
        console.log(error);
      });
  };

  return (
    <Box
      sx={{
        width: "400px",
        maxHeight: "80vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {file ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={file}
            alt="logo"
            style={{width: "350px", height: "350px", display: "block"}}
          />
        </Box>
      ) : (
        <FileUploader
          multiple={false}
          handleChange={handleChange}
          name="upload"
          types={["jpeg", "png", "jpg"]}
          children={<UploadComponent />}
        />
      )}

      <Box sx={{display: "flex"}} gap={2} mt={2}>
        <GlobalCustomButton color="error" onClick={closeModal}>
          Cancel
        </GlobalCustomButton>

        <GlobalCustomButton
          onClick={handleUploadImage}
          disabled={file === null}
        >
          Upload Image
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};
