import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
import {DocumentClassList} from "./DocumentClass";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "react-toastify";
import Roaster from "../Admin/Roaster";
import {Box, getValue} from "@mui/system";
import RadioButton from "../../components/inputs/basic/Radio";
import {Button, IconButton, Typography} from "@mui/material";
import Input from "../../components/inputs/basic/Input";
import Textarea from "../../components/inputs/basic/Textarea";
import CheckboxInput from "../../components/inputs/basic/Checkbox";
import MuiCustomDatePicker from "../../components/inputs/Date/MuiDatePicker";
import {FormsHeaderText} from "../../components/texts";
import CloseIcon from "@mui/icons-material/Close";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";

export default function ProgressNote() {
  const {register, handleSubmit, setValue, control} = useForm(); //, watch, errors, reset
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
  const [confirmDialog, setConfirmDialog] = useState(false);

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

  const physiciandetails = ["Attending_Physician_Name", "Date_Seen"];

  const progtype = ["New", "Return", "Periodic"];
  const appointgoal = [
    "Decrease Symptoms",
    "Improve Functioning",
    "Consolidate Gains",
    "Improve compliance",
  ];
  const SOAP = ["Subjective", "Objective", "Assessment", "Plan"];
  const progreq = ["Prepare for Discharge", "Other", "Next Review Plan Date"];

  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    // console.log(data)
    //data.Presenting_Complaints=symptoms
    //  data.Allergy_Skin_Test=allergies

    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentname = "Progress Note"; //"Lab Result"
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
      toast({
        message:
          " Documentation data missing, requires location and facility details",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    return console.log(document);

    if (!!draftDoc && draftDoc.status === "Draft") {
      ClientServ.patch(draftDoc._id, document)
        .then(res => {
          //console.log(JSON.stringify(res))
          e.target.reset();
          //  setAllergies([])
          //  setSymptoms([])
          /*  setMessage("Created Client successfully") */
          setSuccess(true);
          toast.success("New Patient Consultation Form updated succesfully");
          setSuccess(false);
        })
        .catch.error(err => {
          toast.error("Error updating New Patient Consultation Form " + err);
        });
    } else {
      ClientServ.create(document)
        .then(res => {
          //console.log(JSON.stringify(res))
          e.target.reset();
          //setAllergies([])
          //  setSymptoms([])
          /*  setMessage("Created Client successfully") */
          setSuccess(true);
          toast.success("Pediatric Pulmonology Form created succesfully");
          setSuccess(false);
          closeForm();
        })
        .catch(err => {
          toast.error("Error creating Pediatric Pulmonology Form " + err);
        });
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
      encounter_right: false,
    };
    await setState(prevstate => ({
      ...prevstate,
      DocumentClassModule: newDocumentClassModule,
    }));
    console.log("close form");
  };
  return (
    <>
      <div className="card ">
        <CustomConfirmationDialog
          open={confirmDialog}
          cancelAction={() => setConfirmDialog(false)}
          confirmationAction={handleSubmit(onSubmit)}
          type="create"
          message="You're about to save a Document, Progress Notes"
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={1}
        >
          <FormsHeaderText text={"Progress Note"} />

          <IconButton onClick={closeForm}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <div className="card-content vscrollable remPad1">
          <form>
            <Box>
              <MuiCustomDatePicker label="Date" name="Date" control={control} />
            </Box>

            <Box>
              <CheckboxInput
                label="Progress Note Type"
                register={register("Progress_note_type")}
                options={["New", "Return", "Periodic"]}
              />
            </Box>

            <Box>
              <Textarea
                label="Subjective"
                register={register("Subjective")}
                type="text"
                placeholder="Write here......"
              />
            </Box>

            <Box>
              <Textarea
                register={register("Objective")}
                type="text"
                label="Objective"
                placeholder="Write here......"
              />
            </Box>

            <Box>
              <Textarea
                register={register("Assessment")}
                name="text"
                type="text"
                label="Assessment"
                placeholder="Write here......"
              />
            </Box>

            <Box>
              <Textarea
                register={register("Plan")}
                type="text"
                label="Plan"
                placeholder="Write here......"
              />
            </Box>

            <Box sx={{paddingTop: "1rem"}}>
              <Typography sx={{fontSize: "0.85rem"}}>
                Next appontment to be scheduled for
              </Typography>
              <Input
                register={register("Next_appointment_scheduled_for")}
                name="text"
                type="text"
              />
            </Box>

            <Box>
              <CheckboxInput
                label="Needs Next Appointment For"
                register={register("Ros")}
                options={[
                  "Decrease Symptoms",
                  "Improve Functioning",
                  "Consolidate Gains",
                  "Improve compliance",
                ]}
              />
            </Box>

            <Box>
              <Typography sx={{fontSize: "0.85rem"}}>
                Prepare for Discharge
              </Typography>
              <Input
                register={register("Prepare_for_discharge")}
                name="text"
                type="text"
              />
            </Box>

            <Box>
              <Typography sx={{fontSize: "0.85rem"}}>Other</Typography>
              <Input register={register("Other")} name="text" type="text" />
            </Box>

            <Box>
              <Typography sx={{fontSize: "0.85rem"}}>
                Next Review Plan Date
              </Typography>
              <MuiCustomDatePicker
                name="Next_review_plan_date"
                control={control}
              />
            </Box>

            <Box mt={2} mb={1}>
              <FormsHeaderText text="Physician Sign Off" />
            </Box>

            <Box sx={{display: "flex", flexDirection: "column"}}>
              <Box>
                <Typography sx={{fontSize: "0.85rem", fontWeight: "600"}}>
                  All information on this form has been reviewed by me,
                  indictated by my full name below:
                </Typography>
              </Box>

              <Box>
                <Typography sx={{fontSize: "0.85rem"}}>
                  Attending Physician Name
                </Typography>
                <Input
                  register={register("Attending_Physician_Name")}
                  type="text"
                />
              </Box>

              <Box>
                <Typography sx={{fontSize: "0.85rem"}}>
                  Date Seen By Attending Physician
                </Typography>
                <MuiCustomDatePicker name="Date_Seen" control={control} />
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
                type="button"
                onClick={() => setConfirmDialog(true)}
              >
                Submit Progress Note
              </GlobalCustomButton>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
}
