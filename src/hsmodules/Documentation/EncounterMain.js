/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
import {DocumentClassList} from "./DocumentClass";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
//import {useReactToPrint} from "react-to-print";

import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";

import {ChartClassList} from "./DocumentClass";
import EndEncounter, {EndEncounterList} from "./EndEncounter";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {format, formatDistanceToNowStrict} from "date-fns";
import VideoConference from "../utils/VideoConference";
import Prescription, {PrescriptionCreate} from "./Prescription";
import LabOrders from "./LabOrders";
import AdmitOrders from "./AdmitOrders";
import DischargeOrders from "./DischargeOrders";
import RadiologyOrders from "./RadiologyOrders";
import ReactToPrint, {useReactToPrint} from "react-to-print";
import {Box, Collapse, Grid, IconButton, Typography} from "@mui/material";
import Input from "./ui-components/inputs/basic/Input";
import Divider from "@mui/material/Divider";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CustomSelect from "./ui-components/inputs/basic/Select";
import Button from "../../components/buttons/Button";
import MuiButton from "@mui/material/Button";

import Slide from "@mui/material/Slide";

import ViewDocument from "../../components/ReactPDF/ViewDocument";

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
} from "./documents/Documents";
import ModalBox from "../../components/modal";
import EncounterRight from "./EncounterRight";
import {
  BilledOrdersPrintOut,
  DoctorsNotePrintOut,
} from "./print-outs/Print-Outs";

