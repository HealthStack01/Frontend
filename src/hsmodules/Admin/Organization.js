import {useEffect, useState, useCallback, useContext} from "react";
import {Box} from "@mui/system";
import client from "../../feathers";
import {ObjectContext, UserContext} from "../../context";
import {Avatar, Grid, IconButton, Typography} from "@mui/material";
import Input from "../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";
import {FormsHeaderText} from "../../components/texts";
import CustomSelect from "../../components/inputs/basic/Select";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import CustomTable from "../../components/customtable";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {useNavigate} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ModalBox from "../../components/modal";
import Textarea from "../../components/inputs/basic/Textarea";
import CheckboxGroup from "../../components/inputs/basic/Checkbox/CheckBoxGroup";
import {toast} from "react-toastify";
import dayjs from "dayjs";
import {FileUploader} from "react-drag-drop-files";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import {facilityTypes} from "../app/facility-types";
import {orgTypeModules} from "../app/app-modules";

import BankAccount from "./BankAccount";
import axios from "axios";
import {getBase64} from "../helpers/getBase64";
import {BeneList, PolicyList} from "../ManagedCare/Corporate";
import Claims from "../ManagedCare/Claims";
import PremiumPayment from "../ManagedCare/Claims";

const AdminOrganization = ({propId}) => {
  const facilityServer = client.service("facility");
  const {register, reset, handleSubmit, control} = useForm();
  const {user, setUser} = useContext(UserContext);
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const [facility, setFacility] = useState({});
  const [edit, setEdit] = useState(false);
  const [logoAnchorEl, setLogoAnchorEl] = useState(null);
  const [modulesModal, setModulesModal] = useState(false);
  const [logoUploadModal, setLogoUploadModal] = useState(false);
  const [view, setView] = useState("details");
  const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();

  const handleCloseLogoOptions = () => {
    setLogoAnchorEl(null);
  };

  const handleOpemLogoOptions = event => {
    setLogoAnchorEl(event.currentTarget);
  };

  //const {user}

  const getCurrentFacility = useCallback(async () => {
    showActionLoader();
    //console.log(user);
    const id = propId || user.currentEmployee.facilityDetail._id;
    await facilityServer
      .get(id)
      .then(resp => {
        //console.log(resp);
        hideActionLoader();
        setFacility(resp);
        reset(resp);
        //console.log(resp);
      })
      .catch(err => {
        hideActionLoader();
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getCurrentFacility();

    facilityServer.on("created", obj => getCurrentFacility());
    facilityServer.on("updated", obj => getCurrentFacility());
    facilityServer.on("patched", obj => getCurrentFacility());
    facilityServer.on("removed", obj => getCurrentFacility());

    return () => {};
  }, [getCurrentFacility]);

  const navigateToEmployees = () => {
    navigate("/app/admin/employees");
  };

  const updateOrganization = async data => {
    showActionLoader();
    const employee = user.currentEmployee;
    const prevOrgDetail = user.currentEmployee.facilityDetail;
    //console.log(prevOrgDetail);

    const newOrgDetail = {
      ...prevOrgDetail,
      ...data,
      updatedAt: dayjs(),
      updatedBy: employee.userId,
      updatedByName: `${employee.firstname} ${employee.lastname}`,
    };

    //return console.log(newOrgDetail);

    const documentId = prevOrgDetail._id;

    await facilityServer
      .patch(documentId, {...newOrgDetail})
      .then(resp => {
        //console.log(resp);
        reset(resp);
        setFacility(resp);
        hideActionLoader();
        setUser(prev => ({
          ...prev,
          currentEmployee: {
            ...prev.currentEmployee,
            facilityDetail: newOrgDetail,
          },
        }));
        setEdit(false);
        toast.success("You've succesfully updated your Organization Details");
      })
      .catch(error => {
        toast.error(`Error Updating your oragnization Details ${error}`);
        hideActionLoader();
        console.error(error);
      });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #f8f8f8",
          backgroundColor: "#f8f8f8",
          position: "sticky",
          zIndex: 99,
          top: 0,
          left: 0,
        }}
        mb={2}
        pl={2}
        pr={2}
        pt={0.5}
        pb={0.5}
      >
        <Box>
          <IconButton onClick={handleOpemLogoOptions}>
            <Avatar sx={{width: 68, height: 68}} src={facility?.facilitylogo}>
              LOGO
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={logoAnchorEl}
            id="account-menu"
            open={Boolean(logoAnchorEl)}
            onClose={handleCloseLogoOptions}
            anchorOrigin={{horizontal: "right", vertical: "center"}}
          >
            {/* <MenuItem>View Logo</MenuItem> */}
            <MenuItem>Remove Logo</MenuItem>
            <MenuItem
              onClick={() => {
                setLogoUploadModal(true);
                handleCloseLogoOptions();
              }}
            >
              Change Logo
            </MenuItem>
          </Menu>
        </Box>
        {/* {currentPage === 1 && <PolicyList standAlone={facility?._id || ""} />}
        {currentPage === 2 && <PremiumPayment />} */}

        {facility?.facilityType?.toLowerCase() === "corporate" ? (
          <Box sx={{display: "flex"}} gap={2}>
            <GlobalCustomButton
              color="secondary"
              onClick={() => setModulesModal(true)}
            >
              <AutoStoriesIcon sx={{marginRight: "5px"}} fontSize="small" />
              Organization Modules
            </GlobalCustomButton>

            <GlobalCustomButton onClick={navigateToEmployees} color="info">
              <PeopleAltIcon sx={{marginRight: "5px"}} fontSize="small" />{" "}
              Organization Employees
            </GlobalCustomButton>
          </Box>
        ) : (
          <Box sx={{display: "flex"}} gap={2}>
            <GlobalCustomButton
              color="success"
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
              <AutoStoriesIcon sx={{marginRight: "5px"}} fontSize="small" />
              Details
            </GlobalCustomButton>

            <GlobalCustomButton
              color="info"
              onClick={() => setView("policy")}
              sx={
                view === "policy"
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
              <AutoStoriesIcon sx={{marginRight: "5px"}} fontSize="small" />
              Policy
            </GlobalCustomButton>

            <GlobalCustomButton
              color="secondary"
              onClick={() => setView("beneficiaries")}
              sx={
                view === "beneficiaries"
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
              <AutoStoriesIcon sx={{marginRight: "5px"}} fontSize="small" />
              Beneficiaries
            </GlobalCustomButton>

            <GlobalCustomButton
              color="primary"
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
              <AutoStoriesIcon sx={{marginRight: "5px"}} fontSize="small" />
              Claims
            </GlobalCustomButton>
          </Box>
        )}
      </Box>
      {view === "claims" && (
        <Box>
          <Claims standAlone={true} />
        </Box>
      )}
      {view === "policy" && (
        <Box>
          <PolicyList standAlone={facility?._id || ""} />
        </Box>
      )}
      {view === "beneficiaries" && (
        <Box>
          <BeneList standAlone={facility?._id || ""} />
        </Box>
      )}
      {view === "details" && (
        <>
          <Box
            mb={2}
            p={2}
            sx={{display: "flex", justifyContent: "space-between"}}
          >
            <FormsHeaderText text="Organization Details" />
          </Box>
          <Box
            mb={2}
            p={2}
            sx={{display: "flex", justifyContent: "space-between"}}
          >
            {" "}
            <Box sx={{display: "flex"}} gap={2}>
              {!edit ? (
                <>
                  <GlobalCustomButton onClick={() => setEdit(true)}>
                    <EditIcon fontSize="small" />
                    Edit Details
                  </GlobalCustomButton>
                  {/* <GlobalCustomButton
                color="secondary"
                variant={view === "policy" ? "outlined" : "contained"}
                onClick={() => setView("policy")}
                text="Policy"
                customStyles={{ margin: "0 .8rem" }}
              />
              <GlobalCustomButton
                color="primary"
                variant={view === "premium" ? "outlined" : "contained"}
                onClick={() => setView("premium")}
                text="Premium"
                customStyles={{ marginRight: ".8rem" }}
              /> */}
                </>
              ) : (
                <>
                  <GlobalCustomButton
                    color="error"
                    onClick={() => {
                      setEdit(false);
                      setView("details");
                    }}
                  >
                    <EditIcon fontSize="small" />
                    Cancel Edit
                  </GlobalCustomButton>

                  <GlobalCustomButton
                    color="success"
                    onClick={handleSubmit(updateOrganization)}
                  >
                    <EditIcon fontSize="small" />
                    Update Organaization
                  </GlobalCustomButton>
                </>
              )}
            </Box>
          </Box>

          <Grid container spacing={2} mb={2} p={2}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <Input
                register={register("facilityOwner")}
                label="Organization Owner"
                disabled={!edit}
              />
            </Grid>

            <Grid item lg={4} md={6} sm={6} xs={12}>
              <Input
                register={register("facilityName")}
                label="Organization Name"
                disabled={!edit}
              />
            </Grid>

            <Grid item lg={4} md={6} sm={6} xs={12}>
              <Input
                register={register("facilityContactPhone")}
                label="Phone Number"
                disabled={!edit}
              />
            </Grid>

            <Grid item lg={4} md={6} sm={6} xs={12}>
              <Input
                register={register("facilityEmail")}
                label="Email Address"
                disabled={!edit}
              />
            </Grid>

            <Grid item lg={4} md={6} sm={6} xs={12}>
              <Input
                label="Organization Type"
                disabled
                register={register("facilityType")}
              />
            </Grid>

            <Grid item lg={4} md={6} sm={6} xs={12}>
              <Input
                control={control}
                label="Organization Category"
                disabled
                register={register("facilityCategory")}
              />
            </Grid>

            <Grid item lg={8} md={8} sm={12} xs={12}>
              <Input
                register={register("facilityAddress")}
                label="Organization Address"
                disabled={!edit}
              />
            </Grid>

            <Grid item lg={4} md={6} sm={6} xs={12}>
              <Input
                register={register("facilityCity")}
                label="Organization City"
                disabled={!edit}
              />
            </Grid>

            <Grid item lg={4} md={6} sm={6} xs={12}>
              <Input
                register={register("facilityLGA")}
                label="Organization LGA"
                disabled={!edit}
              />
            </Grid>

            <Grid item lg={4} md={6} sm={6} xs={12}>
              <Input
                register={register("facilityState")}
                label="Organization State"
                disabled={!edit}
              />
            </Grid>

            <Grid item lg={4} md={6} sm={6} xs={12}>
              <Input
                register={register("facilityCountry")}
                label="Organization Country"
                disabled={!edit}
              />
            </Grid>
          </Grid>

          <Box p={2}>
            <BankAccount />
          </Box>
        </>
      )}
      {view === "premium" && <PremiumPayment />}
      <ModalBox
        open={modulesModal}
        onClose={() => setModulesModal(false)}
        header="Organization Modules"
      >
        <OrganizationModules closeModal={() => setModulesModal(false)} />
      </ModalBox>
      <ModalBox
        open={logoUploadModal}
        onClose={() => setLogoUploadModal(false)}
        header="Upload Organization Logo"
      >
        <OrganaizationLogoUpload closeModal={() => setLogoUploadModal(false)} />
      </ModalBox>{" "}
    </Box>
  );
};

export default AdminOrganization;

export const OrganizationModules = ({closeModal}) => {
  const facilityServer = client.service("facility");
  const {control, reset, handleSubmit, setValue} = useForm();
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user, setUser} = useContext(UserContext);

  const modulelist = [
    "Accounting",
    "Admin",
    "Appointments",
    "Appt. Workflow",
    "Blood Bank",
    "Client",
    "Clinic",
    "Communication",
    "Complaints",
    "CRM",
    "Epidemiology",
    "Finance",
    "Immunization",
    "Inventory",
    "Laboratory",
    "Managed Care",
    "Market Place",
    "Patient Portal",
    "Pharmacy",
    "Radiology",
    "Referral",
    "Theatre",
    "Ward",
    "Engagement",
  ];

  const facilityType = user.currentEmployee.facilityDetail.facilityType;

  const selectedType = orgTypeModules.find(item => item.name === facilityType);

  const facilityModules = selectedType ? selectedType.modules : ["Admin"];

  useEffect(() => {
    //hideActionLoader();
    const prevModules = user.currentEmployee.facilityDetail.facilityModules || [
      "Admin",
    ];
    setValue("modules", prevModules);
  }, []);

  const updateModules = async data => {
    showActionLoader();
    const employee = user.currentEmployee;
    const prevOrgDetail = user.currentEmployee.facilityDetail;
    //console.log(prevOrgDetail);

    const newOrgDetail = {
      ...prevOrgDetail,
      updatedAt: dayjs(),
      updatedBy: employee.userId,
      updatedByName: `${employee.firstname} ${employee.lastname}`,
      facilityModules: data.modules,
    };

    //return console.log(newOrgDetail);

    const documentId = prevOrgDetail._id;

    await facilityServer
      .patch(documentId, {...newOrgDetail})
      .then(resp => {
        console.log(resp);
        hideActionLoader();
        setUser(prev => ({
          ...prev,
          currentEmployee: {
            ...prev.currentEmployee,
            facilityDetail: newOrgDetail,
          },
        }));
        toast.success("You've succesfully updated your Organization Modules");
      })
      .catch(error => {
        toast.error(`Error Updating your oragnization modules ${error}`);
        hideActionLoader();
        console.error(error);
      });
  };

  return (
    <Box sx={{width: "60vw"}}>
      <Box>
        <CheckboxGroup
          name="modules"
          control={control}
          options={facilityModules}
          row
        />
      </Box>

      <Box sx={{display: "flex"}} gap={2}>
        <GlobalCustomButton color="error" onClick={closeModal}>
          Cancel
        </GlobalCustomButton>

        <GlobalCustomButton onClick={handleSubmit(updateModules)}>
          Update Modules
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

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

export const OrganaizationLogoUpload = ({closeModal}) => {
  const facilityServer = client.service("facility");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user, setUser} = useContext(UserContext);

  const [file, setFile] = useState(null);

  const handleChange = file => {
    //console.log(file);
    //setFile(file);

    getBase64(file)
      .then(res => {
        //console.log(res);
        setFile(res);
        //navigator.clipboard.writeText(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleUploadLogo = async () => {
    if (file === null) return toast.error("Please select a Logo to upload");
    showActionLoader();
    const token = localStorage.getItem("feathers-jwt");
    axios
      .post(
        "https://healthstack-backend.herokuapp.com/upload",
        {uri: file},
        {headers: {Authorization: `Bearer ${token}`}}
      )
      .then(async res => {
        //return console.log(res);
        console.log(res);
        const logoUrl = res.data.url;
        const employee = user.currentEmployee;
        const prevOrgDetail = user.currentEmployee.facilityDetail;
        //console.log(prevOrgDetail);

        const newOrgDetail = {
          ...prevOrgDetail,
          facilitylogo: logoUrl,
          updatedAt: dayjs(),
          updatedBy: employee.userId,
          updatedByName: `${employee.firstname} ${employee.lastname}`,
        };

        //return console.log(newOrgDetail);
        const documentId = prevOrgDetail._id;

        await facilityServer
          .patch(documentId, {...newOrgDetail})
          .then(resp => {
            hideActionLoader();
            setUser(prev => ({
              ...prev,
              currentEmployee: {
                ...prev.currentEmployee,
                facilityDetail: newOrgDetail,
              },
            }));
            closeModal();
            toast.success("You've succesfully updated your Organization Logo");
          })
          .catch(error => {
            hideActionLoader();
            toast.error(
              `An error occured whilst updating your Organization Logo ${error}`
            );
            console.error(error);
          });
      })
      .catch(error => {
        hideActionLoader();
        toast.error(
          `An error occured whilst updating your Organization Logo ${error}`
        );
        console.log(error);
      });
  };

  return (
    <Box sx={{width: "400px", maxHeight: "80vw"}}>
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
            style={{width: "200px", height: "auto", display: "block"}}
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

        <GlobalCustomButton onClick={handleUploadLogo} disabled={file === null}>
          Upload Logo
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};
