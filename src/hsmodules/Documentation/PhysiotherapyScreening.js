import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import client from "../../feathers";
import { useForm } from "react-hook-form";
import { UserContext, ObjectContext } from "../../context";
import { toast } from "react-toastify";
import { Box } from "@mui/system";
import RadioButton from "../../components/inputs/basic/Radio";
import { IconButton, Typography, Radio, RadioGroup, FormControlLabel, Grid } from "@mui/material";
import Textarea from "../../components/inputs/basic/Textarea";
import CloseIcon from "@mui/icons-material/Close";
import Input from "../../components/inputs/basic/Input";
import { FormsHeaderText } from "../../components/texts";
import MuiCustomDatePicker from "../../components/inputs/Date/MuiDatePicker";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import CheckboxGroup from "../../components/inputs/basic/Checkbox/CheckBoxGroup";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";

export default function PhysiotherapyScreening() {
  const { register, handleSubmit, setValue, control, reset } = useForm();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const ClientServ = client.service("clinicaldocument");
  const { user } = useContext(UserContext);
  const { state, setState, showActionLoader, hideActionLoader } = useContext(ObjectContext);

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!!draftDoc && draftDoc.status === "Draft") {
      Object.entries(draftDoc.documentdetail).forEach(([key, value]) => {
        if (key === "Reschedule Visit") {
          // setReschedule(value);
        } else if (key === "Scaling & Polishing") {
          setCancer(value);
        } else {
          setValue(key, value, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
      });
    }
    return () => {
      draftDoc = {};
    };
  }, [draftDoc]);
  

  const [docStatus, setDocStatus] = useState("Draft");
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [cancer, setCancer] = useState("");
  const [self, setSelf] = useState("");
  const [family, setFamily] = useState("");
  const [nausea, setNausea] = useState("");
  const [fever, setFever] = useState("");
  const [healthchange, setHealthchange] = useState("");
  const [weightchange, setWeightchange] = useState("");
  const [stool, setStool] = useState("");
  const [numbness, setNumbness] = useState("");
  const [appetitechnage, setAppetitiechange] = useState("");
  const [swallowing, setSwallowing] = useState("");
  const [changesinbowel, setChangesinbowel] = useState("");
  const [shortness, setShortness] = useState("");
  const [dizziness, setDizziness] = useState("");
  const [infection, setInfection] = useState("");
  const [urinary, setUrinary] = useState("");
  const [retention, setRetention] = useState("");
  const [constipation, setConstipation] = useState("");
  const [trauma, setTrauma] = useState("");
  const [depressed, setDepressed] = useState("");
  const [pregnant, setPregnant] = useState("");
  const [lossconcentration, setLossconcentration] = useState("");
  const [understress, setUnderstress] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [sleep, setSleep] = useState("");
  const [tobacco, setTobacco] = useState("");
  const [alcoholic, setAlcoholic] = useState("");


  const actions = [
    "Heart Problems",
    "Angina/Chest Pain",
    "Prostate Problems",
    "Ulcers",
    "Pacemaker",
    "Rheumatoid Arthritis",
    "Epilepsy/Seizure",
    "Liver Disease",
    "Circulation Problem",
    "Other Arthritic Conditions",
    "Depression",
    "Tuberculosis",
    "High Blood Pressure",
    "Osteoporosis",
    "Fibromyalgia",
    "Allergies",
    "Lung Disease",
    "Kidney Disease",
    "Anemia",
    "Headache",
    "Asthma",
    "Thyroid Problems",
    "Sexually Transmitted Disease",
    "Bronchitis",
    "Diabetes",
    "Chemical Dependency (e.g. Alcoholism, Drugs)",
    "Other",
    
  ];
  const conditions = [
    "Physician",
    "Psychologist",
    "Chiropractor",
    "Dentist",
    "Physiotherapist",
    "Other",
    
  ];
  const problems = [
    "Hearing",
    "Vision",
    "Speech",
    "Communication",
    
  ];

  const handleAlcoholic = (event) => {
    setAlcoholic(event.target.value);
  };

  const handleTobacco = (event) => {
    setTobacco(event.target.value);
  };

  const handleSleep = (event) => {
    setSleep(event.target.value);
  };

  const handleSymptoms = (event) => {
    setSymptoms(event.target.value);
  };

  const handleUnderstress = (event) => {
    setUnderstress(event.target.value);
  };

  const handleLossconcentration = (event) => {
    setLossconcentration(event.target.value);
  };

  const handlePregnant = (event) => {
    setPregnant(event.target.value);
  };

  const handleDepressed = (event) => {
    setDepressed(event.target.value);
  };

  const handleTrauma = (event) => {
    setTrauma(event.target.value);
  };
  const handleConstipation = (event) => {
    setConstipation(event.target.value);
  };
  const handleRetention = (event) => {
    setRetention(event.target.value);
  };

  const handleHealthUrinary = (event) => {
    setUrinary(event.target.value);
  };
  const handleInfection = (event) => {
    setInfection(event.target.value);
  };

  const handleDizziness = (event) => {
    setDizziness(event.target.value);
  };

  const handleShortness = (event) => {
    setShortness(event.target.value);
  };
  const handleChnagesinbowel = (event) => {
    setChangesinbowel(event.target.value);
  };

  const handleSwallowing = (event) => {
    setSwallowing(event.target.value);
  };
  const handleAppetitechnage = (event) => {
    setAppetitiechange(event.target.value);
  };
  const handleNumbness = (event) => {
    setNumbness(event.target.value);
  };
  const handleNausea = (event) => {
    setNausea(event.target.value);
  };
  const handleStool = (event) => {
    setStool(event.target.value);
  };
 
   const handleWeightchange = (event) => {
    setWeightchange(event.target.value);
  };
  const handleFever = (event) => {
    setFever(event.target.value);
  };

  const handleFamily = (event) => {
    setFamily(event.target.value);
  };

  const handleHealthchange = (event) => {
    setHealthchange(event.target.value);
  };

  const handleSelf = (event) => {
    setSelf(event.target.value);
  };

  const handleChangeStatus = (e) => {
    setDocStatus(e.target.value);
  };

  const onSubmit = (data, e) => {
    showActionLoader();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};

    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName;
    }

    const dateOfSurgery = moment(data["Date of Surgery"]).format("MMMM DD, YYYY");
    const dateOfInjury = moment(data["Date of Injury"]).format("MMMM DD, YYYY");
    const dateOfExamination = moment(data["Date of last Examination"]).format("MMMM DD, YYYY");

    document.documentdetail = {
      ...data,
      "Date of Surgery": dateOfSurgery,
      "Date of Injury": dateOfInjury,
      "Date of last Examination": dateOfExamination,
      "Cancer": cancer,
      "Self":self,
      "Family": family,
      "Nausea/Vomiting?": nausea,
      "Fever/chill/sweats?": fever,
      "A change in your health?": healthchange,
      "Unexplained weight change?": weightchange,
      "Does your stool look like (black or bloody)?": stool,
      "Numbness or tingling?": numbness,
      "Changes in appetite?": appetitechnage,
      "Difficulty swallowing?": swallowing,
      "Changes in bowel or bladder function?": changesinbowel,
      "Shortness of breath?": shortness,
      "Dizziness?": dizziness,
      "Upper respiratory infection?": infection,
      "Urinary tract infection?": urinary,
      "Are you having difficulty with voluntary urine retention?": retention,
      "Have you had constipation or diarrhea that has lasted for than a few days?": constipation,
      "Have you had any trauma (blunt trauma, fall, ejection from automobile etc) that involved your head, neck, arm, hand, thigh, leg, back and waist?": trauma,
      "In the past years or recently, have you had 2 weeks or more during which you felt sad, worthless, depressed, loss concentration, thought of death or suicide or when you lost interest in things that you usually cared about or enjoyed?": lossconcentration,
      "Depressed?": depressed,
      "Under Stress?": understress,
      "Are your symptoms?": symptoms,
      "How are you able to sleep at night?": symptoms,
      "Do you or have you in the past smoked tobacco?": tobacco,
      "Do you drink alcoholic beverages?": alcoholic,      
    };

    document.documentname = "Physiotherapy Screening Form";
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

    if (!!draftDoc && draftDoc.status === "Draft") {
      ClientServ.patch(draftDoc._id, document)
        .then((res) => {
          Object.keys(data).forEach((key) => {
            data[key] = null;
          });
          setConfirmDialog(false);
          hideActionLoader();
          setSuccess(true);
          reset(data);
          toast.success("Physiotherapy Screening Form updated successfully");
          setSuccess(false);
          closeForm();
        })
        .catch((err) => {
          hideActionLoader();
          setConfirmDialog(false);
          toast.error("Error updating Physiotherapy Screening Form: " + err);
        });
    } else {
      ClientServ.create(document)
        .then((res) => {
          Object.keys(data).forEach((key) => {
            data[key] = null;
          });
          hideActionLoader();
          setSuccess(true);
          reset(data);
          setConfirmDialog(false);
          toast.success("Physiotherapy Screening created successfully");
          setSuccess(false);
          closeForm();
        })
        .catch((err) => {
          setConfirmDialog(false);
          hideActionLoader();
          toast.error("Error creating Physiotherapy Screening Form: " + err);
        });
    }
  };

  const closeForm = async () => {
    let documentobj = {};
    documentobj.name = "";
    documentobj.facility = "";
    documentobj.document = "";
    const newDocumentClassModule = {
      selectedDocumentClass: documentobj,
      encounter_right: false,
      show: "detail",
      
    };
    await setState((prevstate) => ({
      ...prevstate,
      DocumentClassModule: newDocumentClassModule,
    }));
  };

  return (
    <>
      <div className="card">
        <CustomConfirmationDialog
          open={confirmDialog}
          type="create"
          cancelAction={() => setConfirmDialog(false)}
          confirmationAction={handleSubmit(onSubmit)}
          message="You are about to save this document; Physiotherapy Screening Form"
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={1}
        >
          <FormsHeaderText color="none" text={"Physiotherapy Screening Form"} />
          <IconButton onClick={closeForm}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <div className="card-content vscrollable remPad1">
          <form>
          <Typography stlye={{marginBottom: "10px"}}>To ensure you receive a complete and thorough evaluation, please provide us with important
           background information on the following form. All information is considered confidential and
           will be released only to your physician unless prior written authorization is given. Thank you.</Typography>

  <Grid container spacing={2}>
  <Grid item xs={6}>
    <Typography color="primary" fontWeight="bold" variant="body2">
    Occupation:
    </Typography>
    <Box mb={1}>
      <Input
        register={register("Occupation")}
        name="occupation"
        type="text"
        placeholder="Type here..."
      />
    </Box>
  </Grid>

  <Grid item xs={6}>
    <Typography color="primary" fontWeight="bold" variant="body2">
     Age:
    </Typography>
    <Box mb={1}>
      <Input
        register={register("Age")}
        name="age"
        type="text"
        placeholder="Type here..."
      />
    </Box>
  </Grid>
</Grid>
            <FormsHeaderText text="Are you seeing any of the followings for your current condition?" />
            <Box>
            <CheckboxGroup name="Whom are you seeing ?" control={control} options={conditions} />

            <FormsHeaderText text="Have you or any immediate family member ever been told you have CANCER?" />
              <Box sx={{ width: "70%", display: "flex", alignItems: "center" }}>
              <Typography>Self</Typography>
                <Box sx={{ width: "40%" }}>
                <RadioGroup name="self" value={self} onChange={handleSelf}>
                    <FormControlLabel style={{marginLeft:"10px"}} value="self" control={<Radio />} label="Yes" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "40%" }}>
                <RadioGroup name="self" value={self} onChange={handleSelf}>
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </Box>
              </Box>

              <Box sx={{ width: "70%", display: "flex", alignItems: "center" }}>
              <Typography>Family</Typography>
                <Box sx={{ width: "40%" }}>
                <RadioGroup name="family" value={family} onChange={handleFamily}>
                    <FormControlLabel style={{marginLeft:"10px"}} value="Yes" control={<Radio />} label="Yes" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "40%" }}>
                <RadioGroup name="family" value={family} onChange={handleFamily}>
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </Box>
              </Box>

            <FormsHeaderText text="If YES, describe what kind:" />
            <Box mb={1}>
              <Input
                register={register("Description")}
                name="text"
                type="text"
                placeholder="Enter description"
              />
            </Box>

            <FormsHeaderText text="Have you EVER been diagnosed as having any of the following conditions?" />
              <CheckboxGroup name="Have you been diagnosed with any of these conditions ?" control={control} options={actions} />
            </Box>
            <Typography>Please list any surgeries or other conditions for which you have been hospitalized within the past few years, including the approximate date of the surgery or hospitalization:</Typography>
            <Box>
            <Box>
      <Typography sx={{fontSize: "0.85rem"}}>
        Date of Surgery:
      </Typography>
      <MuiCustomDatePicker
       name="Date of Surgery"
      control={control} />
    </Box>
              <FormsHeaderText text="Surgery/Hospitalization" />
              <Textarea
                register={register("Surgeries")}
                name="surgery"
                type="text"
                placeholder="Type here..."
              />
            </Box>
           <Typography>Please describe any injuries for which you have been treated (including fractures, dislocations, sprains, strains etc.) within the past few years and approximate date of injury:</Typography>
           <Box>
       <FormsHeaderText text="Date" />
        <MuiCustomDatePicker
       name="Date of Injury"
         control={control} />
       </Box>
            <Box>
              <FormsHeaderText text="Injury" />
              <Textarea
                register={register("Injuries")}
                name="injury"
                type="text"
                placeholder="Type here..."
              />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }} gap={1.5} mb={1.5}></Box>
            <Box>
              <FormsHeaderText text="In the past 3 months have you had or do you experience" />
            </Box>

            <Box sx={{ width: "70%", marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <Typography>A change in your health?</Typography>
              <Box sx={{ width: "40%", marginLeft:"40px" }}>
                <RadioGroup name="healthchange" value={healthchange} onChange={handleHealthchange}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="healthchange" value={healthchange} onChange={handleHealthchange}>
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Box>
            </Box>

            <Box sx={{ width: "70%", marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <Typography>Nausea/Vomiting?</Typography>
              <Box sx={{ width: "40%", marginLeft:"40px" }}>
                <RadioGroup name="nausea" value={nausea} onChange={handleNausea}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="vomiting" value={nausea} onChange={handleNausea}>
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Box>
            </Box>

             <Box sx={{ width: "70%", marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <Typography>Fever/chill/sweats?</Typography>
              <Box sx={{ width: "40%", marginLeft:"40px" }}>
                <RadioGroup name="fever" value={fever} onChange={handleFever}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="Fever/chill/sweats" value={fever} onChange={handleFever}>
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Box>
            </Box>

            <Box sx={{ width: "70%", marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <Typography>Unexplained weight change?</Typography>
              <Box sx={{ width: "40%", marginLeft:"40px" }}>
                <RadioGroup name="weightchange" value={weightchange} onChange={handleWeightchange}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="weightchange" value={weightchange} onChange={handleWeightchange}>
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Box>
            </Box>

            <Box sx={{ width: "70%", marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <Typography>Does your stool look like (black or bloody)?</Typography>
              <Box sx={{ width: "40%", marginLeft:"40px" }}>
                <RadioGroup name="stool" value={stool} onChange={handleStool}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="stool" value={stool} onChange={handleStool}>
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Box>
            </Box>

            <Box sx={{ width: "70%", marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <Typography>Numbness or tingling?</Typography>
              <Box sx={{ width: "40%", marginLeft:"40px" }}>
                <RadioGroup name="numbness" value={numbness} onChange={handleNumbness}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="numbness" value={numbness} onChange={handleNumbness}>
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Box>
            </Box>

            <Box sx={{ width: "70%", marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <Typography>Changes in appetite?</Typography>
              <Box sx={{ width: "40%", marginLeft:"40px" }}>
                <RadioGroup name="appetitechnage" value={appetitechnage} onChange={handleAppetitechnage}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="appetitechnage" value={appetitechnage} onChange={handleAppetitechnage}>
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Box>
            </Box>

            <Box sx={{ width: "70%", marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <Typography>Difficulty swallowing?</Typography>
              <Box sx={{ width: "40%", marginLeft:"40px" }}>
                <RadioGroup name="swallowing" value={swallowing} onChange={handleSwallowing}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="swallowing" value={swallowing} onChange={handleSwallowing}>
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Box>
            </Box>

            <Box sx={{ width: "70%", marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <Typography>Changes in bowel or bladder function?</Typography>
              <Box sx={{ width: "40%", marginLeft:"40px" }}>
                <RadioGroup name="changesinbowel" value={changesinbowel} onChange={handleChnagesinbowel}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="changesinbowel" value={changesinbowel} onChange={handleChnagesinbowel}>
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Box>
            </Box>

            <Box sx={{ width: "70%", marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <Typography>Shortness of breath?</Typography>
              <Box sx={{ width: "40%", marginLeft:"40px" }}>
                <RadioGroup name="shortness" value={shortness} onChange={handleShortness}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="shortness" value={shortness} onChange={handleShortness}>
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Box>
            </Box>

            <Box sx={{ width: "70%", marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <Typography>Dizziness?</Typography>
              <Box sx={{ width: "40%", marginLeft:"40px" }}>
                <RadioGroup name="dizziness" value={dizziness} onChange={handleDizziness}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="dizziness" value={dizziness} onChange={handleDizziness}>
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Box>
            </Box>

            <Box sx={{ width: "70%", marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <Typography>Upper respiratory infection?</Typography>
              <Box sx={{ width: "40%", marginLeft:"40px" }}>
                <RadioGroup name="infection" value={infection} onChange={handleInfection}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="infection" value={infection} onChange={handleInfection}>
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Box>
            </Box>

            <Box sx={{ width: "70%", marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <Typography>Urinary tract infection?</Typography>
              <Box sx={{ width: "40%", marginLeft:"40px" }}>
                <RadioGroup name="urinary" value={urinary} onChange={handleHealthUrinary}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="urinary" value={urinary} onChange={handleHealthUrinary}>
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Box>
            </Box>

            <Box sx={{ width: "70%", marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <Typography>Are you having difficulty with voluntary urine retention?</Typography>
              <Box sx={{ width: "40%", marginLeft:"40px" }}>
                <RadioGroup name="retention" value={retention} onChange={handleRetention}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="retention" value={retention} onChange={handleRetention}>
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Box>
            </Box>

            <Box sx={{ width: "70%", marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <Typography>Have you had constipation or diarrhea that has lasted for than a few days?</Typography>
              <Box sx={{ width: "40%", marginLeft:"40px" }}>
                <RadioGroup name="constipation" value={constipation} onChange={handleConstipation}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="constipation" value={constipation} onChange={handleConstipation}>
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Box>
            </Box>
        
           <Box sx={{ width: "70%", marginBottom: "20px", display: "flex", alignItems: "center" }}>
           <Typography>In the past years or recently, have you had 2 weeks or more during which you felt sad, 
              worthless, depressed, loss concentration, thought of 
              death or suicide or when you lost interest in things 
              that you usually cared about or enjoyed?</Typography>
              <Box sx={{ width: "40%", marginLeft:"40px" }}>
                <RadioGroup name="lossconcentration" value={lossconcentration} onChange={handleLossconcentration}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="lossconcentration" value={lossconcentration} onChange={handleLossconcentration}>
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Box>
            </Box>

            <Box sx={{ width: "70%", marginBottom: "20px", display: "flex", alignItems: "center", marginTop: "20px" }}>
           <Typography>Have you had any trauma (blunt trauma, fall, ejection from automobile etc) that involved your head, 
                neck, arm, hand, thigh, leg, back and waist?</Typography>
              <Box sx={{ width: "40%", marginLeft:"40px" }}>
                <RadioGroup name="trauma" value={trauma} onChange={handleTrauma}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="trauma" value={trauma} onChange={handleTrauma}>
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Box>
            </Box>


            <Box sx={{ display: "flex", flexDirection: "column" }} gap={1.5} mb={1.5}></Box>
            <Box>
              <FormsHeaderText text="Are you currently?" />
            </Box>
            <Box sx={{ width: "70%", marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <Typography>Pregnant? (Only applicable to woman)</Typography>
              <Box sx={{ width: "40%", marginLeft:"40px" }}>
                <RadioGroup name="pregnant" value={pregnant} onChange={handlePregnant}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="pregnant" value={pregnant} onChange={handlePregnant}>
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Box>
            </Box>

            <Box sx={{ width: "70%", marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <Typography>Depressed?</Typography>
              <Box sx={{ width: "40%", marginLeft:"40px" }}>
                <RadioGroup name="depressed" value={depressed} onChange={handleDepressed}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="depressed" value={depressed} onChange={handleDepressed}>
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Box>
            </Box>

            <Box sx={{ width: "70%", marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <Typography>Under Stress?</Typography>
              <Box sx={{ width: "40%", marginLeft:"40px" }}>
                <RadioGroup name="understress" value={understress} onChange={handleUnderstress}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="understress" value={understress} onChange={handleUnderstress}>
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }} gap={1.5} mb={1.5}></Box>
            <Box>
              <FormsHeaderText text="Are your symptoms?" />
            </Box>
            <Box sx={{ width: "70%", marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "40%", marginLeft:"40px" }}>
                <RadioGroup name="symptoms" value={symptoms} onChange={handleSymptoms}>
                  <FormControlLabel value="Getting worse" control={<Radio />} label="Getting worse" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="symptoms" value={symptoms} onChange={handleSymptoms}>
                  <FormControlLabel value="The same" control={<Radio />} label="The same" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="symptoms" value={symptoms} onChange={handleSymptoms}>
                  <FormControlLabel value="Improving" control={<Radio />} label="Improving" />
                </RadioGroup>
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }} gap={1.5} mb={1.5}></Box>
            <Box>
              <FormsHeaderText text="How are you able to sleep at night?" />
            </Box>
            <Box sx={{ width: "70%", marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "40%", marginLeft:"40px" }}>
                <RadioGroup name="sleep" value={sleep} onChange={handleSleep}>
                  <FormControlLabel value="Fine" control={<Radio />} label="Fine" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="sleep" value={sleep} onChange={handleSleep}>
                  <FormControlLabel value="Moderate difficulty" control={<Radio />} label="Moderate difficulty" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="sleep" value={sleep} onChange={handleSleep}>
                  <FormControlLabel value="Only with Medication" control={<Radio />} label="Only with Medication" />
                </RadioGroup>
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }} gap={1.5} mb={1.5}></Box>
            <Box>
              <FormsHeaderText text="Do you have problem with?" />
            </Box>
            <CheckboxGroup name="Do you have problem with?" control={control} options={problems} />

            <Box sx={{ display: "flex", flexDirection: "column" }} gap={1.5} mb={1.5}></Box>
            <Box>
              <FormsHeaderText text="Do you or have you in the past smoked tobacco?" />
            </Box>
            <Box sx={{ width: "70%", marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "40%", marginLeft:"40px" }}>
                <RadioGroup name="tobacco" value={tobacco} onChange={handleTobacco}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="tobacco" value={tobacco} onChange={handleTobacco}>
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Box>
            </Box>
            <Typography color="primary" fontWeight="bold" variant="body1">
            If yes, how many packs per week?
            </Typography>
            <Box mb={1}>
              <Input
                register={register("describe")}
                name="text"
                type="text"
                placeholder="Enter description"
              />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }} gap={1.5} mb={1.5}></Box>
            <Box>
              <FormsHeaderText text="Do you drink alcoholic beverages?" />
            </Box>
            <Box sx={{ width: "70%", marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "40%", marginLeft:"40px" }}>
                <RadioGroup name="alcoholic" value={alcoholic} onChange={handleAlcoholic}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="alcoholic" value={alcoholic} onChange={handleAlcoholic}>
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Box>
            </Box>
        
            <Box>
      <Typography sx={{fontSize: "0.85rem"}}>
      Date of last Physical examination:
      </Typography>
      <MuiCustomDatePicker
       name="Date of last Examination"
      control={control} />
    </Box>
            
            <Box mb={1.5}>
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
                type="submit"
                onClick={() => setConfirmDialog(true)}
              >
                Submit Physiotherapy Form
              </GlobalCustomButton>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
}