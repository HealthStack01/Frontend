/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from "react";
import client from "../../feathers";
import { DebounceInput } from "react-debounce-input";
import { useForm } from "react-hook-form";
import { DocumentClassList } from "./DocumentClass";
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from "../../context";
import { toast } from "react-toastify";
import AsthmaIntake from "./AsthmaIntake";
import PulmonologyIntake from "./Pulmonology";
import NewPatientConsult from "./NewPatientConsult";
import PreventiveCare from "./PreventiveCare";
import MedicalScreeningForm from "./PhysiotherapyScreening";
import ProgressNote from "./ProgressNote";
import MedicationList from "./MedicationList";
import Clerking from "./Clerking";
import AdmissionConsentForm from "../clientForm/forms/admissionConsentForm";
import BinCard from "../clientForm/forms/binCard";
import ContinuationSheet from "../clientForm/forms/continuationSheet";
import DailyShiftHandoverNote from "../clientForm/forms/dailyShiftHandoverNote";
import DamaForm from "../clientForm/forms/damaForm";
import DiabetesMelitus from "../clientForm/forms/diabetesMelitus";
import DialysisLogSheet from "../clientForm/forms/dialysisLogSheet";
import DietOrder from "../clientForm/forms/dietOrder";
import DischargeSummary from "../clientForm/forms/dischargeSummary";
import ECGForm from "../clientForm/forms/ecgForm";
import EmergencyForm from "../clientForm/forms/emergencyForm";
import FluidIntakeOutput from "../clientForm/forms/fluidIntake";
import GreenDiagnosticCentre from "../clientForm/forms/greenDiagnosticCentre";
import MedicalBillingSheet from "../clientForm/forms/medicalBillingSheet";
import LaboratoryReportForm from "../clientForm/forms/laboratoryReportForm";
import LaboratoryObservationChart from "../clientForm/forms/laboratoryObservationChart";
import MedicalSickLeave from "../clientForm/forms/medicalSickLeave";
import OutpatientBillingSheet from "../clientForm/forms/outpatientBillingSheet";
import OutpatientRegistrationForm from "../clientForm/forms/outpatientRegistrationForm";
import PatientAppointmentCard from "../clientForm/forms/patientAppointmentCard";
import PaymentVoucher from "../clientForm/forms/paymentVoucher";
import PressureAreasTreatmentChart from "../clientForm/forms/pressureAreasTreatmentChart";
import RadiologyRequestForm from "../clientForm/forms/radiologyRequestForm";
import Receipt from "../clientForm/forms/receipt";
import ReferralFormForConsultation from "../clientForm/forms/referralFormForConsultation";
import VitalSignsFlowSheet from "../clientForm/forms/vitalSignsFlowSheet";
import VitalSignsRecord from "../clientForm/forms/vitalSignsRecord";
import VitalSignsChart from "../clientForm/forms/vitalSignChart";
import MuiCustomDatePicker from "../../components/inputs/Date/MuiDatePicker";
import SurgicalBookletConsentForm from "../clientForm/forms/surgicalBookletConsentForm";
import { usePosition } from "../../components/hooks/getUserLocation";
import Textarea from "../../components/inputs/basic/Textarea";
import { Box, getValue } from "@mui/system";
import RadioButton from "../../components/inputs/basic/Radio";
import {
  Button,
  Grid,
  IconButton,
  Typography,
  FormGroup,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import Input from "../../components/inputs/basic/Input";
import { FormsHeaderText } from "../../components/texts";
import CloseIcon from "@mui/icons-material/Close";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";
import VoiceTextArea from "../../components/inputs/basic/Textarea/VoiceInput";
import GlobalTable from "../../components/customtable/GlobalTable";
import GlobalCheckbox from "../../components/global-checkbox/GlobalCheckbox";

export default function EncounterRight() {
  const { state, setState } = useContext(ObjectContext);
  //console.log(state.DocumentClassModule.selectedDocumentClass);

  const submitDocument = (data) => {
    const geolocation = {
      type: "Point",
      coordinates: [state.coordinates.latitude, state.coordinates.longitude],
    };
    console.log({ ...data, geolocation: geolocation });

    toast.error("Sorry, form is currently under upgrade");
  };

  return (
    <div>
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Vital Signs" && <VitalSignCreate />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Clinical Note" && <ClinicalNoteCreate />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Lab Result" && <LabNoteCreate />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Nursing Note" && <NursingNoteCreate />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Doctor Note" && <DoctorsNoteCreate />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Prescription" && <PrescriptionCreate />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Diagnostic Request" && <LabrequestCreate />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Adult Asthma Questionnaire" && <AsthmaIntake />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Pediatric Pulmonology Form" && <PulmonologyIntake />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "New Patient Consultation Form" && <NewPatientConsult />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Progress Note" && <ProgressNote />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Medication List" && <MedicationList />}
      {state.DocumentClassModule.selectedDocumentClass.name === "Clerking" && (
        <Clerking />
      )}
      {typeof state.DocumentClassModule.selectedDocumentClass.document !==
        "undefined" &&
        typeof state.DocumentClassModule.selectedDocumentClass.document
          .documentType !== "undefined" &&
        state.DocumentClassModule.selectedDocumentClass.document
          .documentType === "Diagnostic Result" && <LabNoteCreate />}
      {/*  */}

      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Laboratory Report Form" && (
        <LaboratoryReportForm onSubmit={submitDocument} />
      )}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Labour Observation Chart" && (
        <LaboratoryObservationChart onSubmit={submitDocument} />
      )}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Green Diagnostic Center Request" && (
        <GreenDiagnosticCentre onSubmit={submitDocument} />
      )}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Admission Consent Form" && (
        <AdmissionConsentForm onSubmit={submitDocument} />
      )}
      {state.DocumentClassModule.selectedDocumentClass.name === "Bin Card" && (
        <BinCard onSubmit={submitDocument} />
      )}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Outpatient Registration Form" && (
        <OutpatientRegistrationForm onSubmit={submitDocument} />
      )}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Outpatient Billing Sheet" && (
        <OutpatientBillingSheet onSubmit={submitDocument} />
      )}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Medical Sick Leave Form" && (
        <MedicalSickLeave onSubmit={submitDocument} />
      )}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Daily Shift Handover Note" && (
        <DailyShiftHandoverNote onSubmit={submitDocument} />
      )}
      {state.DocumentClassModule.selectedDocumentClass.name === "Dama Form" && (
        <DamaForm onSubmit={submitDocument} />
      )}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Inpatient Billing Sheet" && (
        <MedicalBillingSheet onSubmit={submitDocument} />
      )}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Emergency Form" && <EmergencyForm onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Discharge Summary" && <DischargeSummary onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Diet Order" && <DietOrder onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name === "Ecg Form" && (
        <ECGForm onSubmit={submitDocument} />
      )}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Vital Signs Flow Sheet" && (
        <VitalSignsFlowSheet onSubmit={submitDocument} />
      )}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Referral Form For Consultation" && (
        <ReferralFormForConsultation onSubmit={submitDocument} />
      )}
      {state.DocumentClassModule.selectedDocumentClass.name === "Receipt" && (
        <Receipt onSubmit={submitDocument} />
      )}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Radiology Request Form" && (
        <RadiologyRequestForm onSubmit={submitDocument} />
      )}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Pressure Areas Treatment Chart" && (
        <PressureAreasTreatmentChart onSubmit={submitDocument} />
      )}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Payment Voucher" && <PaymentVoucher onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Surgical Booklet Consent Form" && (
        <SurgicalBookletConsentForm onSubmit={submitDocument} />
      )}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Vital Signs Record" && <VitalSignsRecord onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Patient Appointment Card" && (
        <PatientAppointmentCard onSubmit={submitDocument} />
      )}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Fluid Intake And Output Chart" && (
        <FluidIntakeOutput onSubmit={submitDocument} />
      )}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Diabetes Melitus Flowsheet" && (
        <DiabetesMelitus onSubmit={submitDocument} />
      )}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Dialysis Log Sheet" && <DialysisLogSheet onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Continuation Sheet" && <ContinuationSheet onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Vital Signs Chart" && <VitalSignsChart onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Eye examination" && <EyeExamination onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Dental Clinic" && <DentalClinic onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Orthodontic Analysis" && (
        <OrthodonticAnalysis onSubmit={submitDocument} />
      )}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Preventive Care" && <PreventiveCare />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Dental Lab" && <DentalLab />}
        {state.DocumentClassModule.selectedDocumentClass.name ===
        "Physiotherapy Medical Screening" && <MedicalScreeningForm />}
    </div>
  );
}

