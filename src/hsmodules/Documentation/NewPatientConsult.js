import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
import {DocumentClassList} from "./DocumentClass";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "react-toastify";
import Roaster from "../Admin/Roaster";
import {Box, getValue} from "@mui/system";
import RadioButton from "../../components/inputs/basic/Radio";
import {Button, IconButton, Typography} from "@mui/material";
import Input from "../../components/inputs/basic/Input";
import Textarea from "../../components/inputs/basic/Textarea";
import CheckboxInput from "../../components/inputs/basic/Checkbox";
import CloseIcon from "@mui/icons-material/Close";
import {FormsHeaderText} from "../../components/texts";
import MuiCustomDatePicker from "../../components/inputs/Date/MuiDatePicker";
import SingleCheckbox from "../../components/inputs/basic/Checkbox/SingleCheckbox";
import GlobalCustomButton from "../../components/buttons/CustomButton";

export default function NewPatientConsult() {
  const {register, handleSubmit, setValue, control} = useForm(); //, watch, errors, reset
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
  const [allergy, setAllergy] = useState("");
  const [reaction, setReaction] = useState("");
  const [allergine, setAllergine] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [duration, setDuration] = useState("");
  const [symptom, setSymptom] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [docStatus, setDocStatus] = useState("Draft");

  const [dataset, setDataset] = useState();
  const {state, setState} = useContext(ObjectContext);

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  //state.DocumentClassModule.selectedDocumentClass.name

  useEffect(() => {
    if (!!draftDoc && draftDoc.status === "Draft") {
      Object.entries(draftDoc.documentdetail).map(([keys, value], i) =>
        setValue(keys, value, {
          shouldValidate: true,
          shouldDirty: true,
        })
      );
      setSymptoms(draftDoc.documentdetail.Presenting_Complaints);
      setAllergies(draftDoc.documentdetail.Allergy_Skin_Test);
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

  const coughinfo = [
    "productive",
    "dry",
    "barking",
    "paroxysimal",
    "post-tusive vomiting ",
    "worse at night ",
    "worse at any time of the day ",
    "worse in certain posture ",
    "progressive",
  ];
  const coughsymptoms = [
    "fever",
    "catarrh",
    "night sweats",
    "weight loss",
    "contact with someone with chronic cough",
    "facial swelling",
    "leg swelling",
  ];
  const coughsputum = ["creamy", "brown", "blood stained", "whitish"];
  const resp = [
    "Difficulty breathing",
    "fast breathing",
    "excessive sneezing",
    "allergy salute",
    "chest pain",
    "atopy",
    "family history of atopy",
  ];
  const cvs = [
    "cough",
    "easy defatigability",
    "breathelessness",
    "breathelessness  at rest",
    "breathelessness on exertion",
    "Othopnea",
    "Paroxymal nocturnal orthopnea",
    "palpitation",
    "chest pain",
  ];
  const yesno = ["Yes", "No"];
  const urinary = [
    "frequency",
    "nocturia",
    "polyuria",
    "poor stream",
    "incomplete bladder empty",
    "urgency",
    "hesistancy",
  ];
  const neuro = [
    "headache",
    "neck pain",
    "neck stiffness",
    "vertigo",
    "dizziness",
    "fainting spells",
    "akward gait",
    "weakness of upper limbs",
    "weakness of lower limbs",
  ];
  const headache = [
    "throbing",
    "dull",
    "generalised",
    "frontal",
    "right-sided",
    "left sided",
    "photophia",
  ];
  const limbs = ["Right Limb", "Left Limb", "Both Limbs"];
  const side = ["Right", "Left", "Both"];
  const eardis = ["Right", "Left", "Both", "Purulent", "bloody"];
  const ent = [
    "Sore throat",
    "change in voice",
    "nasal discharge",
    "excessive sneezing",
    "allergy salute",
  ];
  const endo = [
    "heat intolerance",
    "apathy",
    "excessive sweating",
    "excessive hair growth",
    "weight gain",
    "weight loss",
    "menstral irregularity",
  ];
  const birthmode = [
    "Spontenous varginal delivery",
    "Elective Suregery",
    "Emergency Surgery",
  ];
  const vachist = ["caregiver's report", "child health card"];
  const pernotes = ["dull", "resonant", "hyper-resonant"];
  const pulsenature = [
    "Regular",
    "Irregular",
    "Normal volume",
    "Pounding",
    "Synchronous",
    "Asynchronous",
  ];
  const heartsound = ["S1", "S2", "S3", "S4"];
  const abd = [
    "Full",
    "Distended",
    "Flat",
    "moves with respiration",
    "Abdominal vein visible",
  ];
  const bowelsound = [
    "Normal",
    "absent",
    "hyperactive",
    "reduced or hypoactive",
  ];
  const ROS = [
    "chest discomfort",
    "SOB",
    "orthopnea",
    "PND",
    "edema",
    "palpitations",
    "lighthead/dizzy",
    "syncope",
    "cough/wheezing",
    "snoring",
    "use of CPAP",
    "hemoptysis",
    "fever",
    "weight loss/gain",
    "neurological symptoms",
    "stomach/digestive symptoms",
    "melena/hematochezia",
    "dry skin, brusing",
    "muscle aches",
    "hematuria",
    "trouble hearing",
    "decreased visual acquity",
    "anxiety/depression",
    "all other system negative",
  ];

  const risk = [
    "High Cholesterol",
    "Low LDL",
    "Hypertension",
    "LVH",
    "Diabetes",
    "Family History",
    "Smoker",
    "PVD",
    "CRI/CRF",
    "Diet Pill Use",
  ];
  const socialhistory = [
    "smoker",
    "Alchol",
    "Caffeine",
    "Ocupation",
    "Hobbies",
    "Other Substances",
    "Exercise",
    "Marital status",
    "Other",
  ];
  const familyHx = ["Sibling", "Dad", "Mom", "Other"];
  const physicalexam = [
    "BP Sitting",
    "BP Standing",
    "BP Supine",
    "HR",
    "RR",
    "Height",
    "Weight",
    "Change",
    "BMI",
  ];
  const PMH = [
    "stroke",
    "seizures",
    "COPD",
    "GI Bleeding",
    "Pneumonia",
    "Asthma",
    "Aneamia",
    "Gastric reflux",
    "Diverticulitis",
    "intestinal disease",
    "Gastric Ulcer",
    "Frequent falls",
    "Kidney disease",
    "kidney stone",
    "Gout",
    "Hyperthyriod",
    "Previous hemorrhage",
    "Cancer/Chemotherpay/Radiation",
    "Rheumatological disease/Lupus",
    "Emphysema",
    "Kawasaki disease",
    "DVT/PE",
    "Coumadin Treatment",
  ];
  const hx = [
    "Past Cardiac Hx",
    "Past Cardiac Surgery",
    "Past Cardiac Procedure",
    "Past Cardiac Testing",
    "Past Surgical Hx",
    "Other",
  ];
  const appear = ["Well developed", "Ill Appearing", "Cachetic", "Obese"];
  const abn = ["Normal", "Abnormal"];
  const eyes = ["Conjunctiva", "Lids"];
  const ENMT = ["Teeth", "Gums", "Palate", "Oral mucosa"];
  const Neck = ["Jugular Veins", "Bruits"];
  const Resp = ["Effort", "Breath Sound"];
  const GI = [
    "Tenderness",
    "Hepatosplenomegaly",
    "Abdominal Aorta (size, bruits)",
  ];
  const vasc = ["radial", "femoral", "pedal"];
  const vasc2 = ["edema", "bruits"];
  const MS = ["gait", "Kyphosis/Scoliosis"];
  const poor = ["good", "poor"];
  const affect = ["flat", "appropriate", "anxious"];
  const presnt = ["Absent", "Present"];
  const skinex = ["Xanthoma", "Tugor"];
  const tests = [
    "2D Echocardiogram",
    "Exercise Stress test",
    "Chemical Stress Cardiolyte",
    "Myoview",
    "Carotid Ultrasound",
    "ABI",
    "Renal Doppler",
    "Arterial Doppler of BLE",
    "Arterial Doppler of RLE",
    "Arterial Doppler of LLE",
    "CT",
  ];
  const neu = ["A&O x3", "Affect"];
  const labo = [
    "BMP",
    "Mag",
    "CBC",
    "PT/INR",
    "Fasting Lipids",
    "LFT",
    "TSH",
    "T3Uptake",
    "T4",
  ];
  const followup = [
    "1-2 weeks",
    "1-2 months",
    "3-4 months",
    "5-6 months",
    "7-8 months",
    "9-10 months",
    "1 year",
  ];
  const physiciandetails = ["Attending_Physician_Name", "Date_Seen"];
  const clerk = ["Assessment", "Plan"];

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
    document.documentname = "New Patient Consultation Form";
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

    console.log(document);

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

    let confirm = window.confirm(
      `You are about to save this document ${document.documentname} ?`
    );
    if (confirm) {
      if (!!draftDoc && draftDoc.status === "Draft") {
        ClientServ.patch(draftDoc._id, document)
          .then(res => {
            e.target.reset();
            setSuccess(true);
            toast({
              message: "New Patient Consultation Form updated succesfully",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
            });
            setSuccess(false);
          })
          .catch(err => {
            toast({
              message: "Error updating New Patient Consultation Form " + err,
              type: "is-danger",
              dismissible: true,
              pauseOnHover: true,
            });
          });
      } else {
        ClientServ.create(document)
          .then(res => {
            e.target.reset();
            setSuccess(true);
            toast({
              message: "Pediatric Pulmonology Form created succesfully",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
            });
            setSuccess(false);
            closeForm();
          })
          .catch(err => {
            toast({
              message: "Error creating Pediatric Pulmonology Form " + err,
              type: "is-danger",
              dismissible: true,
              pauseOnHover: true,
            });
          });
      }
    }
  };

  const handleChangePart = async e => {
    //console.log(e)
    //const (name, value) = e.target
    let {name, value} = e.target;
    console.log(name, value);
    await setDataset(prev => ({...prev, [name]: value}));
    //  console.log(dataset)
  };
  const handleChangeStatus = async e => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };

  /*   useEffect(() => {
           
            return () => {
               
            }
        }, [docStatus]) */

  const handleAllergy = async e => {
    //console.log(e)
    //const (name, value) = e.target
    const {name, value} = e.target;
    console.log(name, value);
    // [name]=value
    await setAllergy(prev => ({...prev, [name]: value}));
    console.log(allergy);
  };

  const handleAdd = () => {
    let allergy = {
      allergine: allergine,
      reaction: reaction,
    };
    setAllergies(prev => [...prev, allergy]);
    setAllergy({});
    setReaction("");
    setAllergine("");
  };
  const handleAddSymptoms = () => {
    let newsymptom = {
      symptom,
      duration,
    };
    setSymptoms(prev => [...prev, newsymptom]);
    // setAllergy({})
    setSymptom("");
    setDuration("");
  };

  const closeForm = async () => {
    let documentobj = {};
    documentobj.name = "";
    documentobj.facility = "";
    documentobj.document = "";
    //  alert("I am in draft mode : " + Clinic.documentname)
    const newDocumentClassModule = {
      selectedDocumentClass: documentobj,
      encounter_right: false,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      DocumentClassModule: newDocumentClassModule,
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
          <FormsHeaderText text={"New Patient Consultation Form"} />

          <IconButton onClick={closeForm}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <div className="card-content vscrollable remPad1">
          <form>
            <Box sx={{display: "flex", flexDirection: "column"}} gap={1.5}>
              <Box>
                <Input
                  register={register("Name")}
                  type="text"
                  label="Full name"
                />
              </Box>
              <Box>
                <MuiCustomDatePicker
                  name="DOB"
                  control={control}
                  label="Date of birth"
                />
              </Box>
              <Box>
                <Input
                  register={register("DOS")}
                  name="text"
                  type="text"
                  label="DOS"
                />
              </Box>
              <Box>
                <Input
                  register={register("PCP")}
                  name="text"
                  type="text"
                  label="PCP"
                />
              </Box>
              <Box>
                <Input
                  register={register("Physician")}
                  name="text"
                  type="text"
                  label="Physician"
                />
              </Box>

              <Box>
                <Input
                  register={register("Age")}
                  name="text"
                  type="number"
                  label="Age"
                />
              </Box>

              <Box>
                <RadioButton
                  title="Gender"
                  register={register("Gender")}
                  options={["Male", "Female"]}
                />
              </Box>

              <Box>
                <Input
                  register={register("Requesting_Physician")}
                  type="text"
                  label="Requesting Physician"
                />
              </Box>

              <Box>
                <Input
                  register={register("Reason")}
                  type="text"
                  label="Reason"
                />
              </Box>

              <Box>
                <Textarea
                  register={register("HPI")}
                  type="text"
                  label="HPI"
                  placeholder="Write here......"
                />
              </Box>
            </Box>

            <Box>
              <SingleCheckbox
                register={register("Medication_list_filled")}
                label="Medication list filled"
              />
            </Box>

            <Box>
              <SingleCheckbox
                register={register("Not_Taking_Meds")}
                label="Patient not taking medications"
              />
            </Box>

            <Box>
              <Input
                register={register("Allergies")}
                type="text"
                label="Allergies"
              />
            </Box>

            <SingleCheckbox register={register("NKDA")} label="NKDA" />

            <Box>
              <CheckboxInput
                label="Review of Systems:"
                register={register("ROS")}
                options={ROS}
              />
            </Box>

            <Box>
              <Textarea
                register={register("ROS_comments")}
                name="findings"
                type="text"
                label="Comments/Others"
                placeholder="Write here......"
              />
            </Box>

            <Box>
              <CheckboxInput
                label="Risk Factors:"
                register={register("Risk_Factors")}
                options={risk}
              />
            </Box>

            <Box
              sx={{display: "flex", flexDirection: "column"}}
              gap={1.5}
              mb={1.5}
            >
              <FormsHeaderText text="Social History " />

              <Box>
                <RadioButton
                  title="Smoker"
                  register={register("Smoker")}
                  options={["Yes", "No"]}
                />

                <Input
                  register={register("Smoker_detail")}
                  type="text"
                  label="Smoking details"
                />
              </Box>

              <Box>
                <RadioButton
                  title="Alchol"
                  register={register("Alcohol")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Alcohol_detail")}
                  type="text"
                  label="Alchol details"
                />
              </Box>

              <Box>
                <RadioButton
                  title="Caffeine"
                  register={register("Caffeine")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Caffeine_detail")}
                  type="text"
                  placeholder="Caffeine details"
                />
              </Box>

              <Box>
                <RadioButton
                  title="Ocupation"
                  register={register("Ocupation")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Ocupation_detail")}
                  name="text"
                  type="text"
                  placeholder="Ocupation details"
                />
              </Box>

              <Box>
                <RadioButton
                  title="Hobbies"
                  register={register("Hobbies")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Hobbies_detail")}
                  name="text"
                  type="text"
                  placeholder="Hobbies detail"
                />
              </Box>

              <Box>
                <RadioButton
                  title="Other Subtances"
                  register={register("Other_Substances")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Other_Substances_detail")}
                  name="text"
                  type="text"
                  placeholder="Other Substances detail"
                />
              </Box>

              <Box>
                <RadioButton
                  title="Exercise"
                  register={register("Exercise")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Exercise_detail")}
                  name="text"
                  type="text"
                  placeholder="Exercise detail"
                />
              </Box>

              <Box>
                <RadioButton
                  title="Marital Status"
                  register={register("Marital_Status")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Marital_Status_detail")}
                  name="text"
                  type="text"
                  placeholder="Marital Status detail"
                />
              </Box>

              <Box>
                <RadioButton
                  title="Others"
                  register={register("Other")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Others_detail")}
                  name="text"
                  type="text"
                  placeholder="Other detail"
                />
              </Box>
            </Box>

            <Box
              sx={{display: "flex", flexDirection: "column"}}
              gap={1.5}
              mb={2}
            >
              <FormsHeaderText text="Family History" />

              <Box>
                <Input
                  label="Sibling"
                  register={register("Sibling")}
                  type="text"
                />
              </Box>

              <Box>
                <Input
                  label="Dad"
                  register={register("Dad")}
                  name="text"
                  type="text"
                />
              </Box>

              <Box>
                <Input
                  label="Mom"
                  register={register("Mom")}
                  name="text"
                  type="text"
                />
              </Box>

              <Box>
                <Input
                  label="Otehrs"
                  register={register("Other")}
                  name="text"
                  type="text"
                />
              </Box>
            </Box>

            <Box
              sx={{display: "flex", flexDirection: "column"}}
              gap={1.5}
              mb={2}
            >
              <FormsHeaderText text="Past Medical History" />

              <CheckboxInput register={register("PHM")} options={PMH} />

              <Box>
                <Textarea
                  register={register("Past_Medical_History_Comments")}
                  type="text"
                  label="Comments/Others"
                  placeholder="Write here......"
                />
              </Box>

              <Box>
                <Input
                  register={register("Past_Cardia_HX")}
                  type="text"
                  label="Past Cardiac HX"
                />
              </Box>

              <Box>
                <Input
                  label="Past Cardiac Surgery"
                  register={register("Past_Cardiac_Surgery")}
                  name="text"
                  type="text"
                />
              </Box>

              <Box>
                <Input
                  label="Past Cardiac Procedure"
                  register={register("Past_Cardiac_Procedure")}
                  name="text"
                  type="text"
                />
              </Box>

              <Box>
                <Input
                  label="Past Cardiac Testing"
                  register={register("Past_Cardiac_Testing")}
                  name="text"
                  type="text"
                />
              </Box>

              <Box>
                <Input
                  label="Past Surgical HX"
                  register={register("Past_Surgical_HX")}
                  name="text"
                  type="text"
                />
              </Box>

              <Box>
                <Input
                  label="Others"
                  register={register("Other_HX")}
                  name="text"
                  type="text"
                />
              </Box>
            </Box>

            <Box
              sx={{display: "flex", flexDirection: "column"}}
              gap={1.5}
              mb={2}
            >
              <FormsHeaderText text="Physical Examination" />

              <Box>
                <Input
                  register={register("BP_Sitting")}
                  name="text"
                  type="text"
                  label="BP Sitting"
                />
              </Box>

              <Box>
                <Input
                  label="BP Standing"
                  register={register("BP_Standing")}
                  name="text"
                  type="text"
                />
              </Box>

              <Box>
                <Input
                  label="BP Supine"
                  register={register("BP_Suspine")}
                  name="text"
                  type="text"
                />
              </Box>

              <Box>
                <Input
                  register={register("HR")}
                  name="text"
                  type="text"
                  label="HR"
                />
              </Box>

              <Box>
                <Input
                  register={register("RR")}
                  name="text"
                  type="text"
                  label="RR"
                />
              </Box>

              <Box>
                <Input
                  register={register("height")}
                  name="text"
                  type="text"
                  label="Height(CM)"
                />
              </Box>
              <Box>
                <Input
                  register={register("weight")}
                  name="text"
                  type="text"
                  label="Weight(KG)"
                />
              </Box>

              <Box>
                <Input
                  label="Change"
                  register={register("Change")}
                  name="text"
                  type="text"
                />
              </Box>

              <Box>
                <Input
                  register={register("BMI")}
                  name="text"
                  type="text"
                  label="BMI"
                />
              </Box>
            </Box>

            <Box>
              <FormsHeaderText text="General Examination" />
            </Box>

            <Box>
              <CheckboxInput
                register={register("cvs")}
                options={[
                  "Well developed",
                  "ill Appearing",
                  "Cachetic",
                  "Obese",
                ]}
              />
            </Box>

            <Box
              sx={{display: "flex", flexDirection: "column"}}
              gap={1.5}
              mb={1.5}
            >
              <Typography sx={{fontSize: "0.8rem", textTransform: "uppercase"}}>
                <b>Eyes</b>
              </Typography>

              <Box>
                <RadioButton
                  title="Conjunctiva"
                  register={register("Conjunctiva")}
                  options={["Normal", "Abnormal"]}
                />

                <Input
                  register={register("Conjunctiva_detail")}
                  type="text"
                  label="Conjunctiva details"
                />
              </Box>

              <Box>
                <RadioButton
                  title="Lids"
                  register={register("Lids")}
                  options={["Normal", "Abnormal"]}
                />
                <Input
                  register={register("Lids_detail")}
                  name="text"
                  type="text"
                  label="Lids details"
                />
              </Box>
            </Box>

            <Box
              sx={{display: "flex", flexDirection: "column"}}
              gap={1.5}
              mb={1.5}
            >
              <Typography sx={{fontSize: "0.8rem", textTransform: "uppercase"}}>
                <b>ENMT</b>
              </Typography>

              <Box>
                <RadioButton
                  title="Teeth"
                  register={register("Teeth")}
                  options={["Normal", "Abnormal"]}
                />
                <Input
                  register={register("Teeth_detail")}
                  name="text"
                  type="text"
                  label="Teeth details"
                />
              </Box>

              <Box>
                <RadioButton
                  title="Gums"
                  register={register("Gums")}
                  options={["Normal", "Abnormal"]}
                />
                <Input
                  register={register("Gums_detail")}
                  name="text"
                  type="text"
                  label="Gums details"
                />
              </Box>

              <Box>
                <RadioButton
                  title="Palate"
                  register={register("Palate")}
                  options={["Normal", "Abnormal"]}
                />
                <Input
                  register={register("Palate_detail")}
                  name="text"
                  type="text"
                  label="Palate details"
                />
              </Box>

              <Box>
                <RadioButton
                  title="Oral Mucosa"
                  register={register("Oral_Mucosa")}
                  options={["Normal", "Abnormal"]}
                />
                <Input
                  register={register("Oral_Mucosa_detail")}
                  name="text"
                  type="text"
                  label="Oral mucosa details"
                />
              </Box>
            </Box>

            <Box
              sx={{display: "flex", flexDirection: "column"}}
              gap={1.5}
              mb={1.5}
            >
              <Typography sx={{fontSize: "0.8rem", textTransform: "uppercase"}}>
                <b>Neck</b>
              </Typography>

              <Box>
                <RadioButton
                  title="Jugular Veins"
                  register={register("Jugular_Veins")}
                  options={["Normal", "Abnormal"]}
                />
                <Input
                  register={register("Jugular_Veins_detail")}
                  name="text"
                  type="text"
                  label="Jugular Veins details"
                />
              </Box>

              <Box>
                <RadioButton
                  title="Bruits"
                  register={register("Bruits")}
                  options={["Normal", "Abnormal"]}
                />
                <Input
                  register={register("Bruits_detail")}
                  name="text"
                  type="text"
                  label="Bruits detail"
                />
              </Box>
            </Box>

            <Box
              sx={{display: "flex", flexDirection: "column"}}
              gap={1.5}
              mb={1.5}
            >
              <Typography sx={{fontSize: "0.8rem", textTransform: "uppercase"}}>
                <b>Respiratory</b>
              </Typography>

              <Box>
                <RadioButton
                  title="Effort"
                  register={register("Effort")}
                  options={["Normal", "Abnormal"]}
                />
                <Input
                  register={register("Effort_detail")}
                  name="text"
                  type="text"
                  label="Effort detail"
                />
              </Box>
              <Box>
                <RadioButton
                  title="Breath Sound"
                  register={register("Breath_Sound")}
                  options={["Normal", "Abnormal"]}
                />
                <Input
                  register={register("Breath_Sound_detail")}
                  name="text"
                  type="text"
                  label="Breath Sound detail"
                />
              </Box>
            </Box>

            <Box
              sx={{display: "flex", flexDirection: "column"}}
              gap={1.5}
              mb={1.5}
            >
              <Typography sx={{fontSize: "0.8rem", textTransform: "uppercase"}}>
                <b>GI</b>
              </Typography>

              <Box>
                <RadioButton
                  title="Tenderness"
                  register={register("Tenderness")}
                  options={["Normal", "Abnormal"]}
                />
                <Input
                  register={register("Tenderness_detail")}
                  name="text"
                  type="text"
                  label="Tenderness detail"
                />
              </Box>

              <Box>
                <RadioButton
                  title="Hepatosplenomegaly"
                  register={register("Hepatosplenomegaly")}
                  options={["Normal", "Abnormal"]}
                />
                <Input
                  register={register("Hepatosplenomegaly_detail")}
                  type="text"
                  label="Hepatosplenomegaly detail"
                />
              </Box>

              <Box>
                <RadioButton
                  title="Abdominal Aorta(size,bruits)"
                  register={register("Abdominal_Aorta(size,bruits)")}
                  options={["Normal", "Abnormal"]}
                />
                <Input
                  register={register("Abdominal_Aorta_detail")}
                  name="text"
                  type="text"
                  label="Abdominal Aorta detail"
                />
              </Box>
            </Box>

            <Box
              sx={{display: "flex", flexDirection: "column"}}
              gap={1.5}
              mb={1.5}
            >
              <Typography sx={{fontSize: "0.8rem", textTransform: "uppercase"}}>
                <b>Vascular System Examination</b>
              </Typography>

              <Box>
                <Input
                  register={register("Radial")}
                  type="text"
                  label="Radial"
                />
              </Box>

              <Box>
                <Input
                  register={register("Femoral")}
                  type="text"
                  label="Femoral"
                />
              </Box>

              <Box>
                <Input register={register("Pedal")} type="text" label="Pedal" />
              </Box>
            </Box>

            <Box>
              <RadioButton
                register={register("Edema")}
                options={["Yes", "No"]}
                title="Edema"
              />
            </Box>

            <Box>
              <RadioButton
                title="Bruits"
                register={register("Vascular_Bruits")}
                options={["Yes", "No"]}
              />
            </Box>

            <Box
              sx={{display: "flex", flexDirection: "column"}}
              gap={1.5}
              mb={1.5}
            >
              <Typography sx={{fontSize: "0.8rem", textTransform: "uppercase"}}>
                <b>Musculoskeletal System Examination</b>
              </Typography>

              <Box>
                <RadioButton
                  title="Gait"
                  register={register("Gait")}
                  options={["Normal", "Abdominal"]}
                />

                <Input
                  register={register("Gait_detail")}
                  name="text"
                  type="text"
                  label="Gait detail"
                />
              </Box>

              <Box>
                <RadioButton
                  register={register("Kyphosis/Scoliosis ")}
                  options={["Absent", "Present"]}
                  title="Kyphosis/Scoliosis"
                />

                <Input
                  register={register("Kyphosis/Scoliosis_detail ")}
                  type="text"
                  placeholder="Kyphosis/Scoliosis detail"
                />
              </Box>
            </Box>

            <Box
              sx={{display: "flex", flexDirection: "column"}}
              gap={1.5}
              mb={1.5}
            >
              <Typography sx={{fontSize: "0.8rem", textTransform: "uppercase"}}>
                <b>Skin System Examination</b>
              </Typography>
              <Box>
                <RadioButton
                  title="Xanthoma"
                  register={register("input_text")}
                  options={["Yes", "No"]}
                />
              </Box>

              <Box>
                <RadioButton
                  title="Tugor"
                  register={register("input_text")}
                  options={["good", "poor"]}
                />
              </Box>
            </Box>

            <Box
              sx={{display: "flex", flexDirection: "column"}}
              gap={1.5}
              mb={1.5}
            >
              <Typography sx={{fontSize: "0.8rem", textTransform: "uppercase"}}>
                <b>neurological System Examination</b>
              </Typography>

              <Box>
                <RadioButton
                  title="A&O x3"
                  register={register("A&O_x3")}
                  options={["Normal", "Abnormal"]}
                />
                <Input
                  register={register("A&O_x3_detail")}
                  type="text"
                  label="A&O x3 detail"
                />
              </Box>

              <Box>
                <RadioButton
                  title="Affect"
                  register={register("Affect")}
                  options={["anxious", "flat", "appropriate"]}
                />
                <Input
                  register={register("Affect_detail")}
                  name="text"
                  type="text"
                  label="Affect Detail"
                />
              </Box>
            </Box>

            <Box>
              <Textarea
                label="Cardiac"
                register={register("Cardiac_Examination")}
                name="text"
                type="text"
                placeholder="Cardiac Examination"
              />
            </Box>

            <Box>
              <Textarea
                label="Other Examination"
                register={register("Other_Examinations")}
                name="text"
                type="text"
                placeholder="Other Examinations"
              />
            </Box>

            <Box>
              <Textarea
                label="Patient EKG Interpretation"
                register={register("EKG_Interpretation")}
                type="text"
                placeholder="EKG Interpretation......"
              />
            </Box>

            <Box>
              <Textarea
                label="Laboratory Result"
                register={register("Laboratory_result")}
                name="text"
                type="text"
                placeholder="Laboratory Result"
              />
            </Box>

            <Box>
              <Textarea
                label="Assessment"
                register={register("Assessment")}
                name="text"
                type="text"
                placeholder="Assessment"
              />
            </Box>

            <Box>
              <Textarea
                label="Plan"
                register={register("Plan")}
                name="text"
                type="text"
                placeholder="Plan"
              />
            </Box>

            <Box mb={2}>
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: "600",
                }}
              >
                Test Ordered
              </Typography>

              <CheckboxInput
                register={register("Test_Ordered")}
                options={tests}
              />

              <Box>
                <Input
                  register={register("CT_Details")}
                  type="text"
                  label="CT Details"
                />
              </Box>
            </Box>

            <Box mb={1.5}>
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: "600",
                }}
              >
                Labs
              </Typography>
              <CheckboxInput
                name="tests"
                register={register("Labs")}
                options={[
                  "BMP",
                  "CBC",
                  "PT/INR",
                  "Fasting Lipids",
                  "LFT",
                  "TSH",
                  "T3Uptake",
                  "T4",
                ]}
              />
            </Box>

            <Box mb={1.5}>
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: "600",
                }}
              >
                Followup In
              </Typography>
              <RadioButton
                register={register("Followup")}
                options={[
                  "1-2 weeks",
                  "1-2 months",
                  "3-4 months",
                  "5-6 months",
                  "7-8 months",
                  "9-10 months",
                  "1 year",
                ]}
              />
            </Box>

            <Box
              mb={1.5}
              sx={{display: "flex", flexDirection: "column"}}
              gap={1.5}
            >
              <Box>
                <Typography sx={{fontSize: "0.85rem", fontWeight: "600"}}>
                  All information on this form has been reviewed by me,
                  indictated by my full name below:
                </Typography>
              </Box>

              <Box>
                <Typography sx={{fontSize: "0.85rem"}}>
                  Attending Physician Name
                </Typography>
                <Input
                  register={register("Attending_Physician_Name")}
                  type="text"
                />
              </Box>

              <Box>
                <Typography sx={{fontSize: "0.85rem"}}>
                  Date Seen By Attending Physician
                </Typography>
                <MuiCustomDatePicker name="Date_Seen" control={control} />
              </Box>
            </Box>

            <Box mb={1.5}>
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
                onClick={handleSubmit(onSubmit)}
              >
                Submit Patient Consultation
              </GlobalCustomButton>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
}
