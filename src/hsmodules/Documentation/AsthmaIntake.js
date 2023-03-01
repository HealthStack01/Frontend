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
import {Box} from "@mui/system";
import {Collapse, Grid, IconButton, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Input from "../../components/inputs/basic/Input";
// import Button from "../../components/buttons/Button";
import Textarea from "../../components/inputs/basic/Textarea";
import MuiCustomDatePicker from "../../components/inputs/Date/MuiDatePicker";
import RadioButton from "../../components/inputs/basic/Radio";
import {FormsHeaderText} from "../../components/texts";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import CustomTable from "../../components/customtable";
import RefInput from "../../components/inputs/basic/Input/ref-input";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";

export default function AsthmaIntake() {
  const {register, handleSubmit, setValue, getValues, watch, control, reset} =
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
  const [dataset, setDataset] = useState();
  const {state, setState} = useContext(ObjectContext);
  const [docStatus, setDocStatus] = useState("Draft");
  const [confirmDialog, setConfirmDialog] = useState(false);

  const allergineInputRef = useRef(null);
  const reactionInputRef = useRef(null);

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  const formValues = getValues();

  useEffect(() => {
    if (!!draftDoc && draftDoc.status === "Draft") {
      console.log(draftDoc);
      reset(draftDoc.documentdetail);
      // Object.entries(draftDoc.documentdetail).map(([keys, value], i) =>
      //   setValue(keys, value, {
      //     shouldValidate: true,
      //     shouldDirty: true,
      //   })
      // );
      //setSymptoms(draftDoc.documentdetail.Presenting_Complaints);
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
    }
  });

  const onSubmitTest = (data, e) => {
    e.preventDefault();

    console.log(data);
    console.log(formValues);
  };

  const onSubmit = (data, e) => {
    e.preventDefault();

    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    //console.log(data)
    data.Allergy_Skin_Test = allergies;

    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentname = "Adult Asthma Questionnaire"; //"Lab Result"
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

    //return console.log(data);

    // let confirm = window.confirm(
    //   `You are about to save this document ${document.documentname} ?`
    // );
    // if (confirm) {
    if (!!draftDoc && draftDoc.status === "Draft") {
      ClientServ.patch(draftDoc._id, document)
        .then(res => {
          //console.log(JSON.stringify(res))
          Object.keys(data).forEach(key => {
            data[key] = "";
          });
          setAllergies([]);
          /*  setMessage("Created Client successfully") */
          setSuccess(true);
          toast.success("Adult Asthma Questionnaire updated succesfully");
          setSuccess(false);
          reset(data);
          setValue("Date", null);
          setValue("DOB", null);
          setConfirmDialog(false);
        })
        .catch(err => {
          toast.error("Error updating Adult Asthma Questionnaire " + err);
        });
    } else {
      ClientServ.create(document)
        .then(res => {
          Object.keys(data).forEach(key => {
            data[key] = "";
          });
          //console.log(JSON.stringify(res))

          setAllergies([]);
          /*  setMessage("Created Client successfully") */
          setSuccess(true);
          toast.success("Adult Asthma Questionnaire created succesfully");
          setSuccess(false);
          reset(data);
          setValue("Date", null);
          setValue("DOB", null);
          setConfirmDialog(false);
        })
        .catch(err => {
          toast.error("Error creating Adult Asthma Questionnaire " + err);
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

  const handleChangeType = async e => {
    // await setAppointment_type(e.target.value)
    console.log(e);
  };

  const handleChangeStatus = async e => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
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

  const removeAllergy = index => {
    setAllergies(prev => prev.filter((el, i) => i !== index));
  };

  //USE THIS TO SHOW OTHER RACES INPUT WHEN USER SELECT OTHERS// CAN BE IMPLEMENTED FOR SIMILAR RADIO INPUTS TOO
  const selectedRace = watch("Race", "Others");
  const selectedEducation = watch("Education", "Others (specify...)");
  const otherCough = watch("Cough_other", "Yes");
  const selectedWheez = watch("Wheeze_other", "Yes");
  const selectedShortness = watch("Shortness_other", "Yes");
  const selectedTightness = watch("Tightness_other", "Yes");
  const selectedInhaler = watch("Other_Medication", "Yes");
  const nearOtherAnimals = watch("being_near_other_animals", "Yes");

  const allergiesSchema = [
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

    {
      name: "Action",
      key: "reaction",
      description: "Enter Allergy",
      selector: (row, i) => (
        <DeleteOutlineIcon
          fontSize="small"
          sx={{color: "red"}}
          onClick={() => removeAllergy(i)}
        />
      ),
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
  ];

  const closeEncounterRight = async () => {
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
      <Box sx={{width: "100%"}}>
        <CustomConfirmationDialog
          open={confirmDialog}
          cancelAction={() => setConfirmDialog(false)}
          confirmationAction={handleSubmit(onSubmit)}
          type="create"
          message="You're about to create an Adult Asthma Questionnaire Document"
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={1}
        >
          <FormsHeaderText text=" Adult Asthma Questionnaire" />

          <IconButton onClick={closeEncounterRight}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <form>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Input
                register={register("Name")}
                type="text"
                label="Name or Initials"
              />
            </Grid>

            <Grid item xs={12}>
              <MuiCustomDatePicker name="Date" label="Date" control={control} />
            </Grid>

            <Grid item xs={12}>
              <MuiCustomDatePicker
                label="Date of birth"
                name="DOB"
                control={control}
              />
            </Grid>

            <Grid item xs={12}>
              <RadioButton
                register={register("Gender")}
                title="4. Gender"
                options={["Male", "Female"]}
              />
            </Grid>

            <Grid item xs={12}>
              <Box>
                <RadioButton
                  register={register("Race")}
                  title="5. Race"
                  options={[
                    "African",
                    "Caucasian",
                    "Asian",
                    "Indian",
                    "Others",
                  ]}
                />

                <Collapse in={selectedRace === "Others"}>
                  <Box>
                    <Input
                      label="Other race"
                      register={register("Others_race")}
                      name="Others_race"
                      type="text"
                    />
                  </Box>
                </Collapse>
              </Box>
            </Grid>

            <Grid item sx={12}>
              <RadioButton
                register={register("Marital_Status")}
                title="6. Maritial Status"
                options={[
                  "Single",
                  "Married",
                  "Widowed",
                  "Divorced",
                  "Seperated",
                ]}
              />
            </Grid>

            <Grid item xs={12}>
              <Input
                label="Occupation"
                name="Occupation"
                type="text"
                register={register("Occupation")}
              />
            </Grid>

            <Grid item xs={12}>
              <Box>
                <RadioButton
                  register={register("Education")}
                  title="8. Level of Education"
                  options={[
                    "Uneducated",
                    "Primary School",
                    "Secondary School",
                    "Diploma /Degree",
                    "Others (specify...)",
                  ]}
                />

                <Collapse in={selectedEducation === "Others (specify...)"}>
                  <Box>
                    <Input
                      label="Other levl of Education"
                      register={register("others_education")}
                      name="others_education"
                      type="text"
                    />
                  </Box>
                </Collapse>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  color: "#0364FF",
                  textTransform: "uppercase",
                }}
              >
                Symptoms
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2">A. Cough</Typography>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{width: "100%"}}>
                <Box>
                  <RadioButton
                    register={register("Cough")}
                    title="9. Were you ever bothered, or are you currently bothered by a
                    cough?"
                    options={["Yes", "No", "Uncertain"]}
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{fontSize: "0.85rem"}}>
                    10. Has your cough been triggered by any of the following
                    conditions?
                  </Typography>
                  <RadioButton
                    register={register("Cough_exercise")}
                    title="(a) Exercise"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Cough_coldair")}
                    title="(b) Breathing cold air"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Cough_dust")}
                    title="(c) Breathing house dust"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Cough_mould")}
                    title="(d) Being in a mouldy, musty or damp place"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Cough_weather")}
                    title="(e) Change in weather"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Cough_cats")}
                    title="(f) Being near cats"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Cough_dogs")}
                    title="(g) Being near dogs"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Cough_otheranimal")}
                    title="(h) Being near any other animal (specify...)"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Cough_sleep")}
                    title="(i) During sleep at night"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Cough_aspirin")}
                    title="(j) Taking aspirin"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Cough_other")}
                    title="(k) Any other thing"
                    options={["Yes", "No"]}
                  />
                  <Collapse in={otherCough === "Yes"}>
                    <Box>
                      <Input
                        label="specify..."
                        register={register("specify..._cough_other")}
                        name="specify..._cough_other"
                        type="text"
                      />
                    </Box>
                  </Collapse>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1">B. Wheezing</Typography>
            </Grid>

            <Grid item xs={12}>
              <RadioButton
                register={register("Wheeze")}
                title="11. Has your chest ever sounded wheezy or whistling?"
                options={["Yes", "No", "Uncertain"]}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{fontSize: "0.85rem"}}>
                12. Have you ever had wheeze on exposure to any of the
                following?
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{width: "100%"}}>
            <Box>
              <Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_exercise")}
                    title="(a) Exercise"
                    options={["Yes", "No", "Uncertain"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_coldair")}
                    title="(b) Breathing cold air"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_dust")}
                    title="(c) Breathing house dust"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_mould")}
                    title="(d) Being in a mouldy, musty or damp place"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_weather")}
                    title="(e) Change in weather"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_cats")}
                    title="(f) Being near cats"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_dogs")}
                    title="(g) Being near dogs"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_otheranimal")}
                    title="(h) Being near any other animal (specify...)"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_sleep")}
                    title="(i) During sleep at night"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_aspirin")}
                    title="(j) Taking aspirin"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_other")}
                    title="((k) Any other thing"
                    options={["Yes", "No"]}
                  />
                  <Collapse in={selectedWheez === "Yes"}>
                    <Box>
                      <Input
                        label="specify..."
                        register={register("Wheeze_other")}
                        name="specify..._wheeze_other"
                        type="text"
                      />
                    </Box>
                  </Collapse>
                </Box>
              </Box>

              <Box sx={{width: "100%"}}>
                <Typography variant="subtitle1">
                  C. Shortness of breath
                </Typography>
                <Box>
                  <RadioButton
                    register={register("Shortness")}
                    title="13. Have you ever been bothered by shortness of breath when
                hurrying on flat ground or walking up a slight hill?"
                    options={["Yes", "No", "Uncertain"]}
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle2">
                    14. Have you ever had shortness of breath with exposure to
                    any of the following circumstances?
                  </Typography>
                  <RadioButton
                    register={register("Shortness_exercise")}
                    title="(a) Exercise"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Shortness_coldair")}
                    title="(b) Breathing cold air"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Shortness_dust")}
                    title="(c) Breathing house dust"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Shortness_mould")}
                    title="(d) Being in a mouldy, musty or damp place"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Shortness_weather")}
                    title="(e) Change in weather"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Shortness_cats")}
                    title="(f) Being near cats"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Shortness_dogs")}
                    title="(g) Being near dogs"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Shortness_otheranimal")}
                    title="(h) Being near any other animal (specify...)"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Shortness_sleep")}
                    title="(i) During sleep at night"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Shortness_aspirin")}
                    title="(j) Taking aspirin"
                    options={["Yes", "No"]}
                  />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Shortness_other")}
                    title="(k) Any other thing"
                    options={["Yes", "No"]}
                  />
                  <Collapse in={selectedShortness === "Yes"}>
                    <Box>
                      <Input
                        label="specify..."
                        register={register("specify..._Shortness_other")}
                        name="specify..._Shortness_other"
                        type="text"
                      />
                    </Box>
                  </Collapse>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{width: "100%"}}>
            <Typography varaint="subtitle1">D. Tightness in Chest</Typography>
            <Box>
              <RadioButton
                register={register("Tightness")}
                title="15. Have you ever been bothered by a tightness in your chest
                when hurrying on flat ground or walking up a slight hill?"
                options={["Yes", "No", "Uncertain"]}
              />
            </Box>
            <Box>
              <Typography variant="subtitle2">
                16. Have you ever had tightness in your chest with exposure to
                any of the following circumstances?
              </Typography>
              <RadioButton
                register={register("Tightness_exercise")}
                title="(a) Exercise"
                options={["Yes", "No"]}
              />
            </Box>
            <Box>
              <RadioButton
                register={register("Tightness_coldair")}
                title="(b) Breathing cold air"
                options={["Yes", "No"]}
              />
            </Box>
            <Box>
              <RadioButton
                register={register("Tightness_dust")}
                title="(c) Breathing house dust"
                options={["Yes", "No"]}
              />
            </Box>
            <Box>
              <RadioButton
                register={register("Tightness_mould")}
                title="(d) Being in a mouldy, musty or damp place"
                options={["Yes", "No"]}
              />
            </Box>
            <Box>
              <RadioButton
                register={register("Tightness_weather")}
                title="(e) Change in weather"
                options={["Yes", "No"]}
              />
            </Box>
            <Box>
              <RadioButton
                register={register("Tightness_cats")}
                title="(f) Being near cats"
                options={["Yes", "No"]}
              />
            </Box>
            <Box>
              <RadioButton
                register={register("Tightness_dogs")}
                title="(g) Being near dogs"
                options={["Yes", "No"]}
              />
            </Box>
            <Box>
              <RadioButton
                register={register("Tightness_otheranimal")}
                title="(h) Being near any other animal (specify...)"
                options={["Yes", "No"]}
              />
              <Collapse in={nearOtherAnimals === "Yes"}>
                <Box>
                  <Input
                    label="specify... Animal"
                    register={register("being_near_other_animals")}
                    type="text"
                  />
                </Box>
              </Collapse>
            </Box>
            <Box>
              <RadioButton
                register={register("Tightness_sleep")}
                title="(i) During sleep at night"
                options={["Yes", "No"]}
              />
            </Box>
            <Box>
              <RadioButton
                register={register("Tightness_aspirin")}
                title="(j) Taking aspirin"
                options={["Yes", "No"]}
              />
            </Box>
            <Box>
              <RadioButton
                register={register("Tightness_other")}
                title="(k) Any other thing"
                options={["Yes", "No"]}
              />
              <Collapse in={selectedTightness === "Yes"}>
                <Box>
                  <Input
                    label="specify..."
                    register={register("specify..._Tightness_other")}
                    name="specify..._Tightness_other"
                    type="text"
                  />
                </Box>
              </Collapse>
            </Box>
          </Box>
          <Box sx={{width: "100%"}}>
            <FormsHeaderText text="Athsma History" />
            <Box>
              <RadioButton
                register={register("Asthma")}
                title="17. Have you ever had asthma?"
                options={["Yes", "No"]}
              />
            </Box>
            <Box>
              <Typography variant="subtitle2">
                17b. When was your asthma diagnosed? (Age in years)
              </Typography>
              <Input
                register={register("age_diagnosis")}
                //name="Name"
                type="text"
                label="specify..."
              />
            </Box>
            <Box>
              <RadioButton
                register={register("Asthma_Confirmed")}
                title="17c. Was your asthma confirmed by a doctor?"
                options={["Yes", "No", "Not Sure"]}
              />
            </Box>
            <Box>
              <RadioButton
                register={register("Visit_Doctor")}
                title="17d. Have you ever needed to visit a doctor at least once a
                    year for your asthma?"
                options={["Yes", "No", "Not sure"]}
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" mb={1}>
                17e. During the last 12 months, how many times did you need to
                visit a doctor for your asthma
              </Typography>
              <Input
                register={register("times_visit")}
                //name="Name"
                type="text"
                label="specify..."
              />
            </Box>
            <Box>
              <RadioButton
                register={register("Casualty")}
                title="18. Have you ever needed to go to the Casualty Clinic
                    (Accident &Emergency Dept), doctor's office, because of an
                    asthma attack?"
                options={["Yes", "No", "Not Sure"]}
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" mb={1}>
                18b If yes to question 18a above, How many times in the last
                12months?
              </Typography>
              <Input
                register={register("times_12months")}
                //name="Name"
                type="text"
                label="specify..."
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" mb={1}>
                18c Have you ever been hospitalized overnight because of an
                asthmatic attack?
              </Typography>
              <Input
                register={register("Hospitalized")}
                //name="Name"
                type="text"
                label="specify..."
              />
            </Box>
            <Box sx={{width: "100%"}}>
              <Box>
                <RadioButton
                  register={register("Herbal")}
                  title="19. Have you ever taken herbal /local medication for your
                    asthma before?"
                  options={["Yes", "No", "Not Sure"]}
                />
              </Box>
            </Box>
            <Box sx={{width: "100%"}}>
              <Typography variant="subtitle2">
                20. Have you ever taken any of the following medications?
              </Typography>
              <RadioButton
                register={register("Bronchodilator_inhaler")}
                title="(a) Bronchodilator inhaler"
                options={["Yes", "No"]}
              />
              <Box>
                <RadioButton
                  register={register("Steroid_inhaler")}
                  title="(b) Steroid inhaler"
                  options={["Yes", "No"]}
                />
              </Box>
              <Box>
                <RadioButton
                  register={register("Bronchodilator_nebulised")}
                  title="(c) Bronchodilator nebulised"
                  options={["Yes", "No"]}
                />
                {/* <Collapse in={selectedTightness === "Others"}>
              <Box>
                <Input
                  label="specify..."
                  register={register("specify..._Tightness_other")}
                  name="specify..._Tightness_other"
                  type="text"
                />
              </Box>
            </Collapse> */}
              </Box>
              <Box>
                <RadioButton
                  register={register("Oral_steroid")}
                  title="(d) Oral steroid"
                  options={["Yes", "No"]}
                />
              </Box>
              <Box>
                <RadioButton
                  register={register("Oral_bronchodilators")}
                  title="(e) Oral bronchodilators"
                  options={["Yes", "No"]}
                />
              </Box>
              <Box>
                <RadioButton
                  register={register("Other_Medication")}
                  title="(f) Others"
                  options={["Yes", "No"]}
                />
                <Collapse in={selectedInhaler === "Yes"}>
                  <Box>
                    <Input
                      label="specify..."
                      register={register("specify..._other_medication")}
                      name="specify..._other_medication"
                      type="text"
                    />
                  </Box>
                </Collapse>
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography variant="subtitle2" mb={1}>
              21. During the last 12 months, how many times have you needed
              steroids by mouth or injection, such as prednisone
            </Typography>
            <Box>
              <Input
                label="specify..."
                register={register("input_name")}
                name="specify..._other_medication"
                type="text"
              />
            </Box>
          </Box>

          <Box>
            <Box>
              <RadioButton
                title="22. Have you ever smoked cigarette? (Yes means more than 2
              cigarette in a week for a year)"
                register={register("Smoked")}
                options={["No", "Yes(in the past)", "Yes(Currently)"]}
              />
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2">23. Other Symptoms</Typography>
            <Typography variant="subtitle2" sx={{color: "#0364FF"}}>
              RESPIRATION
            </Typography>
            <Box>
              <RadioButton
                title="Chest pain"
                register={register("Chest_pain")}
                options={["Yes", "No"]}
              />
            </Box>
            <Box>
              <RadioButton
                title="Haemoptysis"
                register={register("Haemoptysis")}
                options={["Yes", "No"]}
              />
            </Box>

            <Box>
              <RadioButton
                title="Sputum production"
                register={register("Sputum")}
                options={["Yes", "No"]}
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{color: "#0364FF"}}>
                CARDIOVASCULAR
              </Typography>

              <RadioButton
                title="Dyspnoea on exertion"
                register={register("Dyspnoea_on_exertion")}
                options={["Yes", "No"]}
              />
            </Box>
            <Box>
              <RadioButton
                title="Palpitation"
                register={register("Palpitation")}
                options={["Yes", "No"]}
              />
            </Box>

            <Box>
              <RadioButton
                title="Orthopnoea"
                register={register("Orthopnoea")}
                options={["Yes", "No"]}
              />
            </Box>
            <Box>
              <RadioButton
                title=" Paroxysmal Nocturnal Dyspnoea"
                register={register("Paroxysmal_Nocturnal_Dyspnoea")}
                options={["Yes", "No"]}
              />
            </Box>

            <Box>
              <RadioButton
                title="Leg Swelling"
                register={register("Leg_Swelling")}
                options={["Yes", "No"]}
              />
            </Box>

            <FormsHeaderText text="GASTROINTESTINAL" />

            <Box>
              <RadioButton
                title="Nausea"
                register={register("input_name")}
                options={["Yes", "No"]}
              />
            </Box>

            <Box>
              <RadioButton
                title="Vomiting"
                register={register("Vomiting")}
                options={["Yes", "No"]}
              />
            </Box>

            <Box>
              <RadioButton
                title="Abdominal pain"
                register={register("Abdominal_Pain")}
                options={["Yes", "No"]}
              />
            </Box>

            <Box>
              <RadioButton
                title="Abdominal swelling"
                register={register("Abdominal_swelling")}
                options={["Yes", "No"]}
              />
            </Box>

            <Box>
              <RadioButton
                title="Diarrhoea"
                register={register("Diarrhoea")}
                options={["Yes", "No"]}
              />
            </Box>

            <Box>
              <RadioButton
                title="Constipation"
                register={register("Constipation")}
                options={["Yes", "No"]}
              />
            </Box>

            <FormsHeaderText text="GENITOURINARY" />

            <Box>
              <RadioButton
                title="Dysuria"
                register={register("Dysuria")}
                options={["Yes", "No"]}
              />
            </Box>

            <Box>
              <RadioButton
                title="Urge incontinence"
                register={register("Urge_incontinence")}
                options={["Yes", "No"]}
              />
            </Box>

            <Box>
              <RadioButton
                title="Terminal dribbling"
                register={register("Terminal_dribbling")}
                options={["Yes", "No"]}
              />
            </Box>

            <Box>
              <RadioButton
                title="Haematuria"
                register={register("Haematuria")}
                options={["Yes", "No"]}
              />
            </Box>

            <FormsHeaderText text="CENTRAL NERVOUS SYSTEM " />

            <Box>
              <RadioButton
                title="Headache"
                register={register("Headache")}
                options={["Yes", "No"]}
              />
            </Box>

            <Box>
              <RadioButton
                title="Dizziness"
                register={register("Dizziness")}
                options={["Yes", "No"]}
              />
            </Box>

            <Box>
              <RadioButton
                title="Seizures"
                register={register("Seizures")}
                options={["Yes", "No"]}
              />
            </Box>

            <Box>
              <RadioButton
                title="Tremors"
                register={register("Tremors")}
                options={["Yes", "No"]}
              />
            </Box>

            <FormsHeaderText text="ENDOCRINE" />

            <Box>
              <RadioButton
                title="Polyuria"
                register={register("Polyuria")}
                options={["Yes", "No"]}
              />
            </Box>

            <Box>
              <RadioButton
                title="Polydipsia"
                register={register("Polydipsia")}
                options={["Yes", "No"]}
              />
            </Box>

            <Box>
              <RadioButton
                title="Polyphagia"
                register={register("Polyphagia")}
                options={["Yes", "No"]}
              />
            </Box>

            <Box>
              <RadioButton
                title="Weight loss"
                register={register("Weight_loss")}
                options={["Yes", "No"]}
              />
            </Box>

            <Box>
              <RadioButton
                title="Abnormal Weight gain"
                register={register("Abnormal_Weight_gain")}
                options={["Yes", "No"]}
              />
            </Box>

            <Box>
              <RadioButton
                title="Heat intolerance"
                register={register("Heat_intolerance")}
                options={["Yes", "No"]}
              />
            </Box>

            <Box>
              <RadioButton
                title="Cold intolerance"
                register={register("Cold_intolerance")}
                options={["Yes", "No"]}
              />
            </Box>

            <FormsHeaderText text="ENT" />

            <Box>
              <RadioButton
                title="Ear ache"
                register={register("Ear_ache")}
                options={["Yes", "No"]}
              />
            </Box>

            <Box>
              <RadioButton
                title="Ear Discharges"
                register={register("Ear_Discharges")}
                options={["Yes", "No"]}
              />
            </Box>

            <Box>
              <RadioButton
                title="Snoring"
                register={register("Snoring")}
                options={["Yes", "No"]}
              />
            </Box>

            <Box>
              <RadioButton
                title="Dysphagia"
                register={register("Dysphagia")}
                options={["Yes", "No"]}
              />
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle1" mb={1}>
              24. Physical Examination
            </Typography>
          </Box>

          <Box mb={1}>
            <Input
              label="Height (CM)"
              register={register("height")}
              name="height"
              type="text"
            />
          </Box>

          <Box>
            <Input
              label="Weight (KG)"
              register={register("weight")}
              name="weight"
              type="text"
            />
          </Box>

          <Box>
            <RadioButton
              title="Palour"
              register={register("Palour")}
              options={["Yes", "No"]}
            />
          </Box>
          <Box>
            <RadioButton
              title="Jaundice"
              register={register("Jaundice")}
              options={["Yes", "No"]}
            />
          </Box>
          <Box>
            <RadioButton
              title="Cyanosis"
              register={register("Cyanosis")}
              options={["Yes", "No"]}
            />
          </Box>

          <Box mb={1}>
            <Input
              label="Pulse (beats/min)"
              register={register("Pulse")}
              type="text"
            />
          </Box>

          <Box mb={1}>
            <Input
              label="Blood Pressure (mmHg)"
              register={register("Blood_pressure")}
              type="text"
            />
          </Box>

          <Box mb={1}>
            <Textarea
              label="Other Cardiovascular system findings"
              placeholder="specify..."
              register={register("Cardiovascular_findings")}
              name="respiraatory_rate"
              type="text"
            />
          </Box>

          <Box mb={1}>
            <Input
              label="Respiratory rate"
              placeholder="specify..."
              register={register("Respiratory_rate")}
              name="respiraatory_rate"
              type="text"
            />
          </Box>

          <Box mb={1}>
            <Input
              label="Oxygen Saturation"
              placeholder="specify..."
              register={register("oxygen_saturation")}
              type="text"
            />
          </Box>

          <Box>
            <RadioButton
              title="Wheeze"
              register={register("wheeze_finding")}
              options={["Yes", "No"]}
            />
          </Box>

          <Box>
            <RadioButton
              title="Crackles"
              register={register("Crackles")}
              options={["Yes", "No"]}
            />
          </Box>

          <Box mb={1}>
            <Textarea
              label="Other Respirtory findings"
              placeholder="specify..."
              register={register("respiratory_findings")}
              type="text"
            />
          </Box>

          <Box>
            <RadioButton
              title="Urticaria"
              register={register("urticaria")}
              options={["Yes", "No"]}
            />
          </Box>
          <Box>
            <RadioButton
              title="Rash"
              register={register("rash")}
              options={["Yes", "No"]}
            />
          </Box>

          <Box>
            <RadioButton
              title="Hypopigmentation"
              register={register("hypopigmentation")}
              options={["Yes", "No"]}
            />
          </Box>

          <Box>
            <RadioButton
              title="Hyperpigmentation"
              register={register("hyperpigmentation")}
              options={["Yes", "No"]}
            />
          </Box>

          <Box>
            <Box>
              <Textarea
                label="Other skin findings"
                placeholder="specify..."
                register={register("skin_findings")}
                name="respiraatory_rate"
                type="text"
              />
            </Box>

            <Box>
              <RadioButton
                title="Hepatomegaly"
                register={register("hepatomegaly")}
                options={["Yes", "No"]}
              />
            </Box>
            <Box>
              <RadioButton
                title="Splenomegaly"
                register={register("splenomegaly")}
                options={["Yes", "No"]}
              />
            </Box>
            <Box>
              <RadioButton
                title="Ascites"
                register={register("ascites")}
                options={["Yes", "No"]}
              />
            </Box>
            <Box>
              <Box mb={1}>
                <Textarea
                  label="Other GIT findings"
                  placeholder="specify..."
                  register={register("GIT_findings")}
                  type="text"
                />
              </Box>

              <Box>
                <Box>
                  <Textarea
                    label="Other Physical examination findings"
                    placeholder="specify..."
                    register={register("physical_exam_findings")}
                    type="text"
                  />
                </Box>

                <FormsHeaderText text="Investigations" />

                <Box>
                  <Grid container spacing={1} mb={1}>
                    <Grid item xs={3}>
                      <Typography>CBC</Typography>
                    </Grid>

                    <Grid item xs={4.5}>
                      <Typography>ABSOLUTE</Typography>
                    </Grid>

                    <Grid item xs={4.5}>
                      <Typography>PERCENTAGE</Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={1} mb={1}>
                    <Grid item xs={3}>
                      <Typography
                        sx={{
                          fontSize: "0.8rem",
                        }}
                      >
                        PVC
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
              </Box>
            </Box>

            {/* <Box>
              <FormsHeaderText text="SPIROMETRY" />
            </Box> */}

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
              inputRef={allergineInputRef}
              name="allergine"
              type="text"
            />
          </Box>

          <Box mb={1}>
            <RefInput
              label="Reaction"
              placeholder="specify..."
              inputRef={reactionInputRef}
              name="reaction"
              type="text"
            />
          </Box>

          <Box>
            <CustomTable
              title={""}
              columns={allergiesSchema}
              data={allergies}
              pointerOnHover
              highlightOnHover
              striped
              CustomEmptyData="No Allergy added yet..."
              //conditionalRowStyles={conditionalRowStyles}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2">SERUM IGE LEVEL</Typography>
            <Box>
              <Input
                placeholder="specify..."
                register={register("IGE_Level")}
                type="text"
              />
            </Box>
          </Box>
          <Box>
            <Typography variant="subtitle2">
              FRACTION EXHALED NITRIC OXIDE (FeNO)
            </Typography>
            <Box>
              <Input
                placeholder="specify..."
                register={register("FeNo")}
                type="text"
              />
            </Box>
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
              onClick={() => setConfirmDialog(true)}
            >
              Submit Athsma Questionnaire
            </GlobalCustomButton>
          </Box>
        </form>
      </Box>
    </>
  );
}
