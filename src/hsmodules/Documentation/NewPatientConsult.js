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
import CheckboxGroup from "../../components/inputs/basic/Checkbox/CheckBoxGroup";
import GroupedRadio from "../../components/inputs/basic/Radio/GroupedRadio";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";

export default function NewPatientConsult() {
  const {register, handleSubmit, setValue, control, reset, getValues} =
    useForm(); //, watch, errors, reset
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
  const [confirmDialog, setconfirmDialog] = useState(false);

  const [dataset, setDataset] = useState();
  const {state, setState, showActionLoader, hideActionLoader, toggleSideMenu} =
    useContext(ObjectContext);

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  //state.DocumentClassModule.selectedDocumentClass.name

  useEffect(() => {
    if (!!draftDoc && draftDoc.status === "Draft") {
      //console.log(draftDoc);
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
    showActionLoader();
    //e.preventDefault();
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

    //return console.log(document)

    if (!!draftDoc && draftDoc.status === "Draft") {
      ClientServ.patch(draftDoc._id, document)
        .then(res => {
          // e.target.reset();
          Object.keys(data).forEach(key => {
            data[key] = null;
          });
          setconfirmDialog(false);
          hideActionLoader();
          setSuccess(true);
          reset(data);
          toast.success("New Patient Consultation Form updated succesfully");
          setSuccess(false);
          closeForm();
        })
        .catch(err => {
          hideActionLoader();
          setconfirmDialog(false);
          toast.error("Error updating New Patient Consultation Form " + err);
        });
    } else {
      ClientServ.create(document)
        .then(res => {
          Object.keys(data).forEach(key => {
            data[key] = null;
          });
          hideActionLoader();
          //e.target.reset();
          setSuccess(true);
          reset(data);
          setconfirmDialog(false);
          toast.success("Pediatric Pulmonology Form created succesfully");
          setSuccess(false);
          closeForm();
        })
        .catch(err => {
          setconfirmDialog(false);
          hideActionLoader();
          toast.error("Error creating Pediatric Pulmonology Form " + err);
        });
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
    //toggleSideMenu();
  };

  //console.log("Get Values", getValues("Medication_list_filled"));
  return (
    <>
      <div className="card ">
        <CustomConfirmationDialog
          open={confirmDialog}
          type="create"
          cancelAction={() => setconfirmDialog(false)}
          confirmationAction={handleSubmit(onSubmit)}
          message="You are about to save this document; New Patient Consultation Form"
        />
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
                <GroupedRadio
                  label="Gender"
                  row
                  name="Gender"
                  options={["Male", "Female"]}
                  control={control}
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
                name="Medication_list_filled"
                control={control}
                label="Medication list filled"
                defaultChecked={getValues("Medication_list_filled")}
              />
            </Box>

            <Box>
              <SingleCheckbox
                name="Not_Taking_Meds"
                control={control}
                defaultChecked={getValues("Not_Taking_Meds")}
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

            <SingleCheckbox
              control={control}
              label="NKDA"
              name="NKDA"
              defaultChecked={getValues("NKDA")}
            />

            <Box>
              <CheckboxGroup
                label="Review of Systems:"
                name="ROS"
                control={control}
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
              <CheckboxGroup
                label="Risk Factors:"
                //register={register("Risk_Factors")}
                name="Risk_Factors"
                control={control}
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
                <GroupedRadio
                  label="Smoker"
                  name="Smoker"
                  control={control}
                  options={["Yes", "No"]}
                />

                <Input
                  register={register("Smoker_detail")}
                  type="text"
                  label="Smoking details"
                />
              </Box>

              <Box>
                <GroupedRadio
                  label="Alcohol"
                  //register={register("Alcohol")}
                  name="Alcohol"
                  options={["Yes", "No"]}
                  row
                  control={control}
                />
                <Input
                  register={register("Alcohol_detail")}
                  type="text"
                  label="Alcohol details"
                />
              </Box>

              <Box>
                <GroupedRadio
                  label="Caffeine"
                  control={control}
                  row
                  name="Caffeine"
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Caffeine_detail")}
                  type="text"
                  placeholder="Caffeine details"
                />
              </Box>

              <Box>
                <GroupedRadio
                  label="Ocupation"
                  control={control}
                  name="Ocupation"
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
                <GroupedRadio
                  label="Hobbies"
                  //register={register("Hobbies")}
                  name="Hobbies"
                  control={control}
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
                <GroupedRadio
                  label="Other Subtances"
                  options={["Yes", "No"]}
                  control={control}
                  name="Other_Substances"
                />
                <Input
                  register={register("Other_Substances_detail")}
                  name="text"
                  type="text"
                  placeholder="Other Substances detail"
                />
              </Box>

              <Box>
                <GroupedRadio
                  label="Exercise"
                  control={control}
                  name="Exercise"
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
                <GroupedRadio
                  label="Marital Status"
                  options={["Yes", "No"]}
                  name="Marital_Status"
                  control={control}
                />
                <Input
                  register={register("Marital_Status_detail")}
                  name="text"
                  type="text"
                  placeholder="Marital Status detail"
                />
              </Box>

              <Box>
                <GroupedRadio
                  label="Others"
                  //register={register("Other")}
                  name="Other"
                  control={control}
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

              <CheckboxGroup name="PHM" control={control} options={PMH} />

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
              <CheckboxGroup
                //register={register("cvs")}
                name="CVS"
                control={control}
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
                <GroupedRadio
                  label="Conjunctiva"
                  name="Conjunctiva"
                  options={["Normal", "Abnormal"]}
                  control={control}
                />

                <Input
                  register={register("Conjunctiva_detail")}
                  type="text"
                  label="Conjunctiva details"
                />
              </Box>

              <Box>
                <GroupedRadio
                  label="Lids"
                  name="Lids"
                  control={control}
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
                <GroupedRadio
                  label="Teeth"
                  name="Teeth"
                  control={control}
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
                <GroupedRadio
                  label="Gums"
                  name="Gums"
                  control={control}
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
                <GroupedRadio
                  label="Palate"
                  name={"Palate"}
                  control={control}
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
                <GroupedRadio
                  label="Oral Mucosa"
                  control={control}
                  name="Oral_Mucosa"
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
                <GroupedRadio
                  label="Jugular Veins"
                  name="Jugular_Veins"
                  control={control}
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
                <GroupedRadio
                  label="Bruits"
                  name={"Bruits"}
                  control={control}
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
                <GroupedRadio
                  label="Effort"
                  name={"Effort"}
                  control={control}
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
                <GroupedRadio
                  label="Breath Sound"
                  name={"Breath_Sound"}
                  control={control}
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
                <GroupedRadio
                  name="Tenderness"
                  label="Tenderness"
                  control={control}
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
                <GroupedRadio
                  label="Hepatosplenomegaly"
                  name={"Hepatosplenomegaly"}
                  options={["Normal", "Abnormal"]}
                  control={control}
                />
                <Input
                  register={register("Hepatosplenomegaly_detail")}
                  type="text"
                  label="Hepatosplenomegaly detail"
                />
              </Box>

              <Box>
                <GroupedRadio
                  label="Abdominal Aorta (size, bruits)"
                  name="Abdominal Aorta (size, bruits)"
                  control={control}
                  options={["Normal", "Abnormal"]}
                />
                <Input
                  register={register("Abdominal Aorta (size, bruits)_detail")}
                  name="text"
                  type="text"
                  label="Abdominal Aorta (size, bruits) detail"
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
              <GroupedRadio
                name="Edma"
                options={["Yes", "No"]}
                label="Edema"
                control={control}
              />
            </Box>

            <Box>
              <GroupedRadio
                label="Bruits"
                name="Vascular_Bruits"
                options={["Yes", "No"]}
                control={control}
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
                <GroupedRadio
                  label="Gait"
                  name="Gait"
                  options={["Normal", "Abdominal"]}
                  control={control}
                />

                <Input
                  register={register("Gait_detail")}
                  name="text"
                  type="text"
                  label="Gait detail"
                />
              </Box>

              <Box>
                <GroupedRadio
                  name="Kyphosis/Scoliosis"
                  options={["Absent", "Present"]}
                  label="Kyphosis/Scoliosis"
                  control={control}
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
                <GroupedRadio
                  control={control}
                  label="Xanthoma"
                  name="Xanthoma"
                  options={["Yes", "No"]}
                />
              </Box>

              <Box>
                <GroupedRadio
                  control={control}
                  label="Tugor"
                  name="Tugor"
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
                <GroupedRadio
                  control={control}
                  label="A&O x3"
                  name="A&O_x3"
                  options={["Normal", "Abnormal"]}
                />
                <Input
                  register={register("A&O_x3_detail")}
                  type="text"
                  label="A&O x3 detail"
                />
              </Box>

              <Box>
                <GroupedRadio
                  control={control}
                  label="Affect"
                  name="Affect"
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

              <CheckboxGroup
                //register={register("Test_Ordered")}
                name="Test_Ordered"
                control={control}
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
              <CheckboxGroup
                name="Labs"
                control={control}
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
              <GroupedRadio
                control={control}
                name="Followup"
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
                onClick={() => setconfirmDialog(true)}
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
