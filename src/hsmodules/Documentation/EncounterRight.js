/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
import {DocumentClassList} from "./DocumentClass";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "react-toastify";
import AsthmaIntake from "./AsthmaIntake";
import PulmonologyIntake from "./Pulmonology";
import NewPatientConsult from "./NewPatientConsult";
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
import SurgicalBookletConsentForm from "../clientForm/forms/surgicalBookletConsentForm";
import {usePosition} from "../../components/hooks/getUserLocation";
import Textarea from "../../components/inputs/basic/Textarea";
import {Box, getValue} from "@mui/system";
import RadioButton from "../../components/inputs/basic/Radio";
import {Button, Grid, IconButton} from "@mui/material";
import Input from "../../components/inputs/basic/Input";
import {FormsHeaderText} from "../../components/texts";
import CloseIcon from "@mui/icons-material/Close";
import GlobalCustomButton from "../../components/buttons/CustomButton";

export default function EncounterRight() {
  const {state, setState} = useContext(ObjectContext);
  console.log(state.DocumentClassModule.selectedDocumentClass);

  const submitDocument = data => {
    const geolocation = {
      type: "Point",
      coordinates: [state.coordinates.latitude, state.coordinates.longitude],
    };
    console.log({...data, geolocation: geolocation});
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
    </div>
  );
}

