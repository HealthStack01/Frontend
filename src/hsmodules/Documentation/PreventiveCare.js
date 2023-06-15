import React, {useState, useContext, useEffect} from "react";
import client from "../../feathers";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "react-toastify";
import {Box} from "@mui/system";
import RadioButton from "../../components/inputs/basic/Radio";
import { IconButton, Typography, Radio,RadioGroup, FormControlLabel} from "@mui/material";
import Textarea from "../../components/inputs/basic/Textarea";
import CloseIcon from "@mui/icons-material/Close";
import {FormsHeaderText} from "../../components/texts";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import CheckboxGroup from "../../components/inputs/basic/Checkbox/CheckBoxGroup";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";

export default function PreventiveCare() {
  const {register, handleSubmit, setValue, control, reset} =
    useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const ClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [docStatus, setDocStatus] = useState("Draft");
  const [confirmDialog, setconfirmDialog] = useState(false);

  const [scalling, setScalling] = useState("");

  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;


  useEffect(() => {
    if (!!draftDoc && draftDoc.status === "Draft") {
      Object.entries(draftDoc.documentdetail).map(([keys, value], i) =>
        setValue(keys, value, {
          shouldValidate: true,
          shouldDirty: true,
        })
      );
    }
    return () => {
      draftDoc = {};
    };
  }, [draftDoc]);

 

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

  const handleChangeStatus = async e => {
    setDocStatus(e.target.value);

  };

  const actions = [
    "Scaling & Polishing",
    "Gross Scaling",
    "Fine Scaling",
    "Administration of Local Anastesia",
    "Densitization",
    "Deep Curretage/ Roof Planning",
    "Management of Dental Disease",
    "Management of Dry Socket",
    "Flouride Application",
    "Dental X-Ray",
    "Application of Tissue Sediment",
    "Post Operation Instruction",
    "Suture Removal",
    "Children Dentistry/ Oral Care",
    "Dental Oral Education",
    "Others"

  ];
 
  const handleScalling = (event) => {
    setScalling(event.target.value);
  };
  

  const onSubmit = (data, e) => {
    showActionLoader();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};

    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = {
      ...data,
      scalling: scalling 
    };
    document.documentname = "Preventive Care";
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

    console.log(document);

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
          // e.target.reset();
          Object.keys(data).forEach(key => {
            data[key] = null;
          });
          setconfirmDialog(false);
          hideActionLoader();
          setSuccess(true);
          reset(data);
          toast.success("Preventive Care Form updated succesfully");
          setSuccess(false);
          closeForm();
        })
        .catch(err => {
          hideActionLoader();
          setconfirmDialog(false);
          toast.error("Error updating Preventive Care Form " + err);
        });
    } else {
      ClientServ.create(document)
        .then(res => {
          Object.keys(data).forEach(key => {
            data[key] = null;
          });
          hideActionLoader();
          //e.target.reset();
          setSuccess(true);
          reset(data);
          setconfirmDialog(false);
          toast.success("Preventive Care created succesfully");
          setSuccess(false);
          closeForm();
        })
        .catch(err => {
          setconfirmDialog(false);
          hideActionLoader();
          toast.error("Error creating Preventive Care Form " + err);
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
    await setState(prevstate => ({
      ...prevstate,
      DocumentClassModule: newDocumentClassModule,
    }));
  };

  return (
    <>
      <div className="card ">
        <CustomConfirmationDialog
          open={confirmDialog}
          type="create"
          cancelAction={() => setconfirmDialog(false)}
          confirmationAction={handleSubmit(onSubmit)}
          message="You are about to save this document; Preventive Care"
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={1}
        >
          <FormsHeaderText color="none" text={"Preventive Care Report"} />
          <IconButton onClick={closeForm}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <div className="card-content vscrollable remPad1">
          <form>
          <Box sx={{ width: '70%', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
  <Typography color="primary" variant="body1" fontWeight="bold" style={{ marginTop: '10px' }}>
    Scaling & Polishing:
  </Typography> 
  <Box sx={{ width: '40%', marginBottom: '20px', marginLeft: '10px' }}>
    <RadioGroup
    name="scalling"
      value={scalling}
      onChange={handleScalling}
    >
      <FormControlLabel
        value="Gross Scaling"
        control={<Radio />}
        label="Gross Scaling"
      />
    </RadioGroup>
  </Box>
  <Box sx={{ width: '40%', marginBottom: '20px' }}>
    <RadioGroup
      name="scalling"
      value={scalling}
      onChange={handleScalling}
    >
      <FormControlLabel
        value="Fine Scaling"
        control={<Radio />}
        label="Fine Scaling"
      />
    </RadioGroup>
  </Box>
</Box>

         <Box sx={{display: "flex", flexDirection: "column"}} gap={1.5}>
              <Box>
              <Typography color="primary" >
              Summary of Dentist Encounter
              </Typography>
                <Textarea
                  color="primary"
                  register={register("summary")}
                  type="text"
                  placeholder="Write here..."
                />
              </Box>
            </Box>
            <FormsHeaderText text="Actions " />
            <Box>
              <CheckboxGroup
                name="actions"
                control={control}
                options={actions}
              />
            </Box>

            <Box>
            <Typography color="primary" >
              Comment
              </Typography>
              <Textarea
                register={register("comment")}
                name="comment"
                type="text"
                placeholder="Type in comment..."
              />
            </Box>
            <Box>
            <Typography color="primary" >
            Feedback/Reason for Rescheduling Patient
              </Typography>
              <Textarea
                register={register("feedback")}
                name="feedback"
                type="text"
                placeholder="Type in reason for rescheduling patient..."
              />
            </Box>

            <Box
              sx={{display: "flex", flexDirection: "column"}}
              gap={1.5}
              mb={1.5}
            >
            </Box>

            <Box>
              <FormsHeaderText text="Reschedule Visit" />
            </Box>

            <Box>
              <CheckboxGroup
                name="reschedule"
                control={control}
                options={[
                  "2 Weeks",
                  "2 Months",
                  "3 Months",
                ]}
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
                onClick={() => setconfirmDialog(true)}
              >
                Submit Preventive Care Form
              </GlobalCustomButton>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
}
