import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
import {DocumentClassList} from "./DocumentClass";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {Box, getValue} from "@mui/system";
import RadioButton from "../../components/inputs/basic/Radio";
import {Button,Typography} from "@mui/material";
import Input from "../../components/inputs/basic/Input";
import Textarea from "../../components/inputs/basic/Textarea";
import CheckboxInput from "../../components/inputs/basic/Checkbox";
import MuiCustomDatePicker from "../../components/inputs/Date/MuiDatePicker";
// import RadioButton from "../../components/inputs/basic/Radio";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


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

          <Box>
                <Input
                  register={register("input_name")}
                  name="name"
                  type="text"
                 label="Name"
                />
    </Box>

    <Box>
                <Input
                  register={register("input_name")}
                  name="date"
                  type="text"
                 label="Age"
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
                 label="Occupation"
                />
    </Box>
    <Box>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Marital Status"
                />
    </Box>
    <Box>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Address"
                />
    </Box>
   
    <Box>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Tribe"
                />
    </Box>
    <Box>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Informants"
                />
    </Box>
    <Box>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Religion"
                />
    </Box>
    <Box>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Father's Phone Number"
                />
    </Box>
    <Box>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Mother's Phone Number"
                />
    </Box>
    <Box>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Next of Kin"
                />
    </Box>
    <Box>       
       <Typography><b>Vascular System Examination</b></Typography>
    <Box>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Specify"
                />
    </Box>
    <Box>
       <Typography>Symptom</Typography>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Symptom"
                />
    </Box>
    <Box>
       <Typography>Duration</Typography>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Duration"
                />
    </Box>

    </Box>

    <Box sx={{
            marginBlock: "1rem"
          }}> 
          <Button variant="contained" type="button" onClick={handleAddSymptoms}>Add</Button>
  </Box>
  <Box sx={{marginBlock:"1rem"}}>
      <Table sx={{ minWidth: 150 }}>
        <TableHead>
          <TableRow>
            <TableCell>S/No</TableCell>
            <TableCell align="right">Symptom</TableCell> 
            <TableCell align="right">Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {symptoms.map((ProductEntry, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell align="right">{ProductEntry.symptom}</TableCell>
              <TableCell align="right">{ProductEntry.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  </Box>
<Box sx={{gap:"1.5rem"}}>
<Typography><b>Review of Systems</b></Typography>
<Typography><b>i. Respiratory</b></Typography>
<Box>
<Typography>(a) Cough</Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />
</Box>
</Box>
<Box>
  <Typography><b>Cough nature:</b></Typography>
  <CheckboxInput
            register={register("input_name")}
            options={[
              "productive",
              "dry",
              "barking",
              "paroxysimal",
              "post-tusive vomiting",
              "worse at night",
              "worse at any time of the day",
              "worse in certain posture",
              "progressive",
            ]}
          />
</Box>
<Box>
  <Typography><b>Associated symptoms with cough::</b></Typography>
  <CheckboxInput
            register={register("input_name")}
            options={[
              "feveer",
              "catarrh",
              "night sweats",
              "weight loss",
              "contact with someone with chronic cough",
              "facial swelling",
              "leg swelling"
            ]}
          />
</Box>
<Box>
  <Typography><b>Sputum Colour:</b></Typography>
  <RadioButton
        register={register("input_name")}
        options={[
                "creamy",
                "brown",
                "blood stained",
                "whitish"
              ]}
            />
</Box>
<Box>
  <Typography><b>Other Respiratory Symptoms::</b></Typography>
  <CheckboxInput
            register={register("input_name")}
            options={[
              "Difficulty breathing",
              "fast breathing",
              "excessive sneezing",
              "allergy salute",
              "chest pain",
              "atopy",
              "family history of atopy"
            ]}
          />
</Box>
<Box sx={{gap:"1.5rem"}}>
<Typography><b>ii. CVS</b></Typography>
<Box>
<Typography>(a) Cough</Typography>
<CheckboxInput
            register={register("input_name")}
            options={[
              "cough",
              "easy defatigability",
              "breathelessness",
              "breathelessness at rest",
              "breathelessness on exertion",
              "Othopnea",
              "Paroxymal nocturnal orthopnea",
              "palpitation",
              "chest pain"
            ]}
          />
</Box>
</Box>
<Box sx={{gap:"1.5rem"}}>

<Typography><b>iii. GIT</b></Typography>
<Box>
<Typography><b>Abdominal Pain</b></Typography>
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
                 label="Abdominal Pain details"
                />      
</Box>
<Box>
<Typography><b>Abdominal swelling</b></Typography>
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
                 label="Abdominal swelling details"
                />   
                <Typography>[onset? Progressive, swelling in other part of the body]</Typography>   
</Box>
<Box>
<Typography><b>Diarrhea</b></Typography>
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
                 label="Diarrhea details"
                />   
                <Typography>[onset, frequency, consistency, duration, blood stained, colour (r.g rice water colour), mucoid]</Typography>   
</Box>
<Box>
<Typography><b>Nausea</b></Typography>
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
                 label="Nausea details"
                />      
</Box>
<Box>
<Typography><b>Vomitting</b></Typography>
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
                 label="Vomitting details"
                />   
                <Typography>[projectile? Content? Episodes?]</Typography>   
</Box>
<Box>
<Typography><b>Constipation</b></Typography>
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
                 label="Constipation details"
                /> 
          <Typography>[onset]</Typography>     
</Box>
</Box>
<Box sx={{gap:"1.5rem"}}>
<Typography><b>iv. Urinary</b></Typography>
<Box>
<Typography><b>Urinary findings:</b></Typography>
<CheckboxInput
            register={register("input_name")}
            options={[
              "frequency",
              "nocturia",
              "polyuria",
              "poor stream",
              "incomplete bladder empty",
              "urgency",
              "hesistancy"
            ]}
          />
      <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Urinary findings Specify"
                />      
</Box>
</Box>
<Box sx={{gap:"1.5rem"}}>
<Typography><b>v. CNS</b></Typography>
<Box>
<Typography><b>Headache:</b></Typography>
<CheckboxInput
            register={register("input_name")}
            options={[
              "throbing",
              "dull",
              "generalised",
              "frontal",
              "right-sided",
              "left sided",
              "photophia"
            ]}
          />
      <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Headache details"
                />      
</Box>
<Box>
<Typography><b>Neck Pain</b></Typography>
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
                 label="Neck Pain details"
                />     
</Box>
<Box>
<Typography><b>Neck Stiffness</b></Typography>
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
                 label="Neck Stiffness details"
                /> 
              
</Box>
<Box>
<Typography><b>Vertigo</b></Typography>
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
                 label="Vertigo details"
                /> 
               
</Box>
<Box>
<Typography><b>Dizziness</b></Typography>
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
                 label="Dizziness details"
                /> 
               
</Box>
<Box>
<Typography><b>Fainting spells</b></Typography>
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
                 label="Fainting spells details"
                /> 
              
</Box>
<Box>
<Typography><b>Akward Gait</b></Typography>
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
                 label="Akward Gait details"
                /> 
               
</Box>
<Box>
<Typography><b>Weakness Upper Limbs</b></Typography>
<CheckboxInput
        register={register("input_name")}
        options={[
                "Right Limb",
                "Left Limb",
                "Both Limbs"
              ]}
            />
        <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Weakness Upper Limbs details"
                /> 
             
</Box>
<Box>
<Typography><b>Weakness Lower Limbs</b></Typography>
<CheckboxInput
        register={register("input_name")}
        options={[
                "Right Limb",
                "Left Limb",
                "Both Limbs"
              ]}
            />
        <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Weakness Lower Limbs details"
                /> 
             
</Box>
</Box>
<Box sx={{gap:"1.5rem"}}>
<Typography><b>vi. ENT</b></Typography>
<Box>
<Typography><b>Eye pain:</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />
<CheckboxInput
            register={register("input_name")}
            options={[
              "Right",
              "Left",
              "Both"
            ]}
          />
      <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Headache details"
                />      
</Box>
<Box>
<Typography><b>Eye Discharge:</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />
<CheckboxInput
            register={register("input_name")}
            options={[
              "Right",
              "Left",
              "Both"
            ]}
          />
      <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Eye discharge details"
                />      
</Box>
<Box>
<Typography><b>Eye swelling:</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />
<CheckboxInput
            register={register("input_name")}
            options={[
              "Right",
              "Left",
              "Both"
            ]}
          />
      <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Eye swelling details"
                />      
</Box>
<Box>
<Typography><b>Ear pain:</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />
<CheckboxInput
            register={register("input_name")}
            options={[
              "Right",
              "Left",
              "Both"
            ]}
          />
      <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Ear pain details"
                />      
</Box>
<Box>
<Typography><b>Ear Discharge:</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />
<CheckboxInput
            register={register("input_name")}
            options={[
              "Right",
              "Left",
              "Both",
              "Purulent",
              "Bloody"
            ]}
          />
      <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Ear Discharge details"
                />      
</Box>
<Box>
<Typography><b>Other ENT Findings:</b></Typography>

<CheckboxInput
            register={register("input_name")}
            options={[
              "Sore throat",
              "change in voice",
              "nasal discharge",
              "excessive sneezing",
              "allergy salute"
            ]}
          />
      <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Other ENT Findings"
                />      
</Box>
</Box>
<Box>
<Box>
<Typography><b>vii. Endocrinology</b></Typography>
<Typography><b>Endocrinology Findings</b></Typography>
<CheckboxInput
            register={register("input_name")}
            options={[
              "heat intolerance",
              "apathy",
              "excessive sweating",
              "excessive hair growth",
              "weight gain",
              "weight loss",
              "menstral irregularity"
            ]}
          />
      <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Other Endocrinology findings"
                />      
</Box>
</Box>
<Box>
<Typography><b>vii. Other Systems</b></Typography>
<Textarea
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Other Systems findings details"
           />
</Box>
<Box>
<Typography><b>SECTION D: Past Medical History</b></Typography>
<Box>
<Typography><b>Previous admission</b></Typography>
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
                 label="Previous admission details"
                /> 
</Box>
<Box>
<Typography><b>Blood transfusion</b></Typography>
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
                 label="Blood transfusion details"
                /> 
</Box>
<Box>
<Typography><b>Diabetes</b></Typography>
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
                 label="Diabetes details"
                /> 
</Box>
<Box>
<Typography><b>Hypertension</b></Typography>
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
                 label="Hypertension details"
                /> 
</Box>
<Box>
<Typography><b>Sickcle cell disease</b></Typography>
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
                 label="Sickcle cell disease details"
                /> 
</Box>
<Box>
<Typography><b>Peptic Ulcer</b></Typography>
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
                 label="Peptic Ulcer details"
                /> 
</Box>
<Box>
<Typography><b>Seizure</b></Typography>
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
                 label="Seizure details"
                /> 
</Box>
</Box>
<Box>
<Typography><b>SECTION E: Pregnancy, Birth and Neonatal history</b></Typography>
<Box>
<Typography><b>Pregnancy term</b></Typography>
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
                 label="Pregnancy details"
                /> 
                <Typography>[any eventful conditions during pregancy e.g maternal illnesss or admission]</Typography>
</Box>
<Box>
<Typography><b>Birth</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Spontenous varginal delivery",
                "Elective Sureqery",
                "Emergency Surgery"
              ]}
            />
</Box>
<Box>
<Typography><b>Cried at birth</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />
     <Box sx={{gap:"1.5rem"}}>
     <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Birth Weight"
                />
        <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="APGAR Score"
                />
      </Box>         
</Box>
<Box>
<Typography><b>Neonatal admission</b></Typography>
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
                 label="Neonatal admission details"
                /> 
                <Typography>[[if yes what was wrong with the child?]]</Typography>
</Box>
<Box>
<Box>
<Typography><b>Had phototherapy</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />
</Box>
<Box>
<Typography><b>Exchange blood transfusion</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />
</Box>
<Box>
<Typography><b>Received oxygen?</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />
</Box>
</Box>
</Box>
<Box>
<Typography><b>SECTION F: Nutritional History</b></Typography>
<Box>
<Typography><b>Exclusive Breastfed</b></Typography>
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
                 label="Breastfed how long"
                /> 
</Box>
</Box>
<Box>
<Box>
<Typography><b>SECTION G: Immunization History</b></Typography>
<Box>
<Typography><b>Fully vacinated</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />
</Box>
<Box>
<Typography><b>BCG scar seen</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />
</Box>
<Box>
<Typography><b>Vaccination history</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />
</Box>
</Box>
</Box>
<Box>
<Typography><b>SECTION H: DEVELOPMENTAL MILESTONE</b></Typography>
<Box>
<Typography><b>Had delayed developmental milestones</b></Typography>
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
                 label="Delayed Milestones detail"
                />
</Box>
</Box>
<Box>
<Typography><b>SECTION I: FAMILY AND SOCIAL HISTORY</b></Typography>
<Textarea
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="FAMILY AND SOCIAL HISTORY"
                />
</Box>
<Box>
<Typography><b>SECTION J: DRUG HISTORY AND ALLERGY</b></Typography>
<Textarea
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="DRUG HISTORY AND ALLERGY"
                />
</Box>
<Box>
<Box>
<Typography><b>Examination Findings</b></Typography>
<Typography><b>1. General Examination</b></Typography>
</Box>
<Box>
<Typography><b>Pallor</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />
</Box>
<Box>
<Typography><b>Febrile</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />
</Box>
<Box>
<Typography><b>Cyanosed</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />
</Box>
<Box>
<Typography><b>Icteric</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />
</Box>
<Box>
<Typography><b>Lyphm node enlargement</b></Typography>
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
                 label="Lyphm node enlargement detail"
                />    
</Box>
<Box>
<Typography><b>Temperature</b></Typography>
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
                 label="Temperature detail"
                />    
</Box>
<Box>
<Typography><b>Pedal edema</b></Typography>
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
                 label="Pedal edema detail"
                />    
</Box>
</Box>
<Box>
<Typography>[Describe if present: pitting, extent]</Typography>
<Box>
<Typography><b>2. RESPIRATORY SYSTEM</b></Typography>
        <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Respiratory system"
                />    
</Box>
<Box>
<Typography><b>Fast breathing</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />
</Box>
<Box>
<Typography><b>Dyspneic</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />    
</Box>
<Box>
<Typography><b>Respiratory distress</b></Typography>
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
                 label="Respiratory distress evidence"
                />  
</Box>
<Box>
<Typography><b>Lower chest wall indrawing</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />    
</Box>
<Box>
<Typography><b>Audible wheeze</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />    
</Box>
<Box>
<Typography><b>Chest symetrical</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />    
</Box>
<Box>
<Typography><b>Equal chest expansion</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />    
</Box>
<Box>
<Typography><b>Trachea central</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No"
              ]}
            />    
