import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
import {DocumentClassList} from "./DocumentClass";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "react-toastify";
import {Box, getValue} from "@mui/system";
import RadioButton from "../../components/inputs/basic/Radio";
import {Button, Grid, IconButton, Typography} from "@mui/material";
import Input from "../../components/inputs/basic/Input";
import Textarea from "../../components/inputs/basic/Textarea";
import CheckboxInput from "../../components/inputs/basic/Checkbox";
import MuiCustomDatePicker from "../../components/inputs/Date/MuiDatePicker";
// import RadioButton from "../../components/inputs/basic/Radio";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CloseIcon from "@mui/icons-material/Close";
import {FormsHeaderText} from "../../components/texts";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import CustomTable from "../../components/customtable";
import RefInput from "../../components/inputs/basic/Input/ref-input";

export default function PulmonologyIntake() {
  const {register, handleSubmit, setValue, resetField} = useForm(); //, watch, errors, reset
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
  const [reactions, setReaction] = useState("");
  const [allergines, setAllergine] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [duration, setDuration] = useState("");
  const [symptom, setSymptom] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [docStatus, setDocStatus] = useState("Draft");

  const [dataset, setDataset] = useState();
  const {state, setState} = useContext(ObjectContext);

  //Making use of useRef to store input values cause component too large and makes setState hang cause setState re-renders when onChange function is fired..
  const symptomInputRef = useRef(null);
  const durationInputRef = useRef(null);
  const allergineInputRef = useRef(null);
  const reactionInputRef = useRef(null);

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

    document.geolocation = {
      type: "Point",
      coordinates: [state.coordinates.latitude, state.coordinates.longitude],
    };
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

  const closeEncounterRight = async () => {
    setState(prevstate => ({
      ...prevstate,
      DocumentClassModule: {
        ...prevstate.DocumentClassModule,
        encounter_right: false,
      },
    }));
  };

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
    const allergine = allergineInputRef.current.value;
    const reaction = reactionInputRef.current.value;

    if (allergine === "") {
      return toast.error("Enter an Allergy");
    }
    if (reaction === "") {
      return toast.error("Enter Allergy Reaction");
    }

    let allergy = {
      allergine: allergine,
      reaction: reaction,
    };
    setAllergies(prev => [...prev, allergy]);
    setAllergy({});
    allergineInputRef.current.value = "";
    reactionInputRef.current.value = "";
  };

  const handleAddSymptoms = () => {
    const symptomValue = symptomInputRef.current.value;
    const durationValue = durationInputRef.current.value;

    if (symptomValue === "") {
      return toast.error("Add symptom");
    }
    if (durationValue === "") {
      return toast.error("Add Duration");
    }

    let newsymptom = {
      symptom: symptomValue,
      duration: durationValue,
    };
    setSymptoms(prev => [...prev, newsymptom]);
    // setAllergy({})
    symptomInputRef.current.value = "";
    durationInputRef.current.value = "";
  };

  const complaintsColumns = [
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
      name: "Symptom",
      key: "symptom",
      description: "Enter Symptom",
      selector: row => row.symptom,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },

    {
      name: "Duration",
      key: "duration",
      description: "Enter Allergy",
      selector: row => row.duration,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
  ];

  const allergiesColumns = [
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
      name: "Allergine",
      key: "allergine",
      description: "Enter Allergy",
      selector: row => row.allergine,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },

    {
      name: "Reaction",
      key: "reaction",
      description: "Enter Allergy",
      selector: row => row.reaction,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
  ];

  return (
    <>
      <div className="card ">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: 2,
          }}
          mb={1}
        >
          <FormsHeaderText text="Pediatric Pulmonology Form" />

          <IconButton onClick={closeEncounterRight}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <div className="card-content vscrollable remPad1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mb={1}>
              <Input
                register={register("Name")}
                name="name"
                type="text"
                label="Name"
              />
            </Box>

            <Box mb={1}>
              <Input
                register={register("Age")}
                name="date"
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

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
              gap={1}
            >
              <Box>
                <Input
                  register={register("Occupation")}
                  type="text"
                  label="Occupation"
                />
              </Box>
              <Box>
                <Input
                  register={register("Marital_Status")}
                  type="text"
                  label="Marital Status"
                />
              </Box>
              <Box>
                <Input
                  register={register("Address")}
                  type="text"
                  label="Address"
                />
              </Box>

              <Box>
                <Input register={register("Tribe")} type="text" label="Tribe" />
              </Box>
              <Box>
                <Input
                  register={register("Informants")}
                  type="text"
                  label="Informants"
                />
              </Box>
              <Box>
                <Input
                  register={register("Religion")}
                  type="text"
                  label="Religion"
                />
              </Box>
              <Box>
                <Input
                  register={register("Fahter_Phone_Number")}
                  type="text"
                  label="Father's Phone Number"
                />
              </Box>
              <Box>
                <Input
                  register={register("Mother_Phone_Number")}
                  type="text"
                  label="Mother's Phone Number"
                />
              </Box>
              <Box>
                <Input
                  register={register("Next_Of_Kin")}
                  type="text"
                  label="Next of Kin"
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              mt={2}
              mb={2}
            >
              <FormsHeaderText text="Presentation Complaints" />

              <GlobalCustomButton type="submit" onClick={handleAddSymptoms}>
                <AddCircleOutline fontSize="small" sx={{marginRight: "5px"}} />
                Add
              </GlobalCustomButton>
            </Box>

            <Box sx={{display: "none"}}>
              <Input
                register={register("Presenting_Complaints")}
                name="Presenting_Complaints"
                type="text"
              />
            </Box>

            <Box sx={{display: "flex", flexDirection: "column"}} gap={1}>
              <RefInput
                label="Symptom"
                name="Symptom"
                inputRef={symptomInputRef}
              />

              <RefInput
                inputRef={durationInputRef}
                type="text"
                label="Duration"
              />
            </Box>

            <Box mb={1}>
              <CustomTable
                title={""}
                columns={complaintsColumns}
                data={symptoms}
                pointerOnHover
                highlightOnHover
                striped
                CustomEmptyData="No Symptoms added yet..."
                //conditionalRowStyles={conditionalRowStyles}
              />
            </Box>

            <Box>
              <FormsHeaderText text="Review of systems" />
            </Box>

            <Box>
              <Typography>
                <b>i. Respiratory</b>
              </Typography>
            </Box>

            <Box>
              <RadioButton
                title="(a) Cough"
                register={register("Cough")}
                options={["Yes", "No"]}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontWeight: "600",
                  color: "#000000",
                  fontSize: "0.8rem",
                }}
              >
                Cough Nature:
              </Typography>

              <CheckboxInput
                register={register("cough_nature")}
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
              <Typography
                sx={{
                  fontWeight: "600",
                  color: "#000000",
                  fontSize: "0.8rem",
                }}
              >
                Associated symptoms with cough:
              </Typography>

              <CheckboxInput
                register={register("cough_associated_symptoms")}
                options={[
                  "feveer",
                  "catarrh",
                  "night sweats",
                  "weight loss",
                  "contact with someone with chronic cough",
                  "facial swelling",
                  "leg swelling",
                ]}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontWeight: "600",
                  color: "#000000",
                  fontSize: "0.8rem",
                }}
              >
                Sputum Colour:
              </Typography>

              <RadioButton
                register={register("cough_sputum_colour")}
                options={["creamy", "brown", "blood stained", "whitish"]}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontWeight: "600",
                  color: "#000000",
                  fontSize: "0.8rem",
                }}
              >
                Other Respiratory Symptoms:
              </Typography>

              <CheckboxInput
                register={register("Other_Respiratory")}
                options={[
                  "Difficulty breathing",
                  "fast breathing",
                  "excessive sneezing",
                  "allergy salute",
                  "chest pain",
                  "atopy",
                  "family history of atopy",
                ]}
              />
            </Box>

            <Box sx={{gap: "1.5rem"}}>
              <Typography>
                <b>ii. CVS</b>
              </Typography>
              <Box>
                <Typography>(a) Cough</Typography>
                <CheckboxInput
                  register={register("cvs")}
                  options={[
                    "cough",
                    "easy defatigability",
                    "breathelessness",
                    "breathelessness at rest",
                    "breathelessness on exertion",
                    "Othopnea",
                    "Paroxymal nocturnal orthopnea",
                    "palpitation",
                    "chest pain",
                  ]}
                />
              </Box>
            </Box>

            <Box sx={{gap: "1.5rem"}}>
              <Typography>
                <b>iii. GIT</b>
              </Typography>

              <Box mb={1}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Abdominal Pain
                </Typography>

                <RadioButton
                  register={register("Abdominal_pain")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Abdominal_Pain_details")}
                  type="text"
                  label="Abdominal Pain details"
                />
              </Box>

              <Box mb={1}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Abdominal Swelling
                </Typography>
                <RadioButton
                  register={register("Abdominal_swelling")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Abdominal_Swelling_details")}
                  type="text"
                  label="Abdominal swelling details"
                />
                <Typography sx={{fontSize: "0.8rem"}}>
                  [onset? Progressive, swelling in other part of the body]
                </Typography>
              </Box>

              <Box mb={1}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Diarrhea
                </Typography>

                <RadioButton
                  register={register("Diarrhea")}
                  options={["Yes", "No"]}
                />

                <Input
                  register={register("Diarrhea_details")}
                  type="text"
                  label="Diarrhea details"
                />

                <Typography sx={{fontSize: "0.8rem"}}>
                  [onset, frequency, consistency, duration, blood stained,
                  colour (r.g rice water colour), mucoid]
                </Typography>
              </Box>

              <Box mb={1}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Nausea
                </Typography>

                <RadioButton
                  register={register("Nausea")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Nausea_details")}
                  name="text"
                  type="text"
                  label="Nausea details"
                />
              </Box>

              <Box mb={1}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Vomitting
                </Typography>

                <RadioButton
                  register={register("Vomitting")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Vomitting_details")}
                  name="text"
                  type="text"
                  label="Vomitting details"
                />
                <Typography sx={{fontSize: "0.8rem"}}>
                  [projectile? Content? Episodes?]
                </Typography>
              </Box>

              <Box mb={1}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Constipation
                </Typography>

                <RadioButton
                  register={register("Constipation")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Constipation_details")}
                  name="text"
                  type="text"
                  label="Constipation details"
                />
                <Typography sx={{fontSize: "0.8rem"}}>[onset]</Typography>
              </Box>
            </Box>

            <Box mb={1}>
              <Typography>
                <b>iv. Urinary</b>
              </Typography>

              <Box mb={1}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Urinary Findings:
                </Typography>

                <CheckboxInput
                  register={register("Urinary")}
                  options={[
                    "frequency",
                    "nocturia",
                    "polyuria",
                    "poor stream",
                    "incomplete bladder empty",
                    "urgency",
                    "hesistancy",
                  ]}
                />
                <Input
                  register={register("Urinary_others")}
                  name="text"
                  type="text"
                  label="Urinary others Specify"
                />
              </Box>
            </Box>

            <Box
              mb={1}
              sx={{display: "flex", flexDirection: "column"}}
              gap={1.5}
            >
              <Typography>
                <b>v. CNS</b>
              </Typography>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Headache:
                </Typography>

                <RadioButton
                  register={register("Headache")}
                  options={["Yes", "No"]}
                />

                <CheckboxInput
                  register={register("Headache_info")}
                  options={[
                    "throbing",
                    "dull",
                    "generalised",
                    "frontal",
                    "right-sided",
                    "left sided",
                    "photophia",
                  ]}
                />
                <Input
                  register={register("Headache_details")}
                  type="text"
                  label="Headache details"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Neck Pain:
                </Typography>

                <RadioButton
                  register={register("Neck_pain")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Neck_pain_details")}
                  type="text"
                  label="Neck Pain details"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Neck Stiffness
                </Typography>

                <RadioButton
                  register={register("Neck_Stiffness")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Neck_Stiffness_details")}
                  type="text"
                  label="Neck Stiffness details"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Vertigo
                </Typography>

                <RadioButton
                  register={register("Vertigo")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Vertigo_details")}
                  type="text"
                  label="Vertigo details"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Dizziness
                </Typography>

                <RadioButton
                  register={register("Dizziness")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Dizziness_details")}
                  type="text"
                  label="Dizziness details"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Fainting Spells
                </Typography>

                <RadioButton
                  register={register("Fainting_spells")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Fainting_spells_details")}
                  type="text"
                  label="Fainting spells details"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Akward Gait
                </Typography>

                <RadioButton
                  register={register("Akward_Gait")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Akward_Gait_details")}
                  type="text"
                  label="Akward Gait details"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Weakness of Upper Limbs
                </Typography>

                <RadioButton
                  register={register("Weakness_Upper_Limbs")}
                  options={["Yes", "No"]}
                />

                <CheckboxInput
                  register={register("Weakness_Upper_Limbs_side")}
                  options={["Right Limb", "Left Limb", "Both Limbs"]}
                />
                <Input
                  register={register("Weakness_Upper_Limbs_details")}
                  type="text"
                  label="Weakness Upper Limbs details"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Weakness Lower Limbs
                </Typography>

                <RadioButton
                  register={register("Weakness_Lower_Limbs")}
                  options={["Yes", "No"]}
                />

                <CheckboxInput
                  register={register("Weakness_Lower_Limbs_side")}
                  options={["Right Limb", "Left Limb", "Both Limbs"]}
                />
                <Input
                  register={register("Weakness_Lower_Limbs_details")}
                  name="text"
                  type="text"
                  label="Weakness Lower Limbs details"
                />
              </Box>
            </Box>

            <Box sx={{display: "flex", flexDirection: "column"}} gap={1.5}>
              <Typography>
                <b>vi. ENT</b>
              </Typography>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Eye Pain:
                </Typography>

                <RadioButton
                  register={register("Eye_pain")}
                  options={["Yes", "No"]}
                />
                <CheckboxInput
                  register={register("Eye_pain_side")}
                  options={["Right", "Left", "Both"]}
                />
                <Input
                  register={register("Eye_pain_details")}
                  name="text"
                  type="text"
                  label="Eye pain details"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Eye Discharge:
                </Typography>

                <RadioButton
                  register={register("Eye_discharge")}
                  options={["Yes", "No"]}
                />
                <CheckboxInput
                  register={register("Eye_discharge_side")}
                  options={["Right", "Left", "Both"]}
                />
                <Input
                  register={register("Eye_discharge_details")}
                  name="text"
                  type="text"
                  label="Eye discharge details"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Eye Swelling
                </Typography>

                <RadioButton
                  register={register("Eye_swelling")}
                  options={["Yes", "No"]}
                />
                <CheckboxInput
                  register={register("Eye_swelling_side")}
                  options={["Right", "Left", "Both"]}
                />
                <Input
                  register={register("Eye_swelling_details")}
                  name="text"
                  type="text"
                  label="Eye swelling details"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Ear Pain:
                </Typography>

                <RadioButton
                  register={register("Ear_pain")}
                  options={["Yes", "No"]}
                />
                <CheckboxInput
                  register={register("Ear_pain_side")}
                  options={["Right", "Left", "Both"]}
                />
                <Input
                  register={register("Ear_pain_details")}
                  type="text"
                  label="Ear pain details"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Ear Discharge:
                </Typography>

                <RadioButton
                  register={register("Ear_Discharge")}
                  options={["Yes", "No"]}
                />
                <CheckboxInput
                  register={register("Ear_Discharge_side")}
                  options={["Right", "Left", "Both", "Purulent", "Bloody"]}
                />
                <Input
                  register={register("Ear_Discharge_details")}
                  type="text"
                  label="Ear Discharge details"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Other ENT Findings:
                </Typography>

                <CheckboxInput
                  register={register("other_ENT")}
                  options={[
                    "Sore throat",
                    "change in voice",
                    "nasal discharge",
                    "excessive sneezing",
                    "allergy salute",
                  ]}
                />
                <Input
                  register={register("Other_ENT_details")}
                  type="text"
                  label="Other ENT Findings Details"
                />
              </Box>
            </Box>

            <Box mt={2} mb={1}>
              <Typography>
                <b>vii. Endocrinology</b>
              </Typography>
            </Box>

            <Box mb={1}>
              <Typography
                sx={{
                  fontWeight: "600",
                  color: "#000000",
                  fontSize: "0.85rem",
                }}
              >
                Endocrinology Findings
              </Typography>

              <CheckboxInput
                register={register("Endocrinology")}
                options={[
                  "heat intolerance",
                  "apathy",
                  "excessive sweating",
                  "excessive hair growth",
                  "weight gain",
                  "weight loss",
                  "menstral irregularity",
                ]}
              />
              <Input
                register={register("Other_Endocrinology_finding")}
                type="text"
                label="Other Endocrinology findings details"
              />
            </Box>

            <Box>
              <Typography>
                <b>vii. Other Systems</b>
              </Typography>

              <Textarea
                register={register("Other_System_finding")}
                name="text"
                type="text"
                label="Other Systems findings details"
              />
            </Box>

            <Box sx={{display: "flex", flexDirection: "column"}} gap={1.5}>
              <Typography>
                <b>SECTION D: Past Medical History</b>
              </Typography>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Previous Surgery
                </Typography>

                <RadioButton
                  register={register("Previous_surgery")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Previous_surgery_details")}
                  type="text"
                  label="Previous Surgery details"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Previous Admission
                </Typography>

                <RadioButton
                  register={register("Previous_admission")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Previous_admission_details")}
                  type="text"
                  label="Previous admission details"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Blood Transfusion
                </Typography>

                <RadioButton
                  register={register("Blood_transfusion")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Blood_transfusion_details")}
                  name="text"
                  type="text"
                  label="Blood transfusion details"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Diabetes
                </Typography>

                <RadioButton
                  register={register("Diabetes")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Diabetes_details")}
                  type="text"
                  label="Diabetes details"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Hypertension
                </Typography>

                <RadioButton
                  register={register("Hypertension")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Hypertension_details")}
                  type="text"
                  label="Hypertension details"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Sickcle Cell Disease
                </Typography>

                <RadioButton
                  register={register("Sickcle_cell_disease")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Sickcle_cell_disease_details")}
                  name="text"
                  type="text"
                  label="Sickcle cell disease details"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Peptic Ulcer
                </Typography>

                <RadioButton
                  register={register("Peptic_Ulcer")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Peptic_Ulcer_details")}
                  name="text"
                  type="text"
                  label="Peptic Ulcer details"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Seizure
                </Typography>

                <RadioButton
                  register={register("Seizure")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Seizure_details")}
                  type="text"
                  label="Seizure details"
                />
              </Box>
            </Box>

            <Box>
              <Typography>
                <b>SECTION E: Pregnancy, Birth and Neonatal history</b>
              </Typography>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Pregnancy Term?
                </Typography>

                <RadioButton
                  register={register("Pregnancy_term")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Pregnancy_details")}
                  type="text"
                  label="Pregnancy details"
                />
                <Typography sx={{fontSize: "0.8rem"}}>
                  [any eventful conditions during pregancy e.g maternal illnesss
                  or admission]
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Birth
                </Typography>

                <RadioButton
                  register={register("Birth")}
                  options={[
                    "Spontenous varginal delivery",
                    "Elective Sureqery",
                    "Emergency Surgery",
                  ]}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Crietd At Birth?
                </Typography>

                <RadioButton
                  register={register("Birth_Cry")}
                  options={["Yes", "No"]}
                />

                <Box mb={1.5}>
                  <Input
                    register={register("Birth_weight")}
                    name="text"
                    type="text"
                    label="Birth Weight"
                  />
                </Box>

                <Box>
                  <Input
                    register={register("APGAR_score")}
                    name="text"
                    type="text"
                    label="APGAR Score"
                  />
                </Box>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Neonatal Admission
                </Typography>

                <RadioButton
                  register={register("Neonatal_admission")}
                  options={["Yes", "No"]}
                />

                <Input
                  register={register("Neonatal_admission_details")}
                  name="text"
                  type="text"
                  label="Neonatal admission details"
                />

                <Typography>
                  [[if yes what was wrong with the child?]]
                </Typography>
              </Box>

              <Box>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      color: "#000000",
                      fontSize: "0.85rem",
                    }}
                  >
                    Had Phototherapy?
                  </Typography>

                  <RadioButton
                    register={register("phototherapy")}
                    options={["Yes", "No"]}
                  />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      color: "#000000",
                      fontSize: "0.85rem",
                    }}
                  >
                    Exchange Blood Transfusion?
                  </Typography>

                  <RadioButton
                    register={register("Exchange_blood_transfusion")}
                    options={["Yes", "No"]}
                  />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      color: "#000000",
                      fontSize: "0.85rem",
                    }}
                  >
                    Received Oxygen?
                  </Typography>

                  <RadioButton
                    register={register("Received_Oxygen")}
                    options={["Yes", "No"]}
                  />
                </Box>
              </Box>
            </Box>

            <Box>
              <Typography>
                <b>SECTION F: Nutritional History</b>
              </Typography>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Exclusive Breastfed
                </Typography>

                <RadioButton
                  register={register("Exclusive_Breastfed")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Breastfed_duration")}
                  name="text"
                  type="text"
                  label="Breastfed how long"
                />
              </Box>
            </Box>

            <Box mb={1}>
              <Typography>
                <b>SECTION G: Immunization History</b>
              </Typography>
            </Box>

            <Box>
              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Fully Vacinated
                </Typography>

                <RadioButton
                  register={register("Fully_vacinated")}
                  options={["Yes", "No"]}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  BCG Scar Seen
                </Typography>

                <RadioButton
                  register={register("BCG_Scar")}
                  options={["Yes", "No"]}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Vaccination History
                </Typography>

                <RadioButton
                  register={register("Vaccination_history")}
                  options={["caregiver's report", "child health card"]}
                />
              </Box>
            </Box>

            <Box>
              <Typography>
                <b>SECTION H: DEVELOPMENTAL MILESTONE</b>
              </Typography>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Had Delayed Developmental Milestones?
                </Typography>

                <RadioButton
                  register={register("Delayed_milestones")}
                  options={["Yes", "No"]}
                />

                <Input
                  register={register("Delayed_milestones_detail")}
                  name="text"
                  type="text"
                  label="Delayed Milestones detail"
                />
              </Box>
            </Box>

            <Box>
              <Typography
                sx={{
                  fontWeight: "600",
                  color: "#000000",
                  fontSize: "0.85rem",
                }}
              >
                SECTION I: FAMILY AND SOCIAL HISTORY
              </Typography>

              <Textarea
                register={register("family_social_history")}
                name="text"
                type="text"
                label="Family and Social History"
              />
            </Box>

            <Box>
              <Typography>
                <b>SECTION J: DRUG HISTORY AND ALLERGY</b>
              </Typography>
              <Textarea
                register={register("drug_history_allergy")}
                name="text"
                type="text"
                label="Drug History and Allergy"
              />
            </Box>

            <Box sx={{display: "flex", flexDirection: "column"}} gap={1.5}>
              <Box>
                <Typography>
                  <b>Examination Findings</b>
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  1. General Examination
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Pallor
                </Typography>

                <RadioButton
                  register={register("Pallor")}
                  options={["Yes", "No"]}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Febrile
                </Typography>

                <RadioButton
                  register={register("Febrile")}
                  options={["Yes", "No"]}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Cyanosed
                </Typography>

                <RadioButton
                  register={register("Cyanosed")}
                  options={["Yes", "No"]}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Icteric
                </Typography>

                <RadioButton
                  register={register("Icteric")}
                  options={["Yes", "No"]}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Lyphm Node Enlargement
                </Typography>

                <RadioButton
                  register={register("Lyphm_node_enlargement")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Lyphm_node_enlargements_detail")}
                  type="text"
                  label="Lyphm node enlargement detail"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Temperature
                </Typography>

                <RadioButton
                  register={register("Temperature")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("input_name")}
                  name="text"
                  type="text"
                  label="Temperature detail"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Pedal Edema
                </Typography>

                <RadioButton
                  register={register("Pedal_edema")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Pedal_edema_detail")}
                  type="text"
                  label="Pedal edema detail"
                />
                <Typography sx={{fontSize: "0.8rem"}}>
                  [Describe if present: pitting, extent]
                </Typography>
              </Box>
            </Box>

            <Box sx={{display: "flex", flexDirection: "column"}} gap={1.5}>
              <Box>
                <Typography>
                  <b>2. RESPIRATORY SYSTEM</b>
                </Typography>
              </Box>

              <Box>
                <Input
                  register={register("Respiratory_rate")}
                  type="text"
                  label="Respiratory Rate"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Fast Breathing
                </Typography>

                <RadioButton
                  register={register("Fast_breathing")}
                  options={["Yes", "No"]}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Dyspneic
                </Typography>

                <RadioButton
                  register={register("Dyspneic")}
                  options={["Yes", "No"]}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Respiratory Distress
                </Typography>

                <RadioButton
                  register={register("Respiratory_distress")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Respiratory_distress_evidence")}
                  type="text"
                  label="Respiratory distress evidence"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Lower Chest Wall Indrawing
                </Typography>

                <RadioButton
                  register={register("Lower_chest_wall_indrawing")}
                  options={["Yes", "No"]}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Audible Wheeze
                </Typography>

                <RadioButton
                  register={register("Audible_wheeze")}
                  options={["Yes", "No"]}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Chest Symetrical
                </Typography>

                <RadioButton
                  register={register("Chest_symetrical")}
                  options={["Yes", "No"]}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Equal Chest Expansion
                </Typography>

                <RadioButton
                  register={register("Equal_chest_expansion")}
                  options={["Yes", "No"]}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Trachea Central
                </Typography>

                <RadioButton
                  register={register("Trachea_central")}
                  options={["Yes", "No"]}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Percussion Note
                </Typography>

                <RadioButton
                  register={register("Percussion_note")}
                  options={["dull", "resonant", "hyper-resonant"]}
                />
              </Box>

              <Box>
                <Typography>
                  <b>Auscultatory findings</b>
                </Typography>
              </Box>

              <Box>
                <Input
                  register={register("Ausc_Air_entry")}
                  type="text"
                  label="Air Entry"
                  placeholder="describe..."
                />
              </Box>

              <Box>
                <Input
                  register={register("Ausc_Breath_Sound")}
                  type="text"
                  label="Breath Sound"
                  placeholder="describe..."
                />
              </Box>

              <Box>
                <RadioButton
                  title="Crackles"
                  register={register("Ausc_Crackles")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Ausc_Crackles_detail")}
                  type="text"
                  label="Crackles detail"
                />
              </Box>

              <Box>
                <RadioButton
                  title="Stridor"
                  register={register("Ausc_Stridor")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Ausc_Stridor_detail")}
                  name="text"
                  type="text"
                  label="Stridor detail"
                />
              </Box>

              <Box>
                <RadioButton
                  title="Wheeze"
                  register={register("Ausc_Wheeze")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Ausc_Wheeze_detail")}
                  name="text"
                  type="text"
                  label="Wheeze detail"
                />
              </Box>
            </Box>

            <Box sx={{display: "flex", flexDirection: "column"}} gap={1.5}>
              <Box>
                <Typography>
                  <b>3. CARDIOVASCULAR SYSTEM</b>
                </Typography>
              </Box>

              <Box>
                <Input
                  register={register("Pulse_rate")}
                  type="text"
                  label="Pulse rate"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Pulse Character
                </Typography>

                <CheckboxInput
                  register={register("Pulse_Character")}
                  options={[
                    "Regular",
                    "Irregular",
                    "Normal volume",
                    "pounding",
                    "Synchronous",
                    "Asynchronous",
                  ]}
                />
              </Box>

              <Box>
                {" "}
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Jugular Vein Distended
                </Typography>
                <RadioButton
                  register={register("Jugular_Vein_distended")}
                  options={["Yes", "No"]}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Precordium Hyperactive
                </Typography>

                <RadioButton
                  register={register("Precordium_hyperactive")}
                  options={["Yes", "No"]}
                />
              </Box>

              <Box>
                <Input
                  register={register("Blood_Pressure")}
                  type="text"
                  label="Blood pressure value"
                />
              </Box>

              <Box>
                <Input
                  register={register("Apex_beat_location")}
                  name="text"
                  type="text"
                  label="Apex beat location"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Apex Beat Displaced?
                </Typography>

                <RadioButton
                  register={register("Apex_beat_displaced")}
                  options={["Yes", "No"]}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Apex Beat Located?
                </Typography>

                <RadioButton
                  register={register("Apex_beat_located")}
                  options={["Yes", "No"]}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Thrills
                </Typography>

                <RadioButton
                  register={register("Thrills")}
                  options={["Yes", "No"]}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Heart Sound
                </Typography>
                <CheckboxInput
                  register={register("Heart_Sound")}
                  options={["S1", "S2", "S3", "S4"]}
                />
                <Input
                  register={register("Heart_Sound_description")}
                  name="text"
                  type="text"
                  label="Heart Sound description"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Murmur
                </Typography>

                <RadioButton
                  register={register("Murmur")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Murmur_description")}
                  name="text"
                  type="text"
                  label="Murmur description"
                />
              </Box>
            </Box>

            <Box sx={{display: "flex", flexDirection: "column"}} gap={1.5}>
              <Box>
                <Typography>
                  <b>4. ABDOMINAL SYSTEM</b>
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Abdomen
                </Typography>
                <CheckboxInput
                  register={register("Abdomen")}
                  options={[
                    "Full",
                    "Distended",
                    "Flat",
                    "moves with respiration",
                    "Abdominal vein visible",
                  ]}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Abdominal Tenderness
                </Typography>

                <RadioButton
                  register={register("Abdominal_tenderness")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Abdominal_tenderness_details")}
                  name="text"
                  type="text"
                  label="Abdominal tenderness detail"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Liver Enlarged
                </Typography>
                <RadioButton
                  register={register("Liver_enlarged")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Liver_enlarged_details")}
                  name="text"
                  type="text"
                  label="Liver enlarged detail"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Kidney Enlarged
                </Typography>
                <RadioButton
                  register={register("Kidney_enlarged")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Kidney_enlarged_details")}
                  name="text"
                  type="text"
                  label="Kidney enlarged detail"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Spleen Enlarged
                </Typography>

                <RadioButton
                  register={register("Spleen_enlarged")}
                  options={["Yes", "No"]}
                />
                <Input
                  register={register("Spleen_enlarged_details")}
                  name="text"
                  type="text"
                  label="Spleen enlarged detail"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "0.85rem",
                  }}
                >
                  Bowel Sound
                </Typography>
                <RadioButton
                  register={register("Bowel_Sound")}
                  options={[
                    "Normal",
                    "Absent",
                    "Hyperactive",
                    "Reduced or Hypoactive",
                  ]}
                />
              </Box>
            </Box>

            <Box>
              <Typography>
                <b>5. Other System Findings</b>
              </Typography>
            </Box>

            <Box>
              <Textarea
                register={register("Other_Systemic_examination_findings")}
                name="text"
                type="text"
                label="Describe other findings"
              />
            </Box>

            <Box>
              <FormsHeaderText text="Investigations" />
            </Box>

            <Box sx={{display: "flex", flexDirection: "column"}} gap={1.5}>
              <Grid container spacing={1} mb={1}>
                <Grid item xs={3}>
                  <Typography sx={{fontSize: "0.8rem", fontWeight: "600"}}>
                    Full blood count
                  </Typography>
                </Grid>

                <Grid item xs={4.5}>
                  <Typography sx={{fontSize: "0.8rem", fontWeight: "600"}}>
                    Abosolue
                  </Typography>
                </Grid>

                <Grid item xs={4.5}>
                  <Typography sx={{fontSize: "0.8rem", fontWeight: "600"}}>
                    Percentage
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={1} mb={1}>
                <Grid item xs={3}>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                    }}
                  >
                    PCV
                  </Typography>
                </Grid>

                <Grid item xs={4.5}>
                  <Input
                    placeholder="specify..."
                    register={register("PCV_absolute")}
                    type="text"
                  />
                </Grid>

                <Grid item xs={4.5}>
                  <Input
                    placeholder="specify..."
                    register={register("PCV_percentage")}
                    type="text"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} mb={1}>
                <Grid item xs={3}>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                    }}
                  >
                    WBC
                  </Typography>
                </Grid>

                <Grid item xs={4.5}>
                  <Input
                    placeholder="specify..."
                    register={register("WBC_absolute")}
                    type="text"
                  />
                </Grid>

                <Grid item xs={4.5}>
                  <Input
                    placeholder="specify..."
                    register={register("WBC_percentage")}
                    type="text"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} mb={1}>
                <Grid item xs={3}>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                    }}
                  >
                    NEUTROPHIL
                  </Typography>
                </Grid>

                <Grid item xs={4.5}>
                  <Input
                    placeholder="specify..."
                    register={register("NEUTROPHIL_absolute")}
                    type="text"
                  />
                </Grid>

                <Grid item xs={4.5}>
                  <Input
                    placeholder="specify..."
                    register={register("NEUTROPHIL_percentage")}
                    type="text"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} mb={1}>
                <Grid item xs={3}>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                    }}
                  >
                    LYMPHOCYTE
                  </Typography>
                </Grid>

                <Grid item xs={4.5}>
                  <Input
                    placeholder="specify..."
                    register={register("LYMPHOCYTE_absolute")}
                    type="text"
                  />
                </Grid>

                <Grid item xs={4.5}>
                  <Input
                    placeholder="specify..."
                    register={register("LYMPHOCYTE_percentage")}
                    type="text"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} mb={1}>
                <Grid item xs={3}>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                    }}
                  >
                    EOSINOPHIL
                  </Typography>
                </Grid>

                <Grid item xs={4.5}>
                  <Input
                    placeholder="specify..."
                    register={register("EOSINOPHIL_absolute")}
                    type="text"
                  />
                </Grid>

                <Grid item xs={4.5}>
                  <Input
                    placeholder="specify..."
                    register={register("EOSINOPHIL_percentage")}
                    type="text"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} mb={1}>
                <Grid item xs={3}>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                    }}
                  >
                    BASOPHIL
                  </Typography>
                </Grid>

                <Grid item xs={4.5}>
                  <Input
                    placeholder="specify..."
                    register={register("BASOPHIL_absolute")}
                    type="text"
                  />
                </Grid>

                <Grid item xs={4.5}>
                  <Input
                    placeholder="specify..."
                    register={register("BASOPHIL_percentage")}
                    type="text"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} mb={1}>
                <Grid item xs={3}>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                    }}
                  >
                    MONOCYTE
                  </Typography>
                </Grid>

                <Grid item xs={4.5}>
                  <Input
                    placeholder="specify..."
                    register={register("MONOCYTE_absolute")}
                    type="text"
                  />
                </Grid>

                <Grid item xs={4.5}>
                  <Input
                    placeholder="specify..."
                    register={register("MONOCYTE_percentage")}
                    type="text"
                  />
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Grid container spacing={1} mb={1}>
                <Grid item xs={3}>
                  <Typography sx={{fontSize: "0.8rem", fontWeight: "600"}}>
                    Spirometry
                  </Typography>
                </Grid>

                <Grid item xs={4.5}>
                  <Typography sx={{fontSize: "0.8rem", fontWeight: "600"}}>
                    Value
                  </Typography>
                </Grid>

                <Grid item xs={4.5}>
                  <Typography sx={{fontSize: "0.8rem", fontWeight: "600"}}>
                    Predicted Percentage
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={1} mb={1}>
                <Grid item xs={3}>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                    }}
                  >
                    FEV1
                  </Typography>
                </Grid>

                <Grid item xs={4.5}>
                  <Input
                    placeholder="specify..."
                    register={register("FEV1_value")}
                    type="text"
                  />
                </Grid>

                <Grid item xs={4.5}>
                  <Input
                    placeholder="specify..."
                    register={register("FEV1_predicted_percentage")}
                    type="text"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} mb={1}>
                <Grid item xs={3}>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                    }}
                  >
                    FVC
                  </Typography>
                </Grid>

                <Grid item xs={4.5}>
                  <Input
                    placeholder="specify..."
                    register={register("FVC_value")}
                    type="text"
                  />
                </Grid>

                <Grid item xs={4.5}>
                  <Input
                    placeholder="specify..."
                    register={register("FVC_predicted_percentage")}
                    type="text"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} mb={1}>
                <Grid item xs={3}>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                    }}
                  >
                    FEV1%
                  </Typography>
                </Grid>

                <Grid item xs={4.5}>
                  <Input
                    placeholder="specify..."
                    register={register("FEV1%_value")}
                    type="text"
                  />
                </Grid>

                <Grid item xs={4.5}>
                  <Input
                    placeholder="specify..."
                    register={register("FEV1%_predicted_percentage")}
                    type="text"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} mb={1}>
                <Grid item xs={3}>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                    }}
                  >
                    FEF25-75
                  </Typography>
                </Grid>

                <Grid item xs={4.5}>
                  <Input
                    placeholder="specify..."
                    register={register("FEF25-75_value")}
                    type="text"
                  />
                </Grid>

                <Grid item xs={4.5}>
                  <Input
                    placeholder="specify..."
                    register={register("FEF25-75_predicted_percentage")}
                    type="text"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} mb={1}>
                <Grid item xs={3}>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                    }}
                  >
                    PEFR
                  </Typography>
                </Grid>

                <Grid item xs={4.5}>
                  <Input
                    placeholder="specify..."
                    register={register("PEFR_value")}
                    type="text"
                  />
                </Grid>

                <Grid item xs={4.5}>
                  <Input
                    placeholder="specify..."
                    register={register("PEFR_predicted_percentage")}
                    type="text"
                  />
                </Grid>
              </Grid>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              mb={1}
            >
              <FormsHeaderText text="ALLERGY SKIN TESTING" />

              <GlobalCustomButton onClick={handleAdd}>
                <AddCircleOutline fontSize="small" sx={{marginRight: "5px"}} />
                Add
              </GlobalCustomButton>
            </Box>

            <Box mb={1}>
              <RefInput
                label="Allergy"
                placeholder="specify..."
                type="text"
                inputRef={allergineInputRef}
              />
            </Box>

            <Box mb={1}>
              <RefInput
                label="Reaction"
                placeholder="specify..."
                inputRef={reactionInputRef}
              />
            </Box>

            <Box mb={2}>
              <CustomTable
                title={""}
                columns={allergiesColumns}
                data={allergies}
                pointerOnHover
                highlightOnHover
                striped
                CustomEmptyData="No Allergy added yet..."
                //conditionalRowStyles={conditionalRowStyles}
              />
            </Box>

            <Box mb={2}>
              <Input
                label="Serum IGE Level"
                register={register("IGE_Level")}
                placeholder="Specify"
                type="text"
              />
            </Box>

            <Box
              sx={{display: "flex", flexDirection: "column"}}
              gap={1.5}
              mb={2}
            >
              <Grid container spacing={1}>
                <Grid item xs={5}>
                  <Typography sx={{fontSize: "0.8rem", fontWeight: "600"}}>
                    Urinalysis Parameters
                  </Typography>
                </Grid>

                <Grid item xs={7}>
                  <Typography sx={{fontSize: "0.8rem", fontWeight: "600"}}>
                    Values
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography sx={{fontSize: "0.8rem", fontWeight: "600"}}>
                    Color
                  </Typography>
                </Grid>

                <Grid item xs={8}>
                  <Input
                    placeholder="specify..."
                    register={register("urinalysis_color")}
                    type="text"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography sx={{fontSize: "0.8rem", fontWeight: "600"}}>
                    Specific Gravity
                  </Typography>
                </Grid>

                <Grid item xs={8}>
                  <Input
                    placeholder="specify..."
                    register={register("urinalysis_Specific_gravity")}
                    type="text"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography sx={{fontSize: "0.8rem", fontWeight: "600"}}>
                    Leucocyte
                  </Typography>
                </Grid>

                <Grid item xs={8}>
                  <Input
                    placeholder="specify..."
                    register={register("urinalysis_Leucocyte")}
                    type="text"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography sx={{fontSize: "0.8rem", fontWeight: "600"}}>
                    Protein
                  </Typography>
                </Grid>

                <Grid item xs={8}>
                  <Input
                    placeholder="specify..."
                    register={register("urinalysis_Protein")}
                    type="text"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography sx={{fontSize: "0.8rem", fontWeight: "600"}}>
                    Blood
                  </Typography>
                </Grid>

                <Grid item xs={8}>
                  <Input
                    placeholder="specify..."
                    register={register("urinalysis_Blood")}
                    type="text"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography sx={{fontSize: "0.8rem", fontWeight: "600"}}>
                    Glucose
                  </Typography>
                </Grid>

                <Grid item xs={8}>
                  <Input
                    placeholder="specify..."
                    register={register("urinalysis_Glucose")}
                    type="text"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography sx={{fontSize: "0.8rem", fontWeight: "600"}}>
                    Urobilinogen
                  </Typography>
                </Grid>

                <Grid item xs={8}>
                  <Input
                    placeholder="specify..."
                    register={register("urinalysis_Urobilinogen")}
                    type="text"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography sx={{fontSize: "0.8rem", fontWeight: "600"}}>
                    Ketones
                  </Typography>
                </Grid>

                <Grid item xs={8}>
                  <Input
                    placeholder="specify..."
                    register={register("urinalysis_Ketones")}
                    type="text"
                  />
                </Grid>
              </Grid>
            </Box>

            <Box
              sx={{display: "flex", flexDirection: "column"}}
              gap={1.5}
              mb={2}
            >
              <Grid container spacing={1}>
                <Grid item xs={5}>
                  <Typography sx={{fontSize: "0.8rem", fontWeight: "600"}}>
                    Electrolyte, Urea and Creatinine Parameters
                  </Typography>
                </Grid>

                <Grid item xs={7}>
                  <Typography sx={{fontSize: "0.8rem", fontWeight: "600"}}>
                    Values
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography sx={{fontSize: "0.8rem", fontWeight: "600"}}>
                    Sodium
                  </Typography>
                </Grid>

                <Grid item xs={8}>
                  <Input
                    placeholder="specify..."
                    register={register("EUCR_Sodium")}
                    type="text"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography sx={{fontSize: "0.8rem", fontWeight: "600"}}>
                    Potassium
                  </Typography>
                </Grid>

                <Grid item xs={8}>
                  <Input
                    placeholder="specify..."
                    register={register("EUCR_Potassium")}
                    type="text"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography sx={{fontSize: "0.8rem", fontWeight: "600"}}>
                    Chloride
                  </Typography>
                </Grid>

                <Grid item xs={8}>
                  <Input
                    placeholder="specify..."
                    register={register("EUCR_Chloride")}
                    type="text"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography sx={{fontSize: "0.8rem", fontWeight: "600"}}>
                    Bicarbonate
                  </Typography>
                </Grid>

                <Grid item xs={8}>
                  <Input
                    placeholder="specify..."
                    register={register("EUCR_Bicarbonate")}
                    type="text"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography sx={{fontSize: "0.8rem", fontWeight: "600"}}>
                    Urea
                  </Typography>
                </Grid>

                <Grid item xs={8}>
                  <Input
                    placeholder="specify..."
                    register={register("EUCR_Urea")}
                    type="text"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography sx={{fontSize: "0.8rem", fontWeight: "600"}}>
                    Creatinine
                  </Typography>
                </Grid>

                <Grid item xs={8}>
                  <Input
                    placeholder="specify..."
                    register={register("EUCR_Creatinine")}
                    type="text"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography sx={{fontSize: "0.8rem", fontWeight: "600"}}>
                    Anion Gap
                  </Typography>
                </Grid>

                <Grid item xs={8}>
                  <Input
                    placeholder="specify..."
                    register={register("EUCR_Anion_Gap")}
                    type="text"
                  />
                </Grid>
              </Grid>
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
                variant="contained"
                type="submit"
              >
                Submit Pulmonology
              </GlobalCustomButton>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
}