export default function EncounterMain({nopresc, chosenClient}) {
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
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  const [showEncounterModal, setShowEncounterModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showLabModal, setShowLabModal] = useState(false);
  const [showRadModal, setShowRadModal] = useState(false);
  const [showChartModal, setShowChartModal] = useState(false);
  const [showActions, setShowActions] = useState(null);

  const [activateCall, setActivateCall] = useState(false);

  const open = Boolean(showActions);

  const handleShowActions = event => {
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

  const handleCreateNew = async () => {
    const newClinicModule = {
      selectedClinic: {},
      show: "create",
    };
    await setState(prevstate => ({
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
      await setState(prevstate => ({
        ...prevstate,
        NoteModule: newClinicModule,
      }));
      //console.log(state)
      const selectedFacilityId = Clinic._id;

      //console.log(Clinic);

      const newFacilities = await facilities.map(facility => {
        //CHECK IF CURRENT FACILITY IS SELECTED FACILITY
        if (facility._id === selectedFacilityId) {
          //IF CURRENT FACILITY IS CURRENTLY SELECTED, TOGGLE SHOW KEY

          return facility.show
            ? {...facility, show: false}
            : {...facility, show: true};

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
      await setState(prevstate => ({
        ...prevstate,
        DocumentClassModule: newDocumentClassModule,
      }));
    }
  };

  useEffect(() => {
    handleRow(selectedClinic);
  }, [selectedClinic]);

  const handleSearch = val => {
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
      .then(res => {
        console.log(res);
        setFacilities(res.data);
        setMessage(" Clinic  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
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
      /*  if (total>(ulimit)){ //only load if we have not reached the total
                alert("skip:",ulimit )
                console.log("skip:",ulimit ) */
      await setFacilities(findClinic.data);
      console.log(findClinic.data);
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

  const dummyRef = useRef(null);

  const handlePrintDocument = useReactToPrint({
    content: () => {
      return myRefs.current[1];
    },
  });

  // const handlePrintDocument = () => {
  //   console.log(myRefs);
  // };

  const handlePrint = async i => {
    var content = document.getElementById(i);
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();

    console.log("Hello World");
  };
  /*  const handlePrint =(i)=> useReactToPrint({
        content: () => myRefs.current[i]
      }); */

  useEffect(() => {
    getFacilities();

    const newDocumentClassModule = {
      selectedDocumentClass: {},
      //state.DocumentClassModule.selectedDocumentClass.name
      show: "list",
      encounter_right: false,
    };
    setState(prevstate => ({
      ...prevstate,
      DocumentClassModule: newDocumentClassModule,
    }));
    if (user) {
    } else {
    }
    ClinicServ.on("created", obj => getFacilities(page));
    ClinicServ.on("updated", obj => getFacilities(page));
    ClinicServ.on("patched", obj => getFacilities(page));
    ClinicServ.on("removed", obj => getFacilities(page));

    /* var options = {
                    root: null,
                    rootMargin: "20px",
                    threshold: 1.0
                 }; */
    // initialize IntersectionObserver
    // and attaching to Load More div
    /*  const observer = new IntersectionObserver(handleObserver, options);
                 if (loader.current) {
                    observer.observe(loader.current)
                 } */
    return () => {
      const newDocumentClassModule = {
        selectedDocumentClass: {},
        //state.DocumentClassModule.selectedDocumentClass.name
        show: "list",
        encounter_right: false,
      };
      setState(prevstate => ({
        ...prevstate,
        DocumentClassModule: newDocumentClassModule,
      }));
    };
  }, []);

  const handleDelete = doc => {
    // console.log(doc)
    let confirm = window.confirm(
      `You are about to delete a document: ${
        doc.documentname
      } created on ${format(new Date(doc.createdAt), "dd-MM-yy")} ?`
    );
    if (confirm) {
      ClinicServ.remove(doc._id)
        .then(res => {
          toast({
            message: "Adult Asthma Questionnaire deleted succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch(err => {
          toast({
            message: "Error deleting Adult Asthma Questionnaire " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
  };

  const handleCancel = async () => {
    const newDocumentClassModule = {
      selectedEndEncounter: "",
      show: "",
      encounter_right: false,
    };
    await setState(prevstate => ({
      ...prevstate,
      EndEncounterModule: newDocumentClassModule,
    }));
    //console.log(state)
  };

  const DocumentToRender = ({Clinic, index}) => {
    switch (Clinic.documentname.toLowerCase()) {
      case "admission order": {
        return Clinic.status.toLowerCase() !== "draft" ? (
          <AdmissionOrderDocument
            Clinic={Clinic}
            ref={el => (myRefs.current[index] = el)}
          />
        ) : null;
      }
      case "discharge order": {
        return Clinic.status.toLowerCase() !== "draft" ? (
          <DischargeOrderComponent
            Clinic={Clinic}
            ref={el => (myRefs.current[index] = el)}
          />
        ) : null;
      }

      case "medication list": {
        return Clinic.status.toLowerCase() !== "draft" ? (
          <MedicationListDocument
            Clinic={Clinic}
            ref={el => (myRefs.current[index] = el)}
          />
        ) : null;
      }

      case "pediatric pulmonology form": {
        return Clinic.status.toLowerCase() !== "draft" ? (
          <PediatricPulmonologyForm
            Clinic={Clinic}
            ref={el => (myRefs.current[index] = el)}
          />
        ) : null;
      }

      case "adult asthma questionnaire": {
        return Clinic.status.toLowerCase() !== "draft" ? (
          <AdultAthsmaQuestionaire
            Clinic={Clinic}
            ref={el => (myRefs.current[index] = el)}
          />
        ) : null;
      }

      case "prescription":
        return (
          <PrescriptionDocument
            Clinic={Clinic}
            ref={el => (myRefs.current[index] = el)}
          />
        );
      case "radiology orders":
        return (
          <RadiologyOrdersDocument
            Clinic={Clinic}
            ref={el => (myRefs.current[index] = el)}
          />
        );
      case "lab orders":
        return (
          <LabOrdersDocument
            Clinic={Clinic}
            ref={el => (myRefs.current[index] = el)}
          />
        );
      case "billed orders":
        return (
          <BilledOrdersDocument
            Clinic={Clinic}
            ref={el => (myRefs.current[index] = el)}
          />
        );

      default:
        return null;
    }
  };

  const actionsList = [
    {
      title: "Charts",
      action: handleCharts,
      show: !nopresc,
    },
    {
      title: "Radiology",
      action: handleRadOrders,
      show: !nopresc,
    },
    {
      title: "Laboratory",
      action: handleLabOrders,
      show: !nopresc,
    },
    {
      title: "End Encounter",
      action: handleEndEncounter,
      show: !nopresc,
    },
    {
      title: "Prescription",
      action: handleNewPrescription,
      show: !nopresc,
    },
    // {
    //   title: "New Document",
    //   action: handleNewDocument,
    //   show: true,
    // },
  ];

  return (
    <Box
      container
      sx={{
        flexGrow: "1",
      }}
    >
      <ModalBox open={false}>
        <Box sx={{width: "595px", height: "842px", border: "1px solid gray"}}>
          {/* <BilledOrdersPrintOut /> */}
        </Box>
      </ModalBox>
      <Box
        container
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          item
          sx={{
            width: !nopresc
              ? "calc(100% - 350px - 190px)"
              : "calc(100% - 190px)",
          }}
        >
          <Input
            label="Search Documentation"
            className="input is-small "
            type="text"
            minLength={3}
            debounceTimeout={400}
            onChange={e => handleSearch(e.target.value)}
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
              <MuiButton
                sx={{
                  widht: "100%",
                  height: "48px",
                  fontSize: "0.75rem,",
                  textTransform: "capitalize",
                }}
                onClick={() => setActivateCall(false)}
                variant="contained"
                color="error"
              >
                End Teleconsultation
              </MuiButton>
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
          <MuiButton
            variant="contained"
            sx={{
              fontSize: "0.9rem",
              width: "100%",
              minHeight: "48px",
              textTransform: "capitalize",
              backgroundColor: "green",
              "&:hover": {
                backgroundColor: "green",
              },
            }}
            onClick={handleNewDocument}
          >
            New Document
          </MuiButton>
        </Box>

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
              <MuiButton
                onClick={handleShowActions}
                variant="outlined"
                sx={{height: "48px", width: "100%"}}
                aria-controls={showActions ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={showActions ? "true" : undefined}
              >
                Actions <ExpandMoreIcon />
              </MuiButton>

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
                  if (action.show) {
                    return (
                      <MenuItem key={i} onClick={action.action}>
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
                  mb={3}
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
                  key={Clinic._id}
                  id={i}
                >
                  <Box
                    container
                    sx={{
                      width: "100%",
                      minHeight: "50px",
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
                          fontSize: "14px",
                          fontWeight: "500",
                          lineHeight: "19.12px",
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
                          fontSize: "12px",
                          fontWeight: "400",
                          lineHeight: "16.39px",
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
                        width: "calc(100% - 250px)",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                      p={2}
                      onClick={() => setSelectedClinic(Clinic)}
                    >
                      <Typography
                        mr={0.5}
                        sx={{
                          fontSize: "14px",
                          fontWeight: "400",
                          lineHeight: "19.12px",
                          color: "#000000",
                        }}
                      >
                        {Clinic.documentname} by {Clinic.createdByname} at{" "}
                        {Clinic.location},{Clinic.facilityname} -{" "}
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "400",
                            lineHeight: "19.12px",
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
                        width: "100px",
                      }}
                    >
                      <ReactToPrint
                        trigger={() => (
                          <IconButton
                            sx={{
                              color: "#0364FF",
                            }}
                          >
                            <PrintOutlinedIcon />
                          </IconButton>
                        )}
                        content={() => myRefs.current[i]}
                      />

                      <IconButton
                        color="error"
                        onClick={() => handleDelete(Clinic)}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>

                <Collapse in={Clinic.show}>
                  {Clinic.documentname !== "Prescription" &&
                    Clinic.documentname !== "Billed Orders" &&
                    Clinic.documentname !== "Lab Orders" &&
                    Clinic.documentname !== "Radiology Orders" &&
                    Clinic.documentname !== "Adult Asthma Questionnaire" &&
                    Clinic.documentname !== "Medication List" &&
                    Clinic.documentname !== "Admission Order" &&
                    Clinic.documentname !== "Discharge Order" &&
                    Clinic.documentname !== "Pediatric Pulmonology Form" &&
                    Clinic.status !== "Draft" && (
                      <div>
                        <Box sx={{display: "none"}}>
                          <DoctorsNotePrintOut
                            ref={el => (myRefs.current[i] = el)}
                            data={Clinic.documentdetail}
                            Clinic={Clinic}
                          />
                        </Box>
                        {Array.isArray(Clinic.documentdetail) ? (
                          Object.entries(Clinic.documentdetail).map(
                            ([keys, value], i) => (
                              <div className="field is-horizontal">
                                <div className="field-label">
                                  <label className="label is-size-7" key={i}>
                                    {keys}:
                                  </label>
                                </div>
                                <div className="field-body">
                                  <div className="field">{value}</div>
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <div className="field">
                            {Object.entries(Clinic.documentdetail).map(
                              ([keys, value], i) => (
                                <div className="field is-horizontal">
                                  <div className="field-label">
                                    <label className="label is-size-7" key={i}>
                                      {keys}:
                                    </label>
                                  </div>
                                  <div className="field-body">
                                    <div className="field">{value}</div>
                                  </div>
                                </div>
                              )
                            )}
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

        <Slide
          mountOnEnter
          unmountOnExit
          direction="left"
          in={state.DocumentClassModule.encounter_right}
        >
          <Box item sx={{width: "450px"}}>
            <Box
              sx={{
                width: "100%",
                minHeight: "200px",
                border: "1px solid rgba(235, 235, 235, 1)",
                maxHeight: "calc(100vh - 170px)",
                overflowY: "scroll",
                padding: "15px",
              }}
            >
              <EncounterRight client={chosenClient} />
            </Box>
          </Box>
        </Slide>
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
