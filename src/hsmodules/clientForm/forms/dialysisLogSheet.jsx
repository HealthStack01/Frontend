import React, { useState, useContext, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import GlobalCustomButton from "../../../components/buttons/CustomButton";
import Input from "../../../components/inputs/basic/Input";
import MuiCustomDatePicker from "../../../components/inputs/Date/MuiDatePicker";
import Textarea from "../../../components/inputs/basic/Textarea";
import CloseIcon from "@mui/icons-material/Close";
// import { ObjectContext } from "../../../context";
import { FormsHeaderText } from "../../../components/texts";
import { toast } from "react-toastify";

// new
import dayjs from "dayjs";
import CustomConfirmationDialog from "../../../components/confirm-dialog/confirm-dialog";
import { UserContext, ObjectContext } from "../../../context";
import client from "../../../feathers";
import CustomTable from "../../../components/customtable";
import { Box, Grid, IconButton, Typography } from "@mui/material";

const DialysisLogSheet = () => {
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
    //toggleSideMenu();
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

        toast.success("Dialysis log sheet entry successful");
      })
      .catch((err) => {
        toast.error("Error creating Appointment " + err);
      });
  };

  const onSubmit = async (data, e) => {
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
          // setValue("fluidTime", null);

          toast.success("Dialysis Log Sheet entry successful");
        })
        .catch((err) => {
          hideActionLoader();
          setConfirmDialog(false);
          toast.error("Dialysis Log Sheet " + err);
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

          toast.success("Dialysis Log Sheet entry successful");
        })
        .catch((err) => {
          setConfirmDialog(false);
          hideActionLoader();
          toast.error("Dialysis Log Sheet entry " + err);
        });
    }
  };

  const DialysisLogSheetSchema = [
    {
      name: "Name",
      key: "name",
      description: "Name",
      selector: (row) => row.name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Date",
      key: "date",
      description: "Date",
      selector: (row) => dayjs(row.fluid_time).format("HH:mm:ss"),
      sortable: true,
      required: true,
      inputType: "DATE",
    },

    {
      name: "No of Dialysis",
      key: "dialysis",
      description: "No of Dialysis",
      selector: (row) => row.dialysis,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },

    {
      name: "Age",
      key: "age",
      description: "Age",
      selector: (row) => row.age,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },

    {
      name: "Sex",
      key: "sex",
      description: "Sex",
      selector: (row) => row.sex,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Dry Weight",
      key: "dry_weight",
      description: "Dry Weight",
      selector: (row) => row.dry_weight,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Diagnosis",
      key: "diagnosis",
      description: "Diagnosis",
      selector: (row) => row.diagnosis,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Last Dialysis WT",
      key: "last_dialysis",
      description: "Last Dialysis WT",
      selector: (row) => row.last_dialysis,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Current WT",
      key: "current",
      description: "Current WT",
      selector: (row) => row.current,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Weight Loss/Gain",
      key: "weight",
      description: "Weight Loss/Gain",
      selector: (row) => row.weight,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Ultra Filtration",
      key: "ultra_filtration",
      description: "Ultra Filtration",
      selector: (row) => row.ultra_filtration,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Post Dialysis WT",
      key: "postDialysisWgt",
      description: "Post Dialysis WT",
      selector: (row) => row.postDialysisWgt,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Weight Loss",
      key: "weight_loss",
      description: "Weight Loss",
      selector: (row) => row.weight_loss,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Machine Type",
      key: "machine_type",
      description: "Machine Type",
      selector: (row) => row.machine_type,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Time Started",
      key: "time_started",
      description: "Time Started",
      selector: (row) => row.time_started,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Time Ended",
      key: "time_ended",
      description: "Time Ended",
      selector: (row) => row.time_ended,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "B/P",
      key: "bP",
      description: "B/P",
      selector: (row) => row.bP,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Pulse",
      key: "pulseRate",
      description: "Pulse",
      selector: (row) => row.pulseRate,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Resp",
      key: "resp",
      description: "Resp",
      selector: (row) => row.resp,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Temp",
      key: "temp",
      description: "Temp",
      selector: (row) => row.temp,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Sp02",
      key: "sp02",
      description: "Sp02",
      selector: (row) => row.sp02,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "HIV",
      key: "hiv",
      description: "HIV",
      selector: (row) => row.hiv,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "HEP.C",
      key: "hepC",
      description: "HEP.C",
      selector: (row) => row.hepC,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "HEP.B",
      key: "hepB",
      description: "HEP.B",
      selector: (row) => row.hepB,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "PVC",
      key: "pvc",
      description: "PVC",
      selector: (row) => row.pvc,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Blood Group",
      key: "blood_group",
      description: "Blood Group",
      selector: (row) => row.blood_group,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Pre Assessment",
      key: "pre_assessment",
      description: "Pre Assessment",
      selector: (row) => row.pre_assessment,
      sortable: true,
      required: true,
      inputType: "TEXTAREA",
    },

    {
      name: "Post Assessment",
      key: "post_assessment",
      description: "Post Assessment",
      selector: (row) => row.post_assessment,
      sortable: true,
      required: true,
      inputType: "TEXTAREA",
    },

    {
      name: "HR of Dialysis",
      key: "hr_dialysis",
      description: "HR of Dialysis",
      selector: (row) => row.hr_dialysis,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Type of Dialysis",
      key: "type_dialysis",
      description: "Type of Dialysis",
      selector: (row) => row.type_dialysis,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Concentrate",
      key: "concentrate",
      description: "Concentrate",
      selector: (row) => row.concentrate,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Access Route",
      key: "access_route",
      description: "Access Route",
      selector: (row) => row.access_route,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Heparin",
      key: "heparin",
      description: "Heparin",
      selector: (row) => row.heparin,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Blood",
      key: "blood",
      description: "Blood",
      selector: (row) => row.blood,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Infusion",
      key: "infusion",
      description: "Infusion",
      selector: (row) => row.infusion,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Drugs",
      key: "drugs",
      description: "Drugs",
      selector: (row) => row.drugs,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Epogen",
      key: "epogen",
      description: "Epogen",
      selector: (row) => row.epogen,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Cannulation",
      key: "cannulation",
      description: "Cannulation",
      selector: (row) => row.cannulation,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Sodium",
      key: "sodium",
      description: "Sodium",
      selector: (row) => row.sodium,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Potassium",
      key: "potassium",
      description: "Potassium",
      selector: (row) => row.potassium,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Chloride",
      key: "chloride",
      description: "Chloride",
      selector: (row) => row.chloride,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Bicerp",
      key: "bicerp",
      description: "Bicerp",
      selector: (row) => row.bicerp,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Urea",
      key: "urea",
      description: "Urea",
      selector: (row) => row.urea,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Nurse",
      key: "nurse",
      description: "Nurse",
      selector: (row) => row.nurse,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Salvage",
      key: "salvage",
      description: "Salvage",
      selector: (row) => row.salvage,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Maintenance",
      key: "maintenance",
      description: "Maintenance",
      selector: (row) => row.maintenance,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "KTV",
      key: "ktv",
      description: "KTV",
      selector: (row) => row.ktv,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "EODEMA",
      key: "eodema",
      description: "EODEMA",
      selector: (row) => row.eodema,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  // useEffect(() => {
  //   toast.error(
  //     "This form isn't available at the moment, will update you when it is.."
  //   );
  // }, []);

  return (
    <div className="card">
      <CustomConfirmationDialog
        open={confirmDialog}
        cancelAction={() => setConfirmDialog(false)}
        confirmationAction={handleSubmit(onSubmit)}
        type="create"
        message={`You are about to create an Dialysis Log Sheet Chart ?`}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        mb={1}
      >
        <FormsHeaderText text="Dialysis Log Sheet" />

        <IconButton onClick={closeForm}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <form>
        <Box mb="1rem">
          <Input
            register={register("Name")}
            name="Name"
            label="Name"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <MuiCustomDatePicker name="date" label="Date" control={control} />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("noOfDialysis")}
            name="dialysis"
            label="No of Dialysis"
            type="number"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("age")}
            name="age"
            label="Age"
            type="number"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("sex")}
            name="sex"
            label="Sex"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("dryWgt")}
            name="dry_weight"
            label="Dry Weight"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("diagonsis")}
            name="diagonsis"
            label="Diagonsis"
            type="text"
          />
        </Box>
        <Box mb="1rem">
          <Input
            register={register("lastDialysisWgt")}
            name="last_dialysis"
            label="Last Dialysis WT"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("currentWgt")}
            name="current"
            label="Current WT"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("wgtLossOrGain")}
            name="weight"
            label="Weight Loses/Gain"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("ultraFiltration")}
            name="ultra_filtration"
            label="Ultra Filtration"
            type="text"
          />
        </Box>
        <Box mb="1rem">
          <Input
            register={register("postDialysisWgt")}
            name="postDialysisWgt"
            label="Post Dialysis WT"
            type="text"
          />
        </Box>
        <Box mb="1rem">
          <Input
            register={register("wgtLoss")}
            name="weight_loss"
            label="Weight Loss"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("macType")}
            name="machine_type"
            label="Machine Type"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("timeStarted")}
            name="time_started"
            label="Time Started"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("timeEnded")}
            name="time_ended"
            label="Time Ended"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input register={register("bP")} name="bP" label="B/P" type="text" />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("pulseRate")}
            name="pulse"
            label="Pulse"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("resp")}
            name="resp"
            label="Resp"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("temp")}
            name="temp"
            label="Temp"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("sp02")}
            name="sp02"
            label="Sp02"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("hiv")}
            name="hiv"
            label="HIV"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("hepC")}
            name="hepC"
            label="HEP.C"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("hepB")}
            name="hepB"
            label="HEP.B"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("pvc")}
            name="pvc"
            label="PVC"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("bldGrp")}
            name="blood_group"
            label="Blood Group"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Textarea
            register={register("preAssessment")}
            name="pre_assessment"
            label="Pre Assessment"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Textarea
            register={register("postAssessment")}
            name="post_assessment"
            label="Post Assessment"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <h2>Prescription</h2>
        </Box>

        <Box mb="1rem">
          <Input
            register={register("hrOfDialysis")}
            name="hr_dialysis"
            label="HR of Dialysis"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("typeOfDialysis")}
            name="type_dialysis"
            label="Type of Dialysis"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("conc")}
            name="concentrate"
            label="Concentrate"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("accessRoute")}
            name="access_route"
            label="Access Route"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("heparin")}
            name="heparin"
            label="Heparin"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("bld")}
            name="blood"
            label="Blood"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("infusion")}
            name="infusion"
            label="Infusion"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("drugs")}
            name="drugs"
            label="Drugs"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("epogen")}
            name="epogen"
            label="Epogen"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("cannulation")}
            name="cannulation"
            label="Cannulation"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("sodium")}
            name="sodium"
            label="Sodium"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("potassium")}
            name="potassium"
            label="Potassium"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("chloride")}
            name="chloride"
            label="Chloride"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("bicerp")}
            name="bicerp"
            label="Bicerp"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("urea")}
            name="urea"
            label="Urea"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("nurse")}
            name="nurse"
            label="Nurse"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("salvage")}
            name="salvage"
            label="Salvage"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("maintenance")}
            name="maintenance"
            label="Maintenance"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("ktv")}
            name="ktv"
            label="KTV"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            register={register("eodema")}
            name="eodema"
            label="EODEMA"
            type="text"
          />
        </Box>

        <Box>
          <GlobalCustomButton
            color="secondary"
            onClick={() => setConfirmDialog(true)}
            text={`Submit Chart`}
          />
        </Box>
      </form>
      <Box>
        <CustomTable
          title={"Dialysis Log Sheet"}
          columns={DialysisLogSheetSchema}
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

export default DialysisLogSheet;
