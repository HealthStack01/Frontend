import React, { useState, useContext, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { formatDistanceToNowStrict, format, subDays, addDays } from "date-fns";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import GlobalCustomButton from "../../../components/buttons/CustomButton";
import Input from "../../../components/inputs/basic/Input";
import MuiCustomDatePicker from "../../../components/inputs/Date/MuiDatePicker";
import Textarea from "../../../components/inputs/basic/Textarea";
import CloseIcon from "@mui/icons-material/Close";
import { FormsHeaderText } from "../../../components/texts";
import { toast } from "react-toastify";
import CustomConfirmationDialog from "../../../components/confirm-dialog/confirm-dialog";
import { UserContext, ObjectContext } from "../../../context";
import client from "../../../feathers";
import CustomTable from "../../../components/customtable";

const ContinuationSheet = () => {
  const { register, handleSubmit, setValue, control, reset, getValues } =
    useForm();
  const { user, setUser } = useContext(UserContext);
  const [facilities, setFacilities] = useState([]);
  const [chosen, setChosen] = useState(true);
  const [chosen1, setChosen1] = useState(true);
  const [chosen2, setChosen2] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const {
    state,
    setState,
    toggleSideMenu,
    showActionLoader,
    hideActionLoader,
  } = useContext(ObjectContext);
  const [docStatus, setDocStatus] = useState("Draft");
  const ClientServ = client.service("clinicaldocument");
  const fac = useRef([]);
  const struc = useRef([]);

  const handleRow = () => {
    console.log("let's pray");
  };

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  const checkonadmission = () => {
    console.log(state.ClientModule.selectedClient.admission_id);
    if (!!state.ClientModule.selectedClient.admission_id) {
      setChosen2(false);
    } else {
      toast.error("Patient not on admission");
    }
  };

  useEffect(() => {
    checkonadmission();
    findexistingChart();

    return () => {};
  }, [draftDoc]);

  const findexistingChart = async () => {
    const findClinic = await ClientServ.find({
      query: {
        client: state.ClientModule.selectedClient._id,
        facility: user.currentEmployee.facilityDetail._id,
        documentname: state.DocumentClassModule.selectedDocumentClass.name,
        episodeofcare_id: state.ClientModule.selectedClient.admission_id,

        $limit: 20,
        $sort: {
          createdAt: -1,
        },
      },
    });

    fac.current = findClinic.data[0];
    //console.log(fac.current)
    if (findClinic.total > 1) {
      setChosen1(false);
      setFacilities(fac.current.documentdetail.recordings);
    }
  };

  const closeForm = async () => {
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
    await setState((prevstate) => ({
      ...prevstate,
      DocumentClassModule: newDocumentClassModule,
    }));
  };

  useEffect(() => {
    if (!!draftDoc && draftDoc.status === "Draft") {
      /*  Object.entries(draftDoc.documentdetail).map(([keys,value],i)=>(
                  setValue(keys, value,  {
                      shouldValidate: true,
                      shouldDirty: true
                  })

              )) */
      setFacilities(draftDoc.documentdetail.recordings);
      // setAllergies(draftDoc.documentdetail.Allergy_Skin_Test)
    }
    return () => {
      draftDoc = {};
    };
  }, [draftDoc]);

  const handleSave = () => {
    let document = {};
    let data = {};
    data.recordings = facilities;
    // data.createdby=user._id

    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentname =
      state.DocumentClassModule.selectedDocumentClass.name;
    document.documentClassId =
      state.DocumentClassModule.selectedDocumentClass._id;
    document.location =
      state.ClinicModule.selectedClinic.name +
      " " +
      state.ClinicModule.selectedClinic.locationType;
    document.locationId = state.ClinicModule.selectedClinic._id;
    document.client = state.ClientModule.selectedClient._id;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = docStatus === "Draft" ? "Draft" : "completed";
    document.episodeofcare_id = state.ClientModule.selectedClient.admission_id;
    console.log(document);

    // alert(document.status)
    ClientServ.create(document)
      .then((res) => {
        setChosen(true);

        toast.success("Continuation  Sheet entry successful");
      })
      .catch((err) => {
        toast.error("Error creating Appointment " + err);
      });
  };

  const onSubmit = async (data, e) => {
    console.log("===>>>data", { data });
    //return console.log(data);
    // console.log(state.DocumentClassModule.selectedDocumentClass)
    //console.log(state.employeeLocation.locationName);
    showActionLoader();
    // if (!data.fluidType || data.fluidType === "") {
    //   return toast.error("Please select a fluid type");
    // }

    //e.preventDefault();
    data.entrytime = new Date();
    data.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    data.locationId = state.employeeLocation.locationId;
    data.episodeofcare_id = state.ClientModule.selectedClient.admission_id;
    data.createdBy = user._id;
    data.createdByname = user.firstname + " " + user.lastname;

    // await update(data)
    struc.current = [data, ...facilities];
    // console.log(struc.current)
    setFacilities((prev) => [data, ...facilities]);
    // data.recordings=facilities
    // e.target.reset();
    setChosen(false);
    //handleSave()
    let document = {};
    data = {};
    data.recordings = struc.current;
    // data.createdby=user._id

    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentname =
      state.DocumentClassModule.selectedDocumentClass.name;
    document.documentClassId =
      state.DocumentClassModule.selectedDocumentClass._id;
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = state.ClientModule.selectedClient._id;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = docStatus === "Draft" ? "Draft" : "completed";
    document.episodeofcare_id = state.ClientModule.selectedClient.admission_id;

    document.geolocation = {
      type: "Point",
      coordinates: [state.coordinates.latitude, state.coordinates.longitude],
    };

    if (chosen1) {
      // console.log(document);

      // alert(document.status)
      ClientServ.create(document)
        .then((res) => {
          setChosen(true);
          Object.keys(data).forEach((key) => {
            data[key] = "";
          });
          setConfirmDialog(false);
          hideActionLoader();

          reset(data);
          setValue("dateAndTime", null);

          toast.success("Continuation Sheet entry successful");
        })
        .catch((err) => {
          hideActionLoader();
          setConfirmDialog(false);
          toast.error("Continuation Sheet " + err);
        });
    } else {
      ClientServ.patch(fac.current._id, {
        documentdetail: document.documentdetail,
      })
        .then((res) => {
          setChosen(true);
          Object.keys(data).forEach((key) => {
            data[key] = "";
          });
          hideActionLoader();
          setConfirmDialog(false);
          reset(data);
          setValue("dateAndTime", null);

          toast.success("Continuation Sheet entry successful");
        })
        .catch((err) => {
          setConfirmDialog(false);
          hideActionLoader();
          toast.error("Continuation Sheet entry " + err);
        });
    }
  };

  const ContinuationSheetSchema = [
    {
      name: "Surname",
      key: "surname",
      description: "Surname",
      selector: (row) => row.surname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Firstname",
      key: "firstname",
      description: "Firstname",
      selector: (row) => row.firstname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Date & Time",
      key: "dateAndTime",
      description: "Date & Time",
      selector: (row) => dayjs(row.dateAndTime).format("DD_MM HH:mm:ss"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Description/Remark",
      key: "description",
      description: "Description/Remark",
      selector: (row) => row.description,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Signature",
      key: "signature",
      description: "Signature",
      selector: (row) => row.signature,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <div className="card">
      <CustomConfirmationDialog
        open={confirmDialog}
        cancelAction={() => setConfirmDialog(false)}
        confirmationAction={handleSubmit(onSubmit)}
        type="create"
        message={`You are about to create an Continuation Sheet Chart ?`}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        mb={1}
      >
        <FormsHeaderText text="Continuation Sheet" />

        <IconButton onClick={closeForm}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            mb={1}
          >
            <FormsHeaderText text="Continuation Sheet" />

            <IconButton onClick={closeForm}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box mb="1rem">
            <Input
              register={register("surname")}
              name="surname"
              label="Surname"
              type="text"
            />
          </Box>
          <Box mb="1rem">
            <Input
              register={register("firstname")}
              name="firstname"
              label="Firstname"
              type="text"
            />
          </Box>
          <Box mb="1rem">
            <MuiCustomDatePicker
              name="dateAndTime"
              label="Date & Time"
              control={control}
            />
          </Box>

          <Box mb="1rem">
            <Textarea
              register={register("descOrRemark")}
              name="description"
              label="Descriptiom/Remark"
              type="text"
            />
          </Box>
          <Box mb="1rem">
            <Input
              register={register("signature")}
              name="signature"
              label="Signature"
              type="text"
            />
          </Box>

          <Box mb="1rem">
            <GlobalCustomButton
              color="secondary"
              onClick={() => setConfirmDialog(true)}
              text={`Submit Chart`}
            />
          </Box>
        </div>
      </form>
      <Box>
        <CustomTable
          title={"Continuation Sheet"}
          columns={ContinuationSheetSchema}
          data={facilities}
          onRowClicked={handleRow}
          pointerOnHover
          highlightOnHover
          striped
          CustomEmptyData={
            <Typography sx={{ fontSize: "0.85rem" }}>
              No Vital Signs added yet
            </Typography>
          }
        />
      </Box>
    </div>
  );
};

export default ContinuationSheet;
