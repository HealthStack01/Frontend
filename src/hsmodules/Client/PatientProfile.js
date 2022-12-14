/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import "./styles/index.scss";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {formatDistanceToNowStrict} from "date-fns";
import VideoConference from "../utils/VideoConference";

import {ClientAccount} from "../Finance/Collections";

// Demo styles, see 'Styles' section below for some notes on use.

import {DrugAdminList} from "../Documentation/Prescription";
import BillServiceCreate from "../Finance/BillServiceCreate";
import ModalBox from "../../components/modal";
import Button from "../../components/buttons/Button";
import {Box} from "@mui/system";
import ClientLastVisit from "./ClientVisitationHistory";
import ClientTasks from "./ClientTasks";
import ClientHistory from "./ClientHistory";
import ClientIntolerance from "./ClientIntolerance";
import ClientBilling from "./ClientBilling";
import ClientProblems from "./ClientProblems";
import ClientDiagnoisHistory from "./ClientDiagnoisHistory";
import MedicalProfile from "./MedicalProfile";
import {Card, Button as MuiButton} from "@mui/material";
import GlobalCustomButton from "../../components/buttons/CustomButton";

export default function PatientProfile() {
  const {state} = useContext(ObjectContext); //,setState
  const {user, setUser} = useContext(UserContext);
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [billingModal, setBillingModal] = useState(false);
  const [medicationModal, setMedicationModal] = useState(false);
  const [visitModal, setVisitModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);
  const [intoleranceModal, setIntoleranceModal] = useState(false);
  const [problemModal, setProblemModal] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [diagnoisHistoryModal, setDiagnoisHistory] = useState(false);
  const [medicalProfile, setMedicalProfileModel] = useState(false);
  const [accountModal, setAccountModal] = useState(false);
  const client = state.ClientModule.selectedClient;
  const {
    firstname,
    middlename,
    lastname,
    dob,
    gender,
    maritalstatus,
    religion,
    phone,
    email,
    profession,

    nok_name,
    nok_phoneno,
    nok_email,
    nok_relationship,
    bloodgroup,
    genotype,
    disabilities,
    specificDetails,
    clientTags,
    mrn,
    address,
    city,
    lga,
    //state,
    country,
    allergies,
    comorbidities,
    paymentinfo,
  } = state.ClientModule.selectedClient;

  /*   const {
        cash,
        cashDetails,
        familycover,
        familyDetails,
        companycover,
        companyDetails,
        hmocover,
        hmoDetails
        } =state.ClientModule.selectedClient.paymentinfo */

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    setSelectedClient(state.ClientModule.selectedClient);
    /*  console.log(client)
        console.log(selectedClient) */
    return () => {};
  });

  const handlecloseModal1 = () => {
    setBillingModal(false);
  };
  const handlecloseModal2 = () => {
    setMedicationModal(false);
  };

  const showBilling = () => {
    setBillingModal(true);
    //navigate('/app/finance/billservice')
  };

  const handleOpenClientAccount = () => {
    setAccountModal(true);
  };

  const profileButtons = [
    {
      title: "Client History",
      action: () => setVisitModal(true),
    },
    {
      title: "Drug Intolerance",
      action: () => setIntoleranceModal(true),
    },
    {
      title: "Medications",
      action: () => setMedicationModal(true),
    },
    {
      title: "History",
      action: () => setHistoryModal(true),
    },
    {
      title: "Problem List",
      action: () => setProblemModal(true),
    },
    {
      title: "Task",
      action: () => setTaskModal(true),
    },

    {
      title: "Diagnosis History",
      action: () => setDiagnoisHistory(true),
    },
  ];

  return (
    <div>
      <div className="patient-profile-container">
        <Card>
          <div className="patient-profile-card">
            <div className="user-information-top-section">
              <div className="user-profile-information">
                <div className="user-image-container">
                  <img
                    src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                    alt=""
                  />
                </div>

                <div className="user-infromation-container">
                  <h1>
                    {firstname} {middlename} {lastname}
                  </h1>
                  <div className="user-outline">
                    <span>
                      <time dateTime="2016-1-1">
                        {dob && formatDistanceToNowStrict(new Date(dob))}
                      </time>{" "}
                      {gender} {maritalstatus} {religion} {profession}
                      <br />
                      {bloodgroup} {genotype} <br />
                      <strong> {clientTags}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="patient-profile-action-buttons-container">
              {user.currentEmployee?.roles.includes("Bill Client") ||
                user.currentEmployee?.roles.length === 0 ||
                (user.stacker && (
                  <MuiButton
                    sx={{
                      backgroundColor: "#4F772D",
                      color: "#ffffff",
                      fontSize: "0.8rem",
                      textTransform: "capitalize",
                      width: "45%",
                      "&:hover": {
                        backgroundColor: "#4F772D",
                      },
                    }}
                    onClick={showBilling}
                  >
                    Bill Client
                  </MuiButton>
                ))}

              <GlobalCustomButton
                sx={{
                  backgroundColor: "#4F772D",
                  color: "#ffffff",
                  fontSize: "0.8rem",
                  textTransform: "capitalize",
                  width: "45%",
                  "&:hover": {
                    backgroundColor: "#4F772D",
                  },
                }}
                onClick={showBilling}
              >
                Bill Client
              </GlobalCustomButton>

              <GlobalCustomButton
                variant="contained"
                sx={{textTransform: "capitalize", width: "45%"}}
                onClick={handleOpenClientAccount}
              >
                Account
              </GlobalCustomButton>
            </div>

            <div className="horizontal-dotted-line" />

            <div className="user-information-bottom-container">
              <div className="each-bottom-section">
                <span style={{fontWeight: "600"}}>Specific Instructions:</span>
                <span>{specificDetails}</span>
              </div>

              <div className="each-bottom-section">
                <span style={{fontWeight: "600"}}>Allergies:</span>
                <span>{allergies}</span>
              </div>

              <div className="each-bottom-section">
                <span style={{fontWeight: "600"}}>Co-morbidities:</span>
                <span>{comorbidities}</span>
              </div>

              <div className="each-bottom-section">
                <span style={{fontWeight: "600"}}>Disabilities:</span>
                <span>{disabilities}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="action-buttons-container">
            {profileButtons.map((item, i) => (
              <div onClick={item.action}>
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ******************************************* BILLING ********************************************** */}

      <ModalBox
        open={billingModal}
        onClose={() => setBillingModal(false)}
        header="Client Billing"
      >
        <BillServiceCreate closeModal={() => setBillingModal(false)} />
      </ModalBox>

      {/* ******************************************* MEDICATION ********************************************** */}
      <ModalBox
        open={medicationModal}
        onClose={() => setMedicationModal(false)}
        header="Client Medications"
      >
        <DrugAdminList
          standalone="true"
          onCloseModal={() => setMedicationModal(false)}
        />
      </ModalBox>

      {/* ******************************************* TASKS ********************************************** */}

      <ModalBox
        open={taskModal}
        onClose={() => setTaskModal(false)}
        header="Tasks"
      >
        <ClientTasks closeModal={() => setTaskModal(false)} />
      </ModalBox>

      {/* ******************************************* PROBLEM ********************************************** */}

      <ModalBox
        open={problemModal}
        onClose={() => setProblemModal(false)}
        header="Problem List"
      >
        <ClientProblems closeModal={() => setProblemModal(false)} />
      </ModalBox>

      {/* ******************************************* HISTORY ********************************************** */}

      <ModalBox
        open={historyModal}
        onClose={() => setHistoryModal(false)}
        header="Client History"
      >
        <ClientHistory closeModal={() => setHistoryModal(false)} />
      </ModalBox>

      {/* ******************************************* INTOLERANCE ********************************************** */}

      <ModalBox
        open={intoleranceModal}
        onClose={() => setIntoleranceModal(false)}
        header="Drug Intolerance"
      >
        <ClientIntolerance closeModal={() => setIntoleranceModal(false)} />
      </ModalBox>

      {/* ******************************************* LAST VIST ********************************************** */}

      <ModalBox
        open={accountModal}
        onClose={() => setAccountModal(false)}
        header="Account Details"
      >
        <Box
          sx={{
            width: "85vw",
            maxHeight: "80vh",
          }}
        >
          <ClientAccount
            closeModal={() => setAccountModal(false)}
            isModal={true}
          />
        </Box>
      </ModalBox>

      <ModalBox
        open={visitModal}
        onClose={() => setVisitModal(false)}
        header="Appointment History"
        height="100%"
      >
        <ClientLastVisit closeModal={() => setVisitModal(false)} />
      </ModalBox>

      <ModalBox
        open={diagnoisHistoryModal}
        onClose={() => setDiagnoisHistory(false)}
        header="Diagnosis History"
      >
        <ClientDiagnoisHistory closeModal={() => setDiagnoisHistory(false)} />
      </ModalBox>
    </div>
  );
}
