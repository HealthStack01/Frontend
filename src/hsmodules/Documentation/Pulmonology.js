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
// import GroupedRadio from "../../components/inputs/basic/Radio";
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
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";
import CheckboxGroup from "../../components/inputs/basic/Checkbox/CheckBoxGroup";
import GroupedRadio from "../../components/inputs/basic/Radio/GroupedRadio";

export default function PulmonologyIntake() {
  const {register, handleSubmit, setValue, resetField, control, reset} =
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
  const [reactions, setReaction] = useState("");
  const [allergines, setAllergine] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [duration, setDuration] = useState("");
  const [symptom, setSymptom] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [docStatus, setDocStatus] = useState("Draft");
  const [confirmationDialog, setConfirmationDialog] = useState(false);

  const [dataset, setDataset] = useState();
  const {state, setState, showActionLoader, hideActionLoader, toggleSideMenu} =
    useContext(ObjectContext);

  //Making use of useRef to store input values cause component too large and makes setState hang cause setState re-renders when onChange function is fired..
  const symptomInputRef = useRef(null);
  const durationInputRef = useRef(null);
  const allergineInputRef = useRef(null);
  const reactionInputRef = useRef(null);

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  //state.DocumentClassModule.selectedDocumentClass.name

  useEffect(() => {
    if (!!draftDoc && draftDoc.status === "Draft") {
      console.log(draftDoc.documentdetail);
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
    // e.preventDefault();
    showActionLoader();
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
      toast.error(
        "Documentation data missing, requires location and facility details"
      );
      return;
    }

    if (!!draftDoc && draftDoc.status === "Draft") {
      ClientServ.patch(draftDoc._id, document)
        .then(res => {
          //console.log(JSON.stringify(res))
          // e.target.reset();
          Object.keys(data).forEach(key => {
            data[key] = null;
          });
          setAllergies([]);
          setSymptoms([]);
          /*  setMessage("Created Client successfully") */
          setSuccess(true);
          hideActionLoader();
          toast.success("Pediatric Pulmonology Form updated succesfully");
          setSuccess(false);
          reset(data);
          setConfirmationDialog(false);
        })
        .catch(err => {
          hideActionLoader();
          toast.error("Error updating Pediatric Pulmonology Form " + err);
        });
    } else {
      ClientServ.create(document)
        .then(res => {
          Object.keys(data).forEach(key => {
            data[key] = null;
          });
          //console.log(JSON.stringify(res))
          //e.target.reset();
          setAllergies([]);
          setSymptoms([]);
          /*  setMessage("Created Client successfully") */
          setSuccess(true);
          hideActionLoader();
          toast.success("Pediatric Pulmonology Form created succesfully");
          setSuccess(false);
          reset(data);
          setConfirmationDialog(false);
        })
        .catch(err => {
          hideActionLoader();
          toast.error("Error creating Pediatric Pulmonology Form " + err);
        });
    }
    //}
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

    toggleSideMenu();
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
        <CustomConfirmationDialog
          open={confirmationDialog}
          cancelAction={() => setConfirmationDialog(false)}
          type="create"
          message="you're about to save Pediatric Pulmonology Form?"
          confirmationAction={handleSubmit(onSubmit)}
        />
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
          <form>
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
              <GroupedRadio
                label="Gender"
                options={["Male", "Female"]}
                name="Gender"
                control={control}
                row
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
              <GroupedRadio
                label="(a) Cough"
                options={["Yes", "No"]}
                control={control}
                name="Cough"
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

              <CheckboxGroup
                control={control}
                name="cough_nature"
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
                row
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

              <CheckboxGroup
                name="cough_associated_symptoms"
                control={control}
                options={[
                  "feveer",
                  "catarrh",
                  "night sweats",
                  "weight loss",
                  "contact with someone with chronic cough",
                  "facial swelling",
                  "leg swelling",
                ]}
                row
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

              <GroupedRadio
                options={["creamy", "brown", "blood stained", "whitish"]}
                name="cough_sputum_colour"
                control={control}
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

              <CheckboxGroup
                name="Other_Respiratory"
                control={control}
                options={[
                  "Difficulty breathing",
                  "fast breathing",
                  "excessive sneezing",
                  "allergy salute",
                  "chest pain",
                  "atopy",
                  "family history of atopy",
                ]}
                row
              />
            </Box>

            <Box sx={{gap: "1.5rem"}}>
              <Typography>
                <b>ii. CVS</b>
              </Typography>
              <Box>
                <Typography>(a) Cough</Typography>
                <CheckboxGroup
                  control={control}
                  name="cvs"
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  control={control}
                  name="Abdominal_pain"
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
                <GroupedRadio
                  options={["Yes", "No"]}
                  control={control}
                  name="Abdominal_swelling"
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  control={control}
                  name="Diarrhea"
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  control={control}
                  name="Nausea"
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  control={control}
                  name="Vomitting"
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  name="Constipation"
                  control={control}
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

                <CheckboxGroup
                  name="Urinary"
                  row
                  control={control}
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  name="Headache"
                  control={control}
                />

                <CheckboxGroup
                  name="Headache_info"
                  row
                  control={control}
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  control={control}
                  name="Neck_pain"
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  control={control}
                  name="Neck_Stiffness"
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  name="Vertigo"
                  control={control}
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  name="Dizziness"
                  control={control}
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  name="Fainting_spells"
                  control={control}
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  name="Akward_Gait"
                  control={control}
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  name="Weakness_Upper_Limbs"
                  control={control}
                />

                <CheckboxGroup
                  name="Weakness_Upper_Limbs_side"
                  row
                  control={control}
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  name="Weakness_Lower_Limbs"
                  control={control}
                />

                <CheckboxGroup
                  name="Weakness_Lower_Limbs_side"
                  row
                  control={control}
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  name="Eye_pain"
                  control={control}
                />
                <CheckboxGroup
                  name="Eye_pain_side"
                  options={["Right", "Left", "Both"]}
                  row
                  control={control}
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  name="Eye_discharge"
                  control={control}
                />
                <CheckboxGroup
                  name="Eye_discharge_side"
                  row
                  control={control}
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  name="Eye_swelling"
                  control={control}
                />
                <CheckboxGroup
                  name="Eye_swelling_side"
                  row
                  control={control}
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  name="Ear_pain"
                  control={control}
                />
                <CheckboxGroup
                  name="Ear_pain_side"
                  row
                  control={control}
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  name="Ear_Discharge"
                  control={control}
                />
                <CheckboxGroup
                  name="Ear_Discharge_side"
                  row
                  control={control}
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

                <CheckboxGroup
                  name="other_ENT"
                  row
                  control={control}
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

              <CheckboxGroup
                name="Endocrinology"
                row
                control={control}
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

                <GroupedRadio
                  control={control}
                  options={["Yes", "No"]}
                  name="Previous_surgery"
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  control={control}
                  name="Previous_admission"
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  control={control}
                  name="Blood_transfusion"
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  control={control}
                  name="Diabetes"
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

                <GroupedRadio
                  control={control}
                  name="Hypertension"
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  control={control}
                  name="Sickcle_cell_disease"
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  name="Peptic_Ulcer"
                  control={control}
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  name="Seizure"
                  control={control}
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  control={control}
                  name="Pregnancy_term"
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

                <GroupedRadio
                  options={[
                    "Spontenous varginal delivery",
                    "Elective Sureqery",
                    "Emergency Surgery",
                  ]}
                  control={control}
                  name="Birth"
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  control={control}
                  name="Birth_Cry"
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  control={control}
                  name="Neonatal_admission"
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

                  <GroupedRadio
                    register={register("phototherapy")}
                    options={["Yes", "No"]}
                    name="phototherapy"
                    control={control}
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

                  <GroupedRadio
                    options={["Yes", "No"]}
                    name="Exchange_blood_transfusion"
                    control={control}
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

                  <GroupedRadio
                    options={["Yes", "No"]}
                    name="Received_Oxygen"
                    control={control}
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  control={control}
                  name="Exclusive_Breastfed"
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  control={control}
                  name="Fully_vacinated"
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  name="BCG_Scar"
                  control={control}
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

                <GroupedRadio
                  name="Vaccination_history"
                  options={["caregiver's report", "child health card"]}
                  control={control}
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  control={control}
                  name="Delayed_milestones"
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

                <GroupedRadio
                  options={["Yes", "No"]}
                  name="Pallor"
                  control={control}
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

                <GroupedRadio
                  register={register("Febrile")}
                  options={["Yes", "No"]}
                  control={control}
                  name="Febrile"
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

                <GroupedRadio
                  register={register("Cyanosed")}
                  options={["Yes", "No"]}
                  control={control}
                  name="Cyanosed"
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

                <GroupedRadio
                  register={register("Icteric")}
                  options={["Yes", "No"]}
                  control={control}
                  name="Icteric"
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

                <GroupedRadio
                  register={register("Lyphm_node_enlargement")}
                  options={["Yes", "No"]}
                  control={control}
                  name="Lyphm_node_enlargement"
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

                <GroupedRadio
                  register={register("Temperature")}
                  options={["Yes", "No"]}
                  control={control}
                  name="Temperature"
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

                <GroupedRadio
                  register={register("Pedal_edema")}
                  options={["Yes", "No"]}
                  control={control}
                  name="Pedal_edema"
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

                <GroupedRadio
                  register={register("Fast_breathing")}
                  options={["Yes", "No"]}
                  control={control}
                  name="Fast_breathing"
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

                <GroupedRadio
                  register={register("Dyspneic")}
                  options={["Yes", "No"]}
                  control={control}
                  name="Dyspneic"
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

                <GroupedRadio
                  register={register("Respiratory_distress")}
                  options={["Yes", "No"]}
                  control={control}
                  name="Respiratory_distress"
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

                <GroupedRadio
                  register={register("Lower_chest_wall_indrawing")}
                  options={["Yes", "No"]}
                  control={control}
                  name="Lower_chest_wall_indrawing"
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

                <GroupedRadio
                  register={register("Audible_wheeze")}
                  options={["Yes", "No"]}
                  control={control}
                  name="Audible_wheeze"
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

                <GroupedRadio
                  register={register("Chest_symetrical")}
                  options={["Yes", "No"]}
                  control={control}
                  name="Chest_symetrical"
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

                <GroupedRadio
                  register={register("Equal_chest_expansion")}
                  options={["Yes", "No"]}
                  control={control}
                  name="Equal_chest_expansion"
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

                <GroupedRadio
                  register={register("Trachea_central")}
                  options={["Yes", "No"]}
                  control={control}
                  name="Trachea_central"
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

                <GroupedRadio
                  register={register("Percussion_note")}
                  options={["dull", "resonant", "hyper-resonant"]}
                  control={control}
                  name="Percussion_note"
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
                <GroupedRadio
                  title="Crackles"
                  register={register("Ausc_Crackles")}
                  options={["Yes", "No"]}
                  control={control}
                  name="Ausc_Crackles"
                />
                <Input
                  register={register("Ausc_Crackles_detail")}
                  type="text"
                  label="Crackles detail"
                />
              </Box>

              <Box>
                <GroupedRadio
                  title="Stridor"
                  register={register("Ausc_Stridor")}
                  options={["Yes", "No"]}
                  control={control}
                  name="Ausc_Stridor"
                />
                <Input
                  register={register("Ausc_Stridor_detail")}
                  name="text"
                  type="text"
                  label="Stridor detail"
                />
              </Box>

              <Box>
                <GroupedRadio
                  title="Wheeze"
                  register={register("Ausc_Wheeze")}
                  options={["Yes", "No"]}
                  control={control}
                  name="Ausc_Wheeze"
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

                <CheckboxGroup
                  name="Pulse_Character"
                  row
                  control={control}
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
                <GroupedRadio
                  register={register("Jugular_Vein_distended")}
                  options={["Yes", "No"]}
                  control={control}
                  name="Jugular_Vein_distended"
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

                <GroupedRadio
                  register={register("Precordium_hyperactive")}
                  options={["Yes", "No"]}
                  control={control}
                  name="Precordium_hyperactive"
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

                <GroupedRadio
                  register={register("Apex_beat_displaced")}
                  options={["Yes", "No"]}
                  control={control}
                  name="Apex_beat_displaced"
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

                <GroupedRadio
                  register={register("Apex_beat_located")}
                  options={["Yes", "No"]}
                  control={control}
                  name="Apex_beat_located"
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

                <GroupedRadio
                  register={register("Thrills")}
                  options={["Yes", "No"]}
                  control={control}
                  name="Thrills"
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
                <CheckboxGroup
                  name="Heart_Sound"
                  row
                  control={control}
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

                <GroupedRadio
                  register={register("Murmur")}
                  options={["Yes", "No"]}
                  control={control}
                  name="Murmur"
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
                <CheckboxGroup
                  name="Abdomen"
                  row
                  control={control}
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

                <GroupedRadio
                  register={register("Abdominal_tenderness")}
                  options={["Yes", "No"]}
                  control={control}
                  name="Abdominal_tenderness"
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
                <GroupedRadio
                  register={register("Liver_enlarged")}
                  options={["Yes", "No"]}
                  control={control}
                  name="Liver_enlarged"
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
                <GroupedRadio
                  register={register("Kidney_enlarged")}
                  options={["Yes", "No"]}
                  control={control}
                  name="Kidney_enlarged"
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

                <GroupedRadio
                  register={register("Spleen_enlarged")}
                  options={["Yes", "No"]}
                  control={control}
                  name="Spleen_enlarged"
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
                <GroupedRadio
                  register={register("Bowel_Sound")}
                  options={[
                    "Normal",
                    "Absent",
                    "Hyperactive",
                    "Reduced or Hypoactive",
                  ]}
                  control={control}
                  name="Bowel_Sound"
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
                onClick={() => setConfirmationDialog(true)}
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