</Box>
<Box>
<Typography><b>Percussion note</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "dull",
                "resonant",
                "hyper-resonant"
              ]}
            />    
</Box>
<Box>
<Typography><b>Auscultatory findings</b></Typography>
<Typography><b>Air entry</b></Typography>
<Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Requesting Physician"
                />
</Box>
<Box>
<Typography><b>Breath sound</b></Typography>
<Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Describe"
                />
</Box>
<Box>
<Typography><b>Crackles</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No",
              ]}
            />   
     <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Crackles detail"
                />
</Box>
<Box>
<Typography><b>Stridor</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No",
              ]}
            />   
     <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Stridor detail"
                />
</Box>
<Box>
<Typography><b>Wheeze</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No",
              ]}
            />   
     <Input
       register={register("input_name")}
       name="text"
       type="text"
      label="Wheeze detail"
     />           
</Box>
</Box>
<Box>
<Box>
<Typography><b>3. CARDIOVASCULAR SYSTEM</b></Typography>  
     <Input
       register={register("input_name")}
       name="text"
       type="text"
      label="Pulse rate"
     />           
</Box>
<Box>
<Typography><b>Pulse Character</b></Typography>  
<CheckboxInput
            register={register("input_name")}
            options={[
              "Regular",
              "Irregular",
              "Normal volume",
              "pounding",
              "Synchronous",
              "Asynchronous"
            ]}
          />      
