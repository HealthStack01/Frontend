import React, { useState, useContext, useEffect } from "react";
import client from "../../feathers";
import { useForm } from "react-hook-form";
import { UserContext, ObjectContext } from "../../context";
import { toast } from "react-toastify";
import { Box } from "@mui/system";
import moment from "moment";
import RadioButton from "../../components/inputs/basic/Radio";
import {Grid, IconButton, Typography} from "@mui/material";
import Input from "../../components/inputs/basic/Input";
import Textarea from "../../components/inputs/basic/Textarea";
import CloseIcon from "@mui/icons-material/Close";
import { FormsHeaderText } from "../../components/texts";
import MuiCustomDatePicker from "../../components/inputs/Date/MuiDatePicker";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";

export default function DentalLab() {
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
          setValue(key, value, {
            shouldValidate: true,
            shouldDirty: true,
          });
        
      });
    }
    return () => {
      draftDoc = {};
    };
  }, [draftDoc]);
  

  const [docStatus, setDocStatus] = useState("Draft");
  const [confirmDialog, setConfirmDialog] = useState(false);
 


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



    const dateOfDelivery = moment(data["Date of Delivery"]).format("MMMM DD, YYYY");

    document.documentdetail = {
      ...data,
      "Date of Delivery": dateOfDelivery,
    };


    document.documentname = "Dental Lab";
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
          toast.success("Dental Lab Form updated successfully");
          setSuccess(false);
          closeForm();
        })
        .catch((err) => {
          hideActionLoader();
          setConfirmDialog(false);
          toast.error("Error updating Dental Lab Form: " + err);
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
          toast.success("Dental Lab created successfully");
          setSuccess(false);
          closeForm();
        })
        .catch((err) => {
          setConfirmDialog(false);
          hideActionLoader();
          toast.error("Error creating Dental Lab Form: " + err);
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
          message="You are about to save this document; Dental Lab"
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={1}
        >
          <FormsHeaderText color="none" text={"Dental Lab Form"} />
          <IconButton onClick={closeForm}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <div className="card-content vscrollable remPad1">
          <form>
            <Box sx={{ display: "flex", flexDirection: "column" }} gap={1.5}>
              <Box>
                
            <Typography fontWeight="bold" color="primary" variant="body1">
                  Summary of findings/Doctor prescription to lab
                </Typography>
                <Textarea
                  color="primary"
                  register={register("Summary")}
                  type="text"
                  placeholder="Write here..."
                />
              </Box>
            </Box>
    <Grid container spacing={2}>
  <Grid item xs={6}>
    <Typography color="primary" variant="body2">
      No of P.T
    </Typography>
    <Box mb={1}>
      <Input
        register={register("Number of PT")}
        name="nofpt"
        type="text"
        placeholder="Type here..."
      />
    </Box>
    <Typography color="primary" variant="body2">
    D.O.T Impression
    </Typography>
    <Box mb={1}>
      <Input
        register={register("DOT Impression")}
        name="dotimpression"
        type="text"
        placeholder="Type here..."
      />
    </Box>
  </Grid>
  <Grid item xs={6}>
    <Typography color="primary" variant="body2">
      Sex M/F:
    </Typography>
    <Box mb={1}>
      <Input
        register={register("Sex")}
        name="sex"
        type="text"
        placeholder="Type here..."
      />
    </Box>
    <Typography color="primary" variant="body2">
      Type of Prothesis:
    </Typography>
    <Box mb={1}>
      <Input
        register={register("Prothesis")}
        name="prothesis"
        type="text"
        placeholder="Type here..."
      />
    </Box>
  </Grid>
</Grid>
<Grid container spacing={2}>
  <Grid item xs={6}>
    <Typography color="primary" variant="body2">
      No of Units
    </Typography>
    <Box mb={1}>
      <Input
        register={register("Number of Units")}
        name="noofunits"
        type="text"
        placeholder="Type here..."
      />
    </Box>
    <Typography color="primary" variant="body2">
    Dental Tech:
    </Typography>
    <Box mb={1}>
      <Input
        register={register("Dental Tech")}
        name="oric"
        type="text"
        placeholder="Type here..."
      />
    </Box>
  </Grid>
  <Grid item xs={6}>
    <Typography color="primary" variant="body2">
    OR I/C
    </Typography>
    <Box mb={1}>
      <Input
        register={register("Oric")}
        name="dentaltech"
        type="text"
        placeholder="Type here..."
      />
    </Box>
    <Box>
      <Typography sx={{fontSize: "0.85rem"}}>
        Date of Delivery
      </Typography>
      <MuiCustomDatePicker
       name="Date of Delivery"
      control={control} />
    </Box>
  </Grid>
</Grid>

      <Box sx={{ display: "flex", flexDirection: "column" }} gap={1.5} mb={1.5}></Box>
    <Typography fontWeight="bold" color="primary" variant="body1">
    Remarks
    </Typography>
    <Box style={{ marginTop: '10px', marginBottom: '30px' }}>
      <Textarea
      color="primary"
        register={register("Remarks")}
        name="remarks"
        type="text"
        placeholder="Type in remarks..."
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
                Submit Dental Lab Form
              </GlobalCustomButton>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
}
