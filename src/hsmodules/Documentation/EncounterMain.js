/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from "react";
import client from "../../feathers";
import { DebounceInput } from "react-debounce-input";
import { useForm } from "react-hook-form";
import { DocumentClassList } from "./DocumentClass";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import Drawer from "@mui/material/Drawer";

//import {useReactToPrint} from "react-to-print";

import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";

import { ChartClassList } from "./DocumentClass";
import EndEncounter, { EndEncounterList } from "./EndEncounter";
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from "../../context";
import { toast } from "react-toastify";
import { format, formatDistanceToNowStrict } from "date-fns";
import VideoConference from "../utils/VideoConference";
import Prescription, { PrescriptionCreate } from "./Prescription";
import LabOrders from "./LabOrders";
import AdmitOrders from "./AdmitOrders";
import DischargeOrders from "./DischargeOrders";
import RadiologyOrders from "./RadiologyOrders";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { Box, Collapse, Grid, IconButton, Typography } from "@mui/material";
import Input from "../../components/inputs/basic/Input";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";

import Slide from "@mui/material/Slide";

import {
  AdmissionOrderDocument,
  AdultAthsmaQuestionaire,
  BilledOrders,
  DischargeOrderComponent,
  LabOrdersDocument,
  MedicationListDocument,
  PediatricPulmonologyForm,
  PrescriptionDocument,
  RadiologyOrdersDocument,
  BilledOrdersDocument,
  TheatreDocument,
} from "./documents/Documents";
import ModalBox from "../../components/modal";
import EncounterRight from "./EncounterRight";
import {
  BilledOrdersPrintOut,
  DoctorsNotePrintOut,
} from "./print-outs/Print-Outs";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import { AppointmentCreate } from "../Appointment/generalAppointment";
import DocumentationScheduleAppointment from "./ScheduleAppointment";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";
import dayjs from "dayjs";
import CustomTable from "../../components/customtable";

import TheatreRequest, { TheatreCreate } from "./TheatreRequest";
// import TemplateCreate from "../../../src/hsmodules/CRM/components/template";
import TemplateCreate from "../CRM/components/templates/TemplateCreateForDocument";