export function VitalSignCreate() {
  const { register, handleSubmit, setValue, reset } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const {
    state,
    setState,
    showActionLoader,
    hideActionLoader,
    toggleSideMenu,
  } = useContext(ObjectContext);
  const [docStatus, setDocStatus] = useState("Draft");
  const [confirmDialog, setConfirmDialog] = useState(false);

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!!draftDoc && draftDoc.status === "Draft") {
      Object.entries(draftDoc.documentdetail).map(([keys, value], i) =>
        setValue(keys, value, {
          shouldValidate: true,
          shouldDirty: true,
        })
      );
      // setSymptoms(draftDoc.documentdetail.Presenting_Complaints)
      // setAllergies(draftDoc.documentdetail.Allergy_Skin_Test)
    }
    return () => {
      draftDoc = {};
    };
  }, [draftDoc]);

  const getSearchfacility = (obj) => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
        setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        })  */
    }
  });

  useEffect(() => {
    hideActionLoader();
  }, []);

  const onSubmit = (formData) => {
    //e.preventDefault();
    // showActionLoader();
    setMessage("");
    setError(false);
    setSuccess(false);
    let data = formData;
    let document = {};
    // data.createdby=user._id
    // console.log(data);
    if (!!data.Height && !!data.Weight) {
      data.BMI = Number(data.Weight) / Number(data.Height) ** 2;
      //  console.log(data.Height,data.Weight)

      if (data.BMI >= 30) {
        data.BMI_Status = "Obese";
      }
      if (data.BMI >= 25 && data.BMI <= 29.9) {
        data.BMI_Status = "Overweight";
      }
      if (data.BMI >= 18.5 && data.BMI <= 24.9) {
        data.BMI_Status = "Normal Weight";
      }
      if (data.BMI < 18.5) {
        data.BMI_Status = "Underweight ";
      }
      //  console.log(data.BMI, data.BMI_Status)
      // return
    }

    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentname =
      state.DocumentClassModule.selectedDocumentClass.name;
    document.documentClassId =
      state.DocumentClassModule.selectedDocumentClass._id;
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = state.ClientModule.selectedClient._id;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = docStatus === "Draft" ? "Draft" : "completed";

    document.geolocation = {
      type: "Point",
      coordinates: [state.coordinates.latitude, state.coordinates.longitude],
    };

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast.error(
        "Documentation data missing, requires location and facility details"
      );
      return;
    }

    if (!!draftDoc && draftDoc.status === "Draft") {
      ClientServ.patch(draftDoc._id, document)
        .then((res) => {
          //Convert Hook forms data into empty string to reset form
          Object.keys(data).forEach((key) => {
            data[key] = null;
          });

          setDocStatus("Draft");

          setSuccess(true);

          reset(data);
          setConfirmDialog(false);
          hideActionLoader();
          toast.success("Documentation updated succesfully");
          setSuccess(false);
        })
        .catch((err) => {
          hideActionLoader();
          toast.error(`Error updating Documentation ${err}`);
        });
    } else {
      //console.log(document);

      ClientServ.create(document)
        .then((res) => {
          //Convert Hook forms data into empty string to reset form
          Object.keys(data).forEach((key) => {
            data[key] = null;
          });

          setSuccess(true);
          reset(data);
          setConfirmDialog(false);
          hideActionLoader();
          toast.success("Documentation created succesfully");
          setSuccess(false);
        })
        .catch((err) => {
          hideActionLoader();
          toast.error(`Error creating Documentation ${err}`);
        });
    }
  };

  const handleChangeStatus = async (e) => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };

  const closeEncounterRight = async () => {
    setState((prevstate) => ({
      ...prevstate,
      DocumentClassModule: {
        ...prevstate.DocumentClassModule,
        encounter_right: false,
      },
    }));
  };

  return (
    <>
      <div className="card ">
        <CustomConfirmationDialog
          open={confirmDialog}
          cancelAction={() => setConfirmDialog(false)}
          confirmationAction={handleSubmit(onSubmit)}
          type="create"
          message={`You're about to save this document ${state.DocumentClassModule.selectedDocumentClass.name} ?`}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={1}
        >
          <FormsHeaderText
            text={state?.DocumentClassModule.selectedDocumentClass.name || ""}
          />

          <IconButton onClick={closeEncounterRight}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <div className="card-content vscrollable">
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Input
                  register={register("Temperature")}
                  type="text"
                  label="Temperature"
                />
              </Grid>

              <Grid item xs={12}>
                <Input register={register("Pulse")} type="text" label="Pulse" />
              </Grid>

              <Grid item xs={12}>
                <Input
                  register={register("Respiratory_rate")}
                  type="text"
                  label="Respiratory rate"
                />
              </Grid>

              <Grid item xs={12}>
                <Input
                  register={register("Random_glucose")}
                  name="text"
                  type="text"
                  label="Blood Glucose"
                />
              </Grid>

              <Grid item xs={12}>
                <Input
                  register={register("Systolic_BP")}
                  type="text"
                  label="Systolic_BP"
                />
              </Grid>

              <Grid item xs={12}>
                <Input
                  register={register("Diastolic_BP")}
                  type="text"
                  label="Diastolic_BP"
                />
              </Grid>

              <Grid item xs={12}>
                <Input register={register("SPO2")} type="text" label="SPO2" />
              </Grid>

              <Grid item xs={12}>
                <Input register={register("Pain")} type="text" label="Pain" />
              </Grid>

              <Grid item xs={12}>
                <Input
                  register={register("Height")}
                  type="number"
                  label="Height(m)"
                />
              </Grid>

              <Grid item xs={12}>
                <Input
                  register={register("Weight")}
                  type="number"
                  label="Weight(Kg)"
                />
              </Grid>
            </Grid>

            <Box>
              <RadioButton
                onChange={handleChangeStatus}
                name="status"
                options={["Draft", "Final"]}
                value={docStatus}
              />
            </Box>

            <Box
              spacing={1}
              sx={{
                display: "flex",
                gap: "2rem",
              }}
            >
              <GlobalCustomButton
                color="secondary"
                variant="contained"
                type="submit"
                onClick={() => setConfirmDialog(true)}
              >
                Submit Vital Signs
              </GlobalCustomButton>

              {/* <GlobalCustomButton variant="outlined">Cancel</GlobalCustomButton> */}
            </Box>
          </form>
        </div>
      </div>
    </>
  );
}

export function ClinicalNoteCreate() {
  const { register, handleSubmit, setValue, reset } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);
  const [docStatus, setDocStatus] = useState("Draft");
  const [confirmationDialog, setConfirmationDialog] = useState(false);

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!!draftDoc && draftDoc.status === "Draft") {
      Object.entries(draftDoc.documentdetail).map(([keys, value], i) =>
        setValue(keys, value, {
          shouldValidate: true,
          shouldDirty: true,
        })
      );
    }
    return () => {
      draftDoc = {};
    };
  }, [draftDoc]);

  useEffect(() => {
    setCurrentUser(user);

    return () => {};
  }, [user]);
  useEffect(() => {
    if (!user.stacker) {
    }
  });

  const document_name = state.DocumentClassModule.selectedDocumentClass.name;

  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentname =
      state.DocumentClassModule.selectedDocumentClass.name;
    document.documentClassId =
      state.DocumentClassModule.selectedDocumentClass._id;
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = state.ClientModule.selectedClient._id;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = docStatus === "Draft" ? "Draft" : "completed";

    document.geolocation = {
      type: "Point",
      coordinates: [state.coordinates.latitude, state.coordinates.longitude],
    };

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast.error(
        "Documentation data missing, requires location and facility details"
      );
      return;
    }

    if (!!draftDoc && draftDoc.status === "Draft") {
      ClientServ.patch(draftDoc._id, document)
        .then((res) => {
          Object.keys(data).forEach((key) => {
            data[key] = "";
          });

          setDocStatus("Draft");
          setSuccess(true);
          toast.success("Documentation updated succesfully");
          setSuccess(false);
          reset(data);
          setConfirmationDialog(false);
        })
        .catch((err) => {
          toast.error("Error updating Documentation " + err);
        });
    } else {
      ClientServ.create(document)
        .then((res) => {
          // console.log("Clinincal note data", res)
          Object.keys(data).forEach((key) => {
            data[key] = "";
          });
          setSuccess(true);
          toast.success("Documentation created succesfully");
          setSuccess(false);
          reset(data);
          setConfirmationDialog(false);
        })
        .catch((err) => {
          toast.error("Error creating Documentation " + err);
        });
    }
  };
  const handleChangeStatus = async (e) => {
    setDocStatus(e.target.value);
  };

  const closeEncounterRight = async () => {
    setState((prevstate) => ({
      ...prevstate,
      DocumentClassModule: {
        ...prevstate.DocumentClassModule,
        encounter_right: false,
      },
    }));
  };

  return (
    <>
      <div className="card ">
        <CustomConfirmationDialog
          open={confirmationDialog}
          cancelAction={() => setConfirmationDialog(false)}
          type="create"
          message={`You are about to save this document ${document_name}`}
          confirmationAction={handleSubmit(onSubmit)}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={1}
        >
          <FormsHeaderText
            text={state?.DocumentClassModule.selectedDocumentClass.name || ""}
          />

          <IconButton onClick={closeEncounterRight}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <div className="card-content vscrollable">
          <form>
            <Box>
              <Textarea
                register={register("Symptoms")}
                type="text"
                label="Symptoms"
                placeholder="Enter Symptoms......"
              />
            </Box>
            <Box>
              <Textarea
                register={register("Clinical Findings")}
                type="text"
                label="Clinical Findings"
                placeholder="Enter clinical findings......"
              />
            </Box>
            <Box>
              <Textarea
                register={register("diagnosis")}
                name=""
                type="text"
                label="Diagnosis"
                placeholder="Enter diagnosis......"
              />
            </Box>

            <Box>
              <Textarea
                register={register("plan")}
                name="Plan"
                type="text"
                label="Plan"
                placeholder="Enter plan......"
              />
            </Box>

            <Box>
              <RadioButton
                onChange={handleChangeStatus}
                name="status"
                options={["Draft", "Final"]}
                value={docStatus}
              />
            </Box>
            <Box
              spacing={1}
              sx={{
                display: "flex",
                gap: "2rem",
              }}
            >
              <GlobalCustomButton
                color="secondary"
                type="submit"
                onClick={() => setConfirmationDialog(true)}
              >
                Submit Clinical Note
              </GlobalCustomButton>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
}

