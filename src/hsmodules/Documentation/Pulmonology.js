import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
import {DocumentClassList} from "./DocumentClass";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";

export default function PulmonologyIntake() {
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
  const {state} = useContext(ObjectContext);

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

  /*  const joins=(p)=>{
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
    data.Presenting_Complaints = symptoms;
    data.Allergy_Skin_Test = allergies;

    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentname = "Pediatric Pulmonology Form"; //"Lab Result"
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
            setAllergies([]);
            setSymptoms([]);
            /*  setMessage("Created Client successfully") */
            setSuccess(true);
            toast({
              message: "Pediatric Pulmonology Form updated succesfully",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
            });
            setSuccess(false);
          })
          .catch(err => {
            toast({
              message: "Error updating Pediatric Pulmonology Form " + err,
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
            setAllergies([]);
            setSymptoms([]);
            /*  setMessage("Created Client successfully") */
            setSuccess(true);
            toast({
              message: "Pediatric Pulmonology Form created succesfully",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
            });
            setSuccess(false);
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

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Pediatric Pulmonology Form</p>
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
                  name="Occupation"
                  type="text"
                  placeholder="Occupation"
                />
              </p>
            </div>

            {/*  <div className="field">
                    <label >5. Race</label> 
                    <label className=" is-small ml-2">
                            <input  type="radio" {...register("input_name")} name="Race"  value="African"  onChange={(e)=>{handleChangePart(e)}}/>
                                <span > African</span>
                    </label> 
                    <label className=" is-small ml-2">
                        <input type="radio" {...register("input_name")} name="Race"   value="Caucasian"  onChange={(e)=>handleChangePart(e)}/>
                        <span>Caucasian</span>
                    </label>
                    <label className=" is-small ml-2">
                        <input type="radio" {...register("input_name")} name="Race"   value="Indian"  onChange={(e)=>handleChangePart(e)}/>
                        <span>Indian </span>
                    </label>
                    <label className=" is-small ml-2">
                        <input type="radio" {...register("input_name")} name="Race"   value="Others"   onChange={(e)=>handleChangePart(e)}/>
                        <span>Others </span>
                    </label>
                    <p className="control ">
                            <input className="input is-small"   {...register("input_name")} name="Others_race" type="text" placeholder="Highest Level of Education" />           
                        </p>
                </div> */}
            <div className="field">
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Marital_Status"
                  type="text"
                  placeholder="Marital Status"
                />
              </p>
            </div>

            <div className="field">
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Address"
                  type="text"
                  placeholder="Address"
                />
              </p>
            </div>
            <div className="field">
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Tribe"
                  type="text"
                  placeholder="Tribe"
                />
              </p>
            </div>
            <div className="field">
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Informants"
                  type="text"
                  placeholder="Informants"
                />
              </p>
            </div>
            <div className="field">
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Religion"
                  type="text"
                  placeholder="Religion"
                />
              </p>
            </div>
            <div className="field">
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Father_Phone_Number"
                  type="text"
                  placeholder="Father's Phone Number"
                />
              </p>
            </div>
            <div className="field">
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Mother_Phone_Number"
                  type="text"
                  placeholder="Mother's Phone Number"
                />
              </p>
            </div>
            <div className="field">
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Next_of_Kin"
                  type="text"
                  placeholder="Next of Kin"
                />
              </p>
            </div>

            {/*  <div className="field ">
                       
                        <label >8. Highest Level of Education</label> 
                                <label className=" is-small ml-2">
                                        <input  type="radio" {...register("input_name")} name="Education" value="Uneducated" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Uneducated</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" {...register("input_name")} name="Education"  value="Primary School" onChange={(e)=>handleChangePart(e)}/>
                                    <span>Primary School</span>
                                </label>
                                <label className=" is-small ml-2">
                                    <input type="radio" {...register("input_name")} name="Education"  value="Secondary School" onChange={(e)=>handleChangePart(e)}/>
                                    <span>Secondary School </span>
                                </label>
                                <label className=" is-small ml-2">
                                    <input type="radio" {...register("input_name")} name="Education"  value="Post-Secondary School (Diploma /Degree)" onChange={(e)=>handleChangePart(e)}/>
                                    <span>Post-Secondary School (Diploma /Degree) </span>
                                </label>
                                <label className=" is-small ml-2">
                                    <input type="radio" {...register("input_name")} name="Education"  value="Others" onChange={(e)=>handleChangePart(e)}/>
                                    <span>Others (Specify) </span>
                                </label>
                        <p className="control ">
                            <input className="input is-small"   {...register("input_name")} name="others_education" type="text" placeholder="Highest Level of Education" />           
                        </p>
                </div> */}
            <h3>
              <b>Presentation Complaints</b>
            </h3>
            <input
              className="input is-small is-hidden"
              {...register("input_name")}
              name="Presenting_Complaints"
              type="text"
              placeholder="Specify"
            />
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small"> Symptom</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      value={symptom}
                      /* {...register("input_name")} */ onChange={e => {
                        setSymptom(e.target.value);
                      }}
                      name="symptom"
                      type="text"
                      placeholder="Symptom"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">Duration</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      value={duration}
                      /* {...register("input_name")} */ onChange={e => {
                        setDuration(e.target.value);
                      }}
                      name="durationn"
                      type="text"
                      placeholder="Duration"
                    />
                  </p>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <div
                    className="button is-success is-small selectadd"
                    onClick={handleAddSymptoms}
                  >
                    Add
                  </div>
                </div>
              </div>
            </div>
            <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
              <thead>
                <tr>
                  <th>
                    <abbr title="Serial No">S/No</abbr>
                  </th>

                  <th>
                    <abbr title="Type"> Symptom</abbr>
                  </th>
                  <th>
                    <abbr title="Destination">Duration</abbr>
                  </th>
                </tr>
              </thead>
              <tfoot></tfoot>
              <tbody>
                {symptoms.map((ProductEntry, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{ProductEntry.symptom}</td>
                    <td>{ProductEntry.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3>
              <b>Review of Systems</b>
            </h3>

            <h4>i. Respiratory</h4>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small"> (a) Cough</label>
                </div>
                <div className="field">
                  <label className=" is-small">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="Cough"
                      value="Yes"
                      onChange={e => {
                        handleChangePart(e);
                      }}
                    />
                    <span> Yes</span>
                  </label>
                  <label className=" is-small ml-2">
                    <input
                      type="radio"
                      {...register("input_name")}
                      name="Cough"
                      value="No"
                      onChange={e => handleChangePart(e)}
                    />
                    <span>No </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Cough nature:</b>
              </label>
              {coughinfo.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="checkbox"
                    value={c + ", "}
                    name="cough_nature"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Associated symptoms with cough:</b>
              </label>
              {coughsymptoms.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="checkbox"
                    value={c + ", "}
                    name="cough_associated_symptoms"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Sputum Colour:</b>
              </label>
              {coughsputum.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="cough_sputum_colour"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                <b>Other Respiratory Symptoms:</b>
              </label>
              {resp.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="checkbox"
                    value={c + ", "}
                    name="Other_Respiratory"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
            </div>
            <h4>ii. CVS</h4>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>CVS Symptoms:</b>
              </label>
              {cvs.map((c, i) => (
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

            <h4>iii. GIT</h4>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Abdominal pain</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c + ", "}
                    name="Abdominal_pain"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Abdominal_Pain_details"
                  type="text"
                  placeholder="Abdominal Pain details"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Abdominal swelling</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c + ", "}
                    name="Abdominal_swelling"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Abdominal_Swelling_details"
                  type="text"
                  placeholder="Abdominal Swelling details"
                />
              </p>
              [onset? Progressive, swelling in other part of the body]
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Diarrhea</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c + ", "}
                    name="Diarrhea"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Diarrhea_details"
                  type="text"
                  placeholder="Diarrhea details"
                />
              </p>
              [onset, frequency, consistency, duration, blood stained, colour
              (r.g rice water colour), mucoid]
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b> Nausea</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c + ", "}
                    name="Nausea"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Nausea_details"
                  type="text"
                  placeholder="Nausea details"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Vomitting</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c + ", "}
                    name="Vomitting"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Vomitting_details"
                  type="text"
                  placeholder="Vomitting details"
                />
              </p>
              [projectile? Content? Episodes?]
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Constipation</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c + ", "}
                    name="Constipation"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Constipation_details"
                  type="text"
                  placeholder="Constipation details"
                />
              </p>
              [onset]
            </div>
            <h4>iv. Urinary</h4>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Urinary findings:</b>
              </label>
              {urinary.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="checkbox"
                    value={c + ", "}
                    name="Urinary"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Urinary_others"
                  type="text"
                  placeholder="Urinary others Specify"
                />
              </p>
            </div>

            <h4>v. CNS</h4>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Headache</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Headache"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <div className="field">
                {headache.map((c, i) => (
                  <label className=" is-small" key={c}>
                    <input
                      type="checkbox"
                      value={c}
                      name="Headache_info"
                      {...register("input_name")}
                    />
                    {c + " "}
                  </label>
                ))}
              </div>
              <p className="control pullups">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Headache_details"
                  type="text"
                  placeholder="Headache details"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Neck Pain</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Neck_pain"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}

              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Neck_pain_details"
                  type="text"
                  placeholder="Neck Pain details"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Neck Stiffness</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Neck_Stiffness"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Neck_Stiffness_details"
                  type="text"
                  placeholder="Neck_Stiffness details"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b> Vertigo</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Vertigo"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Vertigo_details"
                  type="text"
                  placeholder="Vertigo details"
                />
              </p>
            </div>

            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Dizziness</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Dizziness"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Dizziness_details"
                  type="text"
                  placeholder="Dizziness details"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Fainting spells</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Fainting_spells"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Fainting_spells_details"
                  type="text"
                  placeholder="Fainting spells details"
                />
              </p>
            </div>

            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Akward Gait</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Akward_Gait"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Akward_Gait_details"
                  type="text"
                  placeholder="Akward Gait details"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Weakness of Upper Limbs</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Weakness_Upper_Limbs"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <div className="field">
                {limbs.map((c, i) => (
                  <label className=" is-small" key={c}>
                    <input
                      type="checkbox"
                      value={c}
                      name="Weakness_Upper_Limbs_side"
                      {...register("input_name")}
                    />
                    {c + " "}
                  </label>
                ))}
              </div>

              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Weakness_Upper_Limbs_details"
                  type="text"
                  placeholder="Weakness Upper Limbs"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Weakness Lower Limbs</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Weakness_Lower_Limbs"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}

              <div className="field">
                {limbs.map((c, i) => (
                  <label className=" is-small" key={c}>
                    <input
                      type="checkbox"
                      value={c}
                      name="Weakness_Lower_Limbs_side"
                      {...register("input_name")}
                    />
                    {c + " "}
                  </label>
                ))}
              </div>
              <p className="control pullups ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Weakness_Lower_Limbs_details"
                  type="text"
                  placeholder="Weakness Lower Limbs details"
                />
              </p>
            </div>
            <h4>vi. ENT</h4>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Eye pain</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Eye_pain"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <div className="field">
                {side.map((c, i) => (
                  <label className=" is-small" key={c}>
                    <input
                      type="checkbox"
                      value={c}
                      name="Eye_pain_side"
                      {...register("input_name")}
                    />
                    {c + " "}
                  </label>
                ))}
              </div>
              <p className="control pullups">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Eye_pain_details"
                  type="text"
                  placeholder="Eye pain details"
                />
              </p>
            </div>

            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Eye Discharge</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Eye_discharge"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <div className="field">
                {side.map((c, i) => (
                  <label className=" is-small" key={c}>
                    <input
                      type="checkbox"
                      value={c}
                      name="Eye_discharge_side"
                      {...register("input_name")}
                    />
                    {c + " "}
                  </label>
                ))}
              </div>
              <p className="control pullups">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Eye_discharge_details"
                  type="text"
                  placeholder="Eye discharge details"
                />
              </p>
            </div>

            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Eye Swelling</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Eye_swelling"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <div className="field">
                {side.map((c, i) => (
                  <label className=" is-small" key={c}>
                    <input
                      type="checkbox"
                      value={c}
                      name="Eye_swelling_side"
                      {...register("input_name")}
                    />
                    {c + " "}
                  </label>
                ))}
              </div>
              <p className="control pullups">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Eye_swelling_details"
                  type="text"
                  placeholder="Eye swelling details"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Ear pain</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Ear_pain"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <div className="field">
                {side.map((c, i) => (
                  <label className=" is-small" key={c}>
                    <input
                      type="checkbox"
                      value={c}
                      name="Ear_pain_side"
                      {...register("input_name")}
                    />
                    {c + " "}
                  </label>
                ))}
              </div>
              <p className="control pullups">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Ear_pain_details"
                  type="text"
                  placeholder="Ear pain details"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Ear Discharge</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Ear_Discharge"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <div className="field">
                {eardis.map((c, i) => (
                  <label className=" is-small" key={c}>
                    <input
                      type="checkbox"
                      value={c + ", "}
                      name="Ear_Discharge_side"
                      {...register("input_name")}
                    />
                    {c + " "}
                  </label>
                ))}
              </div>
              <p className="control pullups">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Ear_Discharge_details"
                  type="text"
                  placeholder="Ear Discharge details"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Other ENT Findings</b>
              </label>

              <div className="field">
                {ent.map((c, i) => (
                  <label className=" is-small" key={c}>
                    <input
                      type="checkbox"
                      value={c + ", "}
                      name="other_ENT"
                      {...register("input_name")}
                    />
                    {c + " "}
                  </label>
                ))}
              </div>
              <p className="control pullups">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Other_ENT_details"
                  type="text"
                  placeholder="Other ENT findings details"
                />
              </p>
            </div>
            <h4>vii. Endocrinology</h4>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Endocrinology Findings</b>
              </label>

              <div className="field">
                {endo.map((c, i) => (
                  <label className=" is-small" key={c}>
                    <input
                      type="checkbox"
                      value={c + ", "}
                      name="Endocrinology"
                      {...register("input_name")}
                    />
                    {c + " "}
                  </label>
                ))}
              </div>
              <p className="control pullups">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Other_Endocrinology_finding"
                  type="text"
                  placeholder="Other Endocrinology findings details"
                />
              </p>
            </div>
            <h4>viii. Other Systems</h4>
            <p className="control ">
              <textarea
                className="textarea is-small"
                {...register("input_name")}
                name="Other_System_finding"
                type="text"
                placeholder="Other Systems findings details"
              />
            </p>

            <h3 className="field mt-2 ">
              <b>SECTION D: Past Medical History</b>
            </h3>

            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Previous surgery</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Previous_surgery"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}

              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Previous_surgery_details"
                  type="text"
                  placeholder="Previous surgery details"
                />
              </p>
            </div>

            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Previous admission</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Previous_admission"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}

              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Previous_admission_details"
                  type="text"
                  placeholder="Previous admission details"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Blood transfusion</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Blood_transfusion"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}

              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Blood_transfusion_details"
                  type="text"
                  placeholder="Blood transfusion details"
                />
              </p>
            </div>

            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Diabetes</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Diabetes"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}

              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Diabetes_details"
                  type="text"
                  placeholder="Diabetes details"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Hypertension</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Hypertension"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}

              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Hypertension_details"
                  type="text"
                  placeholder="Hypertension details"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Sickcle cell disease</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Sickcle_cell_disease"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}

              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Sickcle_cell_disease_details"
                  type="text"
                  placeholder="Sickcle cell disease details"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Peptic Ulcer</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Peptic_Ulcer"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}

              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Peptic_Ulcer_details"
                  type="text"
                  placeholder="Peptic Ulcer details"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Seizure</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Seizure"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}

              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Seizure_details"
                  type="text"
                  placeholder="Seizure details"
                />
              </p>
            </div>

            <h3 className="field mt-2 ">
              <b>SECTION E: Pregnancy, Birth and Neonatal history</b>
            </h3>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Pregnancy term?</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Pregnancy_term"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              {/*   <div className="field">
                        {
                            side.map((c,i) => 
                                <label  className=" is-small" key={c}>
                                    <input type="checkbox" value={c } name="Eye_pain_side" {...register("input_name")} />{c + " "}
                                </label>
                            )
                        }
                        </div> */}
              <p className="control">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Pregnancy_details"
                  type="text"
                  placeholder="Pregnancy details"
                />
              </p>
              [any eventful conditions during pregancy e.g maternal illnesss or
              admission]
            </div>

            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Birth</b>
              </label>
              {birthmode.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Birth"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <div className="field">
                <label className="mr-2 ">
                  {" "}
                  <b>Cried at birth</b>
                </label>
                {yesno.map((c, i) => (
                  <label className=" is-small" key={c}>
                    <input
                      type="radio"
                      value={c}
                      name="Birth_Cry"
                      {...register("input_name")}
                    />
                    {c + " "}
                  </label>
                ))}
              </div>
              <div className="field">
                <p className="control">
                  <input
                    className="input is-small"
                    {...register("input_name")}
                    name="Birth_weight"
                    type="text"
                    placeholder="Birth Weight"
                  />
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <input
                    className="input is-small"
                    {...register("input_name")}
                    name="APGAR_score"
                    type="text"
                    placeholder="APGAR Score"
                  />
                </p>
              </div>
            </div>

            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Neonatal admission</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Neonatal_admission"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Neonatal_admission_details"
                  type="text"
                  placeholder="Neonatal admission details"
                />
              </p>
              [if yes what was wrong with the child?]
              <div className="field">
                <label className="mr-2 ">
                  {" "}
                  <b> Had phototherapy?</b>
                </label>
                {yesno.map((c, i) => (
                  <label className=" is-small" key={c}>
                    <input
                      type="radio"
                      value={c}
                      name="phototherapy"
                      {...register("input_name")}
                    />
                    {c + " "}
                  </label>
                ))}
              </div>
              <div className="field">
                <label className="mr-2 ">
                  {" "}
                  <b> Exchange blood transfusion??</b>
                </label>
                {yesno.map((c, i) => (
                  <label className=" is-small" key={c}>
                    <input
                      type="radio"
                      value={c}
                      name="Exchange_blood_transfusion?"
                      {...register("input_name")}
                    />
                    {c + " "}
                  </label>
                ))}
              </div>
              <div className="field">
                <label className="mr-2 ">
                  {" "}
                  <b> Received oxygen?</b>
                </label>
                {yesno.map((c, i) => (
                  <label className=" is-small" key={c}>
                    <input
                      type="radio"
                      value={c}
                      name="Received_Oxygen"
                      {...register("input_name")}
                    />
                    {c + " "}
                  </label>
                ))}
              </div>
            </div>

            <h3 className="field mt-2 ">
              <b>SECTION F: Nutritional history</b>
            </h3>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Exclusive Breastfed</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Exclusive_Breastfed"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}

              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Breastfed_duration"
                  type="text"
                  placeholder="Breast fed for how long"
                />
              </p>
            </div>
            <h3 className="field mt-2 ">
              <b>SECTION G: Immunization history</b>
            </h3>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Fully vacinated</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Fully_vacinated"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>BCG scar seen</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="BCG_Scar"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Vaccination history</b>
              </label>
              {vachist.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Vaccination_history"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
            </div>
            <h3 className="field mt-2 ">
              <b>SECTION H: DEVELOPMENTAL MILESTONE</b>
            </h3>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Had delayed developmental milestones?</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Delayed_milestones"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Delayed_milestones_detail"
                  type="text"
                  placeholder="Delayed Milestones detail"
                />
              </p>
            </div>
            <h3 className="field mt-2 ">
              <b>SECTION I: FAMILY AND SOCIAL HISTORY</b>
            </h3>
            <div className="field ml-3 ">
              <p className="control ">
                <textarea
                  className="textarea is-small"
                  {...register("input_name")}
                  name="family_social_history"
                  type="text"
                  placeholder="Family and Social History"
                />
              </p>
            </div>
            <h3 className="field mt-2 ">
              <b>SECTION J: DRUG HISTORY AND ALLERGY</b>
            </h3>
            <div className="field ml-3 ">
              <p className="control ">
                <textarea
                  className="textarea is-small"
                  {...register("input_name")}
                  name="drug_history_allergy"
                  type="text"
                  placeholder="DRUG HISTORY AND ALLERGY"
                />
              </p>
            </div>
            <h3 className="field mt-2 ">
              <b>Examination Findings</b>
            </h3>
            <h4 className="field mt-2 ">
              <b>1. General Examination</b>
            </h4>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Pallor</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Pallor"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              {/*   <p className="control ">
                            <input className="input is-small"   {...register("input_name")} name="Delayed_milestones_detail" type="text" placeholder="Delayed Milestones detail"/>           
                        </p> */}
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Febrile</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Febrile"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              {/*  <p className="control ">
                            <input className="input is-small"   {...register("input_name")} name="Delayed_milestones_detail" type="text" placeholder="Delayed Milestones detail"/>           
                        </p> */}
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Cyanosed</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Cyanosed"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              {/*  <p className="control ">
                            <input className="input is-small"   {...register("input_name")} name="Delayed_milestones_detail" type="text" placeholder="Delayed Milestones detail"/>           
                        </p> */}
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Icteric</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Icteric"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              {/*  <p className="control ">
                            <input className="input is-small"   {...register("input_name")} name="Delayed_milestones_detail" type="text" placeholder="Delayed Milestones detail"/>           
                        </p> */}
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Lyphm node enlargement</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Lyphm_node_enlargement"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Lyphm_node_enlargements_detail"
                  type="text"
                  placeholder="Lyphm node enlargement description"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Temperature</b>
              </label>

              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Temperature"
                  type="text"
                  placeholder="Temperature"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Pedal edema</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Pedal_edema"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Pedal_edema_detail"
                  type="text"
                  placeholder="Pedal edema detail"
                />
              </p>
              [Describe if present: pitting, extent]
            </div>

            <h4 className="field mt-2 ">
              <b>2. RESPIRATORY SYSTEM</b>
            </h4>
            <div className="field ml-3 ">
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Respiratory_rate"
                  type="text"
                  placeholder="Respiratory rate"
                />
              </p>
              <label className="mr-2 ">
                {" "}
                <b>Fast breathing</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Fast_breathing"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Dyspneic</b>
              </label>

              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Dyspneic"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              {/*   <p className="control ">
                            <input className="input is-small"   {...register("input_name")} name="Delayed_milestones_detail" type="text" placeholder="Delayed Milestones detail"/>           
                        </p> */}
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Respiratory distress</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Respiratory_distress"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Respiratory_distress_evidence"
                  type="text"
                  placeholder="Respiratory distress evidence"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Lower chest wall indrawing</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Lower_chest_wall_indrawing"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              {/*  <p className="control ">
                            <input className="input is-small"   {...register("input_name")} name="Delayed_milestones_detail" type="text" placeholder="Delayed Milestones detail"/>           
                        </p> */}
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Audible wheeze</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Audible_wheeze"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              {/*    <p className="control ">
                            <input className="input is-small"   {...register("input_name")} name="Lyphm_node_enlargements_detail" type="text" placeholder="Lyphm node enlargement description"/>           
                        </p> */}
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Chest symetrical</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Chest_symetrical"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              {/* <p className="control ">
                            <input className="input is-small"   {...register("input_name")} name="Chest_symetrical" type="text" placeholder="Chest symetrical"/>           
                        </p>  */}
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Equal chest expansion</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Equal_chest_expansion"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              {/*  <p className="control ">
                            <input className="input is-small"   {...register("input_name")} name="Pedal_edema_detail" type="text" placeholder="Pedal edema detail"/>           
                        </p> */}
            </div>

            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Trachea central</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Trachea_central"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              {/*  <p className="control ">
                            <input className="input is-small"   {...register("input_name")} name="Pedal_edema_detail" type="text" placeholder="Pedal edema detail"/>           
                        </p> */}
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Percussion note</b>
              </label>
              {pernotes.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Percussion_note"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              {/*  <p className="control ">
                            <input className="input is-small"   {...register("input_name")} name="Pedal_edema_detail" type="text" placeholder="Pedal edema detail"/>           
                        </p> */}
            </div>
            <h4>
              <b>Auscultatory findings</b>
            </h4>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Air entry</b>
              </label>
              {/*  {
                            yesno.map((c,i) => 
                                <label  className=" is-small" key={c}>
                                    <input type="radio" value={c } name="Equal_chest_expansion" {...register("input_name")} />{c + " "}
                                </label>
                            )
                        } */}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Ausc_Air_entry"
                  type="text"
                  placeholder="Describe"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Breath sound</b>
              </label>
              {/*    {
                            yesno.map((c,i) => 
                                <label  className=" is-small" key={c}>
                                    <input type="radio" value={c } name="Equal_chest_expansion" {...register("input_name")} />{c + " "}
                                </label>
                            )
                        } */}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Ausc_Breath_Sound"
                  type="text"
                  placeholder="Describe"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Crackles</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Ausc_Crackles"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Ausc_Crackles_detail"
                  type="text"
                  placeholder="Crackles detail"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Stridor</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Ausc_Stridor"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Ausc_Stridor_detail"
                  type="text"
                  placeholder="Stridor  detail"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Wheeze</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Ausc_Wheeze"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Ausc_Wheeze_detail"
                  type="text"
                  placeholder="Wheeze detail"
                />
              </p>
            </div>
            <h4 className="field mt-2 ">
              <b>3. CARDIOVASCULAR SYSTEM</b>
            </h4>
            <div className="field ml-3 ">
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Pulse_rate"
                  type="text"
                  placeholder="Pulse rate"
                />
              </p>
              <label className="mr-2 ">
                {" "}
                <b>Pulse Character</b>
              </label>
              {pulsenature.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="checkbox"
                    value={c + ", "}
                    name="Pulse_Character"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Jugular vein distended</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Jugular_Vein_distended"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              {/*  <p className="control ">
                            <input className="input is-small"   {...register("input_name")} name="Pulse_rate" type="text" placeholder="Pulse rate"/>           
                        </p> */}
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Precordium hyperactive?</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Precordium_hyperactive"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              {/*  <p className="control ">
                            <input className="input is-small"   {...register("input_name")} name="Pulse_rate" type="text" placeholder="Pulse rate"/>           
                        </p> */}
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Blood Pressure Value</b>
              </label>
              {/*   {
                            yesno.map((c,i) => 
                                <label  className=" is-small" key={c}>
                                    <input type="radio" value={c } name="Precordium_hyperactive" {...register("input_name")} />{c + " "}
                                </label>
                            )
                        } */}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Blood_Pressure"
                  type="text"
                  placeholder="Blood pressure value"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Apex beat location</b>
              </label>

              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Apex_beat_location"
                  type="text"
                  placeholder="Apex beat location"
                />
              </p>
              {/*   {
                            yesno.map((c,i) => 
                                <label  className=" is-small" key={c}>
                                    <input type="radio" value={c } name="Precordium_hyperactive" {...register("input_name")} />{c + " "}
                                </label>
                            )
                        } */}
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Apex beat Displaced?</b>
              </label>

              {/*  <p className="control ">
                            <input className="input is-small"   {...register("input_name")} name="Apex_beat_location" type="text" placeholder="Apex beat location"/>           
                        </p>  */}
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Apex_beat_displaced"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Apex beat located?</b>
              </label>

              {/*  <p className="control ">
                            <input className="input is-small"   {...register("input_name")} name="Apex_beat_location" type="text" placeholder="Apex beat location"/>           
                        </p>  */}
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Apex_beat_located"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Thrills</b>
              </label>

              {/*  <p className="control ">
                            <input className="input is-small"   {...register("input_name")} name="Apex_beat_location" type="text" placeholder="Apex beat location"/>           
                        </p>  */}
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Thrills"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Heart Sound</b>
              </label>
              {heartsound.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="checkbox"
                    value={c + ", "}
                    name="Heart_Sound"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Heart_Sound_description"
                  type="text"
                  placeholder="Heart Sound description"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Murmur</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Heart_Sound"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Murmur_description"
                  type="text"
                  placeholder="Murmur description"
                />
              </p>
            </div>
            <h4 className="field mt-2 ">
              <b>4. ABDOMINAL SYSTEM</b>
            </h4>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Abdomen</b>
              </label>
              {abd.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="checkbox"
                    value={c + ", "}
                    name="Pulse_Character"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              {/*  <p className="control ">
                            <input className="input is-small"   {...register("input_name")} name="Pulse_rate" type="text" placeholder="Pulse rate"/>           
                        </p> */}
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Abdominal tenderness</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Abdominal_tenderness"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Abdominal_tenderness_details"
                  type="text"
                  placeholder="Abdominal tenderness details"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Liver enlarged</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Liver_enlarged"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Liver_enlarged_details"
                  type="text"
                  placeholder="Liver enlarged details"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Kidney enlarged</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Kidney_enlarged"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Kidney_enlarged_details"
                  type="text"
                  placeholder="Kidney enlarged details"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Spleen enlarged</b>
              </label>
              {yesno.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Spleen_enlarged"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Spleen_enlarged_details"
                  type="text"
                  placeholder="Spleen enlarged details"
                />
              </p>
            </div>
            <div className="field ml-3 ">
              <label className="mr-2 ">
                {" "}
                <b>Bowel Sound</b>
              </label>
              {bowelsound.map((c, i) => (
                <label className=" is-small" key={c}>
                  <input
                    type="radio"
                    value={c}
                    name="Bowel_Sound"
                    {...register("input_name")}
                  />
                  {c + " "}
                </label>
              ))}
              {/* <p className="control ">
                            <input className="input is-small"   {...register("input_name")} name="Spleen_enlarged_details" type="text" placeholder="Spleen enlarged details"/>           
                        </p>  */}
            </div>

            <h4>
              <b>5. Other Systemic Findings</b>
            </h4>
            <p className="control ">
              <textarea
                className="textarea is-small"
                {...register("input_name")}
                name="Other_Systemic_examination_findings"
                type="text"
                placeholder="Describe other findings"
              />
            </p>

            <h3>
              <b>Investigations</b>
            </h3>
            <h4>Full blood count</h4>
            <div className="field is-horizontal">
              <div className="field-body ml-6">
                {" "}
                <div className="field ml-2">
                  <h4>ABSOLUTE</h4>
                </div>
              </div>
              <div className="field-body ">
                {" "}
                <div className="field ml-2">
                  <h4>PERCENTAGE</h4>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small"> PCV</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="PCV_absolute"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="PCV_percentage"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small"> WBC</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="WBC_absolute"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="WBC_percentage"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">NEUTROPHIL</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="NEUTROPHIL_absolute"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="NEUTROPHIL_percentage"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">LYMPHOCYTE</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="LYMPHOCYTE_absolute"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="LYMPHOCYTE_percentage"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">EOSINOPHIL</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="EOSINOPHIL_absolute"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="EOSINOPHIL_percentage"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small"> BASOPHIL</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="BASOPHIL_absolute"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="BASOPHIL_percentage"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">MONOCYTE</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="MONOCYTE_absolute"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="MONOCYTE_percentage"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <h4>SPIROMETRY</h4>
            <div className="field is-horizontal">
              <div className="field-body ml-6">
                {" "}
                <div className="field ml-2">
                  <h4>VALUE</h4>
                </div>
              </div>
              <div className="field-body ">
                {" "}
                <div className="field ml-2">
                  <h4>PERCENTAGE PREDICTED</h4>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">FEV1</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="FEV1_value"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="FEV1_value"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">FVC</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="FVC_value"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="FVC_percentage_predicted"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">FEV1%</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="FEV1_percent_value"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="FEV1_precent_percentage_predicted"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">FEF25-75</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="FEF25-75_value"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="FEF25-75_percentage_predicted"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">PEFR</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="PEFR_value"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="PEFR_percentage_predicted"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <h4>ALLERGY SKIN TESTING</h4>
            <input
              className="input is-small is-hidden"
              {...register("input_name")}
              name="Allergy_Skin_Test"
              type="text"
              placeholder="Specify"
            />
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small"> ALLERGINE</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      value={allergine}
                      /* {...register("input_name")} */ onChange={e => {
                        setAllergine(e.target.value);
                      }}
                      name="allergine"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">REACTION</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      value={reaction}
                      /* {...register("input_name")} */ onChange={e => {
                        setReaction(e.target.value);
                      }}
                      name="reaction"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <div
                    className="button is-success is-small selectadd"
                    onClick={handleAdd}
                  >
                    Add
                  </div>
                </div>
              </div>
            </div>
            <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
              <thead>
                <tr>
                  <th>
                    <abbr title="Serial No">S/No</abbr>
                  </th>

                  <th>
                    <abbr title="Type"> ALLERGINE</abbr>
                  </th>
                  <th>
                    <abbr title="Destination">REACTION</abbr>
                  </th>
                </tr>
              </thead>
              <tfoot></tfoot>
              <tbody>
                {allergies.map((ProductEntry, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{ProductEntry.allergine}</td>
                    <td>{ProductEntry.reaction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">SERUM IGE LEVEL</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="IGE_Level"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">FRACTION EXHALED NITRIC OXIDE (FeNO)</label>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small"   {...register("input_name")} name="FeNo" type="text" placeholder="Specify" />           
                                </p>
                            </div>
                           
                        </div>
                    </div> */}

            <h4>URINALYSIS</h4>
            <div className="field is-horizontal">
              <div className="field-body ">
                {" "}
                <div className="field ml-2">
                  <h4>PARAMETERS</h4>
                </div>
              </div>
              <div className="field-body ">
                {" "}
                <div className="field ml-2">
                  <h4>VALUE</h4>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">Colour</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="urinalysis_color"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">Specific gravity</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="urinalysis_Specific_gravity"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">Leucocyte</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="urinalysis_Leucocyte"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">Protein</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="urinalysis_Protein"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">Blood</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="urinalysis_Blood"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">Glucose</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="urinalysis_Glucose"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">Urobilinogen</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="urinalysis_Urobilinogen"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">Ketones</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="urinalysis_Ketones"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>

            <h4>Electrolyte, Urea and Creatinine</h4>
            <div className="field is-horizontal">
              <div className="field-body ">
                {" "}
                <div className="field ml-2">
                  <h4>PARAMETERS</h4>
                </div>
              </div>
              <div className="field-body ">
                {" "}
                <div className="field ml-2">
                  <h4>VALUE</h4>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">Sodium</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="EUCR_Sodium"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">Potassium</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="EUCR_Potassium"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">Chloride</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="EUCR_Chloride"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">Bicarbonate</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="EUCR_Bicarbonate"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">Urea</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="EUCR_Urea"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">Creatinine</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="EUCR_Creatinine"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body ml-3">
                <div className="field">
                  <label className="is-small">Anion Gap</label>
                </div>
                <div className="field">
                  <p className="control ">
                    <input
                      className="input is-small"
                      {...register("input_name")}
                      name="EUCR_Anion_Gap"
                      type="text"
                      placeholder="Specify"
                    />
                  </p>
                </div>
              </div>
            </div>
            {/*  <p className="control ">
                            <input className="input is-small"   {...register("input_name")} name="Education" type="text" placeholder="Hihest Level of Education" />           
                        </p> */}

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
