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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


export default function MedicationList() {
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
  const [notes, setNotes] = useState("");
  const [drugname, setDrugName] = useState("");
  const [strengthfreq, setStrengthFreq] = useState("");
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
      setSymptoms(draftDoc.documentdetail.Medications);
      setAllergies(draftDoc.documentdetail.Allergies);
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
    data.Medications = symptoms;
    data.Allergies = allergies;

    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentname = "Medication List"; //"Lab Result"
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
              message: "Medication List created succesfully",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
            });
            setSuccess(false);
            closeForm();
          })
          .catch(err => {
            toast({
              message: "Error creating Medication List " + err,
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
  const handleAddMedication = () => {
    let newMedication = {
      drugname,
      strengthfreq,
      notes,
    };
    setSymptoms(prev => [...prev, newMedication]);
    // setAllergy({})
    setDrugName("");
    setStrengthFreq("");
    setNotes("");
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

  const onDelete = (comp, i) => {
    //console.log(comp,i)
    setSymptoms(prevstate => prevstate.filter((el, index) => index !== i));
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Medication List</p>
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
                  name="text"
                  type="date"
                  placeholder="Date"
                />
    </Box>


    <Box> 
       <Typography><b>Allergies</b></Typography> 
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Specify"
                />
    </Box>
      <Box>
       <Typography>Allergine</Typography>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Specify"
                />
    </Box>

      <Box>
       <Typography>Reaction</Typography>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Specify"
                />
    </Box> 
  <Box>
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
       <Typography><b>Medication</b></Typography> 
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Specify"
                />
    </Box>

      <Box>
       <Typography>Drug Name</Typography>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Name"
                />
    </Box> 

      <Box>
       <Typography>Strength/Frequency</Typography>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Strength/Frequency"
                />
    </Box> 
      <Box>
       <Typography>Notes</Typography>
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  placeholder="Specify"
                />
    </Box> 
  <Box>
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