/** 888  **/
export function LabNoteCreate() {
  const { register, handleSubmit, setValue, reset, getValues } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [docStatus, setDocStatus] = useState("Draft");

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!!draftDoc && draftDoc.status === "Draft") {
      Object.entries(draftDoc.documentdetail).map(([keys, value], i) =>
        setValue(keys, value, {
          shouldValidate: true,
          shouldDirty: true,
        })
      );
    }
    return () => {
      draftDoc = {};
    };
  }, [draftDoc]);

  const getSearchfacility = (obj) => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
        setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        })  */
    }
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    //console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentname = `${data.Investigation} Result`; //"Lab Result"
    document.documentType = "Diagnostic Result";
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = state.ClientModule.selectedClient._id;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = docStatus === "Draft" ? "Draft" : "completed";

    document.geolocation = {
      type: "Point",
      coordinates: [state.coordinates.latitude, state.coordinates.longitude],
    };
    // console.log(document)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast.error(
        "Documentation data missing, requires location and facility details"
      );
      return;
    }
    // let confirm = window.confirm(
    //   `You are about to save this document ${document.documentname} ?`
    // );
    // if (confirm) {
    if (!!draftDoc && draftDoc.status === "Draft") {
      ClientServ.patch(draftDoc._id, document)
        .then((res) => {
          //console.log(JSON.stringify(res))
          Object.keys(data).forEach((key) => {
            data[key] = "";
          });

          setDocStatus("Draft");
          // setAllergies([])
          /*  setMessage("Created Client successfully") */
          setSuccess(true);
          toast.success("Documentation updated succesfully");
          setSuccess(false);
          setConfirmDialog(false);
        })
        .catch((err) => {
          toast.error("Error updating Documentation " + err);
          reset(data);
          setConfirmDialog(false);
        });
    } else {
      ClientServ.create(document)
        .then((res) => {
          //console.log(JSON.stringify(res))
          Object.keys(data).forEach((key) => {
            data[key] = "";
          });

          /*  setMessage("Created Client successfully") */
          setSuccess(true);
          toast.success("Lab Result created succesfully");
          setSuccess(false);
          reset(data);
          setConfirmDialog(false);
        })
        .catch((err) => {
          toast.error("Error creating Lab Result " + err);
          setConfirmDialog(false);
        });
    }
    // }
  };

  const handleChangeStatus = async (e) => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };
  const handleChangePart = (e) => {
    console.log(e);
  };

  const closeEncounterRight = async () => {
    setState((prevstate) => ({
      ...prevstate,
      DocumentClassModule: {
        ...prevstate.DocumentClassModule,
        encounter_right: false,
      },
    }));
  };

  return (
    <>
      <div className="card ">
        <CustomConfirmationDialog
          open={confirmDialog}
          cancelAction={() => setConfirmDialog(false)}
          confirmationAction={handleSubmit(onSubmit)}
          type="create"
          message={`You are about to save this document ${getValues(
            "investigation"
          )} Result?`}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={1}
        >
          <FormsHeaderText text={"Lab Result"} />

          <IconButton onClick={closeEncounterRight}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <div className="card-content vscrollable remPad1">
          <form>
            <Box mb={1}>
              <Input
                register={register("Investigation")}
                name="text"
                type="text"
                label="Investigation"
              />
            </Box>

            <Box>
              <Textarea
                register={register("findings")}
                name="findings"
                type="text"
                label="Finding"
                placeholder="Write here....."
              />
            </Box>

            <Box>
              <Textarea
                register={register("recommendation")}
                name="text"
                type="text"
                label="Recommendation"
                placeholder="Write here....."
              />
            </Box>

            <Box>
              <RadioButton
                onChange={handleChangeStatus}
                name="status"
                options={["Draft", "Final"]}
                value={docStatus}
              />
            </Box>

            <Box
              spacing={1}
              sx={{
                display: "flex",
                gap: "2rem",
              }}
            >
              <GlobalCustomButton
                color="secondary"
                type="submit"
                onClick={() => setConfirmDialog(true)}
              >
                Submit Lab Result
              </GlobalCustomButton>
              {/* <Button variant="outlined" type="button">
                Cancel
              </Button> */}
            </Box>
          </form>
        </div>
      </div>
    </>
  );
}

