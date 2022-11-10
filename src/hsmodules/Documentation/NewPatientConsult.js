import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
import {DocumentClassList} from "./DocumentClass";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import Roaster from "../Admin/Roaster";

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
            <div className="field">
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Name"
                  type="text"
                  placeholder="Name"
                />
              </p>
            </div>
            <div className="field">
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="DOB"
                  type="text"
                  placeholder="Date of birth"
                />
              </p>
            </div>
            <div className="field">
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="DOS"
                  type="text"
                  placeholder="DOS"
                />
              </p>
            </div>
            <div className="field">
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="PCP"
                  type="text"
                  placeholder="PCP"
                />
              </p>
            </div>
            <div className="field">
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Physician"
                  type="text"
                  placeholder="Physician"
                />
              </p>
            </div>
            <div className="field">
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Age"
                  type="text"
                  placeholder="Age"
                />
              </p>
            </div>

            <div className="field">
              <label>Gender</label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Gender"
                  value="Male"
                  onChange={e => {
                    handleChangePart(e);
                  }}
                />
                <span> Male</span>
              </label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Gender"
                  value="Female"
                  onChange={e => handleChangePart(e)}
                />
                <span>Female</span>
              </label>
            </div>
            <div className="field">
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Requesting_Physician"
                  type="text"
                  placeholder="Requesting Physician"
                />
              </p>
            </div>
            <div className="field">
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Reason"
                  type="text"
                  placeholder="Reason"
                />
              </p>
            </div>
            <div className="field">
              <p className="control ">
                <textarea
                  className="textarea is-small"
                  {...register("input_name")}
                  name="HPI"
                  type="text"
                  placeholder="HPI"
                />
              </p>
            </div>

            <div className="field">
              {/*    <p className="control ">
                            <input className="input is-small"   {...register("input_name")} name="Marital_Status" type="text" placeholder="Marital Status" />
                                      
                        </p> */}
              <label className=" is-small">
                <input
                  type="checkbox"
                  name="Medication_list_filled"
                  {...register("input_name")}
                />{" "}
                Medication list filled
              </label>
            </div>
            <div className="field">
              <label className=" is-small">
                <input
                  type="checkbox"
                  name="Not_Taking_Meds"
                  {...register("input_name")}
                />{" "}
                Patient not taking medications
              </label>
            </div>

            <div className="field">
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Allergies"
                  type="text"
                  placeholder="Allergies"
                />
              </p>
            </div>
            <div className="field">
              <label className=" is-small">
                <input
                  type="checkbox"
                  name="NKDA"
                  {...register("input_name")}
                />{" "}
                NKDA
              </label>
            </div>
            <b> Review of Systems </b>
            <div className="field ml-3 ">
              {/* <label className= "mr-2 "> <b>Cough nature:</b></label> */}
              {ROS.map((c, i) => (
                <label className=" is-small mr-1" key={c}>
                  <input
                    type="checkbox"
                    /* value={c + ", "} */ name="ROS"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
            </div>
            <div className="field ml-3 ">
              <p className="control ">
                <textarea
                  className="textarea is-small"
                  {...register("input_name")}
                  name="ROS_comments"
                  type="text"
                  placeholder="Comments/Other"
                />
              </p>
            </div>
            <b> Risk Factors </b>
            <div className="field ml-3 ">
              {/* <label className= "mr-2 "> <b>Cough nature:</b></label> */}
              {risk.map((c, i) => (
                <label className=" is-small mr-1" key={c}>
                  <input
                    type="checkbox"
                    value={c + ", "}
                    name="Risk_Factors"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
            </div>

            <b> Social History </b>

            {socialhistory.map((x, i) => (
              <div className="field ml-3 ">
                <label className="mr-2 ">{x}</label>
                {yesno.map((c, i) => (
                  <label className=" is-small" key={c}>
                    <input
                      type="radio"
                      value={c + ", "}
                      name={x}
                      {...register("input_name")}
                    />
                    {c + " "}
                  </label>
                ))}
                <p className="control ">
                  <input
                    className="input is-small"
                    {...register("input_name")}
                    name={`${x}_detail`}
                    type="text"
                    placeholder={`${x} detail`}
                  />
                </p>
              </div>
            ))}
            <b> Family History </b>
            <div className="field ml-3 ">
              {/* <label className= "mr-2 "> <b>Cough nature:</b></label> */}
              {familyHx.map((c, i) => (
                <p className="control ">
                  <label className=" is-size-7 mr-1" key={c}>
                    {c + " "}{" "}
                    <input
                      className="input is-small"
                      type="text"
                      /* value={c + ", "} */ name={c}
                      {...register("input_name")}
                    />
                  </label>
                </p>
              ))}
            </div>
            <b> Past Medical History </b>
            <div className="field ml-3 ">
              {/* <label className= "mr-2 "> <b>Cough nature:</b></label> */}
              {PMH.map((c, i) => (
                <span>
                  <label className=" is-small mr-1 " key={c}>
                    <input
                      type="checkbox"
                      value={c + ", "}
                      name="PMH"
                      {...register("input_name")}
                    />
                    {c + " "}
                  </label>
                </span>
              ))}
              <p className="control  mt-1">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Past_Medical_History_Comments"
                  type="text"
                  placeholder="Comments/Other"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              {/* <label className= "mr-2 "> <b>Cough nature:</b></label> */}
              {hx.map((c, i) => (
                <p className="control ">
                  <label className=" is-size-7 mr-1" key={c}>
                    {c + " "}{" "}
                    <input
                      className="input is-small"
                      type="text"
                      /* value={c + ", "} */ name={c}
                      {...register("input_name")}
                    />
                  </label>
                </p>
              ))}
            </div>
            <b> Physical Examination </b>
            <div className="field ml-3 ">
              {/* <label className= "mr-2 "> <b>Cough nature:</b></label> */}
              {physicalexam.map((c, i) => (
                <p className="control ">
                  <label className=" is-size-7 mr-1" key={c}>
                    {c + " "}{" "}
                    <input
                      className="input is-small"
                      type="text"
                      /* value={c + ", "} */ name={c}
                      {...register("input_name")}
                    />
                  </label>
                </p>
              ))}
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>General Examination:</b>
              </label>
              {appear.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="checkbox"
                    value={c + ", "}
                    name="cvs"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
            </div>
            <b> Eyes</b>
            {eyes.map((x, i) => (
              <div className="field ml-3 ">
                <label className="mr-2 ">{x}</label>
                {abn.map((c, i) => (
                  <label className=" is-small" key={c}>
                    <input
                      type="radio"
                      value={c + ", "}
                      name={x}
                      {...register("input_name")}
                    />
                    {c + " "}
                  </label>
                ))}
                <p className="control ">
                  <input
                    className="input is-small"
                    {...register("input_name")}
                    name={`${x}_detail`}
                    type="text"
                    placeholder={`${x} detail`}
                  />
                </p>
              </div>
            ))}
            <b> ENMT </b>
            {ENMT.map((x, i) => (
              <div className="field ml-3 ">
                <label className="mr-2 ">{x}</label>
                {abn.map((c, i) => (
                  <label className=" is-small" key={c}>
                    <input
                      type="radio"
                      value={c + ", "}
                      name={x}
                      {...register("input_name")}
                    />
                    {c + " "}
                  </label>
                ))}
                <p className="control ">
                  <input
                    className="input is-small"
                    {...register("input_name")}
                    name={`${x}_detail`}
                    type="text"
                    placeholder={`${x} detail`}
                  />
                </p>
              </div>
            ))}
            <b> Neck </b>
            {Neck.map((x, i) => (
              <div className="field ml-3 ">
                <label className="mr-2 ">{x}</label>
                {abn.map((c, i) => (
                  <label className=" is-small" key={c}>
                    <input
                      type="radio"
                      value={c + ", "}
                      name={x}
                      {...register("input_name")}
                    />
                    {c + " "}
                  </label>
                ))}
                <p className="control ">
                  <input
                    className="input is-small"
                    {...register("input_name")}
                    name={`${x}_detail`}
                    type="text"
                    placeholder={`${x} detail`}
                  />
                </p>
              </div>
            ))}
            <b>Respiratory </b>
            {Resp.map((x, i) => (
              <div className="field ml-3 ">
                <label className="mr-2 ">{x}</label>
                {abn.map((c, i) => (
                  <label className=" is-small" key={c}>
                    <input
                      type="radio"
                      value={c + ", "}
                      name={x}
                      {...register("input_name")}
                    />
                    {c + " "}
                  </label>
                ))}
                <p className="control ">
                  <input
                    className="input is-small"
                    {...register("input_name")}
                    name={`${x}_detail`}
                    type="text"
                    placeholder={`${x} detail`}
                  />
                </p>
              </div>
            ))}
            <b> GI </b>
            {GI.map((x, i) => (
              <div className="field ml-3 ">
                <label className="mr-2 ">{x}</label>
                {abn.map((c, i) => (
                  <label className=" is-small" key={c}>
                    <input
                      type="radio"
                      value={c + ", "}
                      name={x}
                      {...register("input_name")}
                    />
                    {c + " "}
                  </label>
                ))}
                <p className="control ">
                  <input
                    className="input is-small"
                    {...register("input_name")}
                    name={`${x}_detail`}
                    type="text"
                    placeholder={`${x} detail`}
                  />
                </p>
              </div>
            ))}

            <b>Vascular System Examination </b>
            <div className="field ml-3 ">
              {/* <label className= "mr-2 "> <b>Cough nature:</b></label> */}
              {vasc.map((c, i) => (
                <p className="control ">
                  <label className=" is-size-7 mr-1" key={c}>
                    {c + " "}{" "}
                    <input
                      className="input is-small"
                      type="text"
                      /* value={c + ", "} */ name={c}
                      {...register("input_name")}
                    />
                  </label>
                </p>
              ))}
            </div>
            {vasc2.map((x, i) => (
              <div className="field ml-3 ">
                <label className="mr-2 ">{x}</label>
                {yesno.map((c, i) => (
                  <label className=" is-small" key={c}>
                    <input
                      type="radio"
                      value={c + ", "}
                      name={x}
                      {...register("input_name")}
                    />
                    {c + " "}
                  </label>
                ))}
              </div>
            ))}

            <b>Musculoskeletal System Examination </b>

            <div className="field ml-3 ">
              <label className="mr-2 ">{MS[0]}</label>
              {abn.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c + ", "}
                    name={MS[0]}
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name={`${MS[0]}_detail`}
                  type="text"
                  placeholder={`${MS[0]} detail`}
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">{MS[1]}</label>
              {presnt.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c + ", "}
                    name={MS[1]}
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name={`${MS[1]}_detail`}
                  type="text"
                  placeholder={`${MS[1]} detail`}
                />
              </p>
            </div>

            <b>Skin System Examination </b>
            <div className="field ml-3 ">
              <label className="mr-2 ">{skinex[0]}</label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c + ", "}
                    name={skinex[0]}
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">{skinex[1]}</label>
              {poor.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c + ", "}
                    name={skinex[1]}
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
            </div>

            <b>neurological System Examination </b>
            <div className="field ml-3 ">
              <label className="mr-2 ">{neu[0]}</label>
              {abn.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c + ", "}
                    name={neu[0]}
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name={`${neu[0]}_detail`}
                  type="text"
                  placeholder={`${neu[0]} detail`}
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">{neu[1]}</label>
              {affect.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c + ", "}
                    name={neu[0]}
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name={`${neu[0]}_detail`}
                  type="text"
                  placeholder={`${neu[0]} detail`}
                />
              </p>
            </div>
            <b>Cardiac </b>
            <div className="field ml-3 ">
              <p className="control ">
                <textarea
                  className="textarea is-small"
                  {...register("input_name")}
                  name="Cardiac Examination"
                  type="text"
                  placeholder="Cardiac Examination"
                />
              </p>
            </div>

            <b>Other Examination </b>
            <div className="field ml-3 ">
              <p className="control ">
                <textarea
                  className="textarea is-small"
                  {...register("input_name")}
                  name="Others_Examination"
                  type="text"
                  placeholder="Other Examination"
                />
              </p>
            </div>
            <b>Patient's EKG interpretation </b>
            <div className="field ml-3 ">
              <p className="control ">
                <textarea
                  className="textarea is-small"
                  {...register("input_name")}
                  name="EKG_Interpretation"
                  type="text"
                  placeholder="EKG Interpretation"
                />
              </p>
            </div>
            <b>Laboratory Results </b>
            <div className="field ml-3 ">
              <p className="control ">
                <textarea
                  className="textarea is-small"
                  {...register("input_name")}
                  name="Others_Examination"
                  type="text"
                  placeholder="Labratory results"
                />
              </p>
            </div>
            {clerk.map((c, i) => (
              <>
                <b>{c}</b>
                <div className="field ml-3 ">
                  <p className="control ">
                    <textarea
                      className="textarea is-small"
                      {...register("input_name")}
                      name={c}
                      type="text"
                      placeholder={c}
                    />
                  </p>
                </div>
              </>
            ))}

            <b>Test Ordered</b>
            <div className="field ml-3 ">
              {/* <label className= "mr-2 "> <b>Cough nature:</b></label> */}
              {tests.map((c, i) => (
                <label className=" is-small mr-1" key={c}>
                  <input
                    type="checkbox"
                    value={c + ", "}
                    name="Test_Ordered"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <label className=" is-size-7 mr-1">
                  CT Details{" "}
                  <input
                    className="input is-small"
                    type="text"
                    /* value={c + ", "} */ name="CT_Details"
                    {...register("input_name")}
                  />
                </label>
              </p>
            </div>
            <b>Labs</b>
            <div className="field ml-3 ">
              {/* <label className= "mr-2 "> <b>Cough nature:</b></label> */}
              {labo.map((c, i) => (
                <label className=" is-small mr-1" key={c}>
                  <input
                    type="checkbox"
                    value={c + ", "}
                    name="Labs"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
            </div>
            <b>Followup in</b>
            <div className="field ml-3 ">
              {/* <label className= "mr-2 "> <b>Cough nature:</b></label> */}
              {followup.map((c, i) => (
                <label className=" is-small mr-1" key={c}>
                  <input
                    type="radio"
                    value={c + ", "}
                    name="Followup"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
            </div>
            <b>Physician Sign Off</b>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                All information on this form has been reviewed by me, indictated
                by ny name below:
              </label>
              {physiciandetails.map((c, i) => (
                <p className="control ">
                  <label className=" is-size-7 mr-1" key={c}>
                    {c + " "}{" "}
                    <input
                      className="input is-small"
                      type="text"
                      /* value={c + ", "} */ name={c}
                      {...register("input_name")}
                    />
                  </label>
                </p>
              ))}
            </div>

            <div className="field">
              <label className=" is-small">
                <input
                  type="radio"
                  checked={docStatus === "Draft"}
                  name="status"
                  value="Draft"
                  onChange={e => {
                    handleChangeStatus(e);
                  }}
                />
                <span> Draft</span>
              </label>{" "}
              <br />
              <label className=" is-small">
                <input
                  type="radio"
                  checked={docStatus === "Final"}
                  name="status"
                  value="Final"
                  onChange={e => handleChangeStatus(e)}
                />
                <span> Final </span>
              </label>
            </div>

            <div className="field  is-grouped mt-2">
              <p className="control">
                <button type="submit" className="button is-success is-small">
                  Save
                </button>
              </p>
              <p className="control">
                <button type="reset" className="button is-warning is-small">
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