export function VitalSignCreate() {
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const {state, setState} = useContext(ObjectContext);
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

  const getSearchfacility = obj => {
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

    //const coordPass = checkGeolocation(document.geolocation.coordinates);

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

    // console.log(document)
    let confirm = window.confirm(
      `You are about to save this document ${document.documentname} ?`
    );
    if (confirm) {
      if (!!draftDoc && draftDoc.status === "Draft") {
        console.log(document);

        ClientServ.patch(draftDoc._id, document)
          .then(res => {
            e.target.reset();
            setDocStatus("Draft");

            setSuccess(true);
            toast.success("Documentation updated succesfully");
            setSuccess(false);
          })
          .catch(err => {
            toast.error(`Error updating Documentation ${err}`);
          });
      } else {
        console.log(document);

        ClientServ.create(document)
          .then(res => {
            e.target.reset();

            setSuccess(true);
            toast.success("Documentation created succesfully");
            setSuccess(false);
          })
          .catch(err => {
            toast.error(`Error creating Documentation ${err}`);
          });
      }
    }
  };

  const handleChangeStatus = async e => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };

  const closeEncounterRight = async () => {
    setState(prevstate => ({
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  type="text"
                  label="Height(m)"
                />
              </Grid>

              <Grid item xs={12}>
                <Input
                  register={register("Weight")}
                  type="text"
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
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const {state, setState} = useContext(ObjectContext);
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

  const getSearchfacility = obj => {
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
      toast({
        message:
          " Documentation data missing, requires location and facility details",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    let confirm = window.confirm(
      `You are about to save this document ${document.documentname} ?`
    );
    if (confirm) {
      if (!!draftDoc && draftDoc.status === "Draft") {
        ClientServ.patch(draftDoc._id, document)
          .then(res => {
            //console.log(JSON.stringify(res))
            e.target.reset();
            setDocStatus("Draft");
            // setAllergies([])
            /*  setMessage("Created Client successfully") */
            setSuccess(true);
            toast({
              message: "Documentation updated succesfully",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
            });
            setSuccess(false);

            /*  toast({
                        message:message ,
                        type: 'is-success',
                        dismissible: true,
                        pauseOnHover: true,
                      }) */
          })
          .catch(err => {
            toast({
              message: "Error updating Documentation " + err,
              type: "is-danger",
              dismissible: true,
              pauseOnHover: true,
            });
          });
      } else {
        ClientServ.create(document)
          .then(res => {
            //console.log(JSON.stringify(res))
            e.target.reset();
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
          .catch(err => {
            toast({
              message: "Error creating Documentation " + err,
              type: "is-danger",
              dismissible: true,
              pauseOnHover: true,
            });
          });
      }
    }
  };
  const handleChangeStatus = async e => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };

  const closeEncounterRight = async () => {
    setState(prevstate => ({
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
                register={register("clinical_findings")}
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
              <GlobalCustomButton color="secondary" type="submit">
                Submit Clinical Note
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

export function LabNoteCreate() {
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const {state, setState} = useContext(ObjectContext);

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

  const getSearchfacility = obj => {
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
      toast({
        message:
          " Documentation data missing, requires location and facility details",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }
    let confirm = window.confirm(
      `You are about to save this document ${document.documentname} ?`
    );
    if (confirm) {
      if (!!draftDoc && draftDoc.status === "Draft") {
        ClientServ.patch(draftDoc._id, document)
          .then(res => {
            //console.log(JSON.stringify(res))
            e.target.reset();
            setDocStatus("Draft");
            // setAllergies([])
            /*  setMessage("Created Client successfully") */
            setSuccess(true);
            toast({
              message: "Documentation updated succesfully",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
            });
            setSuccess(false);
          })
          .catch(err => {
            toast({
              message: "Error updating Documentation " + err,
              type: "is-danger",
              dismissible: true,
              pauseOnHover: true,
            });
          });
      } else {
        ClientServ.create(document)
          .then(res => {
            //console.log(JSON.stringify(res))
            e.target.reset();
            /*  setMessage("Created Client successfully") */
            setSuccess(true);
            toast({
              message: "Lab Result created succesfully",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
            });
            setSuccess(false);
          })
          .catch(err => {
            toast({
              message: "Error creating Lab Result " + err,
              type: "is-danger",
              dismissible: true,
              pauseOnHover: true,
            });
          });
      }
    }
  };

  const handleChangeStatus = async e => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };
  const handleChangePart = e => {
    console.log(e);
  };

  const closeEncounterRight = async () => {
    setState(prevstate => ({
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mb={1}>
              <Input
                register={register("investigation")}
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
                label="Findings"
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
              <GlobalCustomButton color="secondary" type="submit">
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

export function NursingNoteCreate() {
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const {state, setState} = useContext(ObjectContext);

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

  const getSearchfacility = obj => {
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
      toast({
        message:
          " Documentation data missing, requires location and facility details",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }
    let confirm = window.confirm(
      `You are about to save this document ${document.documentname} ?`
    );
    if (confirm) {
      if (!!draftDoc && draftDoc.status === "Draft") {
        ClientServ.patch(draftDoc._id, document)
          .then(res => {
            //console.log(JSON.stringify(res))
            e.target.reset();
            setDocStatus("Draft");
            // setAllergies([])
            /*  setMessage("Created Client successfully") */
            setSuccess(true);
            toast({
              message: "Documentation updated succesfully",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
            });
            setSuccess(false);
          })
          .catch(err => {
            toast({
              message: "Error updating Documentation " + err,
              type: "is-danger",
              dismissible: true,
              pauseOnHover: true,
            });
          });
      } else {
        ClientServ.create(document)
          .then(res => {
            //console.log(JSON.stringify(res))
            e.target.reset();
            /*  setMessage("Created Client successfully") */
            setSuccess(true);
            toast({
              message: "Lab Result created succesfully",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
            });
            setSuccess(false);
          })
          .catch(err => {
            toast({
              message: "Error creating Lab Result " + err,
              type: "is-danger",
              dismissible: true,
              pauseOnHover: true,
            });
          });
      }
    }
  };

  const handleChangeStatus = async e => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };
  const handleChangePart = e => {
    console.log(e);
  };

  const closeEncounterRight = async () => {
    setState(prevstate => ({
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <GlobalCustomButton color="secondary" type="button">
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
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const {state, setState} = useContext(ObjectContext);

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

  const getSearchfacility = obj => {
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
      toast({
        message:
          " Documentation data missing, requires location and facility details",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }
    let confirm = window.confirm(
      `You are about to save this document ${document.documentname} ?`
    );
    if (confirm) {
      if (!!draftDoc && draftDoc.status === "Draft") {
        ClientServ.patch(draftDoc._id, document)
          .then(res => {
            //console.log(JSON.stringify(res))
            e.target.reset();
            setDocStatus("Draft");
            // setAllergies([])
            /*  setMessage("Created Client successfully") */
            setSuccess(true);
            toast({
              message: "Documentation updated succesfully",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
            });
            setSuccess(false);
          })
          .catch(err => {
            toast({
              message: "Error updating Documentation " + err,
              type: "is-danger",
              dismissible: true,
              pauseOnHover: true,
            });
          });
      } else {
        ClientServ.create(document)
          .then(res => {
            //console.log(JSON.stringify(res))
            e.target.reset();
            /*  setMessage("Created Client successfully") */
            setSuccess(true);
            toast({
              message: "Lab Result created succesfully",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
            });
            setSuccess(false);
          })
          .catch(err => {
            toast({
              message: "Error creating Lab Result " + err,
              type: "is-danger",
              dismissible: true,
              pauseOnHover: true,
            });
          });
      }
    }
  };

  const handleChangeStatus = async e => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };

  const handleChangePart = e => {
    console.log(e);
  };

  const closeEncounterRight = async () => {
    setState(prevstate => ({
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
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
              <GlobalCustomButton color="secondary" type="button">
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
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const {state} = useContext(ObjectContext);

  const getSearchfacility = obj => {
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
      .then(res => {
        //console.log(JSON.stringify(res))
        e.target.reset();
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
      .catch(err => {
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
            <Box sx={{paddingBlock: "1rem"}}>
              <Input
                register={register("input_text")}
                name="text"
                type="text"
                placeholder="Title"
              />
            </Box>
            <Box sx={{paddingBlock: "1rem"}}>
              <Textarea
                register={register("input_text")}
                name="findings"
                type="text"
                placeholder="Documentation"
              />
            </Box>
            <Box sx={{paddingBlock: "1rem"}}>
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
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const {state} = useContext(ObjectContext);

  const getSearchfacility = obj => {
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
      .then(res => {
        //console.log(JSON.stringify(res))
        e.target.reset();
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
      .catch(err => {
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