// Eye Examination
export function EyeExamination() {
  const { register, handleSubmit, setValue, reset, getValues } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const ClientServ = client.service("clinicaldocument");
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);
  // const [confirmDialog, setConfirmDialog] = useState(false);
  const [docStatus, setDocStatus] = useState("Draft");
  const [confirmationDiaglog, setConfirmationDialog] = useState(false);

  const [formData, setFormData] = useState({
    acuity: "",
    muscles: "",
    degree: "",
    colorVision: "",
    fieldRestriction: "",
  });

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!!draftDoc && draftDoc.status === "Draft") {
      Object.entries(draftDoc.documentdetail).map(([keys, value], i) =>
        setValue(keys, value, {
          shouldValidate: true,
          shouldDirty: true,
        })
      );
    }
    return () => {
      draftDoc = {};
    };
  }, [draftDoc]);

  useEffect(() => {
    setCurrentUser(user);
    return () => {};
  }, [user]);

  useEffect(() => {
    if (!user.stacker) {
    }
  });

  const handleAcuityChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      acuity: event.target.value,
    }));
  };

  const handleMuscleFunctionChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      muscles: event.target.value,
    }));
  };

  const handleFieldChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      degree: event.target.value,
    }));
  };

  const handleColorVisionChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      colorVision: event.target.value,
    }));
  };

  const handleFieldRestrictionChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      fieldRestriction: event.target.value,
    }));
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);

    let document = {};

    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }

    document.documentdetail = {
      "Age Of Onset": data.ageOfOnset,
      History: data.history,
      "Unaided RVA": data.unaidedRVA,
      "Unaided LVA": data.unaidedLVA,
      "Unaided NV": data.unaidedNV,
      "Aided RVA": data.aidedRVA,
      "Aided LVA": data.aidedLVA,
      "Aided NV": data.aidedNV,
      Acuity: formData.acuity,
      "Muscle Function": formData.muscles,
      "Visual Field Test": data.visualFieldTest,
      Describe: data.describe,
      Degree: formData.degree,
      "Field Restriction": formData.fieldRestriction,
      "Color Vision": formData.colorVision,
    };
    document.documentname = "Eye examination";
    document.documentType = "Eye examination";
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = state.ClientModule.selectedClient._id;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = docStatus === "Draft" ? "Draft" : "completed";

    document.geolocation = {
      type: "Point",
      coordinates: [state.coordinates.latitude, state.coordinates.longitude],
    };

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast.error(
        "Documentation data missing, requires location and facility details"
      );
      return;
    }

    if (!!draftDoc && draftDoc.status === "Draft") {
      ClientServ.patch(draftDoc._id, document)
        .then((res) => {
          Object.keys(data).forEach((key) => {
            data[key] = "";
          });

          setDocStatus("Draft");
          setSuccess(true);
          toast.success("Documentation updated successfully");
          setSuccess(false);
          setConfirmationDialog(false);
        })
        .catch((err) => {
          toast.error("Error updating Documentation: " + err);
          reset(data);
          setConfirmationDialog(false);
        });
    } else {
      ClientServ.create(document)
        .then((res) => {
          // console.log("Data", res)
          Object.keys(data).forEach((key) => {
            data[key] = "";
          });

          setSuccess(true);
          toast.success("Eye Examination created successfully");
          setSuccess(false);
          reset(data);
          setConfirmationDialog(false);
        })
        .catch((err) => {
          toast.error("Error creating Eye examination: " + err);
          setConfirmationDialog(false);
        });
    }
  };
  const closeEncounterRight = async () => {
    setState((prevstate) => ({
      ...prevstate,
      DocumentClassModule: {
        ...prevstate.DocumentClassModule,
        encounter_right: false,
      },
    }));
  };

  const handleChangeStatus = async (e) => {
    setDocStatus(e.target.value);
  };

  return (
    <>
      <div className="card ">
        <CustomConfirmationDialog
          open={confirmationDiaglog}
          cancelAction={() => setConfirmationDialog(false)}
          confirmationAction={handleSubmit(onSubmit)}
          type="create"
          message={`You are about to save this document ${getValues(
            "eye"
          )} Examination?`}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={1}
        >
          <FormsHeaderText text={"EYE EXAMINATION REPORT"} />

          <IconButton onClick={closeEncounterRight}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <div className="card-content vscrollable remPad1">
          <form>
            <Typography color="primary" fontWeight="bold" variant="body1">
              Age of Onset
            </Typography>
            <Box mb={1}>
              <Input
                register={register("ageOfOnset")}
                name="text"
                type="text"
                placeholder="Enter age of Onset"
              />
            </Box>
            <Typography fontWeight="bold" color="primary" variant="body1">
              History
            </Typography>
            <Box style={{ marginTop: "10px", marginBottom: "30px" }}>
              <Textarea
                color="primary"
                register={register("history")}
                name="findings"
                type="text"
                placeholder="Type here...."
              />
            </Box>

            <Typography
              color="primary"
              fontWeight="bold"
              variant="body1"
              sx={{ width: "30%", marginBottom: "30px" }}
            >
              Unaided
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "30%", marginBottom: "30px" }}>
                <Typography variant="body1">RVA</Typography>
                <Box sx={{ marginTop: "10px" }}>
                  <Input
                    register={register("unaidedRVA")}
                    name="text"
                    type="text"
                    placeholder="Enter RVA..."
                    fullWidth
                  />
                </Box>
              </Box>

              <Box sx={{ width: "30%", marginBottom: "30px" }}>
                <Typography variant="body1">LVA</Typography>
                <Box sx={{ marginTop: "10px" }}>
                  <Input
                    register={register("unaidedLVA")}
                    name="text"
                    type="text"
                    placeholder="Enter LVA..."
                    fullWidth
                  />
                </Box>
              </Box>
              <Box sx={{ width: "30%", marginBottom: "30px" }}>
                <Typography variant="body1">NV</Typography>
                <Box sx={{ marginTop: "10px" }}>
                  <Input
                    register={register("unaidedNV")}
                    name="text"
                    type="text"
                    placeholder="Enter NV..."
                    fullWidth
                  />
                </Box>
              </Box>
            </Box>

            <Typography
              color="primary"
              fontWeight="bold"
              variant="body1"
              sx={{ width: "30%", marginBottom: "30px" }}
            >
              Aided
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "30%", marginBottom: "10px" }}>
                <Typography variant="body1">RVA</Typography>
                <Box sx={{ marginTop: "10px" }}>
                  <Input
                    register={register("aidedRVA")}
                    name="text"
                    type="text"
                    placeholder="Enter RVA..."
                    fullWidth
                  />
                </Box>
              </Box>

              <Box sx={{ width: "30%", marginBottom: "10px" }}>
                <Typography variant="body1">LVA</Typography>
                <Box sx={{ marginTop: "10px" }}>
                  <Input
                    register={register("aided1LVA")}
                    name="text"
                    type="text"
                    placeholder="Enter LVA..."
                    fullWidth
                  />
                </Box>
              </Box>
              <Box sx={{ width: "30%", marginBottom: "10px" }}>
                <Typography variant="body1">NV</Typography>
                <Box sx={{ marginTop: "10px" }}>
                  <Input
                    register={register("aidedNV")}
                    name="text"
                    type="text"
                    placeholder="Enter NV..."
                    fullWidth
                  />
                </Box>
              </Box>
            </Box>

            <Box sx={{ marginBottom: "30px" }}>
              <Typography variant="body1">
                If acuity cannot be measured, enter check to select the most
                appropriate selection
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "25%", marginBottom: "20px" }}>
                <RadioGroup
                  name="acuity"
                  value={formData.acuity}
                  onChange={handleAcuityChange}
                >
                  <FormControlLabel
                    value="Legally blind 20/200"
                    control={<Radio />}
                    label="Legally blind 20/200"
                  />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "25%", marginBottom: "20px" }}>
                <RadioGroup
                  name="acuity"
                  value={formData.acuity}
                  onChange={handleAcuityChange}
                >
                  <FormControlLabel
                    value="Between 20/70 and 20/199"
                    control={<Radio />}
                    label="Between 20/70 and 20/199"
                  />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "25%", marginBottom: "20px" }}>
                <RadioGroup
                  name="acuity"
                  value={formData.acuity}
                  onChange={handleAcuityChange}
                >
                  <FormControlLabel
                    value="Better than 20/70"
                    control={<Radio />}
                    label="Better than 20/70"
                  />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "25%", marginBottom: "20px" }}>
                <RadioGroup
                  name="acuity"
                  value={formData.acuity}
                  onChange={handleAcuityChange}
                >
                  <FormControlLabel
                    value="Functions at the definition of blindness (E.g. CVI)"
                    control={<Radio />}
                    label="Blindness (E.g. CVI)"
                  />
                </RadioGroup>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "50%", marginBottom: "20px" }}>
                <Typography
                  color="primary"
                  variant="body1"
                  fontWeight="bold"
                  style={{ marginTop: "10px" }}
                >
                  Muscle function:
                </Typography>
              </Box>
              <Box sx={{ width: "45%", marginBottom: "20px" }}>
                <RadioGroup
                  name="muscles"
                  value={formData.muscles}
                  onChange={handleMuscleFunctionChange}
                >
                  <FormControlLabel
                    value="Normal"
                    control={<Radio />}
                    label="Normal"
                  />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "45%", marginBottom: "20px" }}>
                <RadioGroup
                  name="muscles"
                  value={formData.muscles}
                  onChange={handleMuscleFunctionChange}
                >
                  <FormControlLabel
                    value="Abnormal"
                    control={<Radio />}
                    label="Abnormal"
                  />
                </RadioGroup>
              </Box>
            </Box>
            <Box>
              <Textarea
                register={register("describe")}
                name="findings"
                type="text"
                label="Describe"
                placeholder="Type here..."
              />
            </Box>
            <Typography
              style={{ marginTop: "20px", marginBottom: "20px" }}
              fontWeight="bold"
              color="primary"
              variant="body1"
            >
              Visual field test
            </Typography>
            <Typography color="primary" variant="body2">
              Type of test (Confrontation not acceptable)
            </Typography>
            <Box mb={1}>
              <Input
                register={register("visualFieldTest")}
                name="text"
                type="text"
                placeholder="Enter test type"
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "40%", marginBottom: "20px" }}>
                <RadioGroup
                  name="fieldRestriction"
                  value={formData.fieldRestriction}
                  onChange={handleFieldRestrictionChange}
                >
                  <FormControlLabel
                    value="Theres no apparent visual field restrictions"
                    control={<Radio />}
                    label="Theres no apparent visual field restrictions"
                  />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%", marginBottom: "20px" }}>
                <RadioGroup
                  name="fieldRestriction"
                  value={formData.fieldRestriction}
                  onChange={handleFieldRestrictionChange}
                >
                  <FormControlLabel
                    value="There is a field restriction"
                    control={<Radio />}
                    label="There is a field restriction"
                  />
                </RadioGroup>
              </Box>
            </Box>
            <Box>
              <Textarea
                color="primary"
                register={register("describe")}
                name="findings"
                type="text"
                label="Description"
                placeholder="Type here..."
              />
            </Box>
            <Typography
              color="primary"
              variant="body1"
              fontWeight="bold"
              style={{ marginTop: "20px" }}
            >
              The field if restricted to:
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "40%", marginBottom: "20px" }}>
                <RadioGroup
                  name="degree"
                  value={formData.degree}
                  onChange={handleFieldChange}
                >
                  <FormControlLabel
                    value="21 to 30 (Degree)"
                    control={<Radio />}
                    label="21 to 30 (Degree)"
                  />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%", marginBottom: "20px" }}>
                <RadioGroup
                  name="degree"
                  value={formData.degree}
                  onChange={handleFieldChange}
                >
                  <FormControlLabel
                    value="20 (Degrees) or less"
                    control={<Radio />}
                    label="20 (Degrees) or less"
                  />
                </RadioGroup>
              </Box>
            </Box>

            <Typography color="primary" variant="body1" fontWeight="bold">
              Color Vision
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "40%", marginBottom: "20px" }}>
                <RadioGroup
                  name="colorVision"
                  value={formData.colorVision}
                  onChange={handleColorVisionChange}
                >
                  <FormControlLabel
                    value="Normal"
                    control={<Radio />}
                    label="Normal"
                  />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%", marginBottom: "20px" }}>
                <RadioGroup
                  name="colorVision"
                  value={formData.colorVision}
                  onChange={handleColorVisionChange}
                >
                  <FormControlLabel
                    value="Abnormal"
                    control={<Radio />}
                    label="Abnormal"
                  />
                </RadioGroup>
              </Box>
            </Box>
            <Box
              sx={{
                gap: "1rem",
              }}
            >
              <RadioButton
                onChange={handleChangeStatus}
                name="status"
                options={["Draft", "Final"]}
                value={docStatus}
              />
            </Box>
            <Box
              spacing={3}
              sx={{
                display: "flex",
                gap: "3rem",
              }}
            >
              <GlobalCustomButton
                color="secondary"
                type="submit"
                onClick={() => setConfirmationDialog(true)}
              >
                Submit Eye Examination
              </GlobalCustomButton>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
}

