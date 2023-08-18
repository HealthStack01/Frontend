import React, {useState, useContext, useEffect, useRef} from "react";
import {useForm} from "react-hook-form";
import {formatDistanceToNowStrict, format, subDays, addDays} from "date-fns";
import client from "../../../feathers";
import {toast} from "react-toastify";
import {UserContext, ObjectContext} from "../../../context";
import GlobalCustomButton from "../../../components/buttons/CustomButton";
import Input from "../../../components/inputs/basic/Input";
import MuiCustomDatePicker from "../../../components/inputs/Date/MuiDatePicker";
import Textarea from "../../../components/inputs/basic/Textarea";
import {Box, Grid, IconButton, Typography} from "@mui/material";
import CustomTable from "../../../components/customtable";
import moment from "moment";
import CloseIcon from "@mui/icons-material/Close";
import {FormsHeaderText} from "../../../components/texts";
import CustomConfirmationDialog from "../../../components/confirm-dialog/confirm-dialog";

const VitalSignChart = () => {
  const {register, handleSubmit, setValue, control, reset} = useForm();
  const fluidTypeOptions = ["Input", "Output"];
  const {user, setUser} = useContext(UserContext);
  const [facilities, setFacilities] = useState([]);
  const [selectedFluid, setSelectedFluid] = useState();
  const [chosen, setChosen] = useState(true);
  const [chosen1, setChosen1] = useState(true);
  const [chosen2, setChosen2] = useState(true);
  const {state, setState, showActionLoader, hideActionLoader, toggleSideMenu} =
    useContext(ObjectContext);
  const [docStatus, setDocStatus] = useState("Draft");
  const ClientServ = client.service("clinicaldocument");
  const [confirmDialog, setConfirmDialog] = useState(false);

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
      .then(res => {
        setChosen(true);

        toast({
          message: "Fluid Input/Output entry successful",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
      })
      .catch(err => {
        toast({
          message: "Error creating Appointment " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  const formResetData = {
    vitals_time: null,
    Temperature: "",
    Pulse: "",
    Respiratory_rate: "",
    Random_glucose: "",
    Systolic_BP: "",
    Diastolic_BP: "",
    SPO2: "",
    Pain: "",
  };

  const onSubmit = async data => {
    //return console.log(data);

    showActionLoader();
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

    setFacilities(prev => [data, ...facilities]);

    setChosen(false);
    //handleSave()
    let document = {};
    data = {};
    data.recordings = struc.current;

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

    //return console.log(document);

    // alert(document.status)
    if (chosen1) {
      ClientServ.create(document)
        .then(res => {
          setChosen(true);
          setConfirmDialog(false);
          hideActionLoader();
          reset(formResetData);

          toast.success("Vital Signs entry successful");
        })
        .catch(err => {
          hideActionLoader();
          toast.error("Fluid Input/Output entry " + err);
        });
    } else {
      ClientServ.patch(fac.current._id, {
        documentdetail: document.documentdetail,
      })
        .then(res => {
          setChosen(true);
          setConfirmDialog(false);
          hideActionLoader();
          // Object.keys(data).forEach(key => {
          //   data[key] = null;
          // });
          reset(formResetData);
          toast.success("Fluid Input/Output entry successful");
        })
        .catch(err => {
          hideActionLoader();
          toast.error("Fluid Input/Output entry " + err);
        });
    }
  };

  // const onSubmit = data => {
  //   console.log("hello world");
  // };

  const vitalSignsSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: row => row.sn,
      sortable: true,
      width: "50px",
      inputType: "HIDDEN",
    },

    {
      name: "Date",
      key: "vitals_time",
      description: "date",
      selector: row => moment(row.vitals_time).calendar("L"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Temp",
      key: "Temperature",
      description: "temperature",
      selector: row => row.Temperature,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Pulse",
      key: "pulse",
      description: "Pulse",
      selector: row => row.Pulse,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "RR",
      key: "RR",
      description: "Respiratory Rate",
      selector: row => row.Respiratory_rate,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "BP",
      key: "BP",
      description: "Diastolic BP",
      selector: row => `${row.Systolic_BP} / ${row.Diastolic_BP}`,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "SPO2",
      key: "SPO2",
      description: "SPO2",
      selector: row => row.SPO2,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Pain",
      key: "pain",
      description: "Pain",
      selector: row => row.Pain,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Comments",
      key: "Random_glucose",
      description: "comments",
      selector: row => row.Random_glucose,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Entry Time",
      key: "entryTime",
      description: "entrytime",
      selector: row => moment(row.entrytime).calendar("L"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

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
    await setState(prevstate => ({
      ...prevstate,
      DocumentClassModule: newDocumentClassModule,
    }));
    //toggleSideMenu();
  };

  return (
    <div className="card">
      <CustomConfirmationDialog
        open={confirmDialog}
        cancelAction={() => setConfirmDialog(false)}
        message={`You're about to create a Vital Sign Chart document?`}
        type="create"
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
        <FormsHeaderText text="Vital Signs Chart" />

        <IconButton onClick={closeForm}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <div className="card-content vscrollable  pt-0">
        <form>
          <Box mb="1rem">
            <MuiCustomDatePicker
              name="vitals_time"
              label="Date & Time"
              control={control}
              important={true}
              required={true}
            />
          </Box>

          <Box mb="1rem">
            <Input
              //name="temperature"
              label="Temperature"
              type="text"
              register={register("Temperature")}
            />
          </Box>
          <Box mb="1rem">
            <Input
              //name="pulse"
              label="Pulse"
              type="text"
              register={register("Pulse")}
            />
          </Box>
          <Box mb="1rem">
            <Input
              name="respiration_rate"
              label="Respiration Rate"
              type="text"
              register={register("Respiratory_rate")}
            />
          </Box>
          <Box mb="1rem">
            <Input
              //name="blood_glucose"
              label="Blood Glucose"
              type="text"
              register={register("Random_glucose")}
            />
          </Box>
          <Box mb="1rem">
            <Input
              //name="systolic_bp"
              label="Systolic BP"
              type="number"
              register={register("Systolic_BP")}
            />
          </Box>
          <Box mb="1rem">
            <Input
              //name="diastolic_bp"
              label="Diastolic BP"
              type="number"
              register={register("Diastolic_BP")}
            />
          </Box>

          <Box mb="1rem">
            <Input
              //name="sp02"
              label="SP02"
              type="text"
              register={register("SPO2")}
            />
          </Box>

          <Box mb="1rem">
            <Input
              //name="pain"
              label="Pain"
              type="text"
              register={register("Pain")}
            />
          </Box>

          <Box mb="1rem">
            <Textarea
              //name="comments"
              label="Comments"
              type="text"
              register={register("comments")}
            />
          </Box>

          <Box mb="1rem">
            <GlobalCustomButton
              //onClick={handleSubmit(onSubmit)}
              onClick={() => setConfirmDialog(true)}
              color="secondary"
            >
              Submit Vital Sign Chart
            </GlobalCustomButton>
          </Box>
        </form>
      </div>

      <Box>
        <CustomTable
          title={"Fluid Intake"}
          columns={vitalSignsSchema}
          data={facilities}
          // onRowClicked={handleRow}
          CustomEmptyData={
            <Typography sx={{fontSize: "0.85rem"}}>
              No Vital Signs added yet..
            </Typography>
          }
          pointerOnHover
          highlightOnHover
          striped
        />
      </Box>
    </div>
  );
};

export default VitalSignChart;
