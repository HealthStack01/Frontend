import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
import {DocumentClassList} from "./DocumentClass";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "react-toastify";
import {Box, getValue} from "@mui/system";
import RadioButton from "../../components/inputs/basic/Radio";
import {Button, IconButton, Typography} from "@mui/material";
import Input from "../../components/inputs/basic/Input";
import CloseIcon from "@mui/icons-material/Close";
import {FormsHeaderText} from "../../components/texts";
import MuiCustomDatePicker from "../../components/inputs/Date/MuiDatePicker";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CustomTable from "../../components/customtable";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";

export default function MedicationList() {
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
  const [notes, setNotes] = useState("");
  const [drugname, setDrugName] = useState("");
  const [strengthfreq, setStrengthFreq] = useState("");
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

  const onSubmit = (data, e) => {
    // e.preventDefault();
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
          //e.target.reset();
          setAllergies([]);
          setSymptoms([]);
          /*  setMessage("Created Client successfully") */
          setSuccess(true);
          toast.success("Pediatric Pulmonology Form updated succesfully");
          setSuccess(false);
          setValue("Date", null);
          setConfirmDialog(false);
        })
        .catch(err => {
          toast.error("Error updating Pediatric Pulmonology Form " + err);
        });
    } else {
      ClientServ.create(document)
        .then(res => {
          //console.log(JSON.stringify(res))
          //e.target.reset();
          setAllergies([]);
          setSymptoms([]);
          /*  setMessage("Created Client successfully") */
          setSuccess(true);
          toast.success("Medication List created succesfully");
          setSuccess(false);
          closeForm();
          setValue("Date", null);
          setConfirmDialog(false);
        })
        .catch(err => {
          toast.error("Error creating Medication List " + err);
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
    const newDocumentClassModule = {
      selectedDocumentClass: documentobj,
      encounter_right: false,
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

  const removeAllergy = index => {
    setAllergies(prev => prev.filter((el, i) => i !== index));
  };

  const removeMedications = index => {
    setSymptoms(prev => prev.filter((el, i) => i !== index));
  };

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

  const medicationColumns = [
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
      name: "Drug Name",
      key: "allergine",
      description: "Enter Allergy",
      selector: row => row.drugname,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },

    {
      name: "Strength/Frequency",
      key: "reaction",
      description: "Enter Allergy",
      selector: row => row.strengthfreq,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },

    {
      name: "Notes",
      key: "allergine",
      description: "Enter Allergy",
      selector: row => row.notes,
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
          onClick={() => removeMedications(i)}
        />
      ),
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
  ];

  return (
    <>
      <div className="card ">
        <CustomConfirmationDialog
          open={confirmDialog}
          cancelAction={() => setConfirmDialog(false)}
          type="create"
          message="You are about to save this document Document List"
          confirmationAction={handleSubmit(onSubmit)}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={1}
        >
          <FormsHeaderText text={"Medication List"} />

          <IconButton onClick={closeForm}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <div className="card-content vscrollable remPad1">
          <form>
            <Box mb={2}>
              <MuiCustomDatePicker control={control} name="Date" label="Date" />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
              gap={1.5}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <FormsHeaderText text="Allergies" />

                <GlobalCustomButton onClick={handleAdd}>
                  <AddCircleOutline
                    sx={{marginRight: "5px"}}
                    fontSize="small"
                  />
                  Add Allergy
                </GlobalCustomButton>
              </Box>

              <Box>
                <Input
                  label="Allergine"
                  value={allergine}
                  onChange={e => {
                    setAllergine(e.target.value);
                  }}
                  name="allergine"
                />
              </Box>

              <Box>
                <Input
                  label="Reaction"
                  value={reaction}
                  onChange={e => {
                    setReaction(e.target.value);
                  }}
                  name="reaction"
                />
              </Box>

              <Box>
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

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <FormsHeaderText text="Medications" />

                <GlobalCustomButton onClick={handleAddMedication}>
                  <AddCircleOutline
                    sx={{marginRight: "5px"}}
                    fontSize="small"
                  />
                  Add Medication
                </GlobalCustomButton>
              </Box>

              <Box>
                <Input
                  label="Drug Name"
                  value={drugname}
                  onChange={e => {
                    setDrugName(e.target.value);
                  }}
                  name="Drugname"
                />
              </Box>

              <Box>
                <Input
                  label="Strength/Frequency"
                  value={strengthfreq}
                  onChange={e => {
                    setStrengthFreq(e.target.value);
                  }}
                  name="strengthfreq"
                />
              </Box>

              <Box>
                <Input
                  label="Notes"
                  value={notes}
                  onChange={e => {
                    setNotes(e.target.value);
                  }}
                  name="notes"
                />
              </Box>

              <Box>
                <CustomTable
                  title={""}
                  columns={medicationColumns}
                  data={symptoms}
                  pointerOnHover
                  highlightOnHover
                  striped
                  CustomEmptyData="No Medication added yet..."
                  //conditionalRowStyles={conditionalRowStyles}
                />
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
                  Submit Medication List
                </GlobalCustomButton>
              </Box>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
}