// Dental Clinic
export function DentalClinic() {
  const { register, handleSubmit, setValue, reset, getValues } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const ClientServ = client.service("clinicaldocument");
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);

  const [formData, setFormData] = useState({
    dentalLaboratory: "",
    dentalTherapist: "",
    orthodontist: "",
  });
  const [docStatus, setDocStatus] = useState("Draft");
  const [confirmationDiaglog, setConfirmationDialog] = useState(false);

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!!draftDoc && draftDoc.status === "Draft") {
      Object.entries(draftDoc.documentdetail).map(([keys, value], i) =>
        setValue(keys, value, {
          shouldValidate: true,
          shouldDirty: true,
        })
      );
    }
    return () => {
      draftDoc = {};
    };
  }, [draftDoc]);

  useEffect(() => {
    setCurrentUser(user);
    return () => {};
  }, [user]);

  useEffect(() => {
    if (!user.stacker) {
    }
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);

    let document = {};

    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }

    document.documentdetail = {
      RFA: data.rfa,
      HPC: data.hpc,
      PDH: data.pdh,
      PHM: data.phm,
      "Intra Oral": data.intraoral,
      "Extra Oral": data.extraoral,
      Investigation: data.investigation,
      Diagnosis: data.diagnosis,
      "Management Plan": data.managementPlan,
      Treatment: data.treatment,
      "Send To": formData.dentalLaboratory,
    };
    document.documentname = "Dental Clinic";
    document.documentType = "Dental Clinic";
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = state.ClientModule.selectedClient._id;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = docStatus === "Draft" ? "Draft" : "completed";

    document.geolocation = {
      type: "Point",
      coordinates: [state.coordinates.latitude, state.coordinates.longitude],
    };

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast.error(
        "Documentation data missing, requires location and facility details"
      );
      return;
    }

    if (!!draftDoc && draftDoc.status === "Draft") {
      ClientServ.patch(draftDoc._id, document)
        .then((res) => {
          Object.keys(data).forEach((key) => {
            data[key] = "";
          });

          setDocStatus("Draft");
          setSuccess(true);
          toast.success("Documentation updated successfully");
          setSuccess(false);
          setConfirmationDialog(false);
        })
        .catch((err) => {
          toast.error("Error updating Documentation: " + err);
          reset(data);
          setConfirmationDialog(false);
        });
    } else {
      ClientServ.create(document)
        .then((res) => {
          // console.log("Data", res)
          Object.keys(data).forEach((key) => {
            data[key] = "";
          });

          setSuccess(true);
          toast.success("Eye Examination created successfully");
          setSuccess(false);
          reset(data);
          setConfirmationDialog(false);
        })
        .catch((err) => {
          toast.error("Error creating Eye examination: " + err);
          setConfirmationDialog(false);
        });
    }
  };
  const closeEncounterRight = async () => {
    setState((prevstate) => ({
      ...prevstate,
      DocumentClassModule: {
        ...prevstate.DocumentClassModule,
        encounter_right: false,
      },
    }));
  };

  const handleSendTo = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      dentalLaboratory: event.target.value,
    }));
  };

  const handleChangeStatus = async (e) => {
    setDocStatus(e.target.value);
  };

  return (
    <>
      <div className="card ">
        <CustomConfirmationDialog
          open={confirmationDiaglog}
          cancelAction={() => setConfirmationDialog(false)}
          confirmationAction={handleSubmit(onSubmit)}
          type="create"
          message={`You are about to save this document ${getValues(
            "eye"
          )} Examination?`}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={1}
        >
          <FormsHeaderText text={"DENTAL CLINIC MAIN"} />

          <IconButton onClick={closeEncounterRight}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <div className="card-content vscrollable remPad1">
          <form>
            <Typography
              style={{ marginTop: "20px", marginBottom: "20px" }}
              fontWeight="bold"
              color="primary"
              variant="body1"
            >
              Presenting Complains
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography color="primary" variant="body2">
                  RFA
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("rfa")}
                    name="text"
                    type="text"
                    placeholder="Enter rfa"
                  />
                </Box>
                <Typography color="primary" variant="body2">
                  HPC
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("hpc")}
                    name="text"
                    type="text"
                    placeholder="Enter hpc"
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography color="primary" variant="body2">
                  PDH
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("pdh")}
                    name="text"
                    type="text"
                    placeholder="Enter pdh"
                  />
                </Box>
                <Typography color="primary" variant="body2">
                  PMH
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("phm")}
                    name="text"
                    type="text"
                    placeholder="Enter pmh"
                  />
                </Box>
              </Grid>
            </Grid>
            <Typography
              style={{ marginTop: "20px", marginBottom: "20px" }}
              fontWeight="bold"
              color="primary"
              variant="body1"
            >
              Examination :
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography color="primary" variant="body2">
                  Intra-Oral
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("intraoral")}
                    name="text"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography color="primary" variant="body2">
                  Extra-Oral
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("extraoral")}
                    name="text"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
              </Grid>
            </Grid>

            <Typography fontWeight="bold" color="primary" variant="body1">
              Investigation
            </Typography>
            <Box style={{ marginTop: "10px", marginBottom: "30px" }}>
              <Textarea
                color="primary"
                register={register("investigation")}
                name="findings"
                type="text"
                placeholder="Type here...."
              />
            </Box>
            <Typography fontWeight="bold" color="primary" variant="body1">
              Diagnosis
            </Typography>
            <Box style={{ marginTop: "10px", marginBottom: "30px" }}>
              <Textarea
                color="primary"
                register={register("diagnosis")}
                name="findings"
                type="text"
                placeholder="Type here...."
              />
            </Box>

            <Typography fontWeight="bold" color="primary" variant="body1">
              Management Plan
            </Typography>
            <Box style={{ marginTop: "10px", marginBottom: "30px" }}>
              <Textarea
                color="primary"
                register={register("managementPlan")}
                name="findings"
                type="text"
                placeholder="Type here...."
              />
            </Box>
            <Typography fontWeight="bold" color="primary" variant="body1">
              Type of treatment done
            </Typography>
            <Box style={{ marginTop: "10px", marginBottom: "30px" }}>
              <Textarea
                color="primary"
                register={register("treatment")}
                name="findings"
                type="text"
                placeholder="Type here...."
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "50%", marginBottom: "20px" }}>
                <Typography
                  color="primary"
                  variant="body1"
                  fontWeight="bold"
                  style={{ marginTop: "10px" }}
                >
                  Send To:
                </Typography>
              </Box>
              <Box sx={{ width: "40%", marginBottom: "20px" }}>
                <RadioGroup
                  name="dentalLaboratory"
                  value={formData.dentalLaboratory}
                  onChange={handleSendTo}
                >
                  <FormControlLabel
                    value="Dental Laboratory"
                    control={<Radio />}
                    label="Dental Laboratory"
                  />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%", marginBottom: "20px" }}>
                <RadioGroup
                  name="dentallaboratory"
                  value={formData.dentalLaboratory}
                  onChange={handleSendTo}
                >
                  <FormControlLabel
                    value="Dental Therapist"
                    control={<Radio />}
                    label="Dental Therapist"
                  />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%", marginBottom: "20px" }}>
                <RadioGroup
                  name="dentallaboratory"
                  value={formData.dentalLaboratory}
                  onChange={handleSendTo}
                >
                  <FormControlLabel
                    value="Orthodontist"
                    control={<Radio />}
                    label="Orthodontist"
                  />
                </RadioGroup>
              </Box>
            </Box>
            <Box
              sx={{
                gap: "1rem",
              }}
            >
              <RadioButton
                onChange={handleChangeStatus}
                name="status"
                options={["Draft", "Final"]}
                value={docStatus}
              />
            </Box>
            <Box
              spacing={3}
              sx={{
                display: "flex",
                gap: "3rem",
              }}
            >
              <GlobalCustomButton
                color="secondary"
                type="submit"
                onClick={() => setConfirmationDialog(true)}
              >
                Submit Dental Clinic
              </GlobalCustomButton>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
}

