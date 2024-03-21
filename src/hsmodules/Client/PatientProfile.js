/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import "./styles/index.scss";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {UserContext, ObjectContext} from "../../context";
import {toast} from "react-toastify";
import {formatDistanceToNowStrict, formatDistanceToNow, formatDistanceStrict} from "date-fns";
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
import {Card, Button as MuiButton, Typography, Avatar} from "@mui/material";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import {TransactionClientAccount} from "../Finance/ClientTransactions";
import {returnAvatarString} from "../helpers/returnAvatarString";
import ClientPolicy from "../ManagedCare/ClientPolicy";
import ClientPreauthorization from "../ManagedCare/ClientPreAuth";
import ClientClaims from "../ManagedCare/ClientClaims";
import ClientHealthPlan from "../ManagedCare/ClientHealthPlan";
import PolicyDetail from "../ManagedCare/components/policy/ClientDetails";
import ClientBenefits from "./ClientBenefits"
import Referral from "../ManagedCare/Referral"

export default function PatientProfile() {
  const {state, setState} = useContext(ObjectContext); //,setState
  const {user, setUser} = useContext(UserContext);
  //const ClientServ = client.service("client");
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [billingModal, setBillingModal] = useState(false);
  const [medicationModal, setMedicationModal] = useState(false);
  const [visitModal, setVisitModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);
  const [intoleranceModal, setIntoleranceModal] = useState(false);
  const [benefitsModal, setBenefitsModal] = useState(false);
  const [claimsModal, setClaimsModal] = useState(false);
  const [referralModal, setReferralModal] = useState(false);
  const [policyModal, setPolicyModal] = useState(false);
  const [preauthModal, setPreauthModal] = useState(false);
  const [problemModal, setProblemModal] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [diagnoisHistoryModal, setDiagnoisHistory] = useState(false);
  const [medicalProfile, setMedicalProfileModel] = useState(false);
  const [accountModal, setAccountModal] = useState(false);
  const [client, setClient] = useState({});

  const {
    firstname,
    middlename,
    lastname,
    dob,
    gender,
    maritalstatus,
    religion,
    profession,
    bloodgroup,
    genotype,
    disabilities,
    specificDetails,
    clientTags,
    allergies,
    comorbidities,
    paymentinfo,
    imageurl,
  } = client;

  useEffect(() => {
    checkpolicy()
    const client = state.ClientModule.selectedClient;
    console.log("new client" , state.ClientModule.selectedClient)
    setClient(client);
  }, [state.ClientModule]);

  const deepCopy =(obj) => {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(deepCopy);
    }
    const copy = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepCopy(obj[key]);
        }
    }
    return copy;
}

