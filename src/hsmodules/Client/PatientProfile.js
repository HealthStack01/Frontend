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

// Demo styles, see 'Styles' section below for some notes on use.

import {DrugAdminList} from "../Documentation/Prescription";
import BillServiceCreate from "../Finance/BillServiceCreate";
import ModalBox from "../../components/modal";
import Button from "../../components/buttons/Button";
import {Box} from "@mui/system";

import ClientLastVisit from "./ClientLastVisit";
import ClientTasks from "./ClientTasks";
import ClientHistory from "./ClientHistory";
import ClientIntolerance from "./ClientIntolerance";
import ClientBilling from "./ClientBilling";
import ClientProblems from "./ClientProblems";
import {Card} from "@mui/material";

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

  const profileButtons = [
    {
      title: "Last Visit",
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

              {user.currentEmployee?.roles.includes("Bill Client") ||
                user.currentEmployee?.roles.length === 0 ||
                (user.stacker && (
                  <Button
                    style={{
                      backgroundColor: "#4F772D",
                      color: "#ffffff",
                      fontSize: "0.8rem",
                      width: "30%",
                    }}
                    onClick={showBilling}
                  >
                    Bill Client
                  </Button>
                ))}

              <Button
                style={{
                  backgroundColor: "#4F772D",
                  color: "#ffffff",
                  fontSize: "0.8rem",
                  width: "30%",
                }}
                onClick={showBilling}
              >
                Bill Client
              </Button>
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
        <ClientBilling closeModal={() => setBillingModal(false)} />
      </ModalBox>

      {/* ******************************************* MEDICATION ********************************************** */}
      <ModalBox
        open={medicationModal}
        onClose={() => setMedicationModal(false)}
        header="Client Medications"
      >
        <Box sx={{width: "95vw"}}>
        <DrugAdminList
          standalone="true"
          onCloseModal={() => setMedicationModal(false)}
        />
        </Box>
      </ModalBox>

      {/* ******************************************* TASKS ********************************************** */}

      <ModalBox
        open={taskModal}
        onClose={() => setTaskModal(false)}
        header="Client Tasks"
      >
        <ClientTasks closeModal={() => setTaskModal(false)} />
      </ModalBox>

      {/* ******************************************* PROBLEM ********************************************** */}

      <ModalBox
        open={problemModal}
        onClose={() => setProblemModal(false)}
        header="Client Problems"
      >
        <ClientProblems closeModal={() => setProblemModal(false)} />
      </ModalBox>

      {/* ******************************************* HISTORY ********************************************** */}

      <ModalBox
        open={historyModal}
        onClose={() => setHistoryModal(false)}
        header="Clinet History"
      >
        <ClientHistory closeModal={() => setHistoryModal(false)} />
      </ModalBox>

      {/* ******************************************* INTOLERANCE ********************************************** */}

      <ModalBox
        open={intoleranceModal}
        onClose={() => setIntoleranceModal(false)}
        header="Client Intolerance"
      >
        <ClientIntolerance closeModal={() => setIntoleranceModal(false)} />
      </ModalBox>

      {/* ******************************************* LAST VIST ********************************************** */}

      <ModalBox
        open={visitModal}
        onClose={() => setVisitModal(false)}
        header="Client Last Visit"
      >
        <ClientLastVisit closeModal={() => setVisitModal(false)} />
      </ModalBox>
    </div>
  );
}