</Box>
<Box>
<Typography><b>Jugular Vein distended</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No",
              ]}
            />           
</Box>
<Box>
<Typography><b>Precordium hyperactive</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No",
              ]}
            />           
</Box>
<Box>
<Typography><b>Blood Pressure Value</b></Typography>  
     <Input
       register={register("input_name")}
       name="text"
       type="text"
      label="Blood pressure value"
     />           
</Box>
<Box>
<Typography><b>Apex beat location</b></Typography>  
     <Input
       register={register("input_name")}
       name="text"
       type="text"
      label="Apex beat location"
     />           
</Box>
<Box>
<Typography><b>Apex beat Displaced?</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No",
              ]}
            />           
</Box>
<Box>
<Typography><b>Apex beat located?</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No",
              ]}
            />           
</Box>
<Box>
<Typography><b>Thrills</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No",
              ]}
            />           
</Box>
<Box>
<Typography><b>Heart Sound</b></Typography>
<CheckboxInput
            register={register("input_name")}
            options={[
              "S1",
              "S2",
              "S3",
              "S4",
            ]}
          />   
          <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Heart Sound description"
                />     
</Box>
<Box>
<Typography><b>Murmur</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No",
              ]}
            />  
        <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Murmur description"
                />      
</Box>
</Box>
<Box>
<Box>
  <Typography><b>ABDOMINAL SYSTEM</b></Typography>
  <Typography><b>Abdomen</b></Typography>
  <CheckboxInput
            register={register("input_name")}
            options={[
              "Full",
              "Distended",
              "Flat",
              "moves with respiration",
              "Abdominal vein visible"
            ]}
          />   
