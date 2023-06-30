import React, { useState, useContext, useEffect } from "react";
import client from "../../feathers";
import { useForm } from "react-hook-form";
import { UserContext, ObjectContext } from "../../context";
import { toast } from "react-toastify";
import { Box } from "@mui/system";
import RadioButton from "../../components/inputs/basic/Radio";
import { IconButton, Typography, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import Textarea from "../../components/inputs/basic/Textarea";
import CloseIcon from "@mui/icons-material/Close";
import { FormsHeaderText } from "../../components/texts";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import CheckboxGroup from "../../components/inputs/basic/Checkbox/CheckBoxGroup";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";

export default function PreventiveCare() {
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
          setReschedule(value);
        } else if (key === "Scaling & Polishing") {
          setScaling(value);
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
  const [reschedule, setReschedule] = useState("");
  const [scaling, setScaling] = useState("");

  const actions = [
    "Administration of Local Anesthesia",
    "Desensitization",
    "Deep Curettage/ Root Planing",
    "Management of Dental Disease",
    "Management of Dry Socket",
    "Fluoride Application",
    "Dental X-Ray",
    "Application of Tissue Sediment",
    "Post Operation Instruction",
    "Suture Removal",
    "Children Dentistry/ Oral Care",
    "Dental Oral Education",
    "Others"
  ];

  const handleScaling = (event) => {
    setScaling(event.target.value);
  };

  const handleReschedule = (event) => {
    setReschedule(event.target.value);
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
      "Scaling & Polishing": scaling,
      "Reschedule Visit": reschedule
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
          toast.success("Preventive Care Form updated successfully");
          setSuccess(false);
          closeForm();
        })
        .catch((err) => {
          hideActionLoader();
          setConfirmDialog(false);
          toast.error("Error updating Preventive Care Form: " + err);
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
          toast.success("Preventive Care created successfully");
          setSuccess(false);
          closeForm();
        })
        .catch((err) => {
          setConfirmDialog(false);
          hideActionLoader();
          toast.error("Error creating Preventive Care Form: " + err);
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
            <Box sx={{ display: "flex", flexDirection: "column" }} gap={1.5}>
              <Box>
                <Typography color="primary">Summary of Dentist Encounter</Typography>
                <Textarea
                  color="primary"
                  register={register("Summary")}
                  type="text"
                  placeholder="Write here..."
                />
              </Box>
            </Box>

            <FormsHeaderText text="Actions" />
            <Box>
              <Typography color="primary" variant="body1" fontWeight="bold">
                Scaling & Polishing:
              </Typography>
              <Box sx={{ width: "70%", display: "flex", alignItems: "center" }}>
                <Box sx={{ width: "40%" }}>
                <RadioGroup name="Scaling & Polishing" value={scaling} onChange={handleScaling}>

                    <FormControlLabel value="Gross Scaling" control={<Radio />} label="Gross Scaling" />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: "40%" }}>
                <RadioGroup name="Scaling & Polishing" value={scaling} onChange={handleScaling}>

                    <FormControlLabel value="Fine Scaling" control={<Radio />} label="Fine Scaling" />
                  </RadioGroup>
                </Box>
              </Box>
              <CheckboxGroup name="Actions" control={control} options={actions} />
            </Box>

            <Box>
              <Typography color="primary">Comment</Typography>
              <Textarea
                register={register("Comment")}
                name="Comment"
                type="text"
                placeholder="Type in comment..."
              />
            </Box>

            <Box>
              <Typography color="primary">Feedback/Reason for Rescheduling Patient</Typography>
              <Textarea
                register={register("Feedback")}
                name="Feedback"
                type="text"
                placeholder="Type in reason for rescheduling patient..."
              />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }} gap={1.5} mb={1.5}></Box>

            <Box>
              <FormsHeaderText text="Reschedule Visit" />
            </Box>

            <Box sx={{ width: "70%", marginBottom: "20px", display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="Reschedule Visit" value={reschedule} onChange={handleReschedule}>
                  <FormControlLabel value="2 Weeks" control={<Radio />} label="2 Weeks" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="Reschedule Visit" value={reschedule} onChange={handleReschedule}>
                  <FormControlLabel value="2 Months" control={<Radio />} label="2 Months" />
                </RadioGroup>
              </Box>
              <Box sx={{ width: "40%" }}>
                <RadioGroup name="Reschedule Visit" value={reschedule} onChange={handleReschedule}>
                  <FormControlLabel value="3 Months" control={<Radio />} label="3 Months" />
                </RadioGroup>
              </Box>
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
                Submit Preventive Care Form
              </GlobalCustomButton>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
}
