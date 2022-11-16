import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
import {DocumentClassList} from "./DocumentClass";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {Box, getValue} from "@mui/system";
import {Button, Collapse, Grid, IconButton, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Input from "../../components/inputs/basic/Input";
// import Button from "../../components/buttons/Button";
import Textarea from "../../components/inputs/basic/Textarea";
import MuiCustomDatePicker from "../../components/inputs/Date/MuiDatePicker";
import RadioButton from "../../components/inputs/basic/Radio";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function AsthmaIntake() {
  const {register, handleSubmit, setValue, getValues, watch} = useForm(); //, watch, errors, reset
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
  const {state} = useContext(ObjectContext);
  const [docStatus, setDocStatus] = useState("Draft");

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  const formValues = getValues();

  useEffect(() => {
    if (!!draftDoc && draftDoc.status === "Draft") {
      Object.entries(draftDoc.documentdetail).map(([keys, value], i) =>
        setValue(keys, value, {
          shouldValidate: true,
          shouldDirty: true,
        })
      );
      // setSymptoms(draftDoc.documentdetail.Presenting_Complaints)
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
            /*  setMessage("Created Client successfully") */
            setSuccess(true);
            toast({
              message: "Adult Asthma Questionnaire updated succesfully",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
            });
            setSuccess(false);
          })
          .catch(err => {
            toast({
              message: "Error updating Adult Asthma Questionnaire " + err,
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
            /*  setMessage("Created Client successfully") */
            setSuccess(true);
            toast({
              message: "Adult Asthma Questionnaire created succesfully",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
            });
            setSuccess(false);
          })
          .catch(err => {
            toast({
              message: "Error creating Adult Asthma Questionnaire " + err,
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
    let allergy = {
      allergine: allergine,
      reaction: reaction,
    };
    setAllergies(prev => [...prev, allergy]);
    setAllergy({});
    setReaction("");
    setAllergine("");
  };

  //USE THIS TO SHOW OTHER RACES INPUT WHEN USER SELECT OTHERS// CAN BE IMPLEMENTED FOR SIMILAR RADIO INPUTS TOO
  const selectedRace = watch("Race", "Others");
  const selectedEducation = watch("Education", "Others (Specify)");
  const selectedCough = watch("Cough_other", "Others");
  const selectedWheez = watch("Wheeze_other", "Others");
  const selectedShortness = watch("Shortness_other", "Others");
  const selectedTightness = watch("Tightness_other", "Others");
  const selectedInhaler = watch("Other_Medication", "Others");

  return (
    <>
      <Box sx={{width: "100%"}}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography>Adult Asthma Questionnaire</Typography>
          <IconButton>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit(onSubmitTest)}>
          <Grid>
            <Input
              register={register("Name")}
              //name="Name"
              type="text"
              label="Name or Initials"
            />
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <MuiCustomDatePicker label="Date" register={register("Date")} />
            </Grid>

            <Grid item xs={6}>
              <MuiCustomDatePicker
                label="Date of birth"
                register={register("DOB")}
              />
            </Grid>
          </Grid>

          <Box>
            <RadioButton
              register={register("Gender")}
              title="4. Gender"
              options={["Male", "Female"]}
            />
          </Box>

          <Box>
            <RadioButton
              register={register("Race")}
              title="5. Race"
              options={["African", "Caucasian", "Asian", "Indian", "Others"]}
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

          <Box>
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
          </Box>

          <Box>
            <Input
              label="Occupation"
              name="Occupation"
              type="text"
              register={register("Occupation")}
            />
          </Box>

          <Box>
            <RadioButton
              register={register("Education")}
              title="8. Level of Education"
              options={[
                "Uneducated",
                "Primary School",
                "Secondary School",
                "Diploma /Degree",
                "Others (Specify)",
              ]}
            />

            <Collapse in={selectedEducation === "Others (Specify)"}>
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
          <Box sx={{
            marginBlock: "1rem"
          }}> 
          <Button variant="contained" type="submit">Submit</Button>
  </Box>   
        </form>
      </Box>

      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Adult Asthma Questionnaire</p>
        </div>
        <div className="card-content vscrollable remPad1">
          {/*   <label className="label is-size-7">
                  Client:  {order.orderInfo.orderObj.clientname}
                </label>
                <label className="label is-size-7">
                 Test:  {order.serviceInfo.name}
                </label> */}
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}
          <form>
            {/* <div className="field">
              <p className="control ">
                <input
                  className="input is-small"
                  // {...register("input_name")}
                  name="Date"
                  type="text"
                  placeholder="Date"
                />
              </p>
            </div>
            <div className="field">
              <p className="control ">
                <input
                  className="input is-small"
                  //{...register("input_name")}
                  name="Name"
                  type="text"
                  placeholder="Name or Initials"
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
                  placeholder="Date of Birth"
                />
              </p>
            </div>
            <div className="field">
              <label>4. Gender</label>
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
              <label>5. Race</label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Race"
                  value="African"
                  onChange={e => {
                    handleChangePart(e);
                  }}
                />
                <span> African</span>
              </label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Race"
                  value="Caucasian"
                  onChange={e => handleChangePart(e)}
                />
                <span>Caucasian</span>
              </label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Race"
                  value="Indian"
                  onChange={e => handleChangePart(e)}
                />
                <span>Indian </span>
              </label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Race"
                  value="Others"
                  onChange={e => handleChangePart(e)}
                />
                <span>Others </span>
              </label>
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="Others_race"
                  type="text"
                  placeholder="Highest Level of Education"
                />
              </p>
            </div> */}

            {/* ******************* START FROM BELOW TO CONTINUE **************** */}

            {/* <div className="field">
            <div className="field">

              <label>6. Marital Status</label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Marital_Status"
                  value="Single"
                  onChange={e => {
                    handleChangePart(e);
                  }}
                />
                <span> Single</span>
              </label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Marital_Status"
                  value="Married"
                  onChange={e => handleChangePart(e)}
                />
                <span>Married</span>
              </label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Marital_Status"
                  value="Widowed"
                  onChange={e => handleChangePart(e)}
                />
                <span>Widowed </span>
              </label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Marital_Status"
                  value="Divorced"
                  onChange={e => handleChangePart(e)}
                />
                <span>Divorced </span>
              </label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Marital_Status"
                  value="Separated"
                  onChange={e => handleChangePart(e)}
                />
                <span>Separated </span>
              </label>
            </div>
            <div className="field">
              <p className="control ">
                <input className="input is-small" {...register("input_name")} />
              </p>
            </div>
            <div className="field ">
              <label>8. Highest Level of Education</label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Education"
                  value="Uneducated"
                  onChange={e => {
                    handleChangePart(e);
                  }}
                />
                <span> Uneducated</span>
              </label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Education"
                  value="Primary School"
                  onChange={e => handleChangePart(e)}
                />
                <span>Primary School</span>
              </label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Education"
                  value="Secondary School"
                  onChange={e => handleChangePart(e)}
                />
                <span>Secondary School </span>
              </label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Education"
                  value="Post-Secondary School (Diploma /Degree)"
                  onChange={e => handleChangePart(e)}
                />
                <span>Post-Secondary School (Diploma /Degree) </span>
              </label>
              <label className=" is-small ml-2">
                <input
                  type="radio"
                  {...register("input_name")}
                  name="Education"
                  value="Others"
                  onChange={e => handleChangePart(e)}
                />
                <span>Others (Specify) </span>
              </label>
              <p className="control ">
                <input
                  className="input is-small"
                  {...register("input_name")}
                  name="others_education"
                  type="text"
                  placeholder="Highest Level of Education"
                />
              </p>
            </div> */}
            <Box sx={{width: "100%"}}>
              <Typography variant="subtitle1"><b>Symptoms</b></Typography>
              <Typography variant='subtitle2'>A. Cough</Typography>
              <Box>
                <RadioButton
                  register={register("Cough")}
                  title="9. Were you ever bothered, or are you currently bothered by a
                    cough?"
                  options={[
                    "Yes",
                    "No",
                    "Uncertain",
                  ]}
            />
              </Box>
              <Box>
                <Typography variant='subtitle1'>10. Has your cough been triggered by any of the following
                conditions?</Typography>
                <RadioButton
              register={register("Cough_exercise")}
              title="(a) Exercise"
              options={[
                "Yes",
                "No",
              ]}
            />
              </Box>
              <Box>
                <RadioButton
                  register={register("Cough_coldair")}
                  title="(b) Breathing cold air"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
              </Box>
              <Box>
                <RadioButton
                  register={register("Cough_dust")}
                  title="(c) Breathing house dust"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
              </Box>
              <Box>
                <RadioButton
                  register={register("Cough_mould")}
                  title="(d) Being in a mouldy, musty or damp place"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
              </Box>
              <Box>
                <RadioButton
                  register={register("Cough_weather")}
                  title="(e) Change in weather"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
              </Box>
              <Box>
                <RadioButton
                  register={register("Cough_cats")}
                  title="(f) Being near cats"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
              </Box>
              <Box>
                <RadioButton
                  register={register("Cough_dogs")}
                  title="(g) Being near dogs"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
              </Box>
              <Box>
                <RadioButton
                  register={register("Cough_otheranimal")}
                  title="(h) Being near any other animal (specify)"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
              </Box>
              <Box>
                <RadioButton
                  register={register("Cough_sleep")}
                  title="(i) During sleep at night"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
              </Box>
              <Box>
                <RadioButton
                  register={register("Cough_aspirin")}
                  title="(j) Taking aspirin"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
              </Box>
              <Box>
                <RadioButton
                  register={register("Cough_other")}
                  title="(k) Any other thing"
                  options={[
                    "Yes",
                    "No",
                    "Others"
                  ]}
                />
                <Collapse in={selectedCough === "Others"}>
                  <Box>
                    <Input
                      label="Specify"
                      register={register("specify_cough_other")}
                      name="specify_cough_other"
                      type="text"
                    />
                  </Box>
            </Collapse>
              </Box>
            </Box>
            <Box sx={{width: "100%"}}>
              <Box>
                  <Typography variant='subtitle1'>B. Wheezing</Typography>
                  <Box>
                  <RadioButton
                    register={register("Wheeze")}
                    title="11. Has your chest ever sounded wheezy or whistling?"
                    options={[
                      "Yes",
                      "No",
                      "Uncertain",
                    ]}
                />
                </Box>
                <Box>
                  <Typography variant='subtitle1'>12. Have you ever had wheeze on exposure to any of the
                following?</Typography>
                <Box>
                  <RadioButton
                    register={register("Wheeze_exercise")}
                    title="(a) Exercise"
                    options={[
                      "Yes",
                      "No",
                      "Uncertain",
                    ]}
                />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_coldair")}
                    title="(b) Breathing cold air"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_dust")}
                    title="(c) Breathing house dust"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_mould")}
                    title="(d) Being in a mouldy, musty or damp place"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_weather")}
                    title="(e) Change in weather"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_cats")}
                    title="(f) Being near cats"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_dogs")}
                    title="(g) Being near dogs"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_otheranimal")}
                    title="(h) Being near any other animal (specify)"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_sleep")}
                    title="(i) During sleep at night"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_aspirin")}
                    title="(j) Taking aspirin"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                </Box>
                <Box>
                  <RadioButton
                    register={register("Wheeze_other")}
                    title="((k) Any other thing"
                    options={[
                      "Yes",
                      "No",
                      "Other",
                    ]}
                />
                <Collapse in={selectedWheez === "Others"}>
              <Box>
                <Input
                  label="Specify"
                  register={register("Wheeze_other")}
                  name="specify_wheeze_other"
                  type="text"
                />
              </Box>
            </Collapse>
                </Box>
                </Box>
                <Box sx={{width: "100%"}}>
                    <Typography variant='subtitle1'>C. Shortness of breath</Typography>
                    <Box>
                      <RadioButton
                    register={register("Shortness")}
                    title="13. Have you ever been bothered by shortness of breath when
                hurrying on flat ground or walking up a slight hill?"
                    options={[
                      "Yes",
                      "No",
                      "Uncertain",
                    ]}
                />
                    </Box>
                    <Box>
                      <Typography variant='subtitle2'>14. Have you ever had shortness of breath with exposure to any
                of the following circumstances?</Typography>
                      <RadioButton
                    register={register("Shortness_exercise")}
                    title="(a) Exercise"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                    </Box>
                    <Box>
                      <RadioButton
                    register={register("Shortness_coldair")}
                    title="(b) Breathing cold air"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                    </Box>
                    <Box>
                      <RadioButton
                    register={register("Shortness_dust")}
                    title="(c) Breathing house dust"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                    </Box>
                    <Box>
                      <RadioButton
                    register={register("Shortness_mould")}
                    title="(d) Being in a mouldy, musty or damp place"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                    </Box>
                    <Box>
                      <RadioButton
                    register={register("Shortness_weather")}
                    title="(e) Change in weather"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                    </Box>
                    <Box>
                      <RadioButton
                    register={register("Shortness_cats")}
                    title="(f) Being near cats"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                    </Box>
                    <Box>
                      <RadioButton
                    register={register("Shortness_dogs")}
                    title="(g) Being near dogs"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                    </Box>
                    <Box>
                      <RadioButton
                    register={register("Shortness_otheranimal")}
                    title="(h) Being near any other animal (specify)"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                    </Box>
                    <Box>
                      <RadioButton
                    register={register("Shortness_sleep")}
                    title="(i) During sleep at night"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                    </Box>
                    <Box>
                      <RadioButton
                    register={register("Shortness_aspirin")}
                    title="(j) Taking aspirin"
                    options={[
                      "Yes",
                      "No",
                    ]}
                />
                    </Box>
                    <Box>
                      <RadioButton
                    register={register("Shortness_other")}
                    title="(k) Any other thing"
                    options={[
                      "Yes",
                      "No",
                      "Others"
                    ]}
                />
                <Collapse in={selectedShortness === "Others"}>
              <Box>
                <Input
                  label="Specify"
                  register={register("specify_Shortness_other")}
                  name="specify_Shortness_other"
                  type="text"
                />
              </Box>
            </Collapse>
                    </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{width: "100%"}}>
              <Typography varaint='subtitle1'>D. Tightness in Chest</Typography>
                <Box>
                  <RadioButton
                  register={register("Tightness")}
                  title="15. Have you ever been bothered by a tightness in your chest
                when hurrying on flat ground or walking up a slight hill?"
                  options={[
                    "Yes",
                    "No",
                    "Uncertain",
                  ]}
                />
                </Box>
                <Box>
                  <Typography variant='subtitle2'>16. Have you ever had tightness in your chest with exposure to
                any of the following circumstances?</Typography>
                  <RadioButton
                  register={register("Tightness_exercise")}
                  title="(a) Exercise"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Tightness_coldair")}
                  title="(b) Breathing cold air"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Tightness_dust")}
                  title="(c) Breathing house dust"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Tightness_mould")}
                  title="(d) Being in a mouldy, musty or damp place"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Tightness_weather")}
                  title="(e) Change in weather"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Tightness_cats")}
                  title="(f) Being near cats"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Tightness_dogs")}
                  title="(g) Being near dogs"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Tightness_otheranimal")}
                  title="(h) Being near any other animal (specify)"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Tightness_sleep")}
                  title="(i) During sleep at night"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Tightness_aspirin")}
                  title="(j) Taking aspirin"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Tightness_other")}
                  title="(k) Any other thing"
                  options={[
                    "Yes",
                    "No",
                    "Other"
                  ]}
                />
                <Collapse in={selectedTightness === "Others"}>
              <Box>
                <Input
                  label="Specify"
                  register={register("specify_Tightness_other")}
                  name="specify_Tightness_other"
                  type="text"
                />
              </Box>
            </Collapse>
                </Box>
            </Box>
            <Box sx={{width: "100%"}}>
                  <Typography varaint='subtitle1'>Asthma History</Typography>
                  <Box>
                  <RadioButton
                  register={register("Asthma")}
                  title="17. Have you ever had asthma?"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <Typography variant='subtitle2'>17b. When was your asthma diagnosed? (Age in years)</Typography>
                    <Input
                  register={register("age_diagnosis")}
                  //name="Name"
                  type="text"
                  label="Specify"
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Asthma_Confirmed")}
                  title="17c. Was your asthma confirmed by a doctor?"
                  options={[
                    "Yes",
                    "No",
                    "Not Sure",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Visit_Doctor")}
                  title="17d. Have you ever needed to visit a doctor at least once a
                    year for your asthma?"
                  options={[
                    "Yes",
                    "No",
                    "Not sure",
                  ]}
                />
                </Box>
                <Box>
                  <Typography variant='subtitle1'>17e. During the last 12 months, how many times did you need
                    to visit a doctor for your asthma</Typography>
                   <Input
                  register={register("times_visit")}
                  //name="Name"
                  type="text"
                  label="Specify"
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Casualty")}
                  title="18. Have you ever needed to go to the Casualty Clinic
                    (Accident &Emergency Dept), doctor's office, because of an
                    asthma attack?"
                  options={[
                    "Yes",
                    "No",
                    "Not Sure",
                  ]}
                />
                </Box>
                <Box>
                  <Typography variant='subtitle1'>
                    18b If yes to question 18a above, How many times in the last 12months?
                  </Typography>
                 <Input
                  register={register("times_12months")}
                  //name="Name"
                  type="text"
                  label="Specify"
                />
                </Box>
                <Box>
                  <Typography variant='subtitle1'>18c Have you ever been hospitalized overnight because of an
                    asthmatic attack?</Typography>
                 <Input
                  register={register("Hospitalized")}
                  //name="Name"
                  type="text"
                  label="Specify"
                />
                </Box>
                <Box sx={{width: "100%"}}>
                  <Box>
                    <RadioButton
                    register={register("Herbal")}
                    title="19. Have you ever taken herbal /local medication for your
                    asthma before?"
                    options={[
                      "Yes",
                      "No",
                      "Not Sure",
                    ]}
                  />
                  </Box>

                </Box>
                <Box sx={{width: "100%"}}>
                  <Typography variant='subtitle1'>20. Have you ever taken any of the following medications?</Typography>
                  <RadioButton
                  register={register("Bronchodilator_inhaler")}
                  title="(a) Bronchodilator inhaler"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                <Box>
                  <RadioButton
                  register={register("Steroid_inhaler")}
                  title="(b) Steroid inhaler"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Bronchodilator_nebulised")}
                  title="(c) Bronchodilator nebulised"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                {/* <Collapse in={selectedTightness === "Others"}>
              <Box>
                <Input
                  label="Specify"
                  register={register("specify_Tightness_other")}
                  name="specify_Tightness_other"
                  type="text"
                />
              </Box>
            </Collapse> */}
                </Box>
                <Box>
                  <RadioButton
                  register={register("Oral_steroid")}
                  title="(d) Oral steroid"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Oral_bronchodilators")}
                  title="(e) Oral bronchodilators"
                  options={[
                    "Yes",
                    "No",
                  ]}
                />
                </Box>
                <Box>
                  <RadioButton
                  register={register("Other_Medication")}
                  title="(f) Others"
                  options={[
                    "Yes",
                    "No",
                    "Others",
                  ]}
                />
                <Collapse in={selectedInhaler === "Others"}>
              <Box>
                <Input
                  label="Specify"
                  register={register("specify_other_medication")}
                  name="specify_other_medication"
                  type="text"
                />
              </Box>
                </Collapse>
                </Box>
                </Box>
            </Box>
            <Box>
                  <Typography variant='subtitle1'>21. During the last 12 months, how many times have you
                    needed steroids by mouth or injection, such as prednisone</Typography>
                <Box>
                <Input
                  label="Specify"
                  register={register("input_name")}
                  name="specify_other_medication"
                  type="text"
                />
                </Box>
                </Box>
                
            <Box>
              <Typography variant="subtitle1">22. Have you ever smoked cigarette? (Yes means more than 2 cigarette in a week for a year)</Typography>
              <Box>
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "No",
                    "Yes(in the past)",
                    "Yes(Currently)",
                 ]}
            />
              </Box>
    </Box>
    
            <Box>
              <Typography variant="subtitle1">23. <b>Other Symptoms</b></Typography>
              <Typography variant='subtitle2'>RESPIRATION</Typography> 
              <Box>  
              <Typography variant='subtitle1'>Chest pain</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>
              <Box>  
              <Typography variant='subtitle1'>Haemoptysis</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>

              <Box>  
              <Typography variant='subtitle1'>Sputum production</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>
              <Box>  
              <Typography variant='subtitle1'>CARDIOVASCULAR</Typography> 
              <Typography variant='subtitle1'>Dyspnoea on exertion</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>
              <Box>  
              <Typography variant='subtitle1'>Palpitation</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>


              <Box>  
              <Typography variant='subtitle1'>Orthopnoea</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>
              <Box>  
              <Typography variant='subtitle1'>Paroxysmal Nocturnal Dyspnoea</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>

              <Box>  
              <Typography variant='subtitle1'>Leg swelling</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>
              <Box>  
              <Typography variant='subtitle1'>GASTROINTESTINAL
Nausea</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>

              <Box>  
              <Typography variant='subtitle1'>Vomiting</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>

              <Box>  
              <Typography variant='subtitle1'>Abdominal pain</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>
         
              <Box>  
              <Typography variant='subtitle1'>Abdominal swelling</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>

              <Box>  
              <Typography variant='subtitle1'>Diarrhoea</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>

              <Box>  
              <Typography variant='subtitle1'>Constipation</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>

              <Box>  
              <Typography variant='subtitle1'>GENITOURINARY
Dysuria</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>

              <Box>  
              <Typography variant='subtitle1'>Urge incontinence</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>

              <Box>  
              <Typography variant='subtitle1'>Terminal dribbling</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>

              <Box>  
              <Typography variant='subtitle1'>Haematuria</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>

              <Box>  
              <Typography variant='subtitle1'>CENTRAL NERVOUS SYSTEM
Headache</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>

              <Box>  
              <Typography variant='subtitle1'>Dizziness</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>

              <Box>  
              <Typography variant='subtitle1'>Seizures</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>

              <Box>  
              <Typography variant='subtitle1'>Tremors</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>

              <Box>  
              <Typography variant='subtitle1'>ENDOCRINE Polyuria</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>

              <Box>  
              <Typography variant='subtitle1'>Polydipsia</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>

              <Box>  
              <Typography variant='subtitle1'>Polyphagia</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>

              <Box>  
              <Typography variant='subtitle1'>Weight loss</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>

              <Box>  
              <Typography variant='subtitle1'>Abnormal Weight gain</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>

              <Box>  
              <Typography variant='subtitle1'>Heat intolerance</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>

              <Box>  
              <Typography variant='subtitle1'>Cold intolerance</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>

              <Box>  
              <Typography variant='subtitle1'>ENT
Ear ache</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>

              <Box>  
              <Typography variant='subtitle1'>Ear Discharges</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>

              <Box>  
              <Typography variant='subtitle1'>Snoring</Typography> 
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
              </Box>

              <Box>  
              <Typography variant='subtitle1'>Dysphagia</Typography> 
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
              <Typography variant="subtitle1">24. <b>Physical Examination</b></Typography>
              <Typography variant='subtitle1'>Height(cm)</Typography>
               
                <Box>
                <Input
                  label="Specify"
                  register={register("input_name")}
                  name="height"
                  type="text"
                />
                </Box>
            </Box>
              <Box>
              <Typography variant='subtitle1'>Weight (cm)</Typography> 
                <Box>
                <Input
                  label="Specify"
                  register={register("input_name")}
                  name="weight"
                  type="text"
                />
                </Box>
            </Box>

           <Box>
              <Typography variant='subtitle1'>Palour</Typography>   
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
    </Box>
           <Box>
              <Typography variant='subtitle1'>Jaundice</Typography>   
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
    </Box>
           <Box>
              <Typography variant='subtitle1'>Cyanosis</Typography>   
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
    </Box>
              <Box>
              <Typography variant='subtitle1'>Pulse (beats/min)</Typography> 
                <Box>
                <Input
                  label="Specify"
                  register={register("input_name")}
                  name="pulse"
                  type="text"
                />
                </Box>
            </Box>
              <Box>
              <Typography variant='subtitle1'>Blood Pressure (mmHg)</Typography> 
                <Box>
                <Input
                  label="Blood Pressure (mmHg)"
                  register={register("input_name")}
                  name="text"
                  type="text"
                />
                </Box>
            </Box>
              <Box>
              <Typography variant='subtitle1'>Other Cardiovascular system findings</Typography> 
                <Box>
                <Textarea
                  label="Specify"
                  register={register("input_name")}
                  name="respiraatory_rate"
                  type="text"
                />
                </Box>
            </Box>
              <Box>
              <Typography variant='subtitle1'>Respiratory rate</Typography> 
                <Box>
                <Input
                  label="Specify"
                  register={register("input_name")}
                  name="respiraatory_rate"
                  type="text"
                />
                </Box>
            </Box>
              <Box>
              <Typography variant='subtitle1'>Oxygen Saturation</Typography> 
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
              <Typography variant='subtitle1'>Wheeze</Typography>   
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
    </Box>
           <Box>
              <Typography variant='subtitle1'>Crackles</Typography>   
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
    </Box>
              <Typography variant='subtitle1'>Other Respirtory findings</Typography> 
                <Box>
                <Textarea
                  label="Specify"
                  register={register("input_name")}
                  name="respiraatory_rate"
                  type="text"
                />
                </Box>


           <Box>
              <Typography variant='subtitle1'>Urticaria</Typography>   
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
    </Box>
           <Box>
              <Typography variant='subtitle1'>Rash</Typography>   
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
    </Box>


           <Box>
              <Typography variant='subtitle1'>Hypopigmentation</Typography>   
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
    </Box>
           <Box>
              <Typography variant='subtitle1'>Hyperpigmentation</Typography>   
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
    </Box>
              <Box>
              <Typography variant='subtitle1'>Other skin findings</Typography> 
                <Box>
                <Textarea
                  label="Specify"
                  register={register("input_name")}
                  name="respiraatory_rate"
                  type="text"
                />
                </Box>


           <Box>
              <Typography variant='subtitle1'>Hepatomegaly</Typography>   
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
    </Box>
           <Box>
              <Typography variant='subtitle1'>Splenomegaly</Typography>   
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
    </Box>
           <Box>
              <Typography variant='subtitle1'>Ascites</Typography>   
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Yes",
                    "No"
                  ]}
            />
    </Box>
            <Box>
              <Typography variant='subtitle1'>Other GIT findings</Typography> 
                <Box>
                <Textarea
                  label="Specify"
                  register={register("input_name")}
                  name="respiraatory_rate"
                  type="text"
                />
                </Box>
              <Box>
              <Typography variant='subtitle1'>Other Physical examination findings</Typography> 
                <Box>
                <Textarea
                  label="Specify"
                  register={register("input_name")}
                  name="respiraatory_rate"
                  type="text"
                />
                </Box>          
              <Typography variant="subtitle1"><b>Investigations</b></Typography>
              <Typography variant="subtitle1"><b>CBC</b></Typography>
              <Typography variant="subtitle1"><b>ABSOLUTE</b></Typography>
              <Typography variant="subtitle1"><b>PERCENTAGE</b></Typography>      
              <Box>
              <Typography variant='subtitle1'>PVC</Typography> 
                <Box>
                <Input
                  label="Specify"
                  register={register("input_name")}
                  name="oxygen_saturation"
                  type="text"
                />
                </Box>
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

              <Box>
              <Typography variant='subtitle1'>WBC</Typography> 
                <Box>
                <Input
                  label="Specify"
                  register={register("input_name")}
                  name="oxygen_saturation"
                  type="text"
                />
                </Box>
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

              <Box>
              <Typography variant='subtitle1'>NEUTROPHIL</Typography> 
                <Box>
                <Input
                  label="Specify"
                  register={register("input_name")}
                  name="oxygen_saturation"
                  type="text"
                />
                </Box>
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
              <Typography variant='subtitle1'>LYMPHOCYTE</Typography> 
                <Box>
                <Input
                  label="Specify"
                  register={register("input_name")}
                  name="oxygen_saturation"
                  type="text"
                />
                </Box>
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
              <Typography variant='subtitle1'>EOSINOPHIL</Typography> 
                <Box>
                <Input
                  label="Specify"
                  register={register("input_name")}
                  name="oxygen_saturation"
                  type="text"
                />
                </Box>
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
              <Typography variant='subtitle1'>BASOPHIL</Typography> 
                <Box>
                <Input
                  label="Specify"
                  register={register("input_name")}
                  name="oxygen_saturation"
                  type="text"
                />
                </Box>
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
              <Typography variant='subtitle1'>MONOCYTE</Typography> 
                <Box>
                <Input
                  label="Specify"
                  register={register("input_name")}
                  name="oxygen_saturation"
                  type="text"
                />
                </Box>
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
              <Typography variant="subtitle1"><b>SPIROMETRY</b></Typography>
              <Typography variant="subtitle1"><b>VALUE</b></Typography>
              <Typography variant="subtitle1"><b>PERCENTAGE PREDICTED</b></Typography>      
              <Box>
              <Typography variant='subtitle1'>FEV1</Typography> 
                <Box>
                <Input
                  label="Specify"
                  register={register("input_name")}
                  name="oxygen_saturation"
                  type="text"
                />
                </Box>
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

              <Box>
              <Typography variant='subtitle1'>FVC</Typography> 
                <Box>
                <Input
                  label="Specify"
                  register={register("input_name")}
                  name="oxygen_saturation"
                  type="text"
                />
                </Box>
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

              <Box>
              <Typography variant='subtitle1'>FEV1%</Typography> 
                <Box>
                <Input
                  label="Specify"
                  register={register("input_name")}
                  name="oxygen_saturation"
                  type="text"
                />
                </Box>
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
              <Typography variant='subtitle1'>FEV1%</Typography> 
                <Box>
                <Input
                  label="Specify"
                  register={register("input_name")}
                  name="oxygen_saturation"
                  type="text"
                />
                </Box>
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
              <Typography variant='subtitle1'>FEF25-75</Typography> 
                <Box>
                <Input
                  label="Specify"
                  register={register("input_name")}
                  name="oxygen_saturation"
                  type="text"
                />
                </Box>
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
              <Typography variant='subtitle1'>PEFR</Typography> 
                <Box>
                <Input
                  label="Specify"
                  register={register("input_name")}
                  name="oxygen_saturation"
                  type="text"
                />
                </Box>
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
              <Box>
              <Typography variant='subtitle1'>FRACTION EXHALED NITRIC OXIDE (FeNO)</Typography> 
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
              <Typography variant='subtitle1'>Splenomegaly</Typography>   
                <RadioButton
                  register={register("input_name")}
                  options={[
                    "Draft",
                    "Final"
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
