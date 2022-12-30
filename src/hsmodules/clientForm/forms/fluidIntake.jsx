import React, {useState, useContext, useEffect, useRef} from "react";
import {useForm} from "react-hook-form";
import {formatDistanceToNowStrict, format, subDays, addDays} from "date-fns";
import client from "../../../feathers";
import {toast} from "react-toastify";
import {UserContext, ObjectContext} from "../../../context";
import {Box, Grid, IconButton, Typography} from "@mui/material";
import CustomTable from "../../../components/customtable";
import GlobalCustomButton from "../../../components/buttons/CustomButton";
import Input from "../../../components/inputs/basic/Input";
import CustomSelect from "../../../components/inputs/basic/Select";
import MuiCustomDatePicker from "../../../components/inputs/Date/MuiDatePicker";
import Textarea from "../../../components/inputs/basic/Textarea";
import CloseIcon from "@mui/icons-material/Close";
import {FormsHeaderText} from "../../../components/texts";
import dayjs from "dayjs";
import CustomConfirmationDialog from "../../../components/confirm-dialog/confirm-dialog";
// import CustomTable from "../../components/customtable";

const FluidIntakeOutput = () => {
  const {register, handleSubmit, setValue, control, reset, getValues} =
    useForm();
  const fluidTypeOptions = ["Input", "Output"];
  const {user, setUser} = useContext(UserContext);
  const [facilities, setFacilities] = useState([]);
  const [selectedFluid, setSelectedFluid] = useState();
  const [chosen, setChosen] = useState(true);
  const [chosen1, setChosen1] = useState(true);
  const [chosen2, setChosen2] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const {state, setState, toggleSideMenu, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
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

        toast.success("Fluid Input/Output entry successful");
      })
      .catch(err => {
        toast.error("Error creating Appointment " + err);
      });
  };

  const onSubmit = async (data, e) => {
    //return console.log(data);
    // console.log(state.DocumentClassModule.selectedDocumentClass)
    //console.log(state.employeeLocation.locationName);
    showActionLoader();
    if (!data.fluidType || data.fluidType === "") {
      return toast.error("Please select a fluid type");
    }

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
    setFacilities(prev => [data, ...facilities]);
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
        .then(res => {
          setChosen(true);
          Object.keys(data).forEach(key => {
            data[key] = "";
          });
          setConfirmDialog(false);
          hideActionLoader();

          reset(data);
          setValue("fluidTime", null);

          toast.success("Fluid Input/Output entry successful");
        })
        .catch(err => {
          hideActionLoader();
          setConfirmDialog(false);
          toast.error("Fluid Input/Output entry " + err);
        });
    } else {
      ClientServ.patch(fac.current._id, {
        documentdetail: document.documentdetail,
      })
        .then(res => {
          setChosen(true);
          Object.keys(data).forEach(key => {
            data[key] = "";
          });
          hideActionLoader();
          setConfirmDialog(false);
          reset(data);
          setValue("fluidTime", null);

          toast.success("Fluid Input/Output entry successful");
        })
        .catch(err => {
          setConfirmDialog(false);
          hideActionLoader();
          toast.error("Fluid Input/Output entry " + err);
        });
    }
  };

  //console.log(facilities);

  const inputFluidSchema = [
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
      name: "Date/Time",
      key: "route",
      description: "route",
      selector: row => dayjs(row.fluid_time).format("HH:mm:ss"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Route",
      key: "route",
      description: "route",
      selector: row => row.route,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Input Volume",
      key: "fluid",
      description: "fluid",
      selector: row => row.fluidType === "Input" && row.volume,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Output Volume",
      key: "fluid",
      description: "fluid",
      selector: row => row.fluidType === "Output" && row.volume,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "comments",
      key: "comments",
      description: "comments",
      selector: row => row.comments,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Fluid Type",
      key: "fluidtype",
      description: "fluidtype",
      selector: row => row.fluid,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Entry Time",
      key: "route",
      description: "route",
      selector: row => dayjs(row.entrytime).format("DD-MM HH:mm:ss"),
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

    toggleSideMenu();
  };

  return (
    <div className="card">
      <CustomConfirmationDialog
        open={confirmDialog}
        cancelAction={() => setConfirmDialog(false)}
        confirmationAction={handleSubmit(onSubmit)}
        type="create"
        message={`You are about to create an ${getValues("fluidType")} Chart ?`}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        mb={1}
      >
        <FormsHeaderText text="Fluid Intake and Output Chart" />

        <IconButton onClick={closeForm}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <div className="card-content vscrollable  pt-0">
        <form>
          <Box mb="1rem">
            <MuiCustomDatePicker
              name="fluidTime"
              label="Fluid Time"
              control={control}
              important={true}
              required={true}
            />
          </Box>
          <Box mb="1rem">
            <CustomSelect
              control={control}
              label="Fluid Type"
              name="fluidType"
              required={true}
              // required={true}
              options={fluidTypeOptions}
            />
          </Box>
          <Box mb="1rem">
            <Input
              register={register("route")}
              name="route"
              label="Route"
              type="text"
            />
          </Box>
          <Box mb="1rem">
            <Input
              register={register("fluid")}
              name="fluid"
              label="Fluid"
              type="text"
            />
          </Box>
          <Box mb="1rem">
            <Input
              register={register("volume")}
              name="volume"
              label="Volume (mls)"
              type="number"
            />
          </Box>
          <Box mb="1rem">
            <Textarea
              register={register("comments")}
              name="comments"
              label="Comments"
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
        </form>
      </div>
      <Box>
        <CustomTable
          title={"Fluid Intake"}
          columns={inputFluidSchema}
          data={facilities}
          onRowClicked={handleRow}
          pointerOnHover
          highlightOnHover
          striped
          CustomEmptyData={
            <Typography sx={{fontSize: "0.85rem"}}>
              No Vital Signs added yet
            </Typography>
          }
        />
      </Box>
    </div>
  );
};

export default FluidIntakeOutput;