</Box>
<Box>
<Typography><b>Abdominal tenderness</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No",
              ]}
            />  
        <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Abdominal tenderness detail"
                />      
</Box>
<Box>
<Typography><b>Liver enlarged</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No",
              ]}
            />  
        <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Liver enlarged detail"
                />      
</Box>
<Box>
<Typography><b>Kidney enlarged</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No",
              ]}
            />  
        <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Kidney enlarged detail"
                />      
</Box>
<Box>
<Typography><b>Spleen enlarged</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Yes",
                "No",
              ]}
            />  
     <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Spleen enlarged detail"
                />          
</Box>
<Box>
<Typography><b>Bowel Sound</b></Typography>
<RadioButton
        register={register("input_name")}
        options={[
                "Normal",
                "Absent",
                "Hyperactive",
                "Reduced or Hypoactive"
              ]}
            />  
</Box>
</Box>
<Box>
<Typography><b>5. Other System Findings</b></Typography>
<Textarea
                  register={register("input_name")}
                  name="text"
                  type="text"
                 label="Describe other findings"
                />
</Box>
<Box>
  <Box sx={{gap:"1.5rem"}}>
  <Typography><b>Investigations</b></Typography>
  <Typography><b>Full blood count</b></Typography>
  <Typography><b>ABSOLUTE</b></Typography>
  <Typography><b>PERCENTAGE</b></Typography>
  </Box>
  <Box sx={{gap:"1.5rem"}}>
  <Typography><b>PCV</b></Typography>
  <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />
         <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />       
  </Box>
  <Box sx={{gap:"1.5rem"}}>
  <Typography><b>WBC</b></Typography>
  <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />
         <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />       
  </Box>
  <Box sx={{gap:"1.5rem"}}>
  <Typography><b>NEUTROPHIL</b></Typography>
  <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />
         <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />       
  </Box>
  <Box sx={{gap:"1.5rem"}}>
  <Typography><b>LYMPHOCYTE</b></Typography>
  <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />
         <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />       
  </Box>
  <Box sx={{gap:"1.5rem"}}>
  <Typography><b>EOSINOPHIL</b></Typography>
  <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />
         <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />       
  </Box>
  <Box sx={{gap:"1.5rem"}}>
  <Typography><b>BASOPHIL</b></Typography>
  <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />
         <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />       
  </Box>
  <Box sx={{gap:"1.5rem"}}>
  <Typography><b>MONOCYTE</b></Typography>
  <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />
         <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />       
  </Box>