export default function EncounterMain({ nopresc, chosenClient }) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const ClinicServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedClinic, setSelectedClinic] = useState({}); //
  const [selectedNote, setSelectedNote] = useState();
  // eslint-disable-next-line
  const { state, setState, showActionLoader, hideActionLoader } =
    useContext(ObjectContext);
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  const [showEncounterModal, setShowEncounterModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showLabModal, setShowLabModal] = useState(false);
  const [showRadModal, setShowRadModal] = useState(false);
  const [showChartModal, setShowChartModal] = useState(false);
  const [showActions, setShowActions] = useState(null);
  const [docToDelete, setDocToDelete] = useState(null);
  const [confirmationDialog, setConfirmationDialog] = useState(false);

  const [activateCall, setActivateCall] = useState(false);
  const [showTheatreModal, setShowTheatreModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);

  const open = Boolean(showActions);

  const handleShowActions = (event) => {
    setShowActions(event.currentTarget);
  };
  const handleHideActions = () => {
    setShowActions(null);
  };

  const componentRef = useRef();
  const myRefs = useRef([]);

  // tracking on which page we currently are
  const [page, setPage] = useState(0);
  // add loader refrence
  const loader = useRef(null);

  const standalone = false;

  const handleNewDocument = async () => {
    await setShowModal(true);
    handleHideActions();
  };

  const handleNewPrescription = async () => {
    await setShowPrescriptionModal(true);
    handleHideActions();
  };

  const handleNewTheatre = async () => {
    await setShowTheatreModal(true);
    handleHideActions();
  };

  const handleCreateNew = async () => {
    const newClinicModule = {
      selectedClinic: {},
      show: "create",
    };
    await setState((prevstate) => ({
      ...prevstate,
      ClinicModule: newClinicModule,
    }));
    //console.log(state)
  };

  const handleRow = async (Clinic, i) => {
    //console.log("b4",state)
    // alert(i)
    //console.log("handlerow", Clinic);
    if (Clinic.status === "completed" || Clinic.status === "Final") {
      await setSelectedNote(Clinic);

      const newClinicModule = {
        selectedNote: Clinic,
        show: true,
      };
      await setState((prevstate) => ({
        ...prevstate,
        NoteModule: newClinicModule,
      }));
      //console.log(state)
      const selectedFacilityId = Clinic._id;

      //console.log(Clinic);

      const newFacilities = await facilities.map((facility) => {
        //CHECK IF CURRENT FACILITY IS SELECTED FACILITY
        if (facility._id === selectedFacilityId) {
          //IF CURRENT FACILITY IS CURRENTLY SELECTED, TOGGLE SHOW KEY

          return facility.show
            ? { ...facility, show: false }
            : { ...facility, show: true };

          //return ;
        } else {
          //IF CURRENT FACILITY IS NOT CURRENTLY SELECTED, RETURN FACILITY AS IT IS
          return facility;
        }
      });

      //SET OLD FACILITIES ARRAY TO NEW ONE WITH UPDATE SHOW STATE
      await setFacilities(newFacilities);
      // Clinic.show=!Clinic.show

      //
    } else {
      let documentobj = {};
      documentobj.name = Clinic.documentname;
      documentobj.facility = Clinic.facility;
      documentobj.document = Clinic;
      //  alert("I am in draft mode : " + Clinic.documentname)
      const newDocumentClassModule = {
        selectedDocumentClass: documentobj,
        //state.DocumentClassModule.selectedDocumentClass.name
        show: "detail",
        encounter_right: true,
      };
      await setState((prevstate) => ({
        ...prevstate,
        DocumentClassModule: newDocumentClassModule,
      }));
    }
  };

  useEffect(() => {
    handleRow(selectedClinic);
  }, [selectedClinic]);

  const handleSearch = (val) => {
    const field = "documentname";
    console.log(val);
    ClinicServ.find({
      query: {
        [field]: {
          $regex: val,
          $options: "i",
        },
        // facility:user.currentEmployee.facilityDetail._id || "",
        // locationType:"Clinic",
        client: state.ClientModule.selectedClient._id,
        $limit: 50,
        $sort: {
          name: 1,
        },
      },
    })
      .then((res) => {
        // console.log(res);

        // const responseData = res.data;
        // const newdocumentDetail = responseData.client.documentDetail.map(
        //   ({ diagnosis, ...rest }) => rest
        // );

        // responseData.client.documentDetail = newdocumentDetail;
        console.log("====>>>>> responseData", { responseData: res.data });
        setFacilities(res.data);
        setMessage(" Clinic  fetched successfully");
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setMessage("Error fetching Clinic, probable network issues " + err);
        setError(true);
      });
  };

  const getFacilities = async (page = 0) => {
    /* const limit=20
            alert(page) */
    if (user.currentEmployee) {
      const findClinic = await ClinicServ.find({
        query: {
          //locationType:"Clinic",
          //facility:user.currentEmployee.facilityDetail._id,
          client: state.ClientModule.selectedClient._id,
          $limit: 50,
          /*  $skip:page*limit, */
          $sort: {
            createdAt: -1,
          },
        },
      });
      const total = findClinic.total;
      const ulimit = total * page;

      const responseData = findClinic.data;

      // const updatedResponseData = responseData.map((item) => {
      //   // Create a copy of the object
      //   const updatedItem = { ...item };

      //   // Check if the "documentdetail" key exists and if it has a "diagnosis" key
      //   if (
      //     updatedItem.documentdetail &&
      //     updatedItem.documentdetail.diagnosis
      //   ) {
      //     // Remove the "diagnosis" key from the "documentdetail" object
      //     delete updatedItem.documentdetail.diagnosis;
      //   }

      //   return updatedItem;
      // });

      console.log("====>>>>> findClinic.data updatedResponseData", {
        // updatedResponseData,
        responseData: findClinic.data,
        // newdocumentDetail,
      });

      const sampleData = {
        clinic: "holy",
        id: "237",
        diagonsis: [
          {
            id: 1,
            name: "ona",
            age: 20,
          },
          {
            id: 2,
            name: "fran",
            age: 22,
          },
        ],
      };

      await setFacilities(findClinic.data);
      //console.log(findClinic.data);
      /*  } */
    } else {
      if (user.stacker) {
        const findClinic = await ClinicServ.find({
          query: {
            client: state.ClientModule.selectedClient._id,
            $limit: 20,
            $sort: {
              createdAt: -1,
            },
          },
        });

        await setFacilities(findClinic.data);
      }
    }
  };

  const handleLabOrders = async () => {
    await setShowLabModal(true);
    handleHideActions();
  };

  const handleCharts = async () => {
    await setShowChartModal(true);
    handleHideActions();
  };

  const handleOtherOrders = async () => {
    // await setShowLabModal(true)
  };

  const handleRadOrders = async () => {
    await setShowRadModal(true);
    handleHideActions();
  };

  const handleEndEncounter = async () => {
    await setShowEncounterModal(true);
    handleHideActions();
  };

  const handleUploadDocument = async () => {
    await setUploadModal(true);
    handleHideActions();
  };

  useEffect(() => {
    getFacilities();

    const newDocumentClassModule = {
      selectedDocumentClass: {},
      //state.DocumentClassModule.selectedDocumentClass.name
      show: "list",
      encounter_right: false,
    };
    setState((prevstate) => ({
      ...prevstate,
      DocumentClassModule: newDocumentClassModule,
    }));
    if (user) {
    } else {
    }
    ClinicServ.on("created", (obj) => getFacilities(page));
    ClinicServ.on("updated", (obj) => getFacilities(page));
    ClinicServ.on("patched", (obj) => getFacilities(page));
    ClinicServ.on("removed", (obj) => getFacilities(page));

    return () => {
      const newDocumentClassModule = {
        selectedDocumentClass: {},
        //state.DocumentClassModule.selectedDocumentClass.name
        show: "list",
        encounter_right: false,
      };
      setState((prevstate) => ({
        ...prevstate,
        DocumentClassModule: newDocumentClassModule,
      }));
    };
  }, []);

  const handleDelete = (doc) => {
    showActionLoader();
    ClinicServ.remove(docToDelete._id)
      .then((res) => {
        hideActionLoader();
        toast.success(`${docToDelete?.documentname} Deleted succesfully`);
        setSuccess(false);
        setConfirmationDialog(false);
      })
      .catch((err) => {
        hideActionLoader();
        toast.error("Error deleting Adult Asthma Questionnaire " + err);
      });
    // }
  };

  const handleConfirmDelete = (doc) => {
    if (!user?.currentEmployee?.roles?.includes("Delete Documents"))
      return toast.error("You don't have permission to delete Documents");

    setDocToDelete(doc);
    setConfirmationDialog(true);
  };

  const closeConfirmationDialog = () => {
    setDocToDelete(null);
    setConfirmationDialog(false);
  };

  const handleCancel = async () => {
    const newDocumentClassModule = {
      selectedEndEncounter: "",
      show: "",
      encounter_right: false,
    };
    await setState((prevstate) => ({
      ...prevstate,
      EndEncounterModule: newDocumentClassModule,
    }));
    //console.log(state)
  };

  const DocumentToRender = ({ Clinic, index }) => {
    switch (Clinic.documentname.toLowerCase()) {
      case "admission order": {
        return Clinic.status.toLowerCase() !== "draft" ? (
          <AdmissionOrderDocument
            Clinic={Clinic}
            ref={(el) => (myRefs.current[index] = el)}
          />
        ) : null;
      }
      case "discharge order": {
        return Clinic.status.toLowerCase() !== "draft" ? (
          <DischargeOrderComponent
            Clinic={Clinic}
            ref={(el) => (myRefs.current[index] = el)}
          />
        ) : null;
      }

      case "medication list": {
        return Clinic.status.toLowerCase() !== "draft" ? (
          <MedicationListDocument
            Clinic={Clinic}
            ref={(el) => (myRefs.current[index] = el)}
          />
        ) : null;
      }

      case "pediatric pulmonology form": {
        return Clinic.status.toLowerCase() !== "draft" ? (
          <PediatricPulmonologyForm
            Clinic={Clinic}
            ref={(el) => (myRefs.current[index] = el)}
          />
        ) : null;
      }

      case "adult asthma questionnaire": {
        return Clinic.status.toLowerCase() !== "draft" ? (
          <AdultAthsmaQuestionaire
            Clinic={Clinic}
            ref={(el) => (myRefs.current[index] = el)}
          />
        ) : null;
      }

      case "prescription":
        return (
          <PrescriptionDocument
            Clinic={Clinic}
            ref={(el) => (myRefs.current[index] = el)}
          />
        );

      case "theatre orders":
        return (
          <TheatreDocument
            Clinic={Clinic}
            ref={(el) => (myRefs.current[index] = el)}
          />
        );
      case "radiology orders":
        return (
          <RadiologyOrdersDocument
            Clinic={Clinic}
            ref={(el) => (myRefs.current[index] = el)}
          />
        );
      case "lab orders":
        return (
          <LabOrdersDocument
            Clinic={Clinic}
            ref={(el) => (myRefs.current[index] = el)}
          />
        );
      case "billed orders":
        return (
          <BilledOrdersDocument
            Clinic={Clinic}
            ref={(el) => (myRefs.current[index] = el)}
          />
        );

      default:
        return null;
    }
  };
  const prevRoles = user.currentEmployee.roles;

  const actionsList = [
    {
      title: "Charts",
      action: handleCharts,
      show: !nopresc,
    },
    {
      title: "Radiology Request",
      action: handleRadOrders,
      show: !nopresc,
    },
    {
      title: "Laboratory Request",
      action: handleLabOrders,
      show: !nopresc,
    },
    {
      title: "Prescription Request",
      action: handleNewPrescription,
      show: !nopresc,
    },
    {
      title: "Theatre Request",
      action: handleNewTheatre,
      show: !nopresc,
    },
    {
      title: "End Encounter",
      action: handleEndEncounter,
      show: !nopresc,
    },
    {
      title: "Upload New Document",
      action: handleUploadDocument,
      show: !nopresc,
    },
    // {
    //   title: "New Document",
    //   action: handleNewDocument,
    //   show: true,
    // },Upload New Document
  ];

  const diagnosisTableColumns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Type",
      key: "sn",
      description: "SN",
      selector: (row, i) => row.type,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Diagnosis",
      key: "sn",
      description: "SN",
      selector: (row, i) => row.diagnosis,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "ICD 11 Code",
      key: "sn",
      description: "SN",
      selector: (row, i) => row.Code,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "ICD11 Diagnosis",
      key: "sn",
      description: "SN",
      selector: (row, i) => row.Title,
      sortable: true,
      inputType: "HIDDEN",
    },
  ];
  return (
    <Box
      container
      sx={{
        flexGrow: "1",
      }}
    >
      <ModalBox
        open={uploadModal}
        onClose={() => setUploadModal(false)}
        header="Upload New Document"
      >
        <TemplateCreate closeModal={() => setUploadModal(false)} />
      </ModalBox>

      <CustomConfirmationDialog
        open={confirmationDialog}
        confirmationAction={() => handleDelete(docToDelete)}
        cancelAction={closeConfirmationDialog}
        type="danger"
        message={`You are about to delete a document: ${
          docToDelete?.documentname
        } created on ${dayjs(docToDelete?.createdAt).format("DD-MM-YYYY")} ?`}
      />
      <Box
        container
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        mb={2}
      >
        <Box
          item
          sx={{
            width: !nopresc
              ? "calc(100% - 350px - 180px)"
              : "calc(100% - 180px)",
          }}
        >
          <Input
            label="Search Documentation"
            className="input is-small "
            type="text"
            minLength={3}
            debounceTimeout={400}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Box>

        {!nopresc && (
          <Box
            container
            sx={{
              width: "180px",
            }}
          >
            {activateCall && (
              <GlobalCustomButton
                sx={{
                  width: "100%",
                }}
                onClick={() => setActivateCall(false)}
                color="error"
              >
                End Teleconsultation
              </GlobalCustomButton>
            )}

            <VideoConference
              activateCall={activateCall}
              setActivateCall={setActivateCall}
            />
          </Box>
        )}

        <Box
          sx={{
            width: "180px",
          }}
        >
          <GlobalCustomButton
            color="secondary"
            sx={{
              width: "100%",
            }}
            onClick={handleNewDocument}
          >
            New Document
          </GlobalCustomButton>
        </Box>

        {/* <Button
          variant="contained"
          size="small"
          sx={{textTransform: "capitalize"}}
          onClick={openCreateModal}
        >
          <AddCircleOutlineOutlinedIcon sx={{mr: "5px"}} fontSize="small" />
          Upload New Template
        </Button> */}

        {!nopresc && (
          <Box
            item
            sx={{
              width: "140px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                width: "100%",
              }}
            >
              <GlobalCustomButton
                onClick={handleShowActions}
                variant="contained"
                sx={{
                  width: "100%",
                }}
                aria-controls={showActions ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={showActions ? "true" : undefined}
              >
                Actions <ExpandMoreIcon />
              </GlobalCustomButton>

              <Menu
                id="basic-menu"
                anchorEl={showActions}
                open={open}
                onClose={handleHideActions}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {actionsList.map((action, i) => {
                  // && prevRoles.includes(action.title)
                  if (action.show) {
                    return (
                      <MenuItem
                        key={i}
                        onClick={action.action}
                        sx={{ fontSize: "0.8rem" }}
                      >
                        {action.title}
                      </MenuItem>
                    );
                  }
                })}
              </Menu>
            </div>
          </Box>
        )}
      </Box>

      <Box
        container
        spacing={1}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          item
          sx={{
            width: !state.DocumentClassModule.encounter_right
              ? "100%"
              : "calc(100% - 465px)",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              width: "100%",
              height: "calc(100vh - 180px)",
              overflowY: "scroll",
            }}
          >
            {facilities.map((Clinic, i) => (
              <>
                <Box
                  mb={1}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flexGrow: 1,
                    width: "100%",
                    cursor: "pointer",
                    border: "1px solid rgba(235, 235, 235, 1)",
                    borderRadius: "5px",
                    height: "auto",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  }}
                  key={i}
                  id={i}
                >
                  <Box
                    container
                    sx={{
                      width: "100%",
                      minHeight: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "#ffffff",
                      position: "relative",
                    }}
                  >
                    <Box
                      item
                      //xs={2}
                      sx={{
                        borderRight: "1px solid rgba(235, 235, 235, 1)",
                        width: "150px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      onClick={() => setSelectedClinic(Clinic)}
                    >
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: "500",
                          //lineHeight: "19.12px",
                          color: "#000000",
                        }}
                      >
                        {formatDistanceToNowStrict(new Date(Clinic.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                      <span
                        style={{
                          color: "#2d2d2d",
                          fontSize: "0.7rem",
                          fontWeight: "400",
                          // lineHeight: "16.39px",
                        }}
                      >
                        {format(
                          new Date(Clinic.createdAt),
                          "dd-MM-yy HH:mm:ss"
                        )}
                      </span>

                      <span />
                    </Box>

                    <Box
                      item
                      sx={{
                        display: "flex",
                        width: "calc(100% - 230px)",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                      p={0.5}
                      onClick={() => setSelectedClinic(Clinic)}
                    >
                      <Typography
                        mr={0.5}
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: "400",
                          // lineHeight: "19.12px",
                          color: "#000000",
                        }}
                      >
                        {/* heree */}
                        {Clinic.documentname} by {Clinic.createdByname} at{" "}
                        {Clinic.location},{Clinic.facilityname} -{" "}
                        <Typography
                          sx={{
                            fontSize: "0.75rem",
                            fontWeight: "400",
                            //lineHeight: "19.12px",
                            ///color: "orange",
                            color: `${
                              Clinic.status === "completed" ? "green" : "orange"
                            }`,
                          }}
                        >
                          {Clinic.status}
                        </Typography>
                      </Typography>
                    </Box>

                    <Box
                      item
                      sx={{
                        width: "80px",
                      }}
                    >
                      <ReactToPrint
                        trigger={() => (
                          <IconButton
                            sx={{
                              color: "#0364FF",
                            }}
                          >
                            <PrintOutlinedIcon fontSize="small" />
                          </IconButton>
                        )}
                        content={() => myRefs.current[i]}
                      />
                      {user?.currentEmployee?.roles?.includes(
                        "Delete Documents"
                      ) && (
                        <IconButton
                          color="error"
                          onClick={() => handleConfirmDelete(Clinic)}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                </Box>

                <Collapse in={Clinic.show}>
                  {Clinic.documentname !== "Prescription" &&
                    Clinic.documentname !== "Billed Orders" &&
                    Clinic.documentname !== "Theatre Orders" &&
                    Clinic.documentname !== "Lab Orders" &&
                    Clinic.documentname !== "Radiology Orders" &&
                    Clinic.documentname !== "Adult Asthma Questionnaire" &&
                    Clinic.documentname !== "Medication List" &&
                    Clinic.documentname !== "Admission Order" &&
                    Clinic.documentname !== "Discharge Order" &&
                    Clinic.documentname !== "Pediatric Pulmonology Form" &&
                    Clinic.status !== "Draft" && (
                      <div>
                        <Box sx={{ display: "none" }}>
                          <DoctorsNotePrintOut
                            ref={(el) => (myRefs.current[i] = el)}
                            data={Clinic.documentdetail}
                            Clinic={Clinic}
                          />
                        </Box>
                        {Array.isArray(Clinic.documentdetail) ? (
                          Object.entries(Clinic.documentdetail).map(
                            ([keys, value], i) => {
                              return (
                                <>
                                  <Box
                                    sx={{ height: "auto", width: "100%" }}
                                    key={i}
                                  >
                                    <Grid container spacing={2}>
                                      <Grid item xs={12}>
                                        <Box sx={{ display: "flex" }}>
                                          <Typography
                                            sx={{
                                              fontSize: "0.75rem",
                                              fontWeight: "600",
                                              color: "#03045e",
                                              marginRight: "5px",
                                            }}
                                          >
                                            {keys}:
                                          </Typography>

                                          <Typography
                                            sx={{
                                              fontSize: "0.75rem",
                                              color: "#000000",
                                            }}
                                          >
                                            {value}
                                          </Typography>
                                        </Box>
                                      </Grid>
                                    </Grid>
                                  </Box>
                                </>
                              );
                            }
                          )
                        ) : (
                          <div className="field">
                            <table
                              style={{
                                width: "100%",
                                borderCollapse: "collapse",
                              }}
                            >
                              <thead>
                                <tr>
                                  <th
                                    style={{
                                      backgroundColor: "#0E305D",
                                      color: "#ffffff",
                                      padding: "10px",
                                      textAlign: "left",
                                      fontSize: 14,
                                    }}
                                  >
                                    Document Field
                                  </th>
                                  <th
                                    style={{
                                      backgroundColor: " #0E305D",
                                      color: "#ffffff",
                                      padding: "10px",
                                      textAlign: "left",
                                      fontSize: 14,
                                    }}
                                  >
                                    Field Values
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {Object.entries(Clinic.documentdetail).map(
                                  ([keys, value], i) => {
                                    if (
                                      value === "" ||
                                      value === undefined ||
                                      value === null ||
                                      keys === "DocumentUploadUrl"
                                    ) {
                                      return null; // Skip rendering for arrays
                                    }
                                    return (
                                      <tr key={i}>
                                        <td
                                          style={{
                                            border: "1px solid #e0e0e0",
                                            padding: "10px",
                                            fontSize: 14,
                                          }}
                                        >
                                          {keys}
                                        </td>
                                        <td
                                          style={{
                                            border: "1px solid #e0e0e0",
                                            padding: "10px",
                                            fontSize: 13,
                                          }}
                                        >
                                          {keys === "diagnosis" &&
                                          Array.isArray(value) ? (
                                            // Render a table for "diagnosis" array
                                            // <h1>test</h1>
                                            <Box>
                                              <CustomTable
                                                title={""}
                                                columns={diagnosisTableColumns}
                                                data={value}
                                                pointerOnHover
                                                highlightOnHover
                                                striped
                                                //onRowClicked={handleRow}
                                                //conditionalRowStyles={conditionalRowStyles}
                                                progressPending={false}
                                                CustomEmptyData={
                                                  <Typography
                                                    sx={{ fontSize: "0.8rem" }}
                                                  >
                                                    You've not added a Diagnosis
                                                    yet...
                                                  </Typography>
                                                }
                                              />
                                            </Box>
                                          ) : // Render the regular value
                                          value instanceof Object ? (
                                            JSON.stringify(value)
                                          ) : (
                                            keys!=="File"?
                                            value:(<a href={Clinic.documentdetail.DocumentUploadUrl} target="_blank">{value}</a>)
                                          )}
                                        </td>

                                        {/* <td
                                          style={{
                                            border: "1px solid #e0e0e0",
                                            padding: "10px",
                                            fontSize: 13,
                                          }}
                                        >
                                          {keys === "diagnosis" &&
                                          Array.isArray(value) ? (
                                            // Render a table for "diagonsis" array
                                            // <table
                                            //   style={{
                                            //     width: "100%",
                                            //     borderCollapse: "collapse",
                                            //   }}
                                            // >
                                            //   <thead>
                                            //     <tr>
                                            //       <th>Name</th>
                                            //       <th>Age</th>
                                            //     </tr>
                                            //   </thead>
                                            //   <tbody>
                                            //     {value.map((diagnosisItem, k) => (
                                            //       <tr key={k}>
                                            //         <td>{diagnosisItem.name}</td>
                                            //         <td>{diagnosisItem.age}</td>
                                            //       </tr>
                                            //     ))}
                                            //   </tbody>
                                            // </table>
                                            <h1>hello</h1>
                                          ) : (
                                            // Render the regular value
                                            { value }
                                          )}
                                        </td> */}
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}

                  <DocumentToRender Clinic={Clinic} index={i} />
                </Collapse>
              </>
            ))}
          </Box>
        </Box>
        <Drawer
          anchor={"right"}
          open={state.DocumentClassModule.encounter_right}
          onClose={() => {
            setState((prev) => ({
              ...prev,
              DocumentClassModule: {
                ...prev.DocumentClassModule,
                encounter_right: false,
              },
            }));
          }}
        >
          <Box item sx={{ width: "650px" }}>
            <Box
              sx={{
                width: "100%",

                //border: "1px solid rgba(235, 235, 235, 1)",
                //maxHeight: "calc(100vh - 170px)",
                overflowY: "scroll",
                padding: "15px",
              }}
            >
              <EncounterRight client={chosenClient} />
            </Box>
          </Box>
        </Drawer>
        {/* </Slide> */}
      </Box>

      <>
        <ModalBox
          open={showModal}
          onClose={() => setShowModal(false)}
          header="Choose Document Class"
        >
          <DocumentClassList
            standalone="true"
            closeModal={() => setShowModal(false)}
          />
        </ModalBox>

        <ModalBox
          open={showChartModal}
          onClose={() => setShowChartModal(false)}
          header="Choose Chart"
        >
          <ChartClassList
            standalone="true"
            closeModal={() => setShowChartModal(false)}
          />
        </ModalBox>

        <ModalBox
          open={showPrescriptionModal}
          onClose={() => setShowPrescriptionModal(false)}
          header="Prescription"
        >
          <Prescription standalone="true" />
        </ModalBox>

        <ModalBox
          open={showTheatreModal}
          onClose={() => setShowTheatreModal(false)}
          header="Theatre"
        >
          <TheatreRequest standalone="true" />
        </ModalBox>

        <ModalBox
          open={showLabModal}
          onClose={() => setShowLabModal(false)}
          header="Laboratory Orders"
        >
          <LabOrders
            standalone="true"
            closeModal={() => setShowLabModal(false)}
          />
        </ModalBox>

        <ModalBox
          open={showEncounterModal}
          onClose={() => setShowEncounterModal(false)}
          header="End Encounter"
        >
          <EndEncounterList
            standalone="true"
            closeModal={() => setShowEncounterModal(false)}
          />
        </ModalBox>

        <ModalBox
          open={
            state.EndEncounterModule.selectedEndEncounter === "Admit to Ward"
          }
          onClose={() => handleCancel()}
          header="Admit Orders"
        >
          <section className="modal-card-body card-overflow">
            <AdmitOrders standalone="true" closeModal={() => handleCancel()} />
          </section>
        </ModalBox>

        <ModalBox
          open={state.EndEncounterModule.selectedEndEncounter === "Discharge"}
          onClose={() => handleCancel()}
          header="Discharge Orders"
        >
          <DischargeOrders
            standalone="true"
            closeModal={() => handleCancel()}
          />
        </ModalBox>

        <ModalBox
          open={
            state.EndEncounterModule.selectedEndEncounter ===
            "Set Next Appointment"
          }
          onClose={() => handleCancel()}
          header="Set Next Appointment"
        >
          <DocumentationScheduleAppointment />
        </ModalBox>

        <ModalBox
          open={showRadModal}
          onClose={() => setShowRadModal(false)}
          header="Radiology Orders"
        >
          <RadiologyOrders
            standalone="true"
            closeModal={() => setShowRadModal(false)}
          />
        </ModalBox>
      </>
    </Box>
  );
}
