import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
import {DocumentClassList} from "./DocumentClass";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import Roaster from "../Admin/Roaster";
import {Box, getValue} from "@mui/system";
import RadioButton from "../../components/inputs/basic/Radio";
import {Button,Typography} from "@mui/material";
import Input from "../../components/inputs/basic/Input";
import Textarea from "../../components/inputs/basic/Textarea";
import CheckboxInput from "../../components/inputs/basic/Checkbox";
import MuiCustomDatePicker from "../../components/inputs/Date/MuiDatePicker";

export default function ProgressNote() {
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
    "Exercise",
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
  const progtype = ["New", "Return", "Periodic"];
  const appointgoal = [
    "Decrease Symptoms",
    "Improve Functioning",
    "Consolidate Gains",
    "Improve compliance",
  ];
  const SOAP = ["Subjective", "Objective", "Assessment", "Plan"];
  const progreq = ["Prepare for Discharge", "Other", "Next Review Plan Date"];

  /*  const joins=(p)=>{ "Chest Discomfort","SOB, 
        let x=p.split(" ")
        console.log(x)
        x.forEach((el,i)=>({
            setSub(prev => (prev+"_"+el))
        }
        ))
    } */
  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    // console.log(data)
    //data.Presenting_Complaints=symptoms
    //  data.Allergy_Skin_Test=allergies

    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentname = "Progress Note"; //"Lab Result"
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
    //console.log(document)

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
            //  setAllergies([])
            //  setSymptoms([])
            /*  setMessage("Created Client successfully") */
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
            //console.log(JSON.stringify(res))
            e.target.reset();
            //setAllergies([])
            //  setSymptoms([])
            /*  setMessage("Created Client successfully") */
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
      //state.DocumentClassModule.selectedDocumentClass.name
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      DocumentClassModule: newDocumentClassModule,
    }));
    console.log("close form");
  };
  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Progress Note</p>
          <button
            className="delete pushleft"
            aria-label="close"
            onClick={() => closeForm()}
          ></button>
        </div>
        <div className="card-content vscrollable remPad1">
          <form onSubmit={handleSubmit(onSubmit)}>

    <Box>
    <MuiCustomDatePicker label="Date" register={register("Date")} />
    </Box>
<Box>
  <CheckboxInput
            register={register("input_name")}
            options={[
              "New",
              "Return",
              "Periodic"
            ]}
          />
    </Box>

    <Box>  
       <Typography><b>Subjective</b></Typography>
      <Textarea
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Subjective"
           />
  </Box>

    <Box sx={{paddingTop:"1rem"}}>  
       <Typography><b>Objective</b></Typography>
      <Textarea
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Objective"
           />
  </Box>

    <Box sx={{paddingTop:"1rem"}}>  
       <Typography><b>Assessment</b></Typography>
      <Textarea
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Assessment"
           />
  </Box>

    <Box sx={{paddingTop:"1rem"}}>  
       <Typography><b>Plan</b></Typography>
      <Textarea
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Plan"
           />
  </Box>

    <Box sx={{paddingTop:"1rem"}}>  
        <Typography>Next appontment to be scheduled for</Typography>
      <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
           />
  </Box>


<Box>
       <Typography><b>Needs next appointment for</b></Typography>
  <CheckboxInput
            register={register("input_name")}
            options={[
              "Decrease Symptoms",
              "Improve Functioning",
              "Consolidate Gains",
              "Improve compliance"
            ]}
          />
    </Box>

    <Box>  
        <Typography>Prepare for Discharge</Typography>
      <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
           />
  </Box>

    <Box>  
        <Typography>Other</Typography>
      <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
           />
  </Box>
    <Box>  
        <Typography>Next Review Plan Date</Typography>
      <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
           />
  </Box>
<Box sx={{paddingTop:"1rem"}}>
       <Typography><b>Physician Sign Off</b></Typography>
    <Box >
    <Typography>
    All information on this form has been reviewed by me, indictated by ny name below:
    </Typography>
    </Box>
    <Box sx={{paddingTop:"1rem"}}>  
        <Typography>Attending_Physician_Name</Typography>
      <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
           />
  </Box>

    <Box>  
        <Typography>Date_Seen</Typography>
      <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
           />
  </Box>
    </Box> 
    <Box> 
      <RadioButton
        register={register("input_name")}
        options={[
                "Draft",
                "Final",
              ]}
            />
</Box>
         <Box  
        spacing={1}
        sx={{
          display: "flex",
          gap: "2rem",
        }}>
          <Button variant="contained" type="button">Save</Button>
          <Button variant="outlined" type="button">Cancel</Button>
        </Box>
          </form>
        </div>
      </div>
    </>
  );
}
