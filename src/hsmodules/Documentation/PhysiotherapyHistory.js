import React, { useState, useContext, useEffect } from "react";
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
import GlobalCustomButton from "../../components/buttons/CustomButton";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";

export default function PhysiotherapyHistory() {
  const { register, handleSubmit, setValue, reset } = useForm();
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
        if (key === "The pain is?") {
          setPain(value);
        } else if (key === "If yes, where did it occur?") {
          setWhereitoccur(value);
        }
        else if (key === "Is this related to any injury?") {
          setInjuryrelated(value);
        }
        else if (key === "Does the pain hurt you at night?") {
          setPainhurt(value);
        }
        else if (key === "Does the pain interfere with your sleep?") {
          setSleep(value);
        }
        else if (key === "If yes, does changing in positions in bed help?") {
          setPosition(value);
        }
        else if (key === "What is it like first thing in the morning?") {
          setMorning(value);
        }
        else if (key === "What is it like in the mid-day?") {
          setMidday(value);
        }
        else if (key === "What is it like in the afternoon?") {
          setAfternoon(value);
        }
        else if (key === "What is it like in the evening?") {
          setEvening(value);
        }
        else if (key === "Do you have tingling, numbness or loss of skin sensation?") {
          setSensation(value);
        }
        else if (key === "Do you have pain anywhere else?") {
          setPainanywhere(value);
        }
        else if (key === "Have you had treatment?") {
          setTreatment(value);
        }
        else if (key === "Presently, are you getting?") {
          setPresently(value);
        }
        else if (key === "Have you had any similar pain in the past?") {
          setPastpain(value);
        }
        else if (key === "Are you taking any medications?") {
          setMedications(value);
        }
        else if (key === "Are you taking any medications?") {
          setMedications(value);
        }
        else if (key === "What concerns you most?") {
          setConcerns(value);
        }
        else {
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
  const [injuryrelated, setInjuryrelated] = useState("");
  const [whereitoccur, setWhereitoccur] = useState("");
  const [pain, setPain] = useState("");
  const [painhurt, setPainhurt] = useState("");
  const [sleep, setSleep] = useState("");
  const [position, setPosition] = useState("");
  const [morning, setMorning] = useState("");
  const [midday, setMidday] = useState("");
  const [afternoon, setAfternoon] = useState("");
  const [evening, setEvening] = useState("");
  const [sensation, setSensation] = useState("");
  const [painanywhere, setPainanywhere] = useState("");
  const [treatment, setTreatment] = useState("");
  const [pastpain, setPastpain] = useState("");
  const [medications, setMedications] = useState("");
  const [concerns, setConcerns] = useState("");
  const [presently, setPresently] = useState("");

  const handleInjuryrelated = (event) => {
    setInjuryrelated(event.target.value);
  };

  const handleWhereitoccur = (event) => {
    setWhereitoccur(event.target.value);
  };

  const handlePain = (event) => {
    setPain(event.target.value);
  };

  const handlePainhurt = (event) => {
    setPainhurt(event.target.value);
  };

  const handleSleep = (event) => {
    setSleep(event.target.value);
  };

  const handlePosition = (event) => {
    setPosition(event.target.value);
  };

  const handleMorning = (event) => {
    setMorning(event.target.value);
  };

  const handleMidday = (event) => {
    setMidday(event.target.value);
  };

  const handleAfternoon = (event) => {
    setAfternoon(event.target.value);
  };
  const handleEvening = (event) => {
    setEvening(event.target.value);
  };
  const handleSensation = (event) => {
    setSensation(event.target.value);
  };

  const handlePainanywhere = (event) => {
    setPainanywhere(event.target.value);
  };
  const handleTreatment = (event) => {
    setTreatment(event.target.value);
  };

  const handlePresently = (event) => {
    setPresently(event.target.value);
  };

  const handlePastpain = (event) => {
    setPastpain(event.target.value);
  };

  const handleMedications = (event) => {
    setMedications(event.target.value);
  };
  const handleConcerns = (event) => {
    setConcerns(event.target.value);
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


    document.documentdetail = {
      ...data,
      "If yes, where did it occur?": whereitoccur,
      "Is this related to any injury?": injuryrelated,
      "The pain is?": pain,
      "Does the pain hurt you at night?": painhurt,
      "Does the pain interfere with your sleep?": sleep,
      "If yes, does changing in positions in bed help?": position,
      "What is it like first thing in the morning?": morning,
      "What is it like in the mid-day?": midday,
      "What is it like in the afternoon?": afternoon,
      "What is it like in the evening?": evening,
      "Do you have tingling, numbness or loss of skin sensation?": sensation,
      "Do you have pain anywhere else?": painanywhere,
      "Have you had treatment?": treatment,
      "Presently, are you getting?": presently,
      "Have you had any similar pain in the past?": pastpain,
      "Are you taking any medications?": medications,
      "What concerns you most?": concerns,
    };

    document.documentname = "Physiotherapy History & Interview Form";
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
          toast.success("Physiotherapy History & Interview Form updated successfully");
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
          toast.success("Physiotherapy History & Interview Form created successfully");
          setSuccess(false);
          closeForm();
        })
        .catch((err) => {
          setConfirmDialog(false);
          hideActionLoader();
          toast.error("Error creating Physiotherapy History & Interview Form: " + err);
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
          message="You are about to save this document; PHYSIOTHERAPY HISTORY AND INTERVIEW FORM"
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={1}
        >
          <FormsHeaderText color="none" text={"PHYSIOTHERAPY HISTORY AND INTERVIEW FOR"} />
          <IconButton onClick={closeForm}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <div className="card-content vscrollable remPad1">
          <form>
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
            <Box>
            <FormsHeaderText text="Present History" />
            <FormsHeaderText text="When did the problem start?" />
            <Box mb={1}>
              <Input
                register={register("When did the problem start?")}
                name="text"
                type="text"
                placeholder="Type here..."
              />
            </Box>
              <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
              <Typography>Is this related to any injury?</Typography>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="injuryrelated" value={injuryrelated} onChange={handleInjuryrelated}>
                    <FormControlLabel style={{marginLeft:"10px"}} value="Yes" control={<Radio />} label="Yes" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "40%" }}>
                <RadioGroup name="injuryrelated" value={injuryrelated} onChange={handleInjuryrelated}>
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </Box>
              </Box>

              <FormsHeaderText text="Other" />
            <Box mb={1}>
              <Input
                register={register("Other")}
                name="text"
                type="text"
                placeholder="Type here..."
              />
            </Box>

            <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
              <Typography>If yes, where did it occur?</Typography>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="whereitoccur" value={whereitoccur} onChange={handleWhereitoccur}>
                    <FormControlLabel style={{marginLeft:"10px"}} value="Home" control={<Radio />} label="Home" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "40%" }}>
                <RadioGroup name="whereitoccur" value={whereitoccur} onChange={handleWhereitoccur}>
                    <FormControlLabel value="Work" control={<Radio />} label="Work" />
                  </RadioGroup>
                </Box>
              </Box>
              
              <FormsHeaderText text="Other" />
            <Box mb={1}>
              <Input
                register={register("Others")}
                name="text"
                type="text"
                placeholder="Type here..."
              />
            </Box>
            
            <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
              <Typography>The pain is?</Typography>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="pain" value={pain} onChange={handlePain}>
                    <FormControlLabel style={{marginLeft:"10px"}} value="Constant" control={<Radio />} label="Constant" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="pain" value={pain} onChange={handlePain}>
                    <FormControlLabel value="Intermittent" control={<Radio />} label="Intermittent" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="pain" value={pain} onChange={handlePain}>
                    <FormControlLabel value="Both" control={<Radio />} label="Both" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="pain" value={pain} onChange={handlePain}>
                    <FormControlLabel value="N/A" control={<Radio />} label="N/A" />
                  </RadioGroup>
                </Box>
              </Box>

              <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
              <Typography>Does the pain hurt you at night?</Typography>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="painhurt" value={painhurt} onChange={handlePainhurt}>
                    <FormControlLabel style={{marginLeft:"10px"}} value="Yes" control={<Radio />} label="Yes" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="painhurt" value={painhurt} onChange={handlePainhurt}>
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </Box>
              </Box>

              <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
              <Typography>Does the pain interfere with your sleep?</Typography>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="sleep" value={sleep} onChange={handleSleep}>
                    <FormControlLabel style={{marginLeft:"10px"}} value="Yes" control={<Radio />} label="Yes" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="sleep" value={sleep} onChange={handleSleep}>
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </Box>
              </Box>

              <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
              <Typography>If yes, does changing in positions in bed help?</Typography>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="position" value={position} onChange={handlePosition}>
                    <FormControlLabel style={{marginLeft:"10px"}} value="Yes" control={<Radio />} label="Yes" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="position" value={position} onChange={handlePosition}>
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </Box>
              </Box>

              <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
              <Typography>What is it like first thing in the morning?</Typography>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="morning" value={morning} onChange={handleMorning}>
                    <FormControlLabel style={{marginLeft:"10px"}} value="Better" control={<Radio />} label="Better" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="morning" value={morning} onChange={handleMorning}>
                    <FormControlLabel value="Stiff" control={<Radio />} label="Stiff" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "40%" }}>
                <RadioGroup name="morning" value={morning} onChange={handleMorning}>
                    <FormControlLabel value="Sore" control={<Radio />} label="Sore" />
                  </RadioGroup>
                </Box>
              </Box>

              <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
              <Typography>What is it like in the mid-day?</Typography>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="midday" value={midday} onChange={handleMidday}>
                    <FormControlLabel style={{marginLeft:"10px"}} value="Same" control={<Radio />} label="Same" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="midday" value={midday} onChange={handleMidday}>
                    <FormControlLabel value="Better" control={<Radio />} label="Better" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="midday" value={midday} onChange={handleMidday}>
                    <FormControlLabel value="Worse" control={<Radio />} label="Worse" />
                  </RadioGroup>
                </Box>
              </Box>

              <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
              <Typography>What is it like in the afternoon?</Typography>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="afternoon" value={afternoon} onChange={handleAfternoon}>
                    <FormControlLabel style={{marginLeft:"10px"}} value="Same" control={<Radio />} label="Same" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="afternoon" value={afternoon} onChange={handleAfternoon}>
                    <FormControlLabel value="Better" control={<Radio />} label="Better" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="afternoon" value={afternoon} onChange={handleAfternoon}>
                    <FormControlLabel value="Worse" control={<Radio />} label="Worse" />
                  </RadioGroup>
                </Box>
              </Box>


              <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
              <Typography>What is it like in the evening?</Typography>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="evening" value={evening} onChange={handleEvening}>
                    <FormControlLabel style={{marginLeft:"10px"}} value="Same" control={<Radio />} label="Same" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="evening" value={evening} onChange={handleEvening}>
                    <FormControlLabel value="Better" control={<Radio />} label="Better" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="evening" value={evening} onChange={handleEvening}>
                    <FormControlLabel value="Worse" control={<Radio />} label="Worse" />
                  </RadioGroup>
                </Box>
              </Box>

            <Typography fontWeight="bold" color="primary" variant="body1">
            Where precisely did the pain start?
             </Typography>
             <Box style={{ marginTop: '10px', marginBottom: '30px' }}>
               <Textarea
               color="primary"
                 register={register("Where precisely did the pain start?")}
                 name="pain"
                 type="text"
                 placeholder="Type in here..."
               />
             </Box>

            <Typography fontWeight="bold" color="primary" variant="body1">
            Where did it spread to?
             </Typography>
             <Box style={{ marginTop: '10px', marginBottom: '30px' }}>
               <Textarea
               color="primary"
                 register={register("Where did it spread to?")}
                 name="spread"
                 type="text"
                 placeholder="Type in here..."
               />
             </Box>

            
            <Typography fontWeight="bold" color="primary" variant="body1">
            Where is it now, presently?
             </Typography>
             <Box style={{ marginTop: '10px', marginBottom: '30px' }}>
               <Textarea
               color="primary"
                 register={register("Where is it now, presently?")}
                 name="presently"
                 type="text"
                 placeholder="Type in here..."
               />
             </Box>

            <Typography fontWeight="bold" color="primary" variant="body1">
            How has the pain affected your functions?
             </Typography>
             <Box style={{ marginTop: '10px', marginBottom: '30px' }}>
               <Textarea
               color="primary"
                 register={register("How has the pain affected your functions?")}
                 name="functions"
                 type="text"
                 placeholder="Type in here..."
               />
             </Box>

            <Typography fontWeight="bold" color="primary" variant="body1">
            What makes it worse?
             </Typography>
             <Box style={{ marginTop: '10px', marginBottom: '30px' }}>
               <Textarea
               color="primary"
                 register={register("What makes it worse?")}
                 name="worse"
                 type="text"
                 placeholder="Type in here..."
               />
             </Box>

            <Typography fontWeight="bold" color="primary" variant="body1">
            What have you learned that decreases your pain?
             </Typography>
             <Box style={{ marginTop: '10px', marginBottom: '30px' }}>
               <Textarea
               color="primary"
                 register={register("What have you learned that decreases your pain?")}
                 name="learned"
                 type="text"
                 placeholder="Type in here..."
               />
             </Box>

            <Typography fontWeight="bold" color="primary" variant="body1">
            What do you think caused your pain?
             </Typography>
             <Box style={{ marginTop: '10px', marginBottom: '30px' }}>
               <Textarea
               color="primary"
                 register={register("What do you think caused your pain?")}
                 name="think"
                 type="text"
                 placeholder="Type in here..."
               />
             </Box>
            </Box>
            <FormsHeaderText text="Neurological" />
            <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
              <Typography>Do you have tingling, numbness or loss of skin sensation?</Typography>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="sensation" value={sensation} onChange={handleSensation}>
                    <FormControlLabel style={{marginLeft:"10px"}} value="Yes" control={<Radio />} label="Yes" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="sensation" value={sensation} onChange={handleSensation}>
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </Box>
              </Box>
             
              <FormsHeaderText text="If yes, where?" />
            <Box mb={1}>
              <Input
                register={register("If yes, where?")}
                name="text"
                type="text"
                placeholder="Type here"
              />
              </Box>

              <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
              <Typography>Do you have pain anywhere else?</Typography>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="painanywhere" value={painanywhere} onChange={handlePainanywhere}>
                    <FormControlLabel style={{marginLeft:"10px"}} value="Yes" control={<Radio />} label="Yes" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "40%" }}>
                <RadioGroup name="painanywhere" value={painanywhere} onChange={handlePainanywhere}>
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </Box>
              </Box>
              <FormsHeaderText text="If yes, where?" />
            <Box mb={1}>
              <Input
                register={register("If yes, where?")}
                name="text"
                type="text"
                placeholder="Type here"
              />
              </Box>
              <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
              <Typography>Have you had treatment?</Typography>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="treatment" value={treatment} onChange={handleTreatment}>
                    <FormControlLabel style={{marginLeft:"10px"}} value="Yes" control={<Radio />} label="Yes" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "40%" }}>
                <RadioGroup name="treatment" value={treatment} onChange={handleTreatment}>
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </Box>
              </Box>
              <FormsHeaderText text="If yes, what type of treatment?" />
            <Box mb={1}>
              <Input
                register={register("If yes, what type of treatment?")}
                name="text"
                type="text"
                placeholder="Type here"
              />
              </Box>
              <FormsHeaderText text="Did it help?" />
            <Box mb={1}>
              <Input
                register={register("Did it help?")}
                name="text"
                type="text"
                placeholder="Type here"
              />
              </Box>

              <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
              <Typography>Presently, are you getting?</Typography>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="presently" value={presently} onChange={handlePresently}>
                    <FormControlLabel style={{marginLeft:"10px"}} value="Better" control={<Radio />} label="Better" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="presently" value={presently} onChange={handlePresently}>
                    <FormControlLabel value="Worse" control={<Radio />} label="Worse" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="presently" value={presently} onChange={handlePresently}>
                    <FormControlLabel value="Staying the same" control={<Radio />} label="Staying the same" />
                  </RadioGroup>
                </Box>
              </Box>

              <FormsHeaderText text="Previous History" />
              <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
              <Typography>Have you had any similar pain in the past?</Typography>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="pastpain" value={pastpain} onChange={handlePastpain}>
                    <FormControlLabel style={{marginLeft:"10px"}} value="Yes" control={<Radio />} label="Yes" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="pastpain" value={pastpain} onChange={handlePastpain}>
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </Box>
              </Box>

              <FormsHeaderText text="If yes, how severe was it?" />
            <Box mb={1}>
              <Input
                register={register("If yes, how severe was it?")}
                name="text"
                type="text"
                placeholder="Type here"
              />
              </Box>
           
              <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
              <Typography>Are you taking any medications?</Typography>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="medications" value={medications} onChange={handleMedications}>
                    <FormControlLabel style={{marginLeft:"10px"}} value="Yes" control={<Radio />} label="Yes" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "40%" }}>
                <RadioGroup name="medications" value={medications} onChange={handleMedications}>
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </Box>
              </Box>
              <FormsHeaderText text="If yes, list them" />
            <Box mb={1}>
              <Input
                register={register("If yes, list them")}
                name="text"
                type="text"
                placeholder="Type here"
              />
              </Box>

              <FormsHeaderText text="When are you going to see your Doctor?" />
            <Box mb={1}>
              <Input
                register={register("When are you going to see your Doctor?")}
                name="text"
                type="text"
                placeholder="Type here"
              />
              </Box>
              <FormsHeaderText text="Behavioral" />
              <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
              <Typography>What concerns you most?</Typography>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="concerns" value={concerns} onChange={handleConcerns}>
                    <FormControlLabel style={{marginLeft:"10px"}} value="Your pain" control={<Radio />} label="Your pain" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="concerns" value={concerns} onChange={handleConcerns}>
                    <FormControlLabel value="Your activity restriction" control={<Radio />} label="Your activity restriction" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="concerns" value={concerns} onChange={handleConcerns}>
                    <FormControlLabel value="Both" control={<Radio />} label="Both" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "20%" }}>
                <RadioGroup name="concerns" value={concerns} onChange={handleConcerns}>
                    <FormControlLabel value="None" control={<Radio />} label="None" />
                  </RadioGroup>
                </Box>
              </Box>

              <FormsHeaderText text="What are your goals for coming here?" />
            <Box mb={1}>
              <Input
                register={register("What are your goals for coming here?")}
                name="text"
                type="text"
                placeholder="Type here"
              />
              </Box>
              
            <Typography fontWeight="bold" color="primary" variant="body1">
            Now, is there anything else you would like to tell me before I examine you?
             </Typography>
             <Box style={{ marginTop: '10px', marginBottom: '30px' }}>
               <Textarea
               color="primary"
               register={register("Now, is there anything else you would like to tell me before I examine you?")}
                 name="examine"
                 type="text"
                 placeholder="Type in here..."
               />
             </Box>

            <Typography fontWeight="bold" color="primary" variant="body1">
            Physiotherapist’s comment:"
             </Typography>
             <Box style={{ marginTop: '10px', marginBottom: '30px' }}>
               <Textarea
               color="primary"
               register={register("Physiotherapists comment")}
                 name="comment"
                 type="text"
                 placeholder="Type in here..."
               />
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