</Box>
<Box>
  <Box sx={{gap:"1.5rem"}}>
  <Typography><b>SPIROMETRY VALUE</b></Typography>
  <Typography><b>PERCENTAGE PREDICTED</b></Typography>
  </Box>
  <Box sx={{gap:"1.5rem"}}>
  <Typography><b>FEV1</b></Typography>
  <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />
         <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />       
  </Box>
  <Box sx={{gap:"1.5rem"}}>
  <Typography><b>FVC</b></Typography>
  <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />
         <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />       
  </Box>
  <Box sx={{gap:"1.5rem"}}>
  <Typography><b>FEV1%</b></Typography>
  <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />
         <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />       
  </Box>
  <Box sx={{gap:"1.5rem"}}>
  <Typography><b>FEF25-75</b></Typography>
  <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />
         <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />       
  </Box>
  <Box sx={{gap:"1.5rem"}}>
  <Typography><b>PEFR</b></Typography>
  <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />
         <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />       
  </Box>
  <Box>
              <Typography variant='subtitle1'>ALLERGY SKIN TESTING</Typography> 
                <Box>
                <Input
                  label="Specify"
                  register={register("input_name")}
                  name="oxygen_saturation"
                  type="text"
                />
                </Box>
            </Box>
              <Box>
              <Typography variant='subtitle1'>ALLERGINE</Typography> 
                <Box>
                <Input
                  label="Specify"
                  register={register("input_name")}
                  name="oxygen_saturation"
                  type="text"
                />
                </Box>
            </Box>
              <Box>
              <Typography variant='subtitle1'>REACTION</Typography> 
                <Box>
                <Input
                  label="Specify"
                  register={register("input_name")}
                  name="oxygen_saturation"
                  type="text"
                />
                </Box>
            </Box>
          <Box sx={{
            marginBlock: "1rem"
          }}> 
          <Button variant="contained" type="button" onClick={handleAdd}>Add</Button>
  </Box>
  <Box sx={{marginBlock:"1rem"}}>
      <Table sx={{ minWidth: 150 }}>
        <TableHead>
          <TableRow>
            <TableCell>S/No</TableCell>
            <TableCell align="right">ALLERGINE</TableCell> 
            <TableCell align="right">REACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allergies.map((ProductEntry, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell align="right">{ProductEntry.allergine}</TableCell>
              <TableCell align="right">{ProductEntry.reaction}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  </Box>
              <Box>
              <Typography variant='subtitle1'>SERUM IGE LEVEL</Typography> 
                <Box>
                <Input
                  label="Specify"
                  register={register("input_name")}
                  name="oxygen_saturation"
                  type="text"
                />
                </Box>
            </Box>
</Box>

<Box sx={{gap:"1.5rem"}}>
  <Box >
  <Typography><b>URINALYSIS</b></Typography>
  <Typography><b>PARAMETERS VALUE</b></Typography>
  </Box>
  <Box>
  <Typography><b>Colour</b></Typography>
  <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />
</Box>
<Box>
  <Typography><b>Specific gravity</b></Typography>
  <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />
</Box>
<Box>
  <Typography><b>Leucocyte</b></Typography>
  <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />
</Box>
<Box>
  <Typography><b>Protein</b></Typography>
  <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />
</Box>
<Box>
  <Typography><b>Blood</b></Typography>
  <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />
</Box>
<Box>
  <Typography><b>Glucose</b></Typography>
  <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />
</Box>
<Box>
  <Typography><b>Urobilinogen</b></Typography>
  <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />
</Box>
<Box>
  <Typography><b>Ketones</b></Typography>
  <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />
</Box>
</Box>

<Box sx={{gap:"1.5rem"}}>
  <Box >
  <Typography><b>Electrolyte, Urea and Creatinine</b></Typography>
  <Typography><b>PARAMETERS VALUE</b></Typography>
  </Box>
  <Box>
  <Typography><b>Sodium</b></Typography>
  <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />
</Box>
<Box>
  <Typography><b>Potassium</b></Typography>
  <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />
</Box>
<Box>
  <Typography><b>Chloride</b></Typography>
  <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />
</Box>
<Box>
  <Typography><b>Bicarbonate</b></Typography>
  <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />
</Box>
<Box>
  <Typography><b>Urea</b></Typography>
  <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />
</Box>
<Box>
  <Typography><b>Creatinine</b></Typography>
  <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />
</Box>
<Box>
  <Typography><b>Anion Gap</b></Typography>
  <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
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