// Orthodontic Analysis
export function OrthodonticAnalysis() {
  const { register, handleSubmit, setValue, reset, getValues } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const ClientServ = client.service("clinicaldocument");
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);

  const [docStatus, setDocStatus] = useState("Draft");
  const [confirmationDiaglog, setConfirmationDialog] = useState(false);

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!!draftDoc && draftDoc.status === "Draft") {
      Object.entries(draftDoc.documentdetail).map(([keys, value], i) =>
        setValue(keys, value, {
          shouldValidate: true,
          shouldDirty: true,
        })
      );
    }
    return () => {
      draftDoc = {};
    };
  }, [draftDoc]);

  useEffect(() => {
    setCurrentUser(user);
    return () => {};
  }, [user]);

  useEffect(() => {
    if (!user.stacker) {
    }
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);

    let document = {};

    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }

    document.documentdetail = {
      "Teeth Erupted": data.teetherupt,
      "Teeth of Poor Prognosis": data.prognosis,
      "First Permanent Molars": data.molars,
      D: data.d,
      M: data.m,
      F: data.f,
      "AntPost Relationship": data.antpost,
      Overbite: data.overbite,
      Overjet: data.overjet,
      "Tooth Bone Ratio": data.toothbone,
      Upper: data.upper,
      Lower: data.lower,
      "Dental Caries": data.dentalcaries,
      "Oral Hygiene Gingivities": data.oralhygiene,
      Lips: data.lips,
      Habits: data.habits,
      Tongue: data.tongue,
      "Dental Ortho": data.dentalortho,
      "U Incisor Angle": data.uincisor,
      "L Incisor Angle": data.lincisor,
      "FM Angle": data.fmangle,
      "UIncisor Angle2": data.uincisor2,
      "LIncisor Angle2": data.lincisor2,
      SNA: data.sna,
      SNB: data.snb,
      ANB: data.anb,
      "Clinical SK Pattern": data.clinicalskpattern,
      "Cephalometric SK pattern": data.cephalometricskpattern,
      "MM Angle": data.mmangle,
      "Unrepted Teeth": data.unreptedteeth,
      "Absent Teeth": data.absentteeth,
      "Dental Care": data.dentalcare,
      "Summary Of Analysis": data.summary,
      "Plan Of Treatment": data.plantreatment,
      "Other Remarks": data.otherremarks,
    };
    document.documentname = "Orthodontic Analysis";
    document.documentType = "Orthodontic Analysis";
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = state.ClientModule.selectedClient._id;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = docStatus === "Draft" ? "Draft" : "completed";

    document.geolocation = {
      type: "Point",
      coordinates: [state.coordinates.latitude, state.coordinates.longitude],
    };

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast.error(
        "Documentation data missing, requires location and facility details"
      );
      return;
    }

    if (!!draftDoc && draftDoc.status === "Draft") {
      ClientServ.patch(draftDoc._id, document)
        .then((res) => {
          Object.keys(data).forEach((key) => {
            data[key] = "";
          });

          setDocStatus("Draft");
          setSuccess(true);
          toast.success("Documentation updated successfully");
          setSuccess(false);
          setConfirmationDialog(false);
        })
        .catch((err) => {
          toast.error("Error updating Documentation: " + err);
          reset(data);
          setConfirmationDialog(false);
        });
    } else {
      ClientServ.create(document)
        .then((res) => {
          // console.log("Data", res)
          Object.keys(data).forEach((key) => {
            data[key] = "";
          });

          setSuccess(true);
          toast.success("Orthodontic Analysis created successfully");
          setSuccess(false);
          reset(data);
          setConfirmationDialog(false);
        })
        .catch((err) => {
          toast.error("Error creating Orthodontic Analysis: " + err);
          setConfirmationDialog(false);
        });
    }
  };
  const closeEncounterRight = async () => {
    setState((prevstate) => ({
      ...prevstate,
      DocumentClassModule: {
        ...prevstate.DocumentClassModule,
        encounter_right: false,
      },
    }));
  };

  const handleChangeStatus = async (e) => {
    setDocStatus(e.target.value);
  };

  return (
    <>
      <div className="card ">
        <CustomConfirmationDialog
          open={confirmationDiaglog}
          cancelAction={() => setConfirmationDialog(false)}
          confirmationAction={handleSubmit(onSubmit)}
          type="create"
          message={`You are about to save this document ${getValues(
            "eye"
          )} Orthodontic Analysis?`}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={1}
        >
          <FormsHeaderText color="none" text={"ORTHODONTIC ANALYSIS FORM"} />

          <IconButton onClick={closeEncounterRight}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <div className="card-content vscrollable remPad1">
          <form>
            <Typography
              style={{ marginTop: "20px", marginBottom: "20px" }}
              fontWeight="bold"
              color="primary"
              variant="body1"
            >
              General Dental Analysis
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography color="primary" variant="body2">
                  Teeth Erupted
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("teetherupt")}
                    name="text"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography color="primary" variant="body2">
                  Teeth of Poor Prognosis
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("prognosis")}
                    name="text"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography color="primary" variant="body2">
                  First Permanent Molars:
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("molars")}
                    name="text"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
              </Grid>
            </Grid>

            <Typography
              style={{ marginTop: "20px", marginBottom: "20px" }}
              fontWeight="bold"
              color="primary"
              variant="body1"
            >
              D. M .F
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography color="primary" variant="body2">
                  D:
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("d")}
                    name="text"
                    type="text"
                    placeholder="type here..."
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Typography color="primary" variant="body2">
                  M:
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("m")}
                    name="text"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Typography color="primary" variant="body2">
                  F:
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("f")}
                    name="text"
                    type="text"
                    placeholder="Type here"
                  />
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography color="primary" variant="body2">
                  Ant-post Relationship:
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("antpost")}
                    name="text"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Typography color="primary" variant="body2">
                  Overbite:
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("overbite")}
                    name="text"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Typography color="primary" variant="body2">
                  Overjet:
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("overjet")}
                    name="text"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography color="primary" variant="body2">
                  Tooth Bone Ratio:
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("toothbone")}
                    name="text"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Typography color="primary" variant="body2">
                  Upper:
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("upper")}
                    name="text"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Typography color="primary" variant="body2">
                  Lower:
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("lower")}
                    name="text"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography color="primary" variant="body2">
                  Dental Caries
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("dentalcaries")}
                    name="text"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography color="primary" variant="body2">
                  Oral Hygiene.Gingivities
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("oralhygiene")}
                    name="text"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography color="primary" variant="body2">
                  Lips
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("lips")}
                    name="text"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography color="primary" variant="body2">
                  Habits
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("habits")}
                    name="text"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography color="primary" variant="body2">
                  Tongue:
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("tongue")}
                    name="text"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Typography color="primary" variant="body2">
                  Speech:
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("speech")}
                    name="text"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Typography color="primary" variant="body2">
                  Dental Ortho Anomalies:
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("dentalortho")}
                    name="text"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
              </Grid>
            </Grid>

            <Typography fontWeight="bold" color="primary" variant="body1">
              Clinial Skeletal Analysis
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography color="primary" variant="body2">
                  U.Incisor Angle
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("uincisor")}
                    name="text"
                    type="text"
                    placeholder="Enter rfa"
                  />
                </Box>
                <Typography color="primary" variant="body2">
                  L.Incisor Angle
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("lincisor")}
                    name="text"
                    type="text"
                    placeholder="TYpe here"
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography color="primary" variant="body2">
                  FM Angle
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("fmangle")}
                    name="text"
                    type="text"
                    placeholder="Type here"
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography color="primary" variant="body2">
                  SK Pattern
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("clinicalskpattern")}
                    name="text"
                    type="text"
                    placeholder="Type here"
                  />
                </Box>
              </Grid>
            </Grid>

            <Typography fontWeight="bold" color="primary" variant="body1">
              Ephalometric Analysis
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography color="primary" variant="body2">
                  U.Incisor Angle
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("uincisor2")}
                    name="text"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
                <Typography color="primary" variant="body2">
                  L.Incisor Angle
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("lincisor2")}
                    name="text"
                    type="text"
                    placeholder="Type here"
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography color="primary" variant="body2">
                  S.N.A
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("sna")}
                    name="text"
                    type="text"
                    placeholder="Type here"
                  />
                </Box>
                <Typography color="primary" variant="body2">
                  S.N.B
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("snb")}
                    name="text"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography color="primary" variant="body2">
                  A.N.B
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("anb")}
                    name="text"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
                <Typography color="primary" variant="body2">
                  S.K Pattern
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("cephalometricskpattern")}
                    name="text"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography color="primary" variant="body2">
                  MM Angle
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("mmangle")}
                    name="text"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
              </Grid>
            </Grid>
            <Typography fontWeight="bold" color="primary" variant="body1">
              X-Ray Report
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography color="primary" variant="body2">
                  Unerupted Teeth
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("unreptedteeth")}
                    name="text"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
                <Typography color="primary" variant="body2">
                  Absent Teeth
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("absentteeth")}
                    name="text"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography color="primary" variant="body2">
                  Dental Care
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("dentalcare")}
                    name="text"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
              </Grid>
            </Grid>
            <Typography fontWeight="bold" color="primary" variant="body1">
              Summary of Orthodontic Analysis
            </Typography>
            <Box style={{ marginTop: "10px", marginBottom: "30px" }}>
              <Textarea
                color="primary"
                register={register("summary")}
                name="findings"
                type="text"
                placeholder="Type here..."
              />
            </Box>

            <Typography fontWeight="bold" color="primary" variant="body1">
              Plan of Treatment
            </Typography>
            <Box style={{ marginTop: "10px", marginBottom: "30px" }}>
              <Textarea
                color="primary"
                register={register("plantreatment")}
                name="findings"
                type="text"
                placeholder="Type here..."
              />
            </Box>
            <Typography fontWeight="bold" color="primary" variant="body1">
              Other Remarks
            </Typography>
            <Box style={{ marginTop: "10px", marginBottom: "30px" }}>
              <Textarea
                color="primary"
                register={register("otherremarks")}
                name="findings"
                type="text"
                placeholder="Type here..."
              />
            </Box>

            <Box
              sx={{
                gap: "1rem",
              }}
            >
              <RadioButton
                onChange={handleChangeStatus}
                name="status"
                options={["Draft", "Final"]}
                value={docStatus}
              />
            </Box>
            <Box
              spacing={3}
              sx={{
                display: "flex",
                gap: "3rem",
              }}
            >
              <GlobalCustomButton
                color="secondary"
                type="submit"
                onClick={() => setConfirmationDialog(true)}
              >
                Submit Othodontic Form
              </GlobalCustomButton>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
}

