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
import DentalLab from "./DentalLab";
import PhysiotherapyHistory from "./PhysiotherapyHistory";
import SurgicalBookletConsentForm from "../clientForm/forms/surgicalBookletConsentForm";
import { usePosition } from "../../components/hooks/getUserLocation";
import Textarea from "../../components/inputs/basic/Textarea";
import { Box, getValue } from "@mui/system";
import RadioButton from "../../components/inputs/basic/Radio";

// new
import CustomSelect from "../../components/inputs/basic/Select";
import CustomTable from "../../components/customtable";
import Icd11Search from "../helpers/icd11search";
import ModalBox from "../../components/modal";
import ClaimCreateDiagnosis from "../Corporate/components/claims/Diagnosis";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  Button,
  Grid,
  IconButton,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
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
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

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
        "Eye examination" && <EyeExamination />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Dental Clinic" && <DentalClinic onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Orthodontic Analysis" && (
        <OrthodonticAnalysis onSubmit={submitDocument} />
      )}

      {/*  */}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Preventive Care" && <PreventiveCare />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Dental Lab" && <DentalLab />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Physiotherapy Medical Screening" && <MedicalScreeningForm />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Physiotherapy History & Interview Form" && <PhysiotherapyHistory />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Back Pain Questionnaire" && <BackPainQuestionnaireCreate />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Fear-Avoidance Beliefs Questionnaire (FABQ)" && (
        <FearAvoidanceBeliefsQuestionnaireCreate />
      )}
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
  const { control, register, handleSubmit, setValue, reset } = useForm(); //, watch, errors, reset
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
  //new diagonsis
  const [data, setData] = useState([]);
  const [icd, setIcd] = useState([]);
  const [clear, setClear] = useState(false);
  const [diagnosis, setDiagnosis] = useState([]);
  const [diagnosisModal, setDiagnosisModal] = useState(false);

  const columnSchema = [
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

  // const handleGetService = (param) => {
  //   //console.log(data);
  //   setIcd(param);
  //   // setValue("unitprice", data ? data.price : 0);
  // };

  // const handleAddDiagnosis = (data) => {
  //   const diagnosis = {
  //     ...data,
  //     ...icd,
  //     // _id: uuidv4(),
  //   };
  //   setDiagnosis((prev) => [diagnosis, ...prev]);
  //   toast.success("Diagnosis successfully listed.");
  //   reset({
  //     type: null,
  //     diagnosis: null,
  //     code: "",
  //   });
  // };

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!!draftDoc && draftDoc.status === "Draft") {
      Object.entries(draftDoc.documentdetail).map(([keys, value], i) => {
        console.log("====>>>> draft", {
          keys,
          value,
        });

        if (keys === "diagnosis") {
          setDiagnosis(value);
        }
        setValue(keys, value, {
          shouldValidate: true,
          shouldDirty: true,
        });
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

  const document_name = state.DocumentClassModule.selectedDocumentClass.name;

  const onSubmit = (data, e) => {
    console.log("start now", {
      data,
      diagnosis,
    });
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }

    // const dataDetail = {
    //   ...data,
    //   diagnosis,
    // };
    data.diagnosis = diagnosis;
    document.documentdetail = data;

    console.log("start now document", {
      documentdetail: document.documentdetail,
    });
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
      console.log("Clinincal note created draft");
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
      console.log("Clinincal note created");
      ClientServ.create(document)
        .then((res) => {
          console.log("Clinincal note data", res);
          setDiagnosis([]);

          Object.keys(data).forEach((key) => {
            data[key] = "";
          });

          console.log("goood");
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

        <ModalBox
          open={diagnosisModal}
          onClose={() => setDiagnosisModal(false)}
          header="Add Diagnosis to Claim"
        >
          <ClaimCreateDiagnosis
            closeModal={() => setDiagnosisModal(false)}
            setDiagnosis={setDiagnosis}
          />
        </ModalBox>

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
            {/*  */}
            <Box>
              {/* <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: "200",
                  marginBottom: "8px",
                }}
              >
                Add Diagnosis to form
              </Typography>
              <Grid container spacing={2} mb={3} mt={0.2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <CustomSelect
                    // important
                    label="Diagnosis Type"
                    control={control}
                    name="type"
                    options={[
                      "Associated diagnosis",
                      "Co-morbidity Diagnosis",
                      "Principal diagnosis",
                      "Provisional Diagnosis",
                      "Rule-Out Diagnosis ",
                      "Working Diagnosis",
                    ]}
                    required={false}
                  />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Input
                    required={false}
                    // important
                    label="Diagnosis"
                    register={register("diagnosis", {
                      required: "Please enter Diagnosis",
                    })}
                  />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Icd11Search
                    getSearchfacility={handleGetService}
                    clear={clear}
                  />
                </Grid>
              </Grid> */}

              {/* 

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                }}
              >
                <GlobalCustomButton onClick={handleSubmit(handleAddDiagnosis)}>
                  Save Diagnosis
                </GlobalCustomButton>
              </Box> */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                mb={1.5}
              >
                <FormsHeaderText text="Diagnosis Data" />

                <GlobalCustomButton onClick={() => setDiagnosisModal(true)}>
                  <AddBoxIcon sx={{ marginRight: "3px" }} fontSize="small" />
                  Add Diagnosis
                </GlobalCustomButton>
              </Box>
              <Box>
                <CustomTable
                  title={""}
                  columns={columnSchema}
                  data={diagnosis}
                  pointerOnHover
                  highlightOnHover
                  striped
                  //onRowClicked={handleRow}
                  //conditionalRowStyles={conditionalRowStyles}
                  progressPending={false}
                  CustomEmptyData={
                    <Typography sx={{ fontSize: "0.8rem" }}>
                      You've not added a Diagnosis yet...
                    </Typography>
                  }
                />
              </Box>
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

export function FearAvoidanceBeliefsQuestionnaireCreateNew() {
  const { control, register, handleSubmit, setValue, reset } = useForm(); //, watch, errors, reset
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
  //new diagonsis
  const [data, setData] = useState([]);
  const [icd, setIcd] = useState([]);
  const [clear, setClear] = useState(false);
  const [diagnosis, setDiagnosis] = useState([]);
  const [diagnosisModal, setDiagnosisModal] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [allCheckBoxSchema, setAllCheckBoxSchema] = useState([]);

  const columnSchema = [
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

  const handleCheckboxChange = (
    event,
    painIntensityCheckBoxSchema,
    setPainIntensityCheckBoxSchema,
    selectedSchemaName
  ) => {
    const { name, checked, value } = event.target;
    let totalPoint;
    let totalPointObtain;
    let total;
    const existcheckbox = false;
    const currentPoint = Number(value);
    const selectedCheckBoxSchema = {
      schemaName: painIntensityCheckBoxSchema[0].schemaName,
      schemaPoint: currentPoint,
    };

    console.log("==>>>  state allCheckBoxSchema", {
      allCheckBoxSchema,
    });

    if (allCheckBoxSchema.length > 0) {
      // const existcheckboxSchema = allCheckBoxSchema.find(
      //   (data) => data.name === selectedSchemaName
      // );
      const othercheckboxSchemaArr = allCheckBoxSchema.filter(
        (data) => data.schemaName !== selectedSchemaName
      );
      const prevTotalPoint = othercheckboxSchemaArr.length * 5;
      totalPoint = prevTotalPoint + 5;
      const totalPointObtainFromOther = othercheckboxSchemaArr.reduce(
        (accumulator, currentObject) => {
          return accumulator + currentObject.schemaPoint;
        },
        0
      );

      totalPointObtain = totalPointObtainFromOther + currentPoint;
      total = Math.round((totalPointObtain / totalPoint) * 100);

      const updatedCheckboxSchemaArr = [
        ...othercheckboxSchemaArr,
        selectedCheckBoxSchema,
      ];
      setTotalScore(total);
      setAllCheckBoxSchema(updatedCheckboxSchemaArr);
      console.log("==>>>  score for lenght != 0", {
        othercheckboxSchemaArr,
        selectedCheckBoxSchema,
        updatedCheckboxSchemaArr,
        prevTotalPoint,
        totalPointObtain,
        totalPoint,
        total,
      });
    }

    if (allCheckBoxSchema.length === 0) {
      totalPoint = 5 * 1;
      totalPointObtain = currentPoint;
      total = Math.round((totalPointObtain / totalPoint) * 100);
      setTotalScore(total);
      setAllCheckBoxSchema([selectedCheckBoxSchema]);
      console.log("==>>>  score for lenght == 0", {
        totalPointObtain,
        totalPoint,
        total,
      });
    }

    setValue(name, checked);
    if (checked) {
      const updatedData = painIntensityCheckBoxSchema.map((data) => {
        const checkboxName = data.name;
        if (checkboxName !== name) {
          setValue(checkboxName, false);
        }
        if (data.name === name) {
          return {
            ...data,
            checked: true,
          };
        } else {
          return {
            ...data,
            checked: false,
          };
        }
      });
      setPainIntensityCheckBoxSchema(updatedData);
    }
  };

  const selectOptions = [
    {
      label: "0",
      value: "0",
    },
    {
      label: "1",
      value: "1",
    },
    {
      label: "2",
      value: "2",
    },
    {
      label: "3",
      value: "3",
    },
    {
      label: "4",
      value: "4",
    },
    {
      label: "5",
      value: "5",
    },
    {
      label: "6",
      value: "6",
    },
  ];

  const painDropdownSchema = [
    {
      description: "My pain was caused by physical activity",
      name: "painDropdown_one",
    },

    {
      description: "Physical activity makes my pain worse",
      name: "painDropdown_Two",
    },
    {
      description: "Physical activity might harm my back",
      name: "painDropdown_Three",
    },
    {
      description:
        "I should not do physical activities which (might) make my pain worse",
      name: "painDropdown_Four",
    },
    {
      description:
        "I cannot do physical activities which (might) make my pain worse",
      name: "painDropdown_Five",
    },
  ];

  const painDropdownTwoSchema = [
    {
      description: "My pain was caused by my work or by an accident at work",
      name: "painDropdown_Six",
    },
    {
      description: "My work aggravated my pain",
      name: "painDropdown_Seven",
    },
    {
      description: "I have a claim for compensation for my pain",
      name: "painDropdown_Eight",
    },
    {
      description: "My work is too heavy for me",
      name: "painDropdown_Nine",
    },
    {
      description: "My work makes or would make my pain worse",
      name: "painDropdown_Ten",
    },
    {
      description: "My work might harm my back",
      name: "painDropdown_Eleven",
    },
    {
      description: "I should not do my normal work with my present pain",
      name: "painDropdown_Twelve",
    },
    {
      description: "I cannot do my normal work with my present pain",
      name: "painDropdown_Thirteen",
    },
    {
      description: "I cannot do my normal work till my pain is treated",
      name: "painDropdown_Fourteen",
    },
    {
      description:
        "I do not think that I will be back to my normal work within 3 months",
      name: "painDropdown_Fifteen",
    },
    {
      description:
        "I do not think that I will ever be able to go back to that work",
      name: "painDropdown_Sixteen",
    },
  ];

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!!draftDoc && draftDoc.status === "Draft") {
      Object.entries(draftDoc.documentdetail).map(([keys, value], i) => {
        console.log("====>>>> draft", {
          keys,
          value,
        });

        // if (keys === "diagnosis") {
        //   setDiagnosis(value);
        // }
        setValue(keys, value, {
          shouldValidate: true,
          shouldDirty: true,
        });
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

  const document_name = state.DocumentClassModule.selectedDocumentClass.name;

  const onSubmit = (data, e) => {
    console.log("start now", {
      data,
    });

    return;
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }

    // const dataDetail = {
    //   ...data,
    //   diagnosis,
    // };
    data.diagnosis = diagnosis;
    document.documentdetail = data;

    console.log("start now document", {
      documentdetail: document.documentdetail,
    });
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
      console.log("Clinincal note created draft");
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
      console.log("Clinincal note created");
      ClientServ.create(document)
        .then((res) => {
          console.log("Clinincal note data", res);
          setDiagnosis([]);

          Object.keys(data).forEach((key) => {
            data[key] = "";
          });

          console.log("goood");
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
          message={`You are about to save this Fear-Avoidance Beliefs Questionnaire (FABQ) document?`}
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
            text={"Fear-Avoidance Beliefs Questionnaire (FABQ)"}
          />

          <IconButton onClick={closeEncounterRight}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <div className="card-content vscrollable">
          {/* <form>
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                mb={1.5}
              >
                <FormsHeaderText text="Diagnosis Data" />

                <GlobalCustomButton onClick={() => setDiagnosisModal(true)}>
                  <AddBoxIcon sx={{ marginRight: "3px" }} fontSize="small" />
                  Add Diagnosis
                </GlobalCustomButton>
              </Box>
              <Box>
                <CustomTable
                  title={""}
                  columns={columnSchema}
                  data={diagnosis}
                  pointerOnHover
                  highlightOnHover
                  striped
                  //onRowClicked={handleRow}
                  //conditionalRowStyles={conditionalRowStyles}
                  progressPending={false}
                  CustomEmptyData={
                    <Typography sx={{ fontSize: "0.8rem" }}>
                      You've not added a Diagnosis yet...
                    </Typography>
                  }
                />
              </Box>
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
          </form> */}
          <form>
            {/*  Fear-Avoidance Beliefs Questionnaire (FABQ)  */}
            <Grid container spacing={0.1} mt={2}>
              <Typography
                variant="p"
                sx={{ color: "blue", fontSize: "14px", fontWeight: "bold" }}
              >
                Fear-Avoidance Beliefs Questionnaire (FABQ)
              </Typography>
              <Grid container spacing={0.1} alignItems="center">
                <Typography
                  variant="p"
                  sx={{ color: "black", fontSize: "14px" }}
                >
                  Here are some of the things which other patients have told us
                  about their pain. For each statement please circle any number
                  from 0 to 6 to say how many physical activities such as
                  bending, lifting, walking or driving affect or would affect
                  your back pain.
                </Typography>
              </Grid>
            </Grid>

            {/* no 1-5 drop down    */}
            <Grid container spacing={1} mt={1}>
              {painDropdownSchema.map((data, index) => (
                <Grid
                  container
                  key={index}
                  spacing={2}
                  alignItems="center"
                  mt={0.5}
                >
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="p"
                      sx={{
                        color: "black",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {index + 1}.
                    </Typography>{" "}
                    <Typography
                      variant="p"
                      sx={{ color: "black", fontSize: "14px" }}
                    >
                      {data.description}
                    </Typography>
                  </Grid>

                  <Grid item container xs={12} sm={6}>
                    <Grid item xs={12} sm={6}>
                      <CustomSelect
                        label="select"
                        // required
                        control={control}
                        name={data.name}
                        options={selectOptions}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>

            <Grid container spacing={0.1} mt={1}>
              <Typography
                variant="p"
                sx={{ color: "black", fontSize: "14px", fontWeight: "bold" }}
              >
                The following statements are about how your normal work affects
                or would affect your back pain
              </Typography>
            </Grid>

            {/* <Grid container spacing={1} mt={1}>
              {painDropdownTwoSchema.map((data, index) => (
                <Grid
                  container
                  key={index + 6}
                  spacing={2}
                  alignItems="center"
                  mt={0.5}
                >
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="p"
                      sx={{
                        color: "black",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {index + 6}.
                    </Typography>{" "}
                    <Typography
                      variant="p"
                      sx={{ color: "black", fontSize: "14px" }}
                    >
                      {data.description}
                    </Typography>
                  </Grid>

                  <Grid item container xs={12} sm={6}>
                    <Grid item xs={12} sm={6}>
                      <CustomSelect
                        label="select"
                        required
                        control={control}
                        name={data.name}
                        options={selectOptions}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid> */}

            {/*  score  */}

            {/* <Grid container spacing={0.1} mt={1}>
              <Typography
                variant="p"
                sx={{ color: "black", fontSize: "14px", fontWeight: "bold" }}
              >
                Total Points:
              </Typography>
            </Grid>

            <Grid container spacing={0.1} mt={1}>
              <Typography
                variant="p"
                sx={{ color: "black", fontSize: "14px", fontWeight: "bold" }}
              >
                Physical activity subscale:
              </Typography>
            </Grid>

            <Grid container spacing={0.1} mt={1}>
              <Typography
                variant="p"
                sx={{ color: "black", fontSize: "14px", fontWeight: "bold" }}
              >
                Work Subscale:
              </Typography>
            </Grid> */}

            {/* Recommendation field */}
            <Grid container spacing={1} mt={2}>
              <Typography
                variant="p"
                sx={{
                  color: "blue",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              >
                Comment
              </Typography>
              <Grid item xs={12} sm={12}>
                <Textarea
                  placeholder="Comment"
                  name="Comment"
                  type="text"
                  register={register("Comment")}
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
                type="submit"
                onClick={() => setConfirmationDialog(true)}
              >
                Submit Lab Result
              </GlobalCustomButton>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
}

export function FearAvoidanceBeliefsQuestionnaireCreate() {
  const { register, handleSubmit, setValue, reset, getValues, control } =
    useForm(); //, watch, errors, reset

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
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [docStatus, setDocStatus] = useState("Draft"); //employmentHomemaking
  const [totalScore, setTotalScore] = useState(0);
  const [workSubscaleTotalScore, setWorkSubscaleTotalScore] = useState(0);
  const [
    physicalActivitiesSubscaleTotalScore,
    setPhysicalActivitiesSubscaleTotalScore,
  ] = useState(0);
  const [allCheckBoxSchema, setAllCheckBoxSchema] = useState([]);

  const [customSelectValues, setCustomSelectValues] = useState({
    painDropdown_one: 0,
    painDropdown_Two: 0,
    painDropdown_Three: 0,
    painDropdown_Four: 0,
    painDropdown_Five: 0,
    painDropdown_Six: 0,
    painDropdown_Seven: 0,
    painDropdown_Eight: 0,
    painDropdown_Nine: 0,
    painDropdown_Ten: 0,
    painDropdown_Eleven: 0,
    painDropdown_Twelve: 0,
    painDropdown_Thirteen: 0,
    painDropdown_Fourteen: 0,
    painDropdown_Fifteen: 0,
    painDropdown_Sixteen: 0,
  });

  const calculateTotalScore = (values) => {
    const selectedValues = Object.values(data)
      .filter((value) => value !== undefined && value !== "")
      .map(Number); // Convert selected values to numbers for addition

    const refineSelectedValues = selectedValues.filter(function (value) {
      return !isNaN(value);
    });

    const totalPoints = refineSelectedValues.reduce(
      (acc, value) => acc + value,
      0
    );
    setCustomSelectValues(values); // Update the custom select values
    // setValue('totalScore', totalPoints); // Update the totalScore field
    setTotalScore(totalPoints);
  };

  // Function to handle custom select change
  const handleCustomSelectChange = (name, value) => {
    console.log("event name", {
      name,
      value,
    });
    const updatedCustomSelectValues = {
      ...customSelectValues,
      [name]: parseInt(value),
    };
    calculateTotalScore(updatedCustomSelectValues);
  };

  const processData = (data) => {
    // Define a mapping for the score values
    const scoreMapping = {
      0: "Completely Disagree",
      1: "Unsure",
      2: "Unsure",
      3: "Unsure",
      4: "Completely Agree",
      5: "Completely Agree",
      6: "Completely Agree",
    };

    // Extract the totalScore
    const totalScore = data["Total Score"];

    // Process the comments and replace them based on the mapping
    const updatedData = {
      Comment: data.Comment,
      "Total Score": totalScore,
      "Physical activity subscale Point":
        data["Physical activity subscale Point"],
      "Work Subscale Point": data["Work Subscale Point"],
    };

    for (const key in data) {
      if (key !== "Comment" && key !== "Total Score") {
        const score = data[key];
        updatedData[key] = scoreMapping[score];
      }
    }

    return updatedData;
  };

  const getTotalValueForSubscale = (selectData, dropdownSchema) => {
    let totalValue = 0;

    dropdownSchema.forEach((item) => {
      const key = item.description;
      const value = parseInt(selectData[key]);
      if (!isNaN(value)) {
        totalValue += value;
      }
    });

    return totalValue;
  };

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!!draftDoc && draftDoc.status === "Draft") {
      Object.entries(draftDoc.documentdetail).map(([keys, value], i) => {
        if (keys === "Work Subscale Point") {
          setWorkSubscaleTotalScore(value);
        }

        if (keys === "Physical activity subscale Point") {
          setPhysicalActivitiesSubscaleTotalScore(value);
        }
        if (keys === "Total Score") {
          setTotalScore(value);
        }

        setValue(keys, value, {
          shouldValidate: true,
          shouldDirty: true,
        });
      });
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

  // const onSubmit = (data, e) => {
  //   e.preventDefault();
  //   console.log("===>>>> data", { data });
  // };

  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id

    const finalData = {};

    for (const key in data) {
      if (
        key !== "Comment" &&
        key !== "Physical activity subscale Point" &&
        key !== "Work Subscale Point" &&
        key !== "Total Score" &&
        key !== "totalScore"
      ) {
        finalData[key] = data[key];
      }
    }
    console.log("===>datttaa", { data, finalData });

    // Check if all custom selects are selected
    const selectedValues = Object.values(finalData)
      .filter((value) => value !== undefined && value !== "")
      .map(Number); // Convert selected values to numbers for addition

    const refineSelectedValues = selectedValues.filter(function (value) {
      return !isNaN(value);
    });

    const totalPoints = refineSelectedValues.reduce(
      (acc, value) => acc + value,
      0
    );

    const totalScoreForWorkSubscale = getTotalValueForSubscale(
      data,
      painDropdownSchemaForWorkSubscale
    );
    const totalScoreForPhysicalActivitiesSubscale = getTotalValueForSubscale(
      data,
      painDropdownSchemaForPhysicalActivitiesSubscale
    );

    setWorkSubscaleTotalScore(totalScoreForWorkSubscale);
    setPhysicalActivitiesSubscaleTotalScore(
      totalScoreForPhysicalActivitiesSubscale
    );
    setTotalScore(totalPoints);

    let addedData = {
      ...data,
      "Physical activity subscale Point":
        totalScoreForPhysicalActivitiesSubscale,
      "Work Subscale Point": totalScoreForWorkSubscale,
      "Total Score": totalPoints,
    };

    console.log("====>>>> ", { refineSelectedValues, addedData, docStatus });

    // Check if any custom select is not selected
    if (refineSelectedValues.length < 15 && docStatus !== "Draft") {
      // Adjust the count based on your selects
      setError(true);
      setMessage("Please select all custom selects.");
      toast.error(
        "Please, You are yet to select an option for all the questions"
      );
      setSuccess(false);
      setConfirmationDialog(false);
      return;
    }

    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }

    console.log("===>>>> data onsubmit", { data: "updatedData" });
    document.documentdetail = addedData;
    document.documentname = `Fear-Avoidance Beliefs Questionnaire (FABQ)`; //"Lab Result"
    document.documentType = "Fear-Avoidance Beliefs Questionnaire (FABQ)";
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
    // console.log(document)??????????

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
      const processdata = processData(addedData);
      const dataForFinal = {
        ...processdata,
        "Physical activity subscale Point":
          totalScoreForPhysicalActivitiesSubscale,
        "Work Subscale Point": totalScoreForWorkSubscale,
      };

      const updatedData =
        document.status === "Draft" ? addedData : dataForFinal;

      document.documentdetail = updatedData;

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
          setConfirmationDialog(false);
        })
        .catch((err) => {
          toast.error("Error updating Documentation " + err);
          reset(data);
          setConfirmationDialog(false);
        });
    } else {
      const processdata = processData(addedData);
      const dataForFinal = {
        ...processdata,
        "Physical activity subscale Point":
          totalScoreForPhysicalActivitiesSubscale,
        "Work Subscale Point": totalScoreForWorkSubscale,
      };

      const updatedData =
        document.status === "Draft" ? addedData : dataForFinal;

      document.documentdetail = updatedData;
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
          setConfirmationDialog(false);
        })
        .catch((err) => {
          toast.error("Error creating Lab Result " + err);
          setConfirmationDialog(false);
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

  const handleCheckboxChange = (
    event,
    painIntensityCheckBoxSchema,
    setPainIntensityCheckBoxSchema,
    selectedSchemaName
  ) => {
    const { name, checked, value } = event.target;
    let totalPoint;
    let totalPointObtain;
    let total;
    const existcheckbox = false;
    const currentPoint = Number(value);
    const selectedCheckBoxSchema = {
      schemaName: painIntensityCheckBoxSchema[0].schemaName,
      schemaPoint: currentPoint,
    };

    console.log("==>>>  state allCheckBoxSchema", {
      allCheckBoxSchema,
    });

    if (allCheckBoxSchema.length > 0) {
      // const existcheckboxSchema = allCheckBoxSchema.find(
      //   (data) => data.name === selectedSchemaName
      // );
      const othercheckboxSchemaArr = allCheckBoxSchema.filter(
        (data) => data.schemaName !== selectedSchemaName
      );
      const prevTotalPoint = othercheckboxSchemaArr.length * 5;
      totalPoint = prevTotalPoint + 5;
      const totalPointObtainFromOther = othercheckboxSchemaArr.reduce(
        (accumulator, currentObject) => {
          return accumulator + currentObject.schemaPoint;
        },
        0
      );

      totalPointObtain = totalPointObtainFromOther + currentPoint;
      total = Math.round((totalPointObtain / totalPoint) * 100);

      const updatedCheckboxSchemaArr = [
        ...othercheckboxSchemaArr,
        selectedCheckBoxSchema,
      ];
      setTotalScore(total);
      setAllCheckBoxSchema(updatedCheckboxSchemaArr);
      console.log("==>>>  score for lenght != 0", {
        othercheckboxSchemaArr,
        selectedCheckBoxSchema,
        updatedCheckboxSchemaArr,
        prevTotalPoint,
        totalPointObtain,
        totalPoint,
        total,
      });
    }

    if (allCheckBoxSchema.length === 0) {
      totalPoint = 5 * 1;
      totalPointObtain = currentPoint;
      total = Math.round((totalPointObtain / totalPoint) * 100);
      setTotalScore(total);
      setAllCheckBoxSchema([selectedCheckBoxSchema]);
      console.log("==>>>  score for lenght == 0", {
        totalPointObtain,
        totalPoint,
        total,
      });
    }

    setValue(name, checked);
    if (checked) {
      const updatedData = painIntensityCheckBoxSchema.map((data) => {
        const checkboxName = data.name;
        if (checkboxName !== name) {
          setValue(checkboxName, false);
        }
        if (data.name === name) {
          return {
            ...data,
            checked: true,
          };
        } else {
          return {
            ...data,
            checked: false,
          };
        }
      });
      setPainIntensityCheckBoxSchema(updatedData);
    }
  };

  const selectOptions = [
    {
      label: "0",
      value: "0",
    },
    {
      label: "1",
      value: "1",
    },
    {
      label: "2",
      value: "2",
    },
    {
      label: "3",
      value: "3",
    },
    {
      label: "4",
      value: "4",
    },
    {
      label: "5",
      value: "5",
    },
    {
      label: "6",
      value: "6",
    },
  ];

  const painDropdownSchema = [
    {
      description: "My pain was caused by physical activity",
      name: "painDropdown_one",
    },

    {
      description: "Physical activity makes my pain worse",
      name: "painDropdown_Two",
    },
    {
      description: "Physical activity might harm my back",
      name: "painDropdown_Three",
    },
    {
      description:
        "I should not do physical activities which (might) make my pain worse",
      name: "painDropdown_Four",
    },
    {
      description:
        "I cannot do physical activities which (might) make my pain worse",
      name: "painDropdown_Five",
    },
  ];

  const painDropdownTwoSchema = [
    {
      description: "My pain was caused by my work or by an accident at work",
      name: "painDropdown_Six",
    },
    {
      description: "My work aggravated my pain",
      name: "painDropdown_Seven",
    },
    {
      description: "I have a claim for compensation for my pain",
      name: "painDropdown_Eight",
    },
    {
      description: "My work is too heavy for me",
      name: "painDropdown_Nine",
    },
    {
      description: "My work makes or would make my pain worse",
      name: "painDropdown_Ten",
    },
    {
      description: "My work might harm my back",
      name: "painDropdown_Eleven",
    },
    {
      description: "I should not do my normal work with my present pain",
      name: "painDropdown_Twelve",
    },
    {
      description: "I cannot do my normal work with my present pain",
      name: "painDropdown_Thirteen",
    },
    {
      description: "I cannot do my normal work till my pain is treated",
      name: "painDropdown_Fourteen",
    },
    {
      description:
        "I do not think that I will be back to my normal work within 3 months",
      name: "painDropdown_Fifteen",
    },
    {
      description:
        "I do not think that I will ever be able to go back to that work",
      name: "painDropdown_Sixteen",
    },
  ];

  const painDropdownSchemaForWorkSubscale = [
    {
      description: "My pain was caused by my work or by an accident at work",
      name: "painDropdown_Six",
    },
    {
      description: "My work aggravated my pain",
      name: "painDropdown_Seven",
    },
    {
      description: "My work is too heavy for me",
      name: "painDropdown_Nine",
    },
    {
      description: "My work makes or would make my pain worse",
      name: "painDropdown_Ten",
    },
    {
      description: "My work might harm my back",
      name: "painDropdown_Eleven",
    },
    {
      description: "I should not do my normal work with my present pain",
      name: "painDropdown_Twelve",
    },
    {
      description:
        "I do not think that I will be back to my normal work within 3 months",
      name: "painDropdown_Fifteen",
    },
  ];
  const painDropdownSchemaForPhysicalActivitiesSubscale = [
    {
      description: "Physical activity makes my pain worse",
      name: "painDropdown_Two",
    },
    {
      description: "Physical activity might harm my back",
      name: "painDropdown_Three",
    },
    {
      description:
        "I should not do physical activities which (might) make my pain worse",
      name: "painDropdown_Four",
    },
    {
      description:
        "I cannot do physical activities which (might) make my pain worse",
      name: "painDropdown_Five",
    },
  ];
  const columnStyle = { width: "33.33%" };
  const cellStyle = {
    border: "1px solid #000",
    textAlign: "center",
    padding: "8px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  };
  const separationLineStyle = {
    border: "1px solid #000",
    height: "100%", // Vertical line height
    margin: "0 auto",
  };
  return (
    <>
      <div className="card ">
        <CustomConfirmationDialog
          open={confirmationDialog}
          cancelAction={() => setConfirmationDialog(false)}
          confirmationAction={handleSubmit(onSubmit)}
          type="create"
          message={`You are about to save this Fear-Avoidance Beliefs Questionnaire (FABQ) document?`}
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
            text={"Fear-Avoidance Beliefs Questionnaire (FABQ)"}
          />

          <IconButton onClick={closeEncounterRight}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <div className="card-content vscrollable remPad1">
          <form>
            {/*  Fear-Avoidance Beliefs Questionnaire (FABQ)  */}
            <Grid container spacing={0.1} mt={2}>
              <Typography
                variant="p"
                sx={{ color: "blue", fontSize: "14px", fontWeight: "bold" }}
              >
                Fear-Avoidance Beliefs Questionnaire (FABQ)
              </Typography>
              <Grid container spacing={0.1} alignItems="center">
                <Typography
                  variant="p"
                  sx={{ color: "black", fontSize: "14px" }}
                >
                  Here are some of the things which other patients have told us
                  about their pain. For each statement please circle any number
                  from 0 to 6 to say how many physical activities such as
                  bending, lifting, walking or driving affect or would affect
                  your back pain.
                </Typography>
              </Grid>
              <Grid container spacing={0.1} alignItems="center" mt={2}>
                <Table style={{ tableLayout: "fixed" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ ...columnStyle, ...cellStyle }}>
                        Completely Disagree
                      </TableCell>
                      <TableCell style={{ ...columnStyle, ...cellStyle }}>
                        Unsure
                      </TableCell>
                      <TableCell style={{ ...columnStyle, ...cellStyle }}>
                        Completely Agree
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell style={cellStyle}>
                        <Grid item>
                          <Typography
                            variant="body1"
                            align="center"
                            style={separationLineStyle}
                          >
                            0
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell style={{ ...cellStyle, borderLeft: "none" }}>
                        <Grid container>
                          <Grid item xs={4}>
                            <Typography
                              variant="body1"
                              align="center"
                              style={separationLineStyle}
                            >
                              1
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              variant="body1"
                              align="center"
                              style={{
                                ...separationLineStyle,
                                borderBottom: "1px solid #000",
                              }}
                            >
                              2
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              variant="body1"
                              align="center"
                              style={separationLineStyle}
                            >
                              3
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell style={{ ...cellStyle, borderLeft: "none" }}>
                        <Grid container>
                          <Grid item xs={4}>
                            <Typography
                              variant="body1"
                              align="center"
                              style={separationLineStyle}
                            >
                              4
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              variant="body1"
                              align="center"
                              style={{
                                ...separationLineStyle,
                                borderBottom: "1px solid #000",
                              }}
                            >
                              5
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              variant="body1"
                              align="center"
                              style={separationLineStyle}
                            >
                              6
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>

            {/* no 1-5 drop down    */}
            <Grid container spacing={1} mt={1}>
              {painDropdownSchema.map((data, index) => (
                <Grid
                  container
                  key={index}
                  spacing={2}
                  alignItems="center"
                  mt={0.5}
                >
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="p"
                      sx={{
                        color: "black",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {index + 1}.
                    </Typography>{" "}
                    <Typography
                      variant="p"
                      sx={{ color: "black", fontSize: "14px" }}
                    >
                      {data.description}
                    </Typography>
                  </Grid>

                  <Grid item container xs={12} sm={6}>
                    <Grid item xs={12} sm={6}>
                      <CustomSelect
                        label="select"
                        // required
                        control={control}
                        name={data.description}
                        options={selectOptions}
                      />
                      {/* <CustomSelect
                        label="select"
                        name={data.description}
                        options={selectOptions}
                        register={register(`${data.description}`, {
                          required: false,
                        })}
                        // onChange={(e) => {
                        //   console.log("event", {
                        //     name: e.target.name,
                        //     value: e.target.value,
                        //   });
                        //   handleCustomSelectChange(
                        //     e.target.name,
                        //     e.target.value
                        //   );
                        // }}
                      /> */}
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>

            <Grid container spacing={0.1} mt={1}>
              <Typography
                variant="p"
                sx={{ color: "black", fontSize: "14px", fontWeight: "bold" }}
              >
                The following statements are about how your normal work affects
                or would affect your back pain
              </Typography>
            </Grid>

            <Grid container spacing={1} mt={1}>
              {painDropdownTwoSchema.map((data, index) => (
                <Grid
                  container
                  key={index + 6}
                  spacing={2}
                  alignItems="center"
                  mt={0.5}
                >
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="p"
                      sx={{
                        color: "black",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {index + 6}.
                    </Typography>{" "}
                    <Typography
                      variant="p"
                      sx={{ color: "black", fontSize: "14px" }}
                    >
                      {data.description}
                    </Typography>
                  </Grid>

                  <Grid item container xs={12} sm={6}>
                    <Grid item xs={12} sm={6}>
                      <CustomSelect
                        label="select"
                        //required
                        control={control}
                        name={data.description}
                        options={selectOptions}
                      />
                      {/* <CustomSelect
                        label="select"
                        name={data.description}
                        options={selectOptions}
                        register={register(`${data.description}`, {
                          required: false,
                        })}
                        // onChange={(e) => {
                        //   console.log("event", {
                        //     name: e.target.name,
                        //     value: e.target.value,
                        //   });
                        //   handleCustomSelectChange(
                        //     e.target.name,
                        //     e.target.value
                        //   );
                        // }}
                      /> */}
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>

            {/*  score  */}

            <Grid container spacing={0.1} mt={1}>
              <Typography
                variant="p"
                sx={{ color: "black", fontSize: "14px", fontWeight: "bold" }}
              >
                Total Points:{totalScore ? totalScore : 0}
              </Typography>
            </Grid>
            <Grid container spacing={0.1} mt={1}>
              <Typography
                variant="p"
                sx={{ color: "black", fontSize: "14px", fontWeight: "bold" }}
              >
                Physical activity subscale Point:
                {physicalActivitiesSubscaleTotalScore}
              </Typography>
            </Grid>
            <Grid container spacing={0.1} mt={1}>
              <Typography
                variant="p"
                sx={{ color: "black", fontSize: "14px", fontWeight: "bold" }}
              >
                Work Subscale Point:{workSubscaleTotalScore}
              </Typography>
            </Grid>

            {/* Recommendation field */}
            <Grid container spacing={1} mt={2}>
              <Typography
                variant="p"
                sx={{
                  color: "blue",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              >
                Comment
              </Typography>
              <Grid item xs={12} sm={12}>
                <Textarea
                  placeholder="Comment"
                  name="Comment"
                  type="text"
                  register={register("Comment")}
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
                type="submit"
                onClick={() => setConfirmationDialog(true)}
              >
                Submit Lab Result
              </GlobalCustomButton>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
}

export function BackPainQuestionnaireCreate() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm(); //, watch, errors, reset

  const painIntensityCheckBoxSchemaData = [
    {
      name: "pain_intensity_check_0",
      label:
        "I can tolerate the pain I have without having to use pain medication",
      checked: false,
      schemaName: "painIntensity",
      displaySchemaName: "Pain Intensity",
    },
    {
      name: "pain_intensity_check_1",
      label:
        "The pain is bad, but I can manage without having to take pain medication.",
      checked: false,
    },
    {
      name: "pain_intensity_check_2",
      label: "Pain medication provides me with complete relief from pain.",
      checked: false,
    },
    {
      name: "pain_intensity_check_3",
      label: "Pain medication provides me with moderate relief from pain.",
      checked: false,
    },
    {
      name: "pain_intensity_check_4",
      label: "Pain medication provides me with little relief from pain.",
      checked: false,
    },
    {
      name: "pain_intensity_check_5",
      label: "Pain medication has no effect on my pain.",
      checked: false,
    },
  ];

  const personalCareCheckBoxSchemaData = [
    {
      name: "personal_care_0",
      label:
        "I can take care of myself normally without causing increased pain.",
      checked: false,
      schemaName: "personalCare",
      displaySchemaName: "Personal Care",
    },
    {
      name: "personal_care_1",
      label: "I can take care of myself normally, but it increases my pain.",
      checked: false,
    },
    {
      name: "personal_care_2",
      label: "It is painful to take care of myself, and I am slow and careful.",
      checked: false,
    },
    {
      name: "personal_care_3",
      label: "I need help, but I am able to manage most of my personal care.",
      checked: false,
    },
    {
      name: "personal_care_4",
      label: "I need help every day in most aspects of my care.",
      checked: false,
    },
    {
      name: "personal_care_6",
      label: "I do not get dressed, I wash with difficulty, and I stay in bed.",
      checked: false,
    },
  ];

  const liftingCheckBoxSchemaData = [
    {
      name: "lifting_0",
      label: "I can lift heavy weights without increased pain.",
      checked: false,
      schemaName: "lifting",
      displaySchemaName: "Lifting",
    },
    {
      name: "lifting_1",
      label: "I can lift heavy weights, but it causes increased pain.",
      checked: false,
    },
    {
      name: "lifting_2",
      label:
        "Pain prevents me from lifting heavy weights off the floor, but I can manage if the weights are conveniently positioned (e.g., on a table).",
      checked: false,
    },
    {
      name: "lifting_3",
      label:
        "Pain prevents me from lifting heavy weights, but I can manage light to medium weights if they are conveniently positioned.",
      checked: false,
    },
    {
      name: "lifting_4",
      label: "I can lift only very light weights.",
      checked: false,
    },
    {
      name: "lifting_5",
      label: "I cannot lift or carry anything at all.",
      checked: false,
    },
  ];

  const walkingCheckBoxSchemaData = [
    {
      name: "walking_0",
      label: "I can lift heavy weights without increased pain.",
      checked: false,
      schemaName: "walking",
      displaySchemaName: "Walking",
    },
    {
      name: "walking_1",
      label: "Pain does not prevent me from walking any distance.",
      checked: false,
    },
    {
      name: "walking_2",
      label:
        "Pain prevents me from walking more than 1 mile. (1 mile = 1.6 km).",
      checked: false,
    },
    {
      name: "walking_3",
      label: "Pain prevents me from walking more than 1/2 mile.",
      checked: false,
    },
    {
      name: "walking_4",
      label: "Pain prevents me from walking more than 1/4 mile.",
      checked: false,
    },
    {
      name: "walking_5",
      label: "I can walk only with crutches or a cane.",
      checked: false,
    },
    {
      name: "walking_6",
      label: "I am in bed most of the time and have to crawl to the toilet.",
      checked: false,
    },
  ];

  const sittingCheckBoxSchemaData = [
    {
      name: "sitting_0",
      label: "I can sit in any chair as long as I like.",
      checked: false,
      schemaName: "sitting",
      displaySchemaName: "Sitting",
    },
    {
      name: "sitting_1",
      label: "I can only sit in my favorite chair as long as I like.",
      checked: false,
    },
    {
      name: "sitting_2",
      label: "Pain prevents me from sitting for more than 1 hour.",
      checked: false,
    },
    {
      name: "sitting_3",
      label: "Pain prevents me from sitting for more than 1/2 hour.",
      checked: false,
    },
    {
      name: "sitting_4",
      label: "Pain prevents me from sitting for more than 10 minutes.",
      checked: false,
    },
    {
      name: "sitting_5",
      label: "Pain prevents me from sitting at all.",
      checked: false,
    },
  ];

  const standingCheckBoxSchemaData = [
    {
      name: "standing_0",
      label: "I can stand as long as I want without increased pain.",
      checked: false,
      schemaName: "standing",
      displaySchemaName: "Standing",
    },
    {
      name: "standing_1",
      label: "I can stand as long as I want, but it increases my pain.",
      checked: false,
    },
    {
      name: "standing_2",
      label: "Pain prevents me from standing for more than 1 hour.",
      checked: false,
    },
    {
      name: "standing_3",
      label: "Pain prevents me from standing for more than 1/2 hour.",
      checked: false,
    },
    {
      name: "standing_4",
      label: "Pain prevents me from standing for more than 10 minutes.",
      checked: false,
    },
    {
      name: "standing_5",
      label: "Pain prevents me from standing at all.",
      checked: false,
    },
  ];

  const sleepingCheckBoxSchemaData = [
    {
      name: "sleeping_0",
      label: "Pain does not prevent me from sleeping well.",
      checked: false,
      schemaName: "sleeping",
      displaySchemaName: "Sleeping",
    },
    {
      name: "sleeping_1",
      label: "I can sleep well only by using pain medication.",
      checked: false,
    },
    {
      name: "sleeping_2",
      label: "Even when I take medication, I sleep less than 6 hours.",
      checked: false,
    },
    {
      name: "sleeping_3",
      label: "Even when I take medication, I sleep less than 4 hours.",
      checked: false,
    },
    {
      name: "sleeping_4",
      label: "Even when I take medication, I sleep less than 2 hours.",
      checked: false,
    },
    {
      name: "sleeping_5",
      label: "Pain prevents me from sleeping at all.",
      checked: false,
    },
  ];

  const socialLifeCheckBoxSchemaData = [
    {
      name: "social_life_0",
      label: "My social life is normal and does not increase my pain.",
      checked: false,
      schemaName: "socialLife",
      displaySchemaName: "Social Life",
    },
    {
      name: "social_life_1",
      label: "My social life is normal, but it increases my level of pain.",
      checked: false,
    },
    {
      name: "social_life_2",
      label:
        "Pain prevents me from participating in more energetic activities (e.g., sports, dancing).",
      checked: false,
    },
    {
      name: "social_life_3",
      label: "Pain prevents me from going out very often.",
      checked: false,
    },
    {
      name: "social_life_4",
      label: "Pain has restricted my social life to my home.",
      checked: false,
    },
    {
      name: "social_life_5",
      label: "I have hardly any social life because of my pain.",
      checked: false,
    },
  ];

  const travellingCheckBoxSchemaData = [
    {
      name: "travelling_0",
      label: "I can travel anywhere without increased pain.",
      checked: false,
      schemaName: "travelling",
      displaySchemaName: "Travelling",
    },
    {
      name: "travelling_1",
      label: "I can travel anywhere, but it increases my pain.",
      checked: false,
    },
    {
      name: "travelling_2",
      label: "My pain restricts my travel over 2 hours.",
      checked: false,
    },
    {
      name: "travelling_3",
      label: "My pain restricts my travel over 1 hour.",
      checked: false,
    },
    {
      name: "travelling_4",
      label:
        "My pain restricts my travel to short necessary journeys under 1/2 hour.",
      checked: false,
    },
    {
      name: "travelling_5",
      label:
        "My pain prevents all travel except for visits to the physician / therapist or hospital.",
      checked: false,
    },
  ];

  const employmentHomemakingCheckBoxSchemaData = [
    {
      name: "employment_homemaking_0",
      label: "My normal homemaking / job activities do not cause pain.",
      checked: false,
      schemaName: "employmentHome",
      displaySchemaName: "Employment Home",
    },
    {
      name: "employment_homemaking_1",
      label:
        "My normal homemaking / job activities increase my pain, but I can still perform all that is required of me.",
      checked: false,
    },
    {
      name: "employment_homemaking_2",
      label:
        "I can perform most of my homemaking / job duties, but pain prevents me from performing more physically stressful activities (e.g., lifting, vacuuming).",
      checked: false,
    },
    {
      name: "employment_homemaking_3",
      label: "Pain prevents me from doing anything but light duties.",
      checked: false,
    },
    {
      name: "employment_homemaking_4",
      label: "Pain prevents me from doing even light duties.",
      checked: false,
    },
    {
      name: "employment_homemaking_5",
      label: "Pain prevents me from performing any job or homemaking chores.",
      checked: false,
    },
  ];

  const allSchemaData = [
    painIntensityCheckBoxSchemaData,
    personalCareCheckBoxSchemaData,
    liftingCheckBoxSchemaData,
    walkingCheckBoxSchemaData,
    sittingCheckBoxSchemaData,
    travellingCheckBoxSchemaData,
    employmentHomemakingCheckBoxSchemaData,
    socialLifeCheckBoxSchemaData,
    sleepingCheckBoxSchemaData,
    standingCheckBoxSchemaData,
  ];

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
  const [docStatus, setDocStatus] = useState("Draft"); //employmentHomemaking
  const [totalScore, setTotalScore] = useState(0);
  const [allCheckBoxSchema, setAllCheckBoxSchema] = useState([]);

  const [
    employmentHomemakingCheckBoxSchema,
    setEmploymentHomemakingCheckBoxSchema,
  ] = useState(employmentHomemakingCheckBoxSchemaData);

  const [travelingCheckBoxSchema, setTravelingCheckBoxSchema] = useState(
    travellingCheckBoxSchemaData
  );

  const [socialLifeCheckBoxSchema, setSocialLifeCheckBoxSchema] = useState(
    socialLifeCheckBoxSchemaData
  );
  const [sleepingCheckBoxSchema, setSleepingCheckBoxSchema] = useState(
    sleepingCheckBoxSchemaData
  );
  const [painIntensityCheckBoxSchema, setPainIntensityCheckBoxSchema] =
    useState(painIntensityCheckBoxSchemaData);
  const [personalCareCheckBoxSchema, setPersonalCareCheckBoxSchema] = useState(
    personalCareCheckBoxSchemaData
  );
  const [liftingCheckBoxSchema, setLiftingCheckBoxSchema] = useState(
    liftingCheckBoxSchemaData
  );
  const [walkingCheckBoxSchema, setWalkingCheckBoxSchema] = useState(
    walkingCheckBoxSchemaData
  );
  const [sittingCheckBoxSchema, setSittingCheckBoxSchema] = useState(
    sittingCheckBoxSchemaData
  );
  const [standingCheckBoxSchema, setStandingCheckBoxSchema] = useState(
    standingCheckBoxSchemaData
  );

  const updateCheckBoxesWithData = (schemaData, responseData) => {
    // Iterate through the schemaData array
    schemaData.forEach((checkbox) => {
      const name = checkbox.name;

      // Check if the name exists as a key in the responseData object
      if (responseData.hasOwnProperty(name)) {
        // Check if the value is not false before updating 'checked' to true
        if (responseData[name] !== false && responseData[name] !== "false") {
          checkbox.checked = true;
        }
      }
    });

    // Return the updated schemaData
    return schemaData;
  };

  const updateAndSetCheckboxSchema = (
    schemaData,
    setStateFunction,
    responseData
  ) => {
    const updatedSchemaData = updateCheckBoxesWithData(
      schemaData,
      responseData
    );
    setStateFunction(updatedSchemaData);
  };

  const filterCheckedData = (schemaDataArray, resData) => {
    const filteredData = {};

    schemaDataArray.forEach((schemaData) => {
      const schemaName = schemaData[0].displaySchemaName;
      schemaData.forEach((item) => {
        if (resData[item.name] !== false) {
          filteredData[schemaName] = item.label;
        }
      });
    });

    return filteredData;
  };

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!!draftDoc && draftDoc.status === "Draft") {
      console.log("===>>> response data", {
        data: draftDoc.documentdetail,
      });

      const checkboxSchemas = [
        {
          schemaData: standingCheckBoxSchema,
          setStateFunction: setStandingCheckBoxSchema,
          responseData: draftDoc.documentdetail,
        },
        {
          schemaData: employmentHomemakingCheckBoxSchema,
          setStateFunction: setEmploymentHomemakingCheckBoxSchema,
          responseData: draftDoc.documentdetail,
        },
        {
          schemaData: travelingCheckBoxSchema,
          setStateFunction: setTravelingCheckBoxSchema,
          responseData: draftDoc.documentdetail,
        },
        {
          schemaData: socialLifeCheckBoxSchema,
          setStateFunction: setSocialLifeCheckBoxSchema,
          responseData: draftDoc.documentdetail,
        },
        {
          schemaData: sleepingCheckBoxSchema,
          setStateFunction: setSleepingCheckBoxSchema,
          responseData: draftDoc.documentdetail,
        },
        {
          schemaData: painIntensityCheckBoxSchema,
          setStateFunction: setPainIntensityCheckBoxSchema,
          responseData: draftDoc.documentdetail,
        },
        {
          schemaData: personalCareCheckBoxSchema,
          setStateFunction: setPersonalCareCheckBoxSchema,
          responseData: draftDoc.documentdetail,
        },
        {
          schemaData: liftingCheckBoxSchema,
          setStateFunction: setLiftingCheckBoxSchema,
          responseData: draftDoc.documentdetail,
        },
        {
          schemaData: walkingCheckBoxSchema,
          setStateFunction: setWalkingCheckBoxSchema,
          responseData: draftDoc.documentdetail,
        },
        {
          schemaData: sittingCheckBoxSchema,
          setStateFunction: setSittingCheckBoxSchema,
          responseData: draftDoc.documentdetail,
        },
      ];

      checkboxSchemas.forEach((schema) => {
        updateAndSetCheckboxSchema(
          schema.schemaData,
          schema.setStateFunction,
          schema.responseData
        );
      });

      Object.entries(draftDoc.documentdetail).map(([keys, value], i) => {
        if (keys === "totalScore") {
          setTotalScore(value);
        }
        setValue(keys, value, {
          shouldValidate: true,
          shouldDirty: true,
        });
      });
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
    // console.log("onsubmit", { data: data });
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
    document.documentname = "Back Pain Questionnaire"; //`${data.Investigation} Result`;
    document.documentType = "Back Pain Questionnaire"; //"Diagnostic Result";
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
    // console.log(document)??????????

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
      const dataForDraft = {
        ...data,
        totalScore,
      };

      const filterDataForFinal = filterCheckedData(allSchemaData, dataForDraft);

      const dataForFinal = {
        ...filterDataForFinal,
        Comment: dataForDraft.Comment,
        "Total Score": totalScore,
      };
      console.log("===>>>>>", { dataForFinal });
      const updatedData =
        document.status === "Draft" ? dataForDraft : dataForFinal;

      document.documentdetail = updatedData;

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
      const dataForDraft = {
        ...data,
        totalScore,
      };

      const filterDataForFinal = filterCheckedData(allSchemaData, dataForDraft);

      const dataForFinal = {
        ...filterDataForFinal,
        Comment: dataForDraft.Comment,
        "Total Score": totalScore,
      };
      console.log("===>>>>>", { dataForFinal });
      const updatedData =
        document.status === "Draft" ? dataForDraft : dataForFinal;

      document.documentdetail = updatedData;
      console.log("onsubmit form", { data: dataForDraft, document });
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

  const handleCheckboxChange = (
    event,
    painIntensityCheckBoxSchema,
    setPainIntensityCheckBoxSchema,
    selectedSchemaName
  ) => {
    const { name, checked, value } = event.target;
    let totalPoint;
    let totalPointObtain;
    let total;
    const existcheckbox = false;
    const currentPoint = Number(value);
    const selectedCheckBoxSchema = {
      schemaName: painIntensityCheckBoxSchema[0].schemaName,
      schemaPoint: currentPoint,
    };

    console.log("==>>>  state allCheckBoxSchema", {
      allCheckBoxSchema,
    });

    if (allCheckBoxSchema.length > 0) {
      // const existcheckboxSchema = allCheckBoxSchema.find(
      //   (data) => data.name === selectedSchemaName
      // );
      const othercheckboxSchemaArr = allCheckBoxSchema.filter(
        (data) => data.schemaName !== selectedSchemaName
      );
      const prevTotalPoint = othercheckboxSchemaArr.length * 5;
      totalPoint = prevTotalPoint + 5;
      const totalPointObtainFromOther = othercheckboxSchemaArr.reduce(
        (accumulator, currentObject) => {
          return accumulator + currentObject.schemaPoint;
        },
        0
      );

      totalPointObtain = totalPointObtainFromOther + currentPoint;
      total = Math.round((totalPointObtain / totalPoint) * 100);

      const updatedCheckboxSchemaArr = [
        ...othercheckboxSchemaArr,
        selectedCheckBoxSchema,
      ];
      setTotalScore(total);
      setAllCheckBoxSchema(updatedCheckboxSchemaArr);
      console.log("==>>>  score for lenght != 0", {
        othercheckboxSchemaArr,
        selectedCheckBoxSchema,
        updatedCheckboxSchemaArr,
        prevTotalPoint,
        totalPointObtain,
        totalPoint,
        total,
      });
    }

    if (allCheckBoxSchema.length === 0) {
      totalPoint = 5 * 1;
      totalPointObtain = currentPoint;
      total = Math.round((totalPointObtain / totalPoint) * 100);
      setTotalScore(total);
      setAllCheckBoxSchema([selectedCheckBoxSchema]);
      console.log("==>>>  score for lenght == 0", {
        totalPointObtain,
        totalPoint,
        total,
      });
    }

    setValue(name, checked);
    if (checked) {
      const updatedData = painIntensityCheckBoxSchema.map((data) => {
        const checkboxName = data.name;
        if (checkboxName !== name) {
          setValue(checkboxName, false);
        }
        if (data.name === name) {
          return {
            ...data,
            checked: true,
          };
        } else {
          return {
            ...data,
            checked: false,
          };
        }
      });
      setPainIntensityCheckBoxSchema(updatedData);
    }
  };

  return (
    <>
      <div className="card ">
        <CustomConfirmationDialog
          open={confirmDialog}
          cancelAction={() => setConfirmDialog(false)}
          confirmationAction={handleSubmit(onSubmit)}
          type="create"
          message={`You are about to save this Back Pain Questionnaire document?`}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={1}
        >
          <FormsHeaderText text={"Back Pain Questionnaire"} />

          <IconButton onClick={closeEncounterRight}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <div className="card-content vscrollable remPad1">
          <form>
            {/*  Modified Oswestry Low Back Pain Disability Questionnairea  */}
            <Grid container spacing={0.1} mt={2}>
              <Typography
                variant="p"
                sx={{ color: "blue", fontSize: "14px", fontWeight: "bold" }}
              >
                Modified Oswestry Low Back Pain Disability Questionnairea
              </Typography>
              <Grid container spacing={0.1} alignItems="center">
                <Typography
                  variant="p"
                  sx={{ color: "black", fontSize: "14px" }}
                >
                  This questionnaire has been designed to give your therapist
                  information as to how your back pain has affected your ability
                  to manage in everyday life. Please answer every question by
                  placing a mark in the{" "}
                  <Typography
                    variant="p"
                    sx={{
                      color: "black",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    one
                  </Typography>{" "}
                  box that best describes your condition today. We realize you
                  may feel that two of the statements may describe your
                  condition,{" "}
                  <Typography
                    variant="p"
                    sx={{
                      color: "black",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    but please mark only the box that most closely describes
                    your current condition.
                  </Typography>
                </Typography>
              </Grid>
            </Grid>

            {/*  Pain Intensity */}
            <Grid container mt={1}>
              <Typography
                variant="p"
                sx={{ color: "blue", fontSize: "14px", fontWeight: "bold" }}
              >
                Pain Intensity
              </Typography>
              <Grid container alignItems="center">
                {painIntensityCheckBoxSchema.map((data, index) => (
                  <Grid item key={index} xs={12} sm={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...register(data.name)}
                          color="primary"
                          checked={data.checked}
                          onChange={(e) =>
                            handleCheckboxChange(
                              e,
                              painIntensityCheckBoxSchema,
                              setPainIntensityCheckBoxSchema,
                              "painIntensity"
                            )
                          }
                          value={index}
                        />
                      }
                      label={data.label}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/*  Personal Care (e.g., Washing, Dressing)  */}
            <Grid container spacing={0.1} mt={1}>
              <Typography
                variant="p"
                sx={{ color: "blue", fontSize: "14px", fontWeight: "bold" }}
              >
                Personal Care (e.g., Washing, Dressing)
              </Typography>
              <Grid container spacing={0.01} alignItems="center">
                {personalCareCheckBoxSchema.map((data, index) => (
                  <Grid item key={index} xs={12} sm={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...register(data.name)}
                          color="primary"
                          checked={data.checked}
                          onChange={(e) =>
                            handleCheckboxChange(
                              e,
                              personalCareCheckBoxSchema,
                              setPersonalCareCheckBoxSchema,
                              "personalCare"
                            )
                          }
                          value={index}
                        />
                      }
                      label={data.label}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/*  Lifting   */}
            <Grid container spacing={0.1} mt={1}>
              <Typography
                variant="p"
                sx={{ color: "blue", fontSize: "14px", fontWeight: "bold" }}
              >
                Lifting
              </Typography>
              <Grid containeralignItems="center">
                {liftingCheckBoxSchema.map((data, index) => (
                  <Grid item key={data.name} xs={12} sm={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...register(data.name)}
                          color="primary"
                          checked={data.checked}
                          onChange={(e) =>
                            handleCheckboxChange(
                              e,
                              liftingCheckBoxSchema,
                              setLiftingCheckBoxSchema,
                              "lifting"
                            )
                          }
                          value={index}
                        />
                      }
                      label={data.label}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/*  Walking    */}
            <Grid container spacing={0.1} mt={1}>
              <Typography
                variant="p"
                sx={{ color: "blue", fontSize: "14px", fontWeight: "bold" }}
              >
                Walking
              </Typography>
              <Grid container spacing={0.01} alignItems="center">
                {walkingCheckBoxSchema.map((data, index) => (
                  <Grid item key={index} xs={12} sm={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...register(data.name)}
                          color="primary"
                          checked={data.checked}
                          onChange={(e) =>
                            handleCheckboxChange(
                              e,
                              walkingCheckBoxSchema,
                              setWalkingCheckBoxSchema,
                              "walking"
                            )
                          }
                          value={index}
                        />
                      }
                      label={data.label}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/*  sitting    */}
            <Grid container spacing={0.1} mt={1}>
              <Typography
                variant="p"
                sx={{ color: "blue", fontSize: "14px", fontWeight: "bold" }}
              >
                Sitting
              </Typography>
              <Grid container spacing={0.01} alignItems="center">
                {sittingCheckBoxSchema.map((data, index) => (
                  <Grid item key={index} xs={12} sm={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...register(data.name)}
                          color="primary"
                          checked={data.checked}
                          onChange={(e) =>
                            handleCheckboxChange(
                              e,
                              sittingCheckBoxSchema,
                              setSittingCheckBoxSchema,
                              "sitting"
                            )
                          }
                          value={index}
                        />
                      }
                      label={data.label}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/*  standing    */}
            <Grid container spacing={0.1} mt={1}>
              <Typography
                variant="p"
                sx={{ color: "blue", fontSize: "14px", fontWeight: "bold" }}
              >
                Standing
              </Typography>
              <Grid container spacing={0.01} alignItems="center">
                {standingCheckBoxSchema.map((data, index) => (
                  <Grid item key={index} xs={12} sm={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...register(data.name)}
                          color="primary"
                          checked={data.checked}
                          onChange={(e) =>
                            handleCheckboxChange(
                              e,
                              standingCheckBoxSchema,
                              setStandingCheckBoxSchema,
                              "standing"
                            )
                          }
                          value={index}
                        />
                      }
                      label={data.label}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/*  sleeping    */}
            <Grid container spacing={0.1} mt={1}>
              <Typography
                variant="p"
                sx={{ color: "blue", fontSize: "14px", fontWeight: "bold" }}
              >
                Sleeping
              </Typography>
              <Grid container spacing={0.01} alignItems="center">
                {sleepingCheckBoxSchema.map((data, index) => (
                  <Grid item key={index} xs={12} sm={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...register(data.name)}
                          color="primary"
                          checked={data.checked}
                          onChange={(e) =>
                            handleCheckboxChange(
                              e,
                              sleepingCheckBoxSchema,
                              setSleepingCheckBoxSchema,
                              "sleeping"
                            )
                          }
                          value={index}
                        />
                      }
                      label={data.label}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/*  Social Life   */}
            <Grid container spacing={0.1} mt={1}>
              <Typography
                variant="p"
                sx={{ color: "blue", fontSize: "14px", fontWeight: "bold" }}
              >
                Social Life
              </Typography>
              <Grid container spacing={0.01} alignItems="center">
                {socialLifeCheckBoxSchema.map((data, index) => (
                  <Grid item key={index} xs={12} sm={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...register(data.name)}
                          color="primary"
                          checked={data.checked}
                          onChange={(e) =>
                            handleCheckboxChange(
                              e,
                              socialLifeCheckBoxSchema,
                              setSocialLifeCheckBoxSchema,
                              "socialLife"
                            )
                          }
                          value={index}
                        />
                      }
                      label={data.label}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Traveling     */}
            <Grid container spacing={0.1} mt={1}>
              <Typography
                variant="p"
                sx={{ color: "blue", fontSize: "14px", fontWeight: "bold" }}
              >
                Travelling
              </Typography>
              <Grid container spacing={0.01} alignItems="center">
                {travelingCheckBoxSchema.map((data, index) => (
                  <Grid item key={index} xs={12} sm={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...register(data.name)}
                          color="primary"
                          checked={data.checked}
                          onChange={(e) =>
                            handleCheckboxChange(
                              e,
                              travelingCheckBoxSchema,
                              setTravelingCheckBoxSchema,
                              "travelling"
                            )
                          }
                          value={index}
                        />
                      }
                      label={data.label}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/*  Employment / Homemaking   */}
            <Grid container spacing={0.1} mt={1}>
              <Typography
                variant="p"
                sx={{ color: "blue", fontSize: "14px", fontWeight: "bold" }}
              >
                Employment / Homemaking
              </Typography>
              <Grid container spacing={0.01} alignItems="center">
                {employmentHomemakingCheckBoxSchema.map((data, index) => (
                  <Grid item key={index} xs={12} sm={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...register(data.name)}
                          color="primary"
                          checked={data.checked}
                          onChange={(e) =>
                            handleCheckboxChange(
                              e,
                              employmentHomemakingCheckBoxSchema,
                              setEmploymentHomemakingCheckBoxSchema,
                              "employmentHome"
                            )
                          }
                          value={index}
                        />
                      }
                      label={data.label}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/*  score   */}
            <Grid container spacing={0.1} mt={1}>
              <Typography
                variant="p"
                sx={{ color: "black", fontSize: "14px", fontWeight: "bold" }}
              >
                SCORE : {totalScore} %
              </Typography>
            </Grid>

            {/* Recommendation field */}
            <Grid container spacing={1} mt={2}>
              <Typography
                variant="p"
                sx={{
                  color: "blue",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              >
                Comment
              </Typography>
              <Grid item xs={12} sm={12}>
                <Textarea
                  placeholder="Comment"
                  name="Comment"
                  type="text"
                  register={register("Comment")}
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
                type="submit"
                onClick={() => setConfirmDialog(true)}
              >
                Submit Lab Result
              </GlobalCustomButton>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
}

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
    // console.log(document)??????????

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
  const { control, register, handleSubmit, setValue, reset, getValues } =
    useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
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
    photophobia: "",
    Prognosis: "",
  });

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!!draftDoc && draftDoc.status === "Draft") {
      Object.entries(draftDoc.documentdetail).map(([keys, value], i) => {
        console.log("====>>>> draft", {
          keys,
          value,
        });
        if (keys === "acuity") {
          setFormData((prevState) => ({
            ...prevState,
            acuity: value,
          }));
        }
        if (keys === "muscles") {
          setFormData((prevState) => ({
            ...prevState,
            muscles: value,
          }));
        }
        if (keys === "degree") {
          setFormData((prevState) => ({
            ...prevState,
            degree: value,
          }));
        }
        if (keys === "colorVision") {
          setFormData((prevState) => ({
            ...prevState,
            colorVision: value,
          }));
        }
        if (keys === "fieldRestriction") {
          setFormData((prevState) => ({
            ...prevState,
            fieldRestriction: value,
          }));
        }
        if (keys === "photophobia") {
          setFormData((prevState) => ({
            ...prevState,
            photophobia: value,
          }));
        }

        if (keys === "Prognosis") {
          setFormData((prevState) => ({
            ...prevState,
            Prognosis: value,
          }));
        }

        setValue(keys, value, {
          shouldValidate: true,
          shouldDirty: true,
        });
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

  const document_name = state.DocumentClassModule.selectedDocumentClass.name;

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
  const handlePhotophobiaChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      photophobia: event.target.value,
    }));
  };
  const handlePrognosisChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      Prognosis: event.target.value,
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

    // document.documentdetail = {
    //   ...data,
    //   // "Age Of Onset": data.ageOfOnset,
    //   // history: data.history,
    //   // "Unaided RVA": data.unaidedRVA,
    //   // "Unaided LVA": data.unaidedLVA,
    //   // "Unaided NV": data.unaidedNV,
    //   // "Aided RVA": data.aidedRVA,
    //   // "Aided LVA": data.aidedLVA,
    //   // "Aided NV": data.aidedNV,
    //   acuity: formData.acuity,
    //   muscles: formData.muscles,
    //   // "Visual Field Test": data.visualFieldTest,
    //   // Describe: data.describe,
    //   degree: formData.degree,
    //   fieldRestriction: formData.fieldRestriction,
    //   colorVision: formData.colorVision,
    // };
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
      const dataForFinal = {
        "Age Of Onset": data.ageOfOnset,
        History: data.history,
        "Unaided RVA": data.unaidedRVA,
        "Unaided LVA": data.unaidedLVA,
        "Unaided NV": data.unaidedNV,
        "Aided RVA": data.aidedRVA,
        "Aided LVA": data.aidedLVA,
        "Aided NV": data.aidedNV,
        Acuity: formData.acuity,
        Muscles: formData.muscles,
        "Visual Field Test": data.visualFieldTest,
        Describe: data.describe,
        Degree: formData.degree,
        "Field Restriction": formData.fieldRestriction,
        "color Vision": formData.colorVision,
        Photophobia: formData.photophobia,
        Prognosis: formData.Prognosis,
      };
      const dataForDraft = {
        ...data,
        acuity: formData.acuity,
        muscles: formData.muscles,
        degree: formData.degree,
        fieldRestriction: formData.fieldRestriction,
        colorVision: formData.colorVision,
        photophobia: formData.photophobia,
        Prognosis: formData.Prognosis,
      };

      const updatedData =
        document.status === "Draft" ? dataForDraft : dataForFinal;

      document.documentdetail = updatedData;
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
      const dataForFinal = {
        "Age Of Onset": data.ageOfOnset,
        History: data.history,
        "Unaided RVA": data.unaidedRVA,
        "Unaided LVA": data.unaidedLVA,
        "Unaided NV": data.unaidedNV,
        "Aided RVA": data.aidedRVA,
        "Aided LVA": data.aidedLVA,
        "Aided NV": data.aidedNV,
        Acuity: formData.acuity,
        Muscles: formData.muscles,
        "Visual Field Test": data.visualFieldTest,
        Describe: data.describe,
        Degree: formData.degree,
        "Field Restriction": formData.fieldRestriction,
        "color Vision": formData.colorVision,
        Photophobia: formData.photophobia,
        Prognosis: formData.Prognosis,
      };
      const dataForDraft = {
        ...data,
        acuity: formData.acuity,
        muscles: formData.muscles,
        degree: formData.degree,
        fieldRestriction: formData.fieldRestriction,
        colorVision: formData.colorVision,
        photophobia: formData.photophobia,
        Prognosis: formData.Prognosis,
      };

      const updatedData =
        document.status === "Draft" ? dataForDraft : dataForFinal;

      document.documentdetail = updatedData;
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
          message={`You are about to save this document Eye Examination?`}
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
                name="ageOfOnset"
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
                name="history"
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
                    name="unaidedRVA"
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
                    name="unaidedLVA"
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
                register={register("describeOne")}
                name="describeOne"
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
                name="isualFieldTest
                isualFieldTest"
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
                register={register("describeTwo")}
                name="describeTwo"
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

            <Typography color="primary" variant="body1" fontWeight="bold">
              Photophobia
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "30%", marginBottom: "20px" }}>
                <RadioGroup
                  name="photophobia"
                  value={formData.photophobia}
                  onChange={handlePhotophobiaChange}
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%", marginBottom: "20px" }}>
                <RadioGroup
                  name="photophobia"
                  value={formData.photophobia}
                  onChange={handlePhotophobiaChange}
                >
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Box>
            </Box>

            {/*  Diagnosis (Primary cause of visual loss) */}

            <Typography color="primary" variant="body1" fontWeight="bold">
              Diagnosis (Primary cause of visual loss)
            </Typography>
            <Box>
              <Textarea
                color="primary"
                register={register("describeThree")}
                name="describeThree"
                type="text"
                // label="Description"
                placeholder="Type here..."
              />
            </Box>

            {/*  Prognosis */}

            <Typography
              color="primary"
              variant="body1"
              fontWeight="bold"
              mt={3}
            >
              Prognosis
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "30%", marginBottom: "2px" }}>
                <RadioGroup
                  name="Prognosis"
                  value={formData.Prognosis}
                  onChange={handlePrognosisChange}
                >
                  <FormControlLabel
                    value="Permanent"
                    control={<Radio />}
                    label="Permanent"
                  />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "30%", marginBottom: "2px" }}>
                <RadioGroup
                  name="Prognosis"
                  value={formData.Prognosis}
                  onChange={handlePrognosisChange}
                >
                  <FormControlLabel
                    value="Recurrent"
                    control={<Radio />}
                    label="Recurrent"
                  />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "30%", marginBottom: "2px" }}>
                <RadioGroup
                  name="Prognosis"
                  value={formData.Prognosis}
                  onChange={handlePrognosisChange}
                >
                  <FormControlLabel
                    value="Improving"
                    control={<Radio />}
                    label="Improving"
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
              <Box sx={{ width: "30%", marginBottom: "2px" }}>
                <RadioGroup
                  name="Prognosis"
                  value={formData.Prognosis}
                  onChange={handlePrognosisChange}
                >
                  <FormControlLabel
                    value="Progressive"
                    control={<Radio />}
                    label="Progressive"
                  />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "30%", marginBottom: "2px" }}>
                <RadioGroup
                  name="Prognosis"
                  value={formData.Prognosis}
                  onChange={handlePrognosisChange}
                >
                  <FormControlLabel
                    value="Stable"
                    control={<Radio />}
                    label="Stable"
                  />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "30%", marginBottom: "2px" }}>
                <RadioGroup
                  name="Prognosis"
                  value={formData.Prognosis}
                  onChange={handlePrognosisChange}
                >
                  <FormControlLabel
                    value="Can be improved"
                    control={<Radio />}
                    label="Can be improved"
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
                <RadioGroup
                  name="Prognosis"
                  value={formData.Prognosis}
                  onChange={handlePrognosisChange}
                >
                  <FormControlLabel
                    value="Unable to determine prognosis at this time"
                    control={<Radio />}
                    label="Unable to determine prognosis at this time"
                  />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "50%", marginBottom: "2px" }}>
                <RadioGroup
                  name="Prognosis"
                  value={formData.Prognosis}
                  onChange={handlePrognosisChange}
                >
                  <FormControlLabel
                    value="At risk for vision loss; this consumer is under 3 and /or degree of vision loss cannot be determined"
                    control={<Radio />}
                    label="At risk for vision loss; this consumer is under 3 and /or degree of vision loss cannot be determined"
                  />
                </RadioGroup>
              </Box>
            </Box>

            <Typography color="primary" variant="body1" fontWeight="bold">
              Treatment Recommended
            </Typography>
            <Box>
              <Textarea
                register={register("Treatment Recommended")}
                name="Treatment Recommended"
                type="text"
                // label="Treatment Recommended"
                placeholder="Enter Treatment Recommended......"
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
      Object.entries(draftDoc.documentdetail).map(([keys, value], i) => {
        if (keys === "Send To") {
          setFormData((prevState) => ({
            ...prevState,
            dentalLaboratory: value,
          }));
        }
        if (keys === "dentalTherapist") {
          setFormData((prevState) => ({
            ...prevState,
            dentalTherapist: value,
          }));
        }
        if (keys === "orthodontist") {
          setFormData((prevState) => ({
            ...prevState,
            orthodontist: value,
          }));
        }

        setValue(keys, value, {
          shouldValidate: true,
          shouldDirty: true,
        });
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
    console.log("===>>>data befor create", { data });
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);

    let document = {};

    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }

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
      const dataForFinal = {
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

      const dataForDraft = {
        ...data,
        "Send To": formData.dentalLaboratory,
      };

      const updatedData =
        document.status === "Draft" ? dataForDraft : dataForFinal;

      document.documentdetail = updatedData;

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
          return;
        })
        .catch((err) => {
          toast.error("Error updating Documentation: " + err);
          reset(data);
          setConfirmationDialog(false);
        });
    } else {
      const dataForFinal = {
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

      const dataForDraft = {
        ...data,
        "Send To": formData.dentalLaboratory,
      };

      const updatedData =
        document.status === "Draft" ? dataForDraft : dataForFinal;

      document.documentdetail = updatedData;

      ClientServ.create(document)
        .then((res) => {
          console.log("Data not draft", { res, doc: document });
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
          message={`You are about to save this Dental Clinic document?`}
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
                    name="rfa"
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
                    name="hpc"
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
                    name="pdh"
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
                    name="phm"
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
                    name="intraoral"
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
                    name="extraoral"
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
                name="investigation"
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
                name="diagnosis"
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
                name="managementPlan"
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
                name="treatment"
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
  const { state, setState, hideActionLoader } = useContext(ObjectContext);

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
      ...data,
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
          setConfirmationDialog(false);
          hideActionLoader(true);
          // setDocStatus("Draft");
          setSuccess(true);
          reset(data);
          toast.success("Documentation updated successfully");
          setSuccess(false);
          closeForm();
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
          hideActionLoader();
          setSuccess(true);
          reset(data);
          setConfirmationDialog(false);
          toast.success("Orthodontic Analysis created successfully");
          setSuccess(false);
          closeForm();
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

  const closeForm = async () => {
    let documentobj = {};
    documentobj.name = "";
    documentobj.facility = "";
    documentobj.document = "";
    const newDocumentClassModule = {
      selectedDocumentClass: documentobj,
      encounter_right: false,
      show: "detail",
    };
    await setState((prevstate) => ({
      ...prevstate,
      DocumentClassModule: newDocumentClassModule,
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