const checkpolicy=async ()=>{
  console.log("checking policy")
  let patient=state.ClientModule.selectedClient
  let result=patient.policy
  if(!!result){
    //check if hmo is in payment info
      //check if hmo.paymentinfo  has the policy
          //update
      if (patient.paymentinfo.length===1){
        const newI= deepCopy(patient)
        let result=newI.policy
        delete newI.policy
        let clientpolicy= {
          paymentmode:"HMO",
          organizationId:result.organizationId,
          organizationName:result.organizationName,
          principalId:result.policyNo,
          clientId:result.policyNo,
          principalName:`${result.principal.firstname} ${result.principal.lastname}`, //confirm
          plan:result.plan.planName, //confirm
          active:true,
          principal:result.principal._id,
          organizationType: result.organizationType,
          agent:result.agent,
          agentName:result.agentName,
          policy:result
        }

        newI.paymentinfo.push(clientpolicy)
      console.log("updated item", newI)
    /*   await ClientServ.patch(patient._id, {paymentinfo:newI.paymentinfo})
      .then((resp)=>{
        console.log("update successful "+ resp)
      })
      .catch((err)=>{
        toast.error("Update not successful "+ err)
      }) */

      setState(prev => ({
        ...prev,
      
          ClientModule:{
            selectedClient:newI
        },
       
      }));

      }else{
        if (patient.paymentinfo.length===2){
          let hmoinfo = patient.paymentinfo.filter(el => el.paymentmode === "HMO");
          if (hmoinfo[0].organizationId!==result.organizationId){
            const newI= deepCopy(patient)
        let result=newI.policy
        delete newI.policy
        let clientpolicy= {
          paymentmode:"HMO",
          organizationId:result.organizationId,
          organizationName:result.organizationName,
          principalId:result.policyNo,
          clientId:result.policyNo,
          principalName:`${result.principal.firstname} ${result.principal.lastname}`, //confirm
          plan:result.plan.planName, //confirm
          active:true,
          principal:result.principal._id,
          organizationType: result.organizationType,
          agent:result.agent,
          agentName:result.agentName,
          policy:result
        }

        newI.paymentinfo=[clientpolicy, ...newI.paymentinfo]
        setState(prev => ({
          ...prev,
        
            ClientModule:{
              selectedClient:newI
          },
         
        }));

          }

        }

      }

  }

}


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

  const navigate = useNavigate();

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
    if (!user.currentEmployee.roles.includes("Bill Client"))
      return toast.error("You're not authorized to Bill Clients");
    setBillingModal(true);
    //navigate('/app/finance/billservice')
  };

  const handleOpenClientAccount = () => {
    setState(prev => ({
      ...prev,
      SelectedClient: {
        ...prev.SelectedClient,
        client: state.ClientModule.selectedClient,
      },
    }));
    setAccountModal(true);
  };

  const checkHMO = obj => obj.paymentmode === "HMO";

  const isHMO = client._id && client.paymentinfo.some(checkHMO);

  const policy=async()=>{
    let paymentInfo = state.ClientModule.selectedClient.paymentinfo;
    let chosenPolicy={}
  
    let hmoinfo = paymentInfo.filter(el => el.paymentmode === "HMO");
    console.log(hmoinfo);
    if (hmoinfo.length > 0) {
       chosenPolicy = hmoinfo[0].policy;
      console.log(chosenPolicy)

    }
    if (chosenPolicy===undefined){
      toast.error("Policy information not available")
      return
    }
    setState(prev => ({
      ...prev,
      PolicyModule: {
        ...prev.PolicyModule,
        selectedPolicy:chosenPolicy,
        preservedPolicy:chosenPolicy,
      },
    }));
   setPolicyModal(true)

    /* toast.success("Opening Policy") */
  }


  const benefit=async ()=>{
    let paymentInfo = state.ClientModule.selectedClient.paymentinfo;
    let chosenPolicy={}
  
    let hmoinfo = paymentInfo.filter(el => el.paymentmode === "HMO");
    console.log(hmoinfo);
    if (hmoinfo.length > 0) {
       chosenPolicy = hmoinfo[0].policy;
      console.log(chosenPolicy)
    }
    if (chosenPolicy===undefined){
      toast.error("Benefit information not available")
      return
    }
    setState(prev => ({
      ...prev,
      PolicyModule: {
        ...prev.PolicyModule,
        selectedPolicy:chosenPolicy,
        preservedPolicy:chosenPolicy,
      },
    }));
   setBenefitsModal(true)

  }

  const profileButtons = [
    {
      title: "Policy",
      action: ()=>{policy()}, //() => navigate(`/app/clients/benefits/${client._id}`),
      hide: !isHMO,
    },
    {
      title: "Benefits",
      action: () => {benefit()},
      hide: !isHMO,
    },
    {
      title: "Preauthorization",
      action: () => navigate(`/app/clients/pre-authorization/${client._id}`),
      hide: !isHMO,
    },
    {
      title: "Claims",
      action: () => navigate(`/app/clients/claims/${client._id}`),
      hide: !isHMO,
    },
    {
      title: "Referral",
      action: () => setReferralModal(true),
      hide: false,
    },
    {
      title: "Appointment History",
      action: () => setVisitModal(true),
      hide: false,
    },
    {
      title: "Drug Intolerance",
      action: () => setIntoleranceModal(true),
      hide: false,
    },
    {
      title: "Medications",
      action: () => setMedicationModal(true),
      hide: false,
    },
    {
      title: "History",
      action: () => setHistoryModal(true),
      hide: false,
    },
    {
      title: "Problem List",
      action: () => setProblemModal(true),
      hide: false,
    },
    {
      title: "Task",
      action: () => setTaskModal(true),
      hide: false,
    },

    {
      title: "Diagnosis History",
      action: () => setDiagnoisHistory(true),
      hide: false,
    },
  ];

  return (
    <div>
      {!firstname && !lastname ? (
        <Box
          className="patient-profile-container"
          // sx={{
          //   display: "flex",
          //   flexDirection: "column",
          //   alignItems: "center",
          // }}
        >
          <img
            src="https://cdn.dribbble.com/users/665029/screenshots/16162764/media/3ea69cb1655fba401acc6c4328d38633.gif"
            alt=""
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{fontSize: "0.8rem"}}>
              Select a Patient to show Patient Profile
            </Typography>
          </Box>
        </Box>
      ) : (
        <div className="patient-profile-container">
          <Card>
            <div className="patient-profile-card">
              <div className="user-information-top-section">
                <div className="user-profile-information">
                  {firstname && lastname ? (
                    <Avatar
                      src={imageurl}
                      sx={{width: 56, height: 56}}
                      {...returnAvatarString(
                        `${firstname.replace(/\s/g, "")} ${lastname.replace(
                          /\s/g,
                          ""
                        )}`
                      )}
                    />
                  ) : (
                    <Avatar />
                  )}

                  <div className="user-infromation-container">
                    <h1>
                      {firstname} {middlename} {lastname}
                    </h1>
                    <div className="user-outline">
                      <span>
                        <time dateTime="2016-1-1">
                          {/* {dob && formatDistanceToNowStrict(new Date(dob))} */}

                            {dob && formatDistanceStrict(new Date(dob),new Date(),{roundingMethod:"floor"})}
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

              <Box
                sx={{display: "flex", alignItems: "center", flexWrap: "wrap"}}
                mb={1}
              >
                <Box>
                  <Typography sx={{fontSize: "0.75rem", fontWeight: "600"}}>
                    Payment Info:
                  </Typography>

                  {paymentinfo &&
                    paymentinfo.map((pay, i) => (
                      <>
                        <Typography
                          sx={{fontSize: "0.75rem", fontWeight: "600"}}
                          /* data-tag="allowRowEvents" */
                        >
                          {pay?.paymentmode}
                          {pay?.paymentmode === "Cash" ? "" : ":"}
                          {pay?.organizationName}
                          {","}&nbsp;
                        </Typography>

                        <Typography
                          sx={{fontSize: "0.75rem", fontWeight: "600"}}
                        >
                          {pay?.paymentmode === "HMO" && (
                            <>
                              Plan:{" "}
                              {pay?.plan
                                ? pay?.plan
                                : pay?.policy?.plan?.planName}{" "}
                            </>
                          )}
                        </Typography>
                        <Typography
                          sx={{fontSize: "0.75rem", fontWeight: "600"}}
                        >
                          {pay?.paymentmode === "HMO" && (
                            <>
                              Client ID:{" "}
                              {pay?.clientId
                                ? pay?.clientId
                                : pay?.policy?.policyNo}{" "}
                            </>
                          )}
                        </Typography>
                        <Typography
                          sx={{fontSize: "0.75rem", fontWeight: "600"}}
                        >
                          {pay?.paymentmode === "HMO" && (
                            <>
                              Principal:{" "}
                              {pay?.PrincipalName
                                ? pay?.PrincipalName
                                : `${pay.policy?.principal?.firstname}  ${pay?.policy?.principal?.lastname}`}
                            </>
                          )}
                        </Typography>
                        <Typography
                          sx={{fontSize: "0.75rem", fontWeight: "600"}}
                        >
                          {pay?.paymentmode === "HMO" && (
                            <>
                              Principal ID:{" "}
                              {pay?.PrincipalId
                                ? pay?.PrincipalId
                                : pay?.policy?.policyNo}{" "}
                            </>
                          )}
                        </Typography>
                        <Typography
                          sx={{fontSize: "0.75rem", fontWeight: "600"}}
                        >
                          {pay?.paymentmode === "HMO" && (
                            <>Active: {pay?.active.toString()} </>
                          )}
                        </Typography>
                      </>
                    ))}
                </Box>
              </Box>

              {!isHMO && (
                <div className="patient-profile-action-buttons-container">
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
                    sx={{width: "45%"}}
                    onClick={handleOpenClientAccount}
                  >
                    Account
                  </GlobalCustomButton>
                </div>
              )}

              <div className="horizontal-dotted-line" />

              <div className="user-information-bottom-container">
                <div className="each-bottom-section">
                  <span style={{fontWeight: "600"}}>
                    Specific Instructions:
                  </span>
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
                <div
                  onClick={item.action}
                  style={{
                    display: item.hide ? "none" : "flex",
                  }}
                >
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
      {/* ******************************************* Policy ********************************************** */}

      <ModalBox
        open={policyModal}
        onClose={() => setPolicyModal(false)}
        header="Client Policy"
      >
      {/*   <ClientPolicy closeModal={() => setPolicyModal(false)} /> */}
        <PolicyDetail
          /* goBack={handleReturn}
          beneficiary={beneficiary}
          corporate={corporate}
          corporateOrg={corporateOrg} */
        />
      </ModalBox>
      {/* ******************************************* Benefits ********************************************** */}

      <ModalBox
        open={benefitsModal}
        onClose={() => setBenefitsModal(false)}
        header="Benefits"
      >
        <ClientBenefits closeModal={() => setBenefitsModal(false)} />
      </ModalBox>

      {/* ******************************************* Preauth ********************************************** */}

      <ModalBox
        open={preauthModal}
        onClose={() => setPreauthModal(false)}
        header="Preauthorization"
      >
        <ClientPreauthorization closeModal={() => setPreauthModal(false)} />
      </ModalBox>
       {/* ******************************************* Referral ********************************************** */}

       <ModalBox
        open={referralModal}
        onClose={() => setReferralModal(false)}
        header="Referral"
      >
        <Referral closeModal={() => setReferralModal(false)} />
      </ModalBox>

      {/* ******************************************* Claims ********************************************** */}

      <ModalBox
        open={claimsModal}
        onClose={() => setClaimsModal(false)}
        header="Claims"
      >
        <ClientClaims closeModal={() => setClaimsModal(false)} />
      </ModalBox>
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
        header="Appointment History"
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
          <TransactionClientAccount
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