export function NursingNoteCreate() {
  const { register, handleSubmit, setValue, reset } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);
  const [confirmationDiaglog, setConfirmationDialog] = useState(false);

  const [docStatus, setDocStatus] = useState("Draft");

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!!draftDoc && draftDoc.status === "Draft") {
      Object.entries(draftDoc.documentdetail).map(([keys, value], i) =>
        setValue(keys, value, {
          shouldValidate: true,
          shouldDirty: true,
        })
      );
      // setSymptoms(draftDoc.documentdetail.Presenting_Complaints)
      // setAllergies(draftDoc.documentdetail.Allergy_Skin_Test)
    }
    return () => {
      draftDoc = {};
    };
  }, [draftDoc]);

  const getSearchfacility = (obj) => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
        setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        })  */
    }
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    //console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentname = "Nursing Note";
    document.documentType = "Nursing Note";
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = state.ClientModule.selectedClient._id;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = docStatus === "Draft" ? "Draft" : "completed";

    document.geolocation = {
      type: "Point",
      coordinates: [state.coordinates.latitude, state.coordinates.longitude],
    };
    // console.log(document)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast.error(
        "Documentation data missing, requires location and facility details"
      );
      return;
    }

    //return console.log(document);

    if (!!draftDoc && draftDoc.status === "Draft") {
      ClientServ.patch(draftDoc._id, document)
        .then((res) => {
          Object.keys(data).forEach((key) => {
            data[key] = "";
          });
          //console.log(JSON.stringify(res))

          setDocStatus("Draft");
          // setAllergies([])
          /*  setMessage("Created Client successfully") */
          setSuccess(true);
          toast.success("Nursing Note Document updated succesfully");
          setSuccess(false);
          reset(data);
          setConfirmationDialog(false);
        })
        .catch((err) => {
          toast.error("Error updating Documentation " + err);
        });
    } else {
      ClientServ.create(document)
        .then((res) => {
          //console.log(JSON.stringify(res))
          Object.keys(data).forEach((key) => {
            data[key] = "";
          });

          /*  setMessage("Created Client successfully") */
          setSuccess(true);
          toast.success("Nursing Note created succesfully");
          setSuccess(false);
          reset(data);
          setConfirmationDialog(false);
        })
        .catch((err) => {
          toast.error("Error creating Lab Result " + err);
        });
    }
    //}
  };

  const handleChangeStatus = async (e) => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };

  const closeEncounterRight = async () => {
    setState((prevstate) => ({
      ...prevstate,
      DocumentClassModule: {
        ...prevstate.DocumentClassModule,
        encounter_right: false,
      },
    }));
  };

  return (
    <>
      <div className="card ">
        <CustomConfirmationDialog
          open={confirmationDiaglog}
          cancelAction={() => setConfirmationDialog(false)}
          type="create"
          confirmationAction={handleSubmit(onSubmit)}
          message="You are about to save this document Nursing Note"
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={1}
        >
          <FormsHeaderText text={"Nursing Note"} />

          <IconButton onClick={closeEncounterRight}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <div className="card-content vscrollable remPad1">
          <form>
            <Box mb={1}>
              <Input register={register("Title")} type="text" label="Title" />
            </Box>
            <Box>
              <Textarea
                register={register("Documentation")}
                type="text"
                label="Documentation"
                placeholder="Write here......"
              />
            </Box>
            <Box>
              <Textarea
                register={register("Recommendation")}
                type="text"
                label="Recommendation"
                placeholder="Write here......"
              />
            </Box>
            <Box>
              <RadioButton
                onChange={handleChangeStatus}
                name="status"
                options={["Draft", "Final"]}
                value={docStatus}
              />
            </Box>
            <Box
              spacing={1}
              sx={{
                display: "flex",
                gap: "2rem",
              }}
            >
              <GlobalCustomButton
                color="secondary"
                type="button"
                onClick={() => setConfirmationDialog(true)}
              >
                Submit Nursing Note
              </GlobalCustomButton>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
}

export function DoctorsNoteCreate() {
  const { register, handleSubmit, setValue, control, reset } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [voiceRecommendation, setVoiceRecommendation] = useState(false);
  const [voiceDocumentation, setVoiceDocumentation] = useState(false);

  const [docStatus, setDocStatus] = useState("Draft");

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!!draftDoc && draftDoc.status === "Draft") {
      console.log(draftDoc.documentdetail);
      Object.entries(draftDoc.documentdetail).map(([keys, value], i) =>
        setValue(keys, value, {
          shouldValidate: true,
          shouldDirty: true,
        })
      );
      // setSymptoms(draftDoc.documentdetail.Presenting_Complaints)
      // setAllergies(draftDoc.documentdetail.Allergy_Skin_Test)
    }
    return () => {
      draftDoc = {};
    };
  }, [draftDoc]);

  const getSearchfacility = (obj) => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
        setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        })  */
    }
  });

  const onSubmit = (data) => {
    // e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    //console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentname = "Doctor Note";
    document.documentType = "Doctor Note";
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = state.ClientModule.selectedClient._id;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = docStatus === "Draft" ? "Draft" : "completed";

    document.geolocation = {
      type: "Point",
      coordinates: [state.coordinates.latitude, state.coordinates.longitude],
    };
    // console.log(document)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast.error(
        "Documentation data missing, requires location and facility details"
      );
      return;
    }

    //return console.log(document);

    // let confirm = window.confirm(
    //   `You are about to save this document ${document.documentname} ?`
    // );
    // if (confirm) {
    if (!!draftDoc && draftDoc.status === "Draft") {
      ClientServ.patch(draftDoc._id, document)
        .then((res) => {
          //console.log(JSON.stringify(res))
          Object.keys(data).forEach((key) => {
            data[key] = "";
          });

          setDocStatus("Draft");
          // setAllergies([])
          /*  setMessage("Created Client successfully") */
          setSuccess(true);
          toast.success("Doctor's Note Document succesfully updated");
          setSuccess(false);
          reset(data);
          setConfirmDialog(false);
        })
        .catch((err) => {
          toast.error("Error updating Documentation " + err);
        });
    } else {
      ClientServ.create(document)
        .then((res) => {
          /*  setMessage("Created Client successfully") */
          Object.keys(data).forEach((key) => {
            data[key] = "";
          });
          setSuccess(true);
          toast.success("Doctor's Note created succesfully");
          setSuccess(false);
          reset(data);
          setConfirmDialog(false);
        })
        .catch((err) => {
          toast.error("Error creating Doctor's Note " + err);
        });
    }
    //}
  };

  const handleChangeStatus = async (e) => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };

  const handleChangePart = (e) => {
    console.log(e);
  };

  const closeEncounterRight = async () => {
    setState((prevstate) => ({
      ...prevstate,
      DocumentClassModule: {
        ...prevstate.DocumentClassModule,
        encounter_right: false,
      },
    }));
  };

  return (
    <>
      <div className="card ">
        <CustomConfirmationDialog
          open={confirmDialog}
          confirmationAction={handleSubmit(onSubmit)}
          cancelAction={() => setConfirmDialog(false)}
          type="create"
          message="You're about to save this document Doctor Note?"
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={1}
        >
          <FormsHeaderText text={"Doctor's Note"} />

          <IconButton onClick={closeEncounterRight}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <div className="card-content vscrollable remPad1">
          <form>
            <Box mb={1}>
              <Input register={register("Title")} type="text" label="Title" />
            </Box>

            {/* <Box>
              <Textarea
                register={register("Documentation")}
                type="text"
                label="Documentation"
                placeholder="Write here......"
              />
            </Box> */}

            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                mb={1}
              >
                <FormsHeaderText text="Documentation" />

                <Box>
                  {voiceDocumentation ? (
                    <GlobalCustomButton
                      onClick={() => setVoiceDocumentation(false)}
                    >
                      Type
                    </GlobalCustomButton>
                  ) : (
                    <GlobalCustomButton
                      onClick={() => setVoiceDocumentation(true)}
                    >
                      Speech
                    </GlobalCustomButton>
                  )}
                </Box>
              </Box>

              {voiceDocumentation ? (
                <VoiceTextArea
                  handleChange={(value) => setValue("Documentation", value)}
                  placeholder="click start before talking...."
                />
              ) : (
                <Textarea
                  register={register("Documentation")}
                  type="text"
                  //label="Documentation"
                  placeholder="Write here......"
                />
              )}
            </Box>

            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                mb={1}
              >
                <FormsHeaderText text="Recommendation" />

                <Box>
                  {voiceRecommendation ? (
                    <GlobalCustomButton
                      onClick={() => setVoiceRecommendation(false)}
                    >
                      Type
                    </GlobalCustomButton>
                  ) : (
                    <GlobalCustomButton
                      onClick={() => setVoiceRecommendation(true)}
                    >
                      Speech
                    </GlobalCustomButton>
                  )}
                </Box>
              </Box>

              {voiceRecommendation ? (
                <VoiceTextArea
                  handleChange={(value) => setValue("Recommendation", value)}
                  placeholder="click start before talking...."
                />
              ) : (
                <Textarea
                  register={register("Recommendation")}
                  type="text"
                  //label="Recommendation"
                  placeholder="Write here......"
                />
              )}
            </Box>

            <Box>
              <RadioButton
                onChange={handleChangeStatus}
                name="status"
                options={["Draft", "Final"]}
                value={docStatus}
              />
            </Box>

            <Box
              spacing={1}
              sx={{
                display: "flex",
                gap: "2rem",
              }}
            >
              <GlobalCustomButton
                color="secondary"
                type="button"
                onClick={() => setConfirmDialog(true)}
              >
                Submit Doctor's Note
              </GlobalCustomButton>
              {/* <Button variant="outlined" type="button">
                Cancel
              </Button> */}
            </Box>
          </form>
        </div>
      </div>
    </>
  );
}

