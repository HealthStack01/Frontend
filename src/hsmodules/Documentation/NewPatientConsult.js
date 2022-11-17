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

export default function NewPatientConsult() {
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
    document.documentname = "New Patient Consultation Form"; //"Lab Result"
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
          <p className="card-header-title">New Patient Consultation Form</p>
          <button
            className="delete pushleft"
            aria-label="close"
            onClick={() => closeForm(false)}
          ></button>
        </div>
        <div className="card-content vscrollable remPad1">
          {/*   <label className="label is-size-7">
                  Client:  {order.orderInfo.orderObj.clientname}
                </label>
                <label className="label is-size-7">
                 Test:  {order.serviceInfo.name}
                </label> */}
          <form onSubmit={handleSubmit(onSubmit)}>


    <Box>
                <Input
                  register={register("input_name")}
                  name="name"
                  type="text"
                  placeholder="Name"
                />
    </Box>

    <Box>
                <Input
                  register={register("input_name")}
                  name="date"
                  type="text"
                  placeholder="Date of birth"
                />
    </Box>

    <Box>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="DOS"
                />
    </Box>
    <Box>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="PCP"
                />
    </Box>
    <Box>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Physician"
                />
    </Box>
   
    <Box>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Age"
                />
    </Box>  
    <Box>   
    <Typography>Gender</Typography>     
            <RadioButton
              register={register("input_name")}
              options={[
                "Male",
                "Female"
              ]}
            /> 
  </Box>
    <Box>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Requesting Physician"
                />
    </Box>

    <Box>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Reason"
                />
    </Box>
    <Box>
                <Textarea
                  register={register("input_name")}
                  name="findings"
                  type="text"
                  placeholder="HPI"
                />
  </Box>
  <CheckboxInput
            register={register("input_name")}
            options={[
              "Medication list filled",
              "Patient not taking medications"
            ]}
          />

    <Box>
                <Input
                  register={register("input_text")}
                  name="text"
                  type="text"
                  placeholder="Allergies"
                />
    </Box>

  <CheckboxInput
            register={register("input_name")}
            options={[
              "NKDA"
            ]}
          />
           <Box> 
          <Typography><b>Review of Systems</b></Typography>
              {ROS.map((c, i) => (
                  <CheckboxInput
                    key={i}
                    name="ROS"
                    register={register("input_name")}
                  options={[c + " "]}
                />
              ))}
             </Box>

    <Box>
      <Textarea
                  register={register("input_name")}
                  name="findings"
                  type="text"
                  placeholder="Comments/Others"
           />
  </Box>
 <Box sx={{paddingBlock:"1rem"}}> 
          <Typography><b>Risk Factors</b></Typography>
              {risk.map((c, i) => (
                  <CheckboxInput
                    key={i}
                    name="Risk"
                    register={register("input_name")}
                  options={[c + " "]}
                />
              ))}
             </Box>
    <Box>
       <Typography><b>Social History </b></Typography>
    <Box>  
       <Typography>Smoker</Typography>
      <RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Smoker details"
                />
    </Box>

    <Box>  
       <Typography>Alchol</Typography>
      <RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Alchol details"
                />
    </Box>

    <Box>  
       <Typography>Caffeine</Typography>
      <RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Caffeine details"
                />
    </Box>

    <Box>  
       <Typography>Ocupation</Typography>
      <RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Ocupation details"
                />
    </Box>

    <Box>  
       <Typography>Hobbies</Typography>
      <RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Hobbies details"
                />
    </Box>
    <Box>  
       <Typography>Other Substances</Typography>
      <RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Other Substances"
                />
    </Box>

    <Box>  
       <Typography>Exercise</Typography>
      <RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Exercise detail"
                />
    </Box>
    <Box>  
       <Typography>Marital Status</Typography>
      <RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Marital Status detail"
                />
    </Box>

    <Box>  
       <Typography>Other detail</Typography>
      <RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Other detail"
                />
    </Box>
    </Box>
    <Box> 
       <Typography><b>Family History</b></Typography>
    <Box> 
       <Typography>Sibling</Typography>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                />
    </Box>
    <Box> 
       <Typography>Dad</Typography>

                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                />
    </Box>
    <Box> 
       <Typography>Mom</Typography>

                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                />
    </Box>
    <Box> 
       <Typography>Others</Typography>

                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                />
    </Box>
    </Box>
           <Box> 
          <Typography><b>Past Medical History</b></Typography>
              {PMH.map((c, i) => (
                  <CheckboxInput
                    key={i}
                    name="ROS"
                    register={register("input_name")}
                  options={[c + " "]}
                />
              ))}
             </Box>

    <Box>
      <Textarea
                  register={register("input_name")}
                  name="findings"
                  type="text"
                  placeholder="Comments/Others"
           />
  </Box>
    <Box> 
       <Typography>Past Cardiac Hx</Typography>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                />
    </Box>
    <Box> 
       <Typography>Past Cardiac Surgery</Typography>

                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                />
    </Box>
    <Box> 
       <Typography>Past Cardiac Procedure</Typography>

                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                />
    </Box>

    <Box> 
       <Typography>Past Cardiac Testing</Typography>

                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                />
    </Box>

    <Box> 
       <Typography>Past Surgical Hx</Typography>

                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                />
    </Box>
    <Box> 
       <Typography>Others</Typography>

                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                />
    </Box>

    <Box> 
     <Typography><b>Physical Examination</b></Typography>
    <Box> 
       <Typography>BP Sitting</Typography>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                />
    </Box>
    <Box> 
       <Typography>BS Standing</Typography>

                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                />
    </Box>
    <Box> 
       <Typography>BS Supine</Typography>

                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                />
    </Box>

    <Box> 
       <Typography>HR</Typography>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                />
    </Box>

    <Box> 
       <Typography>RR</Typography>

                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                />
    </Box>

    <Box> 
       <Typography>Height</Typography>

                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                />
    </Box>
    <Box> 
       <Typography>Weight</Typography>

                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                />
    </Box>
    <Box> 
       <Typography>Change</Typography>

                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                />
    </Box>
    <Box> 
       <Typography>BMI</Typography>

                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                />
    </Box>
    </Box>


<Box>
       <Typography><b>General Examination</b></Typography>
  <CheckboxInput
            register={register("input_name")}
            options={[
              "Well developed",
              "ill Appearing",
              "Cachetic",
              "Obese"
            ]}
          />
    </Box>

    <Box>  
       <Typography><b>Eyes</b></Typography>
       <Typography>Conjunctiva</Typography>
      <RadioButton
        register={register("input_name")}
        options={[
                "Normal",
                "Abnormal"
              ]}
            />
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Conjunctiva details"
                />
    <Box>
       <Typography>Lids</Typography>
      <RadioButton
        register={register("input_name")}
        options={[
                "Normal",
                "Abnormal"
              ]}
            />
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Lids details"
                />
    </Box>
    </Box>
    <Box>  
       <Typography><b>ENMT</b></Typography>
       <Typography>Teeth</Typography>
      <RadioButton
        register={register("input_name")}
        options={[
                "Normal",
                "Abnormal"
              ]}
            />
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Teeth details"
                />
    <Box>
       <Typography>Gums</Typography>
      <RadioButton
        register={register("input_name")}
        options={[
                "Normal",
                "Abnormal"
              ]}
            />
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Gums details"
                />
    </Box>
    <Box>
       <Typography>Palate</Typography>
      <RadioButton
        register={register("input_name")}
        options={[
                "Normal",
                "Abnormal"
              ]}
            />
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Palate details"
                />
    </Box>
    <Box>
       <Typography>Oral mucosa</Typography>
      <RadioButton
        register={register("input_name")}
        options={[
                "Normal",
                "Abnormal"
              ]}
            />
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Oral mucosa details"
                />
    </Box>
    </Box>

    <Box>  
       <Typography><b>Neck</b></Typography>
       <Typography>Jugular Veins</Typography>
      <RadioButton
        register={register("input_name")}
        options={[
                "Normal",
                "Abnormal"
              ]}
            />
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Jugular Veins details"
                />
    <Box>
       <Typography>Bruits</Typography>
      <RadioButton
        register={register("input_name")}
        options={[
                "Normal",
                "Abnormal"
              ]}
            />
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Bruits detail"
                />
    </Box>
    </Box>
    <Box>  
       <Typography><b>Respiratory</b></Typography>
       <Typography>Effort</Typography>
      <RadioButton
        register={register("input_name")}
        options={[
                "Normal",
                "Abnormal"
              ]}
            />
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Effort detail"
                />
    <Box>  
       <Typography>Breath Sound</Typography>
      <RadioButton
        register={register("input_name")}
        options={[
                "Normal",
                "Abnormal"
              ]}
            />
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Breath Sound detail"
                />
    </Box>
    </Box>
    <Box>  
       <Typography><b>GI</b></Typography>
       <Typography>Tenderness</Typography>
      <RadioButton
        register={register("input_name")}
        options={[
                "Normal",
                "Abnormal"
              ]}
            />
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Tenderness detail"
                />
    <Box>  
       <Typography>Hepatosplenomegaly</Typography>
      <RadioButton
        register={register("input_name")}
        options={[
            
                "Normal",
                "Abnormal"
              ]}
            />
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Hepatosplenomegaly detail"
                />
    </Box>
    <Box>  

       <Typography>Abdominal Aorta(size,bruits)</Typography>
      <RadioButton
        register={register("input_name")}
        options={[
                "Normal",
                "Abnormal"
              ]}
            />
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Abdominal Aorta detail"
                />
    </Box>
    </Box>

    <Box>       
       <Typography><b>Vascular System Examination</b></Typography>
    <Box>
       <Typography>radial</Typography>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                />
    </Box>
    <Box>
       <Typography>femoral</Typography>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                />
    </Box>
    <Box>
       <Typography>pedal</Typography>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                />
    </Box>
    </Box>

              <Box>         
       <Typography>edema</Typography>
            <RadioButton
              register={register("input_text")}
              options={[
                "Yes",
                "No"
              ]}
            /> 
            </Box>

              <Box>
       <Typography>bruits</Typography>
            <RadioButton
              register={register("input_text")}
              options={[
                "Yes",
                "No"
              ]}
            /> 
               </Box>
<Box>
       <Typography><b>Musculoskeletal System Examination</b></Typography>
              <Box>   
       <Typography>Gait</Typography>
            <RadioButton
              register={register("input_text")}
              options={[
                "Normal",
                "Abdominal"
              ]}
            /> 
               </Box>
  
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="gait detail"
                />

              <Box>   
       <Typography>Kyphosis/Scoliosis</Typography>
            <RadioButton
              register={register("input_text")}
              options={[
                "Absent",
                "Present"
              ]}
            /> 
               </Box>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Kyphosis/Scoliosis detail"
                />
</Box>


              <Box>   
       <Typography><b>Skin System Examination</b></Typography>
       <Typography>Xanthoma</Typography>
            <RadioButton
              register={register("input_text")}
              options={[
                "Yes",
                "No"
              ]}
            /> 
            </Box>

              <Box>
       <Typography>Tugor</Typography>
            <RadioButton
              register={register("input_text")}
              options={[
                "good",
                "poor"
              ]}
            /> 
               </Box>
    <Box>
       <Typography><b>neurological System Examination</b></Typography>
    <Box>  
       <Typography>Affect</Typography>
      <RadioButton
        register={register("input_name")}
        options={[
                "Normal",
                "Abnormal"
              ]}
            />
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="A&O x3 detail"
                />
    </Box>
    <Box> 

       <Typography>Affect</Typography>
      <RadioButton
        register={register("input_name")}
        options={[
                "anxious",
                "flat",
                "appropriate"
              ]}
            />
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Abdominal Aorta detail"
                />
    </Box>
    </Box>

    <Box> 
       <Typography><b>Cardiac</b></Typography>
      <Textarea
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Cardiac Examination"
           />
  </Box>

    <Box>  
       <Typography><b>Other Examination</b></Typography>
      <Textarea
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Other Examination"
           />
  </Box>
    <Box>  
       <Typography><b>Patient EKG Interpretation</b></Typography>
      <Textarea
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="EKG Interpretation"
           />
  </Box>
    <Box>  
        <Typography><b>Laboratory Result</b></Typography>
      <Textarea
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Laboratory Result"
           />
  </Box>


    <Box>  
       <Typography><b>Assessment</b></Typography>
      <Textarea
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Assessment"
           />
  </Box>

    <Box>  
       <Typography><b>Plan</b></Typography>
      <Textarea
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Plan"
           />
  </Box>


           <Box> 
          <Typography><b>Past Medical History</b></Typography>
              {tests.map((c, i) => (
                  <CheckboxInput
                    key={i}
                    name="tests"
                    register={register("input_name")}
                  options={[c + " "]}
                />
              ))}
             </Box>
    <Box>  
        <Typography>CT Details</Typography>
      <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
           />
  </Box>

           <Box> 
          <Typography><b>Labs</b></Typography>
                  <CheckboxInput
                    name="tests"
                    register={register("input_name")}
                  options={["BMP","CBC","PT/INR","Fasting Lipids",
                   "LFT","TSH","T3Uptake","T4"
                  ]}
                />
             </Box>


    <Box> 
       <Typography><b>Followup In</b></Typography>
      <RadioButton
        register={register("input_name")}
        options={[
                "1-2 weeks",
                "1-2 months",
                "3-4 months",
                "5-6 months",
                "7-8 months",
                "9-10 months",
                "1 year"
              ]}
            />
</Box>
<Box>
       <Typography><b>Physician Sign Off</b></Typography>
    <Box sx={{paddingTop:"1.5rem"}}>
    <Typography>
    All information on this form has been reviewed by me, indictated by ny name below:
    </Typography>
    </Box>
    <Box>  
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