// Dental Lab
export function DentalLab() {
  const { register, handleSubmit, setValue, reset, control, getValues } =
    useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const ClientServ = client.service("clinicaldocument");
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);

  const [docStatus, setDocStatus] = useState("Draft");
  const [confirmationDiaglog, setConfirmationDialog] = useState(false);

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!!draftDoc && draftDoc.status === "Draft") {
      Object.entries(draftDoc.documentdetail).forEach(([key, value]) => {
        {
          setValue(key, value, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
      });
    }
    return () => {
      draftDoc = {};
    };
  }, [draftDoc]);

  useEffect(() => {
    setCurrentUser(user);
    return () => {};
  }, [user]);

  useEffect(() => {
    if (!user.stacker) {
    }
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);

    let document = {};
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = {
      "Summary of findings ": data.summary,
      "No of P T": data.nofpt,
      "D O T Impression": data.dotimpression,
      Sex: data.sex,
      Prothesis: data.prothesis,
      "No of Units": data.noofunits,
      "OR I/C": data.oric,
      "Dental Tech": data.dentaltech,
      Remarks: data.remarks,
    };

    const dateOfDelivery = new Date(data.dateOfdelivery).toLocaleDateString(
      undefined,
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
    document.documentdetail["Date of Delivery"] = dateOfDelivery;

    document.documentname = "Dental Lab";
    document.documentType = "Dental Lab";
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = state.ClientModule.selectedClient._id;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = docStatus === "Draft" ? "Draft" : "completed";

    document.geolocation = {
      type: "Point",
      coordinates: [state.coordinates.latitude, state.coordinates.longitude],
    };

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast.error(
        "Documentation data missing, requires location and facility details"
      );
      return;
    }

    if (!!draftDoc && draftDoc.documentdetail.status === "Draft") {
      ClientServ.patch(draftDoc._id, document)
        .then((res) => {
          Object.keys(data).forEach((key) => {
            data[key] = null;
          });
          setConfirmationDialog(false);
          hideActionLoader();
          setSuccess(true);
          reset(data);
          toast.success("Dental Lab Form updated successfully");
          setSuccess(false);
          closeForm();
        })
        .catch((err) => {
          toast.error("Error updating Dental Lab: " + err);
          reset(data);
          setConfirmationDialog(false);
        });
    } else {
      ClientServ.create(document)
        .then((res) => {
          // console.log("Data", res)
          Object.keys(data).forEach((key) => {
            data[key] = "";
          });

          setSuccess(true);
          toast.success("Dental Lab created successfully");
          setSuccess(false);
          reset(data);
          setConfirmationDialog(false);
        })
        .catch((err) => {
          toast.error("Error creating Dental Lab: " + err);
          setConfirmationDialog(false);
        });
    }
  };

  const closeEncounterRight = async () => {
    setState((prevstate) => ({
      ...prevstate,
      DocumentClassModule: {
        ...prevstate.DocumentClassModule,
        encounter_right: false,
      },
    }));
  };

  const handleChangeStatus = async (e) => {
    setDocStatus(e.target.value);
  };

  return (
    <>
      <div className="card ">
        <CustomConfirmationDialog
          open={confirmationDiaglog}
          cancelAction={() => setConfirmationDialog(false)}
          confirmationAction={handleSubmit(onSubmit)}
          type="create"
          message={`You are about to save this document ${getValues(
            "eye"
          )} Dental Lab?`}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={1}
        >
          <FormsHeaderText color="none" text={"DENTAL LAB FORM"} />

          <IconButton onClick={closeEncounterRight}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <div className="card-content vscrollable remPad1">
          <form>
            <Typography fontWeight="bold" color="primary" variant="body1">
              Summary of findings/Doctor prescription to lab
            </Typography>
            <Box style={{ marginTop: "10px", marginBottom: "30px" }}>
              <Textarea
                color="primary"
                register={register("summary")}
                name="summary"
                type="text"
                placeholder="Type here..."
              />
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography color="primary" variant="body2">
                  No of P.T
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("nofpt")}
                    name="nofpt"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
                <Typography color="primary" variant="body2">
                  D.O.T Impression
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("dotimpression")}
                    name="dotimpression"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography color="primary" variant="body2">
                  Sex M/F:
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("sex")}
                    name="sex"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
                <Typography color="primary" variant="body2">
                  Type of Prothesis:
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("prothesis")}
                    name="prothesis"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography color="primary" variant="body2">
                  No of Units
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("noofunits")}
                    name="noofunits"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
                <Typography color="primary" variant="body2">
                  Dental Tech:
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("dentaltech")}
                    name="oric"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography color="primary" variant="body2">
                  OR I/C
                </Typography>
                <Box mb={1}>
                  <Input
                    register={register("oric")}
                    name="dentaltech"
                    type="text"
                    placeholder="Type here..."
                  />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "0.85rem" }}>
                    Date of Delivery
                  </Typography>
                  <MuiCustomDatePicker
                    name="dateOfdelivery"
                    control={control}
                  />
                </Box>
              </Grid>
            </Grid>

            <Typography fontWeight="bold" color="primary" variant="body1">
              Remarks
            </Typography>
            <Box style={{ marginTop: "10px", marginBottom: "30px" }}>
              <Textarea
                color="primary"
                register={register("remarks")}
                name="remarks"
                type="text"
                placeholder="Type in remarks..."
              />
            </Box>

            <Box
              sx={{
                gap: "1rem",
              }}
            >
              <RadioButton
                onChange={handleChangeStatus}
                name="status"
                options={["Draft", "Final"]}
                value={docStatus}
              />
            </Box>
            <Box
              spacing={3}
              sx={{
                display: "flex",
                gap: "3rem",
              }}
            >
              <GlobalCustomButton
                color="secondary"
                type="submit"
                onClick={() => setConfirmationDialog(true)}
              >
                Submit Dental Lab Form
              </GlobalCustomButton>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
}

export function PrescriptionCreate() {
  const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state } = useContext(ObjectContext);

  const getSearchfacility = (obj) => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
        setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        })  */
    }
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentname =
      state.DocumentClassModule.selectedDocumentClass.name;
    document.documentClassId =
      state.DocumentClassModule.selectedDocumentClass._id;
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = state.ClientModule.selectedClient._id;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = "completed";
    console.log(document);
    ClientServ.create(document)
      .then((res) => {
        //console.log(JSON.stringify(res))

        /*  setMessage("Created Client successfully") */
        setSuccess(true);
        toast({
          message: "Documentation created succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        setSuccess(false);
      })
      .catch((err) => {
        toast({
          message: "Error creating Documentation " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">
            {state?.DocumentClassModule.selectedDocumentClass.name || ""}
          </p>
        </div>
        <div className="card-content vscrollable">
          {/* <p className=" is-small">
                    Kindly search Client list before creating new Clients!
                </p> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ paddingBlock: "1rem" }}>
              <Input
                register={register("input_text")}
                name="text"
                type="text"
                placeholder="Title"
              />
            </Box>
            <Box sx={{ paddingBlock: "1rem" }}>
              <Textarea
                register={register("input_text")}
                name="findings"
                type="text"
                placeholder="Documentation"
              />
            </Box>
            <Box sx={{ paddingBlock: "1rem" }}>
              <Textarea
                register={register("input_text")}
                name="text"
                type="text"
                placeholder="Recommendation"
              />
            </Box>
            <Box>
              <RadioButton
                register={register("input_text")}
                options={["Draft", "Final"]}
              />
            </Box>
            <Box
              spacing={1}
              sx={{
                display: "flex",
                gap: "2rem",
              }}
            >
              <Button variant="contained" type="button">
                Save
              </Button>
              <Button variant="outlined" type="button">
                Cancel
              </Button>
            </Box>

            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="temperature"
                      type="text"
                      spellCheck="true"
                      placeholder="temperature"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-hospital"></i>
                    </span>
                  </p>
                </div>

                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="pulse"
                      type="text"
                      spellCheck="true"
                      placeholder="pulse"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-map-signs"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="respiratory_rate"
                      type="text"
                      spellCheck="true"
                      placeholder="Respiratory rate"
                    />
                    <span className="icon is-small is-left">
                      <i className=" fas fa-user-md "></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="random_glucose"
                      type="text"
                      spellCheck="true"
                      placeholder="Blood Glucose"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="systolic_BP"
                      type="text"
                      spellCheck="true"
                      placeholder="Systolic BP"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="diastolic_BP"
                      type="text"
                      spellCheck="true"
                      placeholder="Diastolic_BP"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="SPO2"
                      type="text"
                      spellCheck="true"
                      placeholder="SPO2"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="pain"
                      type="text"
                      spellCheck="true"
                      placeholder="Pain"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body"></div>
            </div>

            <div className="field  is-grouped mt-2">
              <p className="control">
                <button type="submit" className="button is-success is-small">
                  Save
                </button>
              </p>
              <p className="control">
                <button className="button is-warning is-small" type="reset">
                  Cancel
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export function LabrequestCreate() {
  const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state } = useContext(ObjectContext);

  const getSearchfacility = (obj) => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
        setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        })  */
    }
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentname =
      state.DocumentClassModule.selectedDocumentClass.name;
    document.documentClassId =
      state.DocumentClassModule.selectedDocumentClass._id;
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = state.ClientModule.selectedClient._id;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = "completed";
    console.log(document);
    ClientServ.create(document)
      .then((res) => {
        //console.log(JSON.stringify(res))

        /*  setMessage("Created Client successfully") */
        setSuccess(true);
        toast({
          message: "Documentation created succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        setSuccess(false);
      })
      .catch((err) => {
        toast({
          message: "Error creating Documentation " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">
            {state?.DocumentClassModule.selectedDocumentClass.name || ""}
          </p>
        </div>
        <div className="card-content vscrollable">
          {/* <p className=" is-small">
                    Kindly search Client list before creating new Clients!
                </p> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="temperature"
                      type="text"
                      spellCheck="true"
                      placeholder="temperature"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-hospital"></i>
                    </span>
                  </p>
                </div>

                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="pulse"
                      type="text"
                      spellCheck="true"
                      placeholder="pulse"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-map-signs"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="respiratory_rate"
                      type="text"
                      spellCheck="true"
                      placeholder="Respiratory rate"
                    />
                    <span className="icon is-small is-left">
                      <i className=" fas fa-user-md "></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="random_glucose"
                      type="text"
                      spellCheck="true"
                      placeholder="Blood Glucose"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="systolic_BP"
                      type="text"
                      spellCheck="true"
                      placeholder="Systolic BP"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="diastolic_BP"
                      type="text"
                      spellCheck="true"
                      placeholder="Diastolic_BP"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="SPO2"
                      type="text"
                      spellCheck="true"
                      placeholder="SPO2"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="pain"
                      type="text"
                      spellCheck="true"
                      placeholder="Pain"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body"></div>
            </div>

            <div className="field  is-grouped mt-2">
              <p className="control">
                <button type="submit" className="button is-success is-small">
                  Save
                </button>
              </p>
              <p className="control">
                <button className="button is-warning is-small" type="reset">
                  Cancel
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
