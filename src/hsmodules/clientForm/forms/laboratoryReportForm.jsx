import React, { useState, useContext, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";
import Divider from "@mui/material/Divider";

import AddBoxIcon from "@mui/icons-material/AddBox";
import client from "../../../feathers";
import Encounter from "../../Documentation/Documentation";
import { UserContext, ObjectContext } from "../../../context";
import { toast } from "react-toastify";
import Input from "../../../components/inputs/basic/Input/index";
import { InputForm } from "../../../components/inputs/basic/Input/index";
import Textarea from "../../../components/inputs/basic/Textarea/index";
import RadioButton from "../../../components/inputs/basic/Radio/index";
import MuiCustomDatePicker from "../../../components/inputs/Date/MuiDatePicker";
import ModalHeader from "../../Appointment/ui-components/Heading/modalHeader/index";
import { FormsHeaderText } from "../../../components/texts";
import CustomTable from "../../../components/customtable";
import {
  Box,
  Grid,
  InputBase,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Typography,
  TextField,
} from "@mui/material";
import Button from "../../../components/buttons/Button";
import ModalBox from "../../../components/modal";
import CheckboxInput from "../../../components/inputs/basic/Checkbox";
import CustomSelect from "../../../components/inputs/basic/Select";
import { Select } from "semantic-ui-react";
import GlobalCustomButton from "../../../components/buttons/CustomButton";
import {
  InputBox,
  InputLabel,
} from "../../../components/inputs/basic/Input/styles";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { GridBox } from "../../app/styles";

const useStyles = makeStyles({
  boldLabel: {
    fontWeight: "bold",
  },
  inputField: {
    marginTop: "8px",
  },
  subscript: {
    fontSize: "0.8rem",
    verticalAlign: "sub",
  },
  supscript: {
    fontSize: "0.8rem",
    verticalAlign: "super",
  },
});

export default function LaboratoryReportForm() {
  const { register, handleSubmit } = useForm();

  const { state, setState } = useContext(ObjectContext);

  const [reportStatus, setReportStatus] = useState("Draft");
  const [choosenForm, setChoosenForm] = useState("");
  const [productModal, setProductModal] = useState(false);

  const formtype = [
    "Haematology",
    "Serology",
    "Biochemistry",
    "Microbiology",
    "Urine",
    "Urinalysis",
    "Stool",
    "HVS Culture",
    "Generic",
    "Chemical Pathology and Tumor Markers",
  ];
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  const handleChangeMode = (value) => {
    setChoosenForm(value);

    setState((prevstate) => ({ ...prevstate, labFormType: value }));
  };

  console.log("STATE", state);

  useEffect(() => {
    if (order.resultDetail?.labFormType == null) {
      console.log("null");
      //setChoosenForm("unknown")
      setState((prevstate) => ({ ...prevstate, labFormType: "unknown" }));
    } else {
      console.log("not null");
      //setChoosenForm(state.financeModule.selectedFinance.resultDetail.labFormType)
      setState((prevstate) => ({
        ...prevstate,
        labFormType:
          state.financeModule.selectedFinance.resultDetail.labFormType,
      }));
    }
    if (order.resultDetail == null) {
      console.log("does not exist");
      // setChoosenForm("")
      setState((prevstate) => ({ ...prevstate, labFormType: "" }));
    }

    return () => {};
  }, [order]);
  const showDocumentation = async (value) => {
    setProductModal(true);
  };
  const handlecloseModal = () => {
    setProductModal(false);
    // handleSearch(val)
  };
  // make text a ProperCase string
  const ProperCase = (text) => {
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  console.log(formtype, choosenForm);

  return (
    <>
      <div className="card">
        <Grid
          container
          spacing={2}
          sx={{
            alignItems: "center",
          }}
        >
          <Grid item xs={12} md={6}>
            <p style={{ maxWidth: "400px", fontWeight: "700" }}>
              {ProperCase(
                ` ${order.serviceInfo.name} for ${order.orderInfo.orderObj.clientname}`
              )}
            </p>
          </Grid>
          <Grid item xs={12} md={6}>
            <GlobalCustomButton
              text="Documentation"
              onClick={showDocumentation}
              customStyles={{
                float: "right",
                marginLeft: "auto",
              }}
              color="success"
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            alignItems: "center",
          }}
        >
          <Grid item xs={12} md={6}>
            {bill_report_status === "Pending" && (
              <div className="control mt-2 mr-2">
                <div className="select is-small ">
                  <select
                    name="FormType"
                    {...register("FormType")}
                    onChange={(e) => handleChangeMode(e.target.value)}
                    className="selectadd"
                    style={{
                      border: "1px solid #b6b6b6",
                      height: "38px",
                      borderRadius: "4px",
                      width: "100%",
                    }}
                  >
                    <option value="" defaultChecked>
                      Choose Form{" "}
                    </option>
                    {formtype.map((option, i) => (
                      <option key={i} value={option}>
                        {" "}
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </Grid>
        </Grid>
        <div className="card-content mb-0 vscrollable">
          <div>
            {state.labFormType === "Haematology" && <Haematology />}
            {state.labFormType === "Serology" && <Serology />}
            {state.labFormType === "Biochemistry" && <Biochemistry />}
            {state.labFormType === "Microbiology" && <Microbiology />}
            {state.labFormType === "Urine" && <Urine />}
            {state.labFormType === "Urinalysis" && <Urinalysis />}
            {state.labFormType === "Stool" && <Stool />}
            {state.labFormType === "HVS Culture" && <HVS />}
            {state.labFormType === "Chemical Pathology and Tumor Markers" && (
              <ChemicalPathologyAndTumorMarkers />
            )}
            {state.labFormType === "Generic" && <LabNoteGeneric />}
            {state.labFormType === "unknown" && <LabNoteCreate />}
            {/* {state.labFormType === '' && <LabNoteCreate  Chemical Pathology and Tumor Markers/>} */}
          </div>
        </div>
      </div>
      {productModal && (
        <ModalBox open onClose={() => setProductModal(false)}>
          <Encounter standalone={true} />
        </ModalBox>
      )}
    </>
  );
}

export function Haematology() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);

  const [docStatus, setDocStatus] = useState("Draft");
  const [reportStatus, setReportStatus] = useState("Draft");
  const ClientServ = client.service("labresults");
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;
  const [hb, setHb] = useState("");
  const [pvc, setPvc] = useState("");
  const [wbc, setWbc] = useState("");
  const [rectics, setRectics] = useState("");
  const [esr, setEsr] = useState("");
  const [platelets, setPlatelets] = useState("");
  const [rbc, setRbc] = useState("");
  const [mcv, setMcv] = useState("");
  const [mchc, setMchc] = useState("");
  const [mch, setMch] = useState("");
  const [neutrophils, setNeutrophils] = useState("");
  const [lymphocytes, setLymphocytes] = useState("");
  const [monocytes, setMonocytes] = useState("");
  const [eosinophils, setEosinophils] = useState("");
  const [basophils, setBasophils] = useState("");

  // let draftDoc=state.DocumentClassModule.selectedDocumentClass.document

  useEffect(() => {
    // setState((prevstate)=>({...prevstate, labFormType:value}))
    if (!order.resultDetail?.documentdetail) {
      setValue("Finding", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("Recommendation", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== "Pending") {
      Object.entries(order.resultDetail.documentdetail).map(
        ([keys, value], i) =>
          setValue(keys, value, {
            shouldValidate: true,
            shouldDirty: true,
          })
      );
    }

    return () => {};
  }, [order]);

  const getSearchfacility = (obj) => {
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

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    //  console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentType = "Diagnostic Result";
    document.documentname = `${order.serviceInfo.name} Result`;
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = order.orderInfo.orderObj.clientId;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = reportStatus;
    document.billId = order._id;

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast.error(
        " Documentation data missing, requires location and facility details"
      );
      return;
    }

    if (bill_report_status === "Pending") {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then((res) => {
          setSuccess(true);
          toast.success("Lab Result created succesfully");
          setSuccess(false);
        })
        .catch((err) => {
          toast.error("Error creating Lab Result " + err);
        });
    }

    if (bill_report_status === "Draft") {
      ClientServ.patch(order.resultDetail._id, document)
        .then((res) => {
          setSuccess(true);
          toast.success("Lab Result updated succesfully");
          setSuccess(false);
        })
        .catch((err) => {
          toast.error("Error updating Lab Result " + err);
        });
    }
    const newProductEntryModule = {
      selectedFinance: order,
      show: "show",
      // report_status:order.report_status
    };
    await setState((prevstate) => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
  };

  const handleChangePart = async (e) => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };
  const inputStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    padding: "0.9rem",
    width: "100%",
    height: "100%",
    borderRadius: " 4px",
    border: "1.5px solid #BBBBBB",
    width: "100%",
    // on focus
    "&:focus": {
      border: "2px solid #0364FF",
    },
  };
  const labelStyle = {
    position: "absolute",
    left: "1rem",
    top: "-0.5rem",
    padding: "0 0.25rem",
    backgroundColor: "#fff",
    transition: "0.4s",
  };

  const fullBloodCountSchema = [
    {
      label: "Hb",
      name: "full_blood_count_Hb",
      des: "Range: 12-16",
      minRange: 12,
      maxRange: 16,
    },

    {
      label: "WBC (CMM)",
      name: "full_blood_count_WBC",
      des: "Range: 3000-11000",
      minRange: 3000,
      maxRange: 11000,
    },
    {
      label: "Platelet",
      name: "full_blood_count_Platelet",
      des: "Range: 150000-400000",
      minRange: 150000,
      maxRange: 400000,
    },
    {
      label: "RBC",
      name: "full_blood_count_RBC",
      des: "Range: 12-16",
      minRange: 12,
      maxRange: 16,
    },
    {
      label: "MCV (FL)",
      name: "full_blood_count_MCV",
      des: "Range: 34-55",
      minRange: 34,
      maxRange: 55,
    },
    {
      label: "MCH",
      name: "full_blood_count_MCH",
      des: "Range: 27-32",
      minRange: 27,
      maxRange: 32,
    },
    {
      label: "Haematocrit (HCT)",
      name: "full_blood_count_Haematocrit",
      des: "Range 0.37- 0.54",
      minRange: 0.37,
      maxRange: 0.54,
    },
  ];

  const differentialWhiteBloodCellCountSchema = [
    {
      label: "Neutrophils (%)",
      name: "differential_white_blood_cell_count_Neutrophils",
      des: "Range: 40-70",
      minRange: 40,
      maxRange: 70,
    },
    {
      label: "Basophils (%)",
      name: "differential_white_blood_cell_count_Basophils",
      des: "Range: 0-1",
      minRange: 0,
      maxRange: 1,
    },
    {
      label: "Lymphocytes (%)",
      name: "differential_white_blood_cell_count_Lymphocytes",
      des: "Range: 20-50",
      minRange: 20,
      maxRange: 50,
    },
    {
      label: "Monocytes (%)",
      name: "differential_white_blood_cell_count_Monocytes",
      des: "Range: 2-30",
      minRange: 2,
      maxRange: 30,
    },
    {
      label: "Eosinophils (%)",
      name: "differential_white_blood_cell_count_Eosinophils",
      des: "Range: 20-50",
      minRange: 20,
      maxRange: 50,
    },
    {
      label: "Meta-Myelocyte",
      name: "differential_white_blood_cell_count_Meta_Myelocyte",
      des: "",
    },
    {
      label: "Pro-Myelocyte",
      name: "differential_white_blood_cell_count_Pro_Myelocyte",
      des: "",
    },
    {
      label: "Nucleated RBC",
      name: "differential_white_blood_cell_count_Nucleated_RBC",
      des: "",
    },
  ];

  const redBloodCellStudiesOneSchema = [
    {
      label: "ESR (MM/HR)",
      name: "red_blood_cell_studies_ESR",
      des: "Range: 0-7",
      minRange: 0,
      maxRange: 7,
    },
    {
      label: "MCHC (G/DL)",
      name: "red_blood_cell_studies_MCHC",
      des: "Range: 31-34",
      minRange: 31,
      maxRange: 34,
    },
    {
      label: "Reticulocytes (%)",
      name: "red_blood_cell_studies_Reticulocytes",
      des: "Range: 0-3",
      minRange: 0,
      maxRange: 3,
    },
  ];

  const redBloodCellStudiesTwoSchema = [
    {
      label: "Rhesus",
      name: "red_blood_cell_studies_Rhesus",
      des: "",
    },
    {
      label: "Haematocrit (HCT)",
      name: "red_blood_cell_studies_Haematocrit",
      des: "",
    },
    {
      label: "Plateletcrit (PCT)",
      name: "red_blood_cell_studies_Plateletcrit",
      des: "",
    },
    {
      label: "PLCR",
      name: "red_blood_cell_studies_PLCR",
      des: "",
    },
    {
      label: "Blood Group",
      name: "red_blood_cell_studies_Blood_Group",
      des: "",
    },
    {
      label: "HB",
      name: "red_blood_cell_studies_HB",
      des: "",
    },
    {
      label: "Genotype",
      name: "red_blood_cell_studies_Genotype",
      des: "",
    },
    {
      label: "Haemoglobin",
      name: "red_blood_cell_studies_Haemoglobin",
      des: "",
    },
    {
      label: "Haemoglobin",
      name: "red_blood_cell_studies_Haemoglobin",
      des: "",
    },
    {
      label: "Red cell distribution Width",
      name: "red_blood_cell_studies_Red_cell_distribution_Width",
      des: "",
    },
    {
      label: " Mean Platelet Volume",
      name: "red_blood_cell_studies_ Mean_Platelet_Volume",
      des: "",
    },
    {
      label: "Platelet cell distribution Width",
      name: "red_blood_cell_studies_Platelet_cell_distribution_Width",
      des: "",
    },
  ];

  const combsTestSchema = [
    {
      label: "Direct Comb",
      name: "combs_test_Direct_Comb",
    },
    {
      label: "Indirect Comb",
      name: "combs_test_Indirect_Comb",
    },
  ];

  const coagulationStudiesSchema = [
    {
      label: "Prothrombin Time",
      name: "coagulation_studies_Prothrombin_Time",
    },
    {
      label: "aPPT",
      name: "coagulation_studies_aPPT",
    },
    {
      label: "D-Dimer",
      name: "coagulation_studies_D_Dimer",
    },

    {
      label: "Malaria Parasite",
      name: "coagulation_studies_Malaria_parasite",
    },
    {
      label: "PT INR",
      name: "coagulation_studies_PT_INR",
    },
    {
      label: "Fibrinogen",
      name: "coagulation_studies_Fibrinogen",
    },
  ];

  const classes = useStyles();

  const validateAndDisplayMessage = (fieldName, value, minRange, maxRange) => {
    if (value < minRange) {
      return "low";
    } else if (value > maxRange) {
      return "High";
    } else if (value >= minRange && value <= maxRange) {
      return "Normal";
    } else {
      return "Invalid Input";
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p style={{ fontWeight: "700" }} className="label is-small">
        HEAMATOLOGY
      </p>

      {/* specimen details field */}
      <Grid container spacing={0.1} mt={1}>
        <Typography
          variant="p"
          sx={{
            color: "blue",
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "4px",
          }}
        >
          SPECIMEN Details
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={2.4}>
            <Input
              label="Specimen"
              name="specimen"
              type="text"
              register={register("specimen", { required: false })}
            />
          </Grid>
          <Grid item xs={12} sm={2.4}>
            <Input
              label="Date Of Request"
              name="request_date"
              type="text"
              register={register("request_date", { required: true })}
              defaultValue={dayjs(order.createdAt).format("DD/MM/YYYY hh:mm A")}
            />
          </Grid>
          <Grid item xs={12} sm={2.4}>
            <MuiCustomDatePicker
              control={control}
              label="Date Of Collection"
              name="collection_date"
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={2.4}>
            <Input
              label="Time Of Collection"
              name="collection_time"
              type="time"
              register={register("collection_time", { required: false })}
            />
          </Grid>
          <Grid item xs={12} sm={2.4}>
            <Input
              label="Volume"
              name="volume"
              type="text"
              register={register("volume", { required: false })}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={1} mt={2}>
        {/*  Full blood count (Total white blood cell count) */}
        <Grid item xs={12} sm={12}>
          {" "}
          <Typography
            variant="p"
            sx={{
              color: "blue",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            Full blood count (Total white blood cell count)
          </Typography>
          <Grid container alignItems="center" mt={1}>
            {fullBloodCountSchema.map((data, index) => (
              <Grid key={index} spacing={2} item xs={12} sm={3} mb={2}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <Input
                      label={data.label}
                      name={data.name}
                      type="text"
                      register={register(`${data.name}`, {
                        required: false,
                      })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: "bold",
                        marginBottom: "4px",
                      }}
                    >
                      {data.des}
                    </Typography>
                    {watch(data.name) !== "" && data.des && (
                      <Typography
                        variant="p"
                        sx={{
                          fontSize: "14px",
                          fontWeight: "bold",
                          marginBottom: "4px",
                          color: `${
                            validateAndDisplayMessage(
                              data.name,
                              parseFloat(watch(data.name)),
                              data.minRange,
                              data.maxRange
                            ) === "Normal"
                              ? "green"
                              : "red"
                          }`,
                        }}
                      >
                        {validateAndDisplayMessage(
                          data.name,
                          parseFloat(watch(data.name)),
                          data.minRange,
                          data.maxRange
                        )}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/*  Differential White Blood Cell Count */}
        <Grid item xs={12} sm={12}>
          {" "}
          <Typography
            variant="p"
            sx={{
              color: "blue",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            Differential White Blood Cell Count
          </Typography>
          <Grid container alignItems="center" mt={1}>
            {differentialWhiteBloodCellCountSchema.map((data, index) => (
              <Grid key={index} spacing={2} item xs={12} sm={3} mb={2}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <Input
                      label={data.label}
                      name={data.name}
                      type="text"
                      register={register(`${data.name}`, {
                        required: false,
                      })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: "bold",
                        marginBottom: "4px",
                      }}
                    >
                      {data.des}
                    </Typography>
                    {watch(data.name) !== "" && data.des !== "" && (
                      <Typography
                        variant="p"
                        sx={{
                          fontSize: "14px",
                          fontWeight: "bold",
                          marginBottom: "4px",
                          color: `${
                            validateAndDisplayMessage(
                              data.name,
                              parseFloat(watch(data.name)),
                              data.minRange,
                              data.maxRange
                            ) === "Normal"
                              ? "green"
                              : "red"
                          }`,
                        }}
                      >
                        {validateAndDisplayMessage(
                          data.name,
                          parseFloat(watch(data.name)),
                          data.minRange,
                          data.maxRange
                        )}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/*  Red blood Cell Studies */}
        <Grid item xs={12} sm={12}>
          {" "}
          <Typography
            variant="p"
            sx={{
              color: "blue",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            Red Blood Cell Studies
          </Typography>
          <Grid container alignItems="center" spacing={2} mt={1}>
            {redBloodCellStudiesOneSchema.map((data, index) => (
              <Grid key={index} spacing={2} item xs={12} sm={4} mb={2}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={7}>
                    <Input
                      label={data.label}
                      name={data.name}
                      type="text"
                      register={register(`${data.name}`, {
                        required: false,
                      })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: "bold",
                        marginBottom: "4px",
                      }}
                    >
                      {data.des}
                    </Typography>
                    {watch(data.name) !== "" && data.des && (
                      <Typography
                        variant="p"
                        sx={{
                          fontSize: "14px",
                          fontWeight: "bold",
                          marginBottom: "4px",
                          color: `${
                            validateAndDisplayMessage(
                              data.name,
                              parseFloat(watch(data.name)),
                              data.minRange,
                              data.maxRange
                            ) === "Normal"
                              ? "green"
                              : "red"
                          }`,
                        }}
                      >
                        {validateAndDisplayMessage(
                          data.name,
                          parseFloat(watch(data.name)),
                          data.minRange,
                          data.maxRange
                        )}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            ))}
            {redBloodCellStudiesTwoSchema.map((data, index) => (
              <Grid key={index} spacing={2} item xs={12} sm={3} mb={2}>
                <Input
                  label={data.label}
                  name={data.name}
                  type="text"
                  register={register(`${data.name}`, {
                    required: false,
                  })}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Combs Test */}
        <Grid container spacing={0.1} mt={1}>
          <Typography
            variant="p"
            sx={{
              color: "blue",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            Combs Test
          </Typography>
          <Grid container spacing={2} alignItems="center" mt={0.5}>
            {combsTestSchema.map((data, index) => (
              <Grid key={index} item xs={12} sm={3}>
                <Input
                  label={data.label}
                  name={data.name}
                  type="text"
                  register={register(`${data.name}`, {
                    required: false,
                  })}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Coagulation Studies*/}
        <Grid container spacing={0.1} mt={1}>
          {" "}
          <Typography
            variant="p"
            sx={{
              color: "blue",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            Coagulation Studies
          </Typography>
          <Grid container spacing={2} alignItems="center" mt={0.5}>
            {coagulationStudiesSchema.map((data, index) => (
              <Grid key={index} item xs={12} sm={3}>
                <Input
                  label={data.label}
                  name={data.name}
                  type="text"
                  register={register(`${data.name}`, {
                    required: false,
                  })}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Recommendation field */}
      <Grid container spacing={1} mt={2}>
        <Typography
          variant="p"
          sx={{
            color: "blue",
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "4px",
          }}
        >
          Recommendation
        </Typography>
      </Grid>

      <Grid container spacing={1} mt={2}>
        <Grid item xs={12} sm={6}>
          <Textarea
            placeholder="Recommendation"
            name="Recommendation"
            type="text"
            register={register("Recommendation")}
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} mt={1}>
        <Grid item xs={12} sm={2}>
          <input
            type="radio"
            name="status"
            value="Draft"
            checked={reportStatus === "Draft" || reportStatus === "Pending"}
            onChange={(e) => {
              handleChangePart(e);
            }}
            disabled={bill_report_status === "Final"}
            style={{
              margin: "1rem",
            }}
          />
          <span
            style={{
              fontSize: "1rem",
            }}
          >
            {" "}
            Draft
          </span>
        </Grid>{" "}
        <Grid item xs={12} sm={2}>
          <input
            type="radio"
            name="status"
            value="Final"
            checked={reportStatus === "Final"}
            onChange={(e) => handleChangePart(e)}
            disabled={bill_report_status === "Final"}
            style={{
              margin: "1rem",
            }}
          />
          <span
            style={{
              fontSize: "1rem",
            }}
          >
            {" "}
            Final{" "}
          </span>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} sm={12}>
          {bill_report_status !== "Final" && (
            <GlobalCustomButton
              text={bill_report_status === "Pending" ? "Save" : "Update"}
              onClick={handleSubmit(onSubmit)}
              color="success"
            />
          )}
        </Grid>
      </Grid>
    </form>
  );
}

export function HaematologyTest() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);

  const [docStatus, setDocStatus] = useState("Draft");
  const [reportStatus, setReportStatus] = useState("Draft");
  const ClientServ = client.service("labresults");
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  // let draftDoc=state.DocumentClassModule.selectedDocumentClass.document

  useEffect(() => {
    // setState((prevstate)=>({...prevstate, labFormType:value}))
    if (!order.resultDetail?.documentdetail) {
      setValue("Finding", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("Recommendation", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== "Pending") {
      Object.entries(order.resultDetail.documentdetail).map(
        ([keys, value], i) =>
          setValue(keys, value, {
            shouldValidate: true,
            shouldDirty: true,
          })
      );
    }

    return () => {};
  }, [order]);

  const getSearchfacility = (obj) => {
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

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    //  console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentType = "Diagnostic Result";
    document.documentname = `${order.serviceInfo.name} Result`;
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = order.orderInfo.orderObj.clientId;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = reportStatus;
    document.billId = order._id;

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast.error(
        " Documentation data missing, requires location and facility details"
      );
      return;
    }

    if (bill_report_status === "Pending") {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then((res) => {
          setSuccess(true);
          toast.success("Lab Result created succesfully");
          setSuccess(false);
        })
        .catch((err) => {
          toast.error("Error creating Lab Result " + err);
        });
    }

    if (bill_report_status === "Draft") {
      ClientServ.patch(order.resultDetail._id, document)
        .then((res) => {
          setSuccess(true);
          toast.success("Lab Result updated succesfully");
          setSuccess(false);
        })
        .catch((err) => {
          toast.error("Error updating Lab Result " + err);
        });
    }
    const newProductEntryModule = {
      selectedFinance: order,
      show: "show",
      // report_status:order.report_status
    };
    await setState((prevstate) => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
  };

  const handleChangePart = async (e) => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };
  const inputStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    padding: "0.9rem",
    width: "100%",
    height: "100%",
    borderRadius: " 4px",
    border: "1.5px solid #BBBBBB",
    width: "100%",
    // on focus
    "&:focus": {
      border: "2px solid #0364FF",
    },
  };
  const labelStyle = {
    position: "absolute",
    left: "1rem",
    top: "-0.5rem",
    padding: "0 0.25rem",
    backgroundColor: "#fff",
    transition: "0.4s",
  };

  const fullBloodCountSchema = [
    {
      label: "Hb",
      name: "full_blood_count_Hb",
      des: "Range: 12-16",
    },
    {
      label: "WBC (CMM)",
      name: "full_blood_count_WBC",
      des: "Range: 3000-11000",
    },
    {
      label: "Platelet",
      name: "full_blood_count_Platelet",
      des: "Range: 150000-400000",
    },
    {
      label: "RBC",
      name: "full_blood_count_RBC",
      des: "Range: 12-16",
    },
    {
      label: "MCV (FL)",
      name: "full_blood_count_MCV",
      des: "Range: 34-55",
    },
    {
      label: "MCH",
      name: "full_blood_count_MCH",
      des: "Range: 27-32",
    },
    {
      label: "Haematocrit (HCT)",
      name: "full_blood_count_Haematocrit",
      des: "Range 0.37- 0.54",
    },
  ];

  const combsTestSchema = [
    {
      label: "Direct Comb",
      name: "combs_test_Direct_Comb",
    },
    {
      label: "Indirect Comb",
      name: "combs_test_Indirect_Comb",
    },
  ];

  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p style={{ fontWeight: "700" }} className="label is-small">
        HEAMATOLOGY
      </p>

      <Grid container spacing={1} mt={2}>
        {/*  Full blood count (Total white blood cell count) */}
        <Grid item xs={12} sm={12}>
          {" "}
          <Typography
            variant="p"
            sx={{
              color: "blue",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            Full blood count (Total white blood cell count)
          </Typography>
          <Grid container alignItems="center" mt={1}>
            {fullBloodCountSchema.map((data, index) => (
              <Grid key={index} spacing={2} item xs={12} sm={3} mb={2}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <Input
                      label={data.label}
                      name={data.name}
                      type="text"
                      register={register(`${data.name}`, {
                        required: false,
                      })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: "bold",
                        marginBottom: "4px",
                      }}
                    >
                      {data.des}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Combs Test */}
        <Grid container spacing={0.1} mt={1}>
          <Typography
            variant="p"
            sx={{
              color: "blue",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            Combs Test
          </Typography>
          <Grid container spacing={2} alignItems="center" mt={0.5}>
            {combsTestSchema.map((data, index) => (
              <Grid key={index} item xs={12} sm={3}>
                <Input
                  label={data.label}
                  name={data.name}
                  type="text"
                  register={register(`${data.name}`, {
                    required: false,
                  })}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Recommendation field */}
      <Grid container spacing={1} mt={2}>
        <Typography
          variant="p"
          sx={{
            color: "blue",
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "4px",
          }}
        >
          Recommendation
        </Typography>
      </Grid>

      <Grid container spacing={1} mt={2}>
        <Grid item xs={12} sm={6}>
          <Textarea
            placeholder="Recommendation"
            name="Recommendation"
            type="text"
            register={register("Recommendation")}
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} mt={1}>
        <Grid item xs={12} sm={2}>
          <input
            type="radio"
            name="status"
            value="Draft"
            checked={reportStatus === "Draft" || reportStatus === "Pending"}
            onChange={(e) => {
              handleChangePart(e);
            }}
            disabled={bill_report_status === "Final"}
            style={{
              margin: "1rem",
            }}
          />
          <span
            style={{
              fontSize: "1rem",
            }}
          >
            {" "}
            Draft
          </span>
        </Grid>{" "}
        <Grid item xs={12} sm={2}>
          <input
            type="radio"
            name="status"
            value="Final"
            checked={reportStatus === "Final"}
            onChange={(e) => handleChangePart(e)}
            disabled={bill_report_status === "Final"}
            style={{
              margin: "1rem",
            }}
          />
          <span
            style={{
              fontSize: "1rem",
            }}
          >
            {" "}
            Final{" "}
          </span>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} sm={12}>
          {bill_report_status !== "Final" && (
            <GlobalCustomButton
              text={bill_report_status === "Pending" ? "Save" : "Update"}
              onClick={handleSubmit(onSubmit)}
              color="success"
            />
          )}
        </Grid>
      </Grid>
    </form>
  );
}

export function Serology() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);

  const [docStatus, setDocStatus] = useState("Draft");
  const [reportStatus, setReportStatus] = useState("Draft");
  const ClientServ = client.service("labresults");
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!order.resultDetail?.documentdetail) {
      setValue("Finding", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("Recommendation", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== "Pending") {
      console.log(order.resultDetail.documentdetail);

      Object.entries(order.resultDetail.documentdetail).map(
        ([keys, value], i) =>
          setValue(keys, value, {
            shouldValidate: true,
            shouldDirty: true,
          })
      );
    }

    return () => {};
  }, [order]);

  const getSearchfacility = (obj) => {
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

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    //  console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentType = "Diagnostic Result";
    document.documentname = `${order.serviceInfo.name} Result`;
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = order.orderInfo.orderObj.clientId;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = reportStatus;
    document.billId = order._id;
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast.error(
        " Documentation data missing, requires location and facility details"
      );
      return;
    }

    if (bill_report_status === "Pending") {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then((res) => {
          setSuccess(true);
          toast.success("Lab Result created succesfully");
          setSuccess(false);
        })
        .catch((err) => {
          toast.error("Error creating Lab Result " + err);
        });
    }

    if (bill_report_status === "Draft") {
      ClientServ.patch(order.resultDetail._id, document)
        .then((res) => {
          setSuccess(true);
          toast({
            message: "Lab Result updated succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
          toast({
            message: "Error updating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
    const newProductEntryModule = {
      selectedFinance: order,
      show: "show",
      // report_status:order.report_status
    };
    await setState((prevstate) => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
  };

  const handleChangeStatus = async (e) => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };
  const handleChangePart = async (e) => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* specimen details field */}

        <Grid container spacing={0.1} mt={1}>
          <p style={{ fontWeight: "700" }} className="label is-small">
            SEROLOGY
          </p>
        </Grid>
        <Grid container spacing={0.1} mt={1}>
          <Typography
            variant="p"
            sx={{
              color: "blue",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "4px",
            }}
          >
            SPECIMEN Details
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={2.4}>
              <Input
                label="Specimen"
                name="specimen"
                type="text"
                register={register("specimen", { required: false })}
              />
            </Grid>
            <Grid item xs={12} sm={2.4}>
              <Input
                label="Date Of Request"
                name="request_date"
                type="text"
                register={register("request_date", { required: true })}
                defaultValue={dayjs(order.createdAt).format(
                  "DD/MM/YYYY hh:mm A"
                )}
              />
            </Grid>
            <Grid item xs={12} sm={2.4}>
              <MuiCustomDatePicker
                control={control}
                label="Date Of Collection"
                name="collection_date"
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={2.4}>
              <Input
                label="Time Of Collection"
                name="collection_time"
                type="time"
                register={register("collection_time", { required: false })}
              />
            </Grid>
            <Grid item xs={12} sm={2.4}>
              <Input
                label="Volume"
                name="volume"
                type="text"
                register={register("volume", { required: false })}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={1} mt={1}>
          <Grid item xs={12} sm={2}>
            <Input
              label="HBsAG"
              name="hbsag"
              type="text"
              register={register("hbsag")}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Input
              label="HCV"
              name="hcv"
              type="text"
              register={register("hcv")}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Input
              label="VDRL"
              name="vdrl"
              type="text"
              register={register("vdrl")}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Input
              label="RPHA"
              name="rpha"
              type="text"
              register={register("rpha")}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Input
              label="COOMBS"
              name="coombs"
              type="text"
              register={register("coombs")}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Input
              label="A.S.O Titre"
              name="asoTitre"
              type="text"
              register={register("asoTitre")}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Input
              label="SLE"
              name="sle"
              type="text"
              register={register("sle")}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Input
              label="R.A Factor"
              name="raFactor"
              type="text"
              register={register("raFactor")}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Input
              label="B-HCG"
              name="bHcg"
              type="text"
              register={register("bHcg")}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Input
              label="MANTOUX"
              name="mantoux"
              type="text"
              register={register("mantoux")}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Input
              label="Blood Preg. Test"
              name="bloodPregTest"
              type="text"
              register={register("bloodPregTest")}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Input
              label="XYZ"
              name="xyz"
              type="text"
              register={register("xyz")}
            />
          </Grid>
        </Grid>

        <Grid container spacing={1} mt={2}>
          <Grid item sm={6}>
            <Grid container xs={12} spacing={1}>
              <Grid item spacing={1} sm={4}>
                <Typography
                  variant="p"
                  sx={{
                    color: "black",
                    fontSize: "14px",
                    // fontWeight: "lighter",
                    marginBottom: "4px",
                  }}
                >
                  Salmonella Typhi :
                </Typography>
              </Grid>
              <Grid item spacing={1} sm={4}>
                <Input
                  label="H"
                  name="Salmonella_Typhi_H"
                  type="text"
                  register={register("Salmonella_Typhi_H")}
                />
              </Grid>
              <Grid item spacing={1} sm={4}>
                <Input
                  label="O"
                  name="Salmonella_Typhi_O"
                  type="text"
                  register={register("Salmonella_Typhi_O")}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6}>
            <Grid container xs={12} spacing={1}>
              <Grid item spacing={1} sm={4}>
                <Typography
                  variant="p"
                  sx={{
                    color: "black",
                    fontSize: "14px",
                    // fontWeight: "lighter",
                    marginBottom: "4px",
                  }}
                >
                  Salmonella Paratyphi A :
                </Typography>
              </Grid>
              <Grid item spacing={1} sm={4}>
                <Input
                  label="H"
                  name="Salmonella_Paratyphi_A_H"
                  type="text"
                  register={register("Salmonella_Paratyphi_A_H")}
                />
              </Grid>
              <Grid item spacing={1} sm={4}>
                <Input
                  label="O"
                  name="Salmonella_Paratyphi_A_O"
                  type="text"
                  register={register("Salmonella_Paratyphi_A_O")}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6}>
            <Grid container xs={12} spacing={1}>
              <Grid item spacing={1} sm={4}>
                <Typography
                  variant="p"
                  sx={{
                    color: "black",
                    fontSize: "14px",
                    // fontWeight: "lighter",
                    marginBottom: "4px",
                  }}
                >
                  Salmonella Paratyphi B :
                </Typography>
              </Grid>
              <Grid item spacing={1} sm={4}>
                <Input
                  label="H"
                  name="Salmonella_Paratyphi_B_H"
                  type="text"
                  register={register("Salmonella_Paratyphi_B_H")}
                />
              </Grid>
              <Grid item spacing={1} sm={4}>
                <Input
                  label="O"
                  name="Salmonella_Paratyphi_B_O"
                  type="text"
                  register={register("Salmonella_Paratyphi_B_O")}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6}>
            <Grid container xs={12} spacing={1}>
              <Grid item spacing={1} sm={4}>
                <Typography
                  variant="p"
                  sx={{
                    color: "black",
                    fontSize: "14px",
                    // fontWeight: "lighter",
                    marginBottom: "4px",
                  }}
                >
                  Salmonella Paratyphi C :
                </Typography>
              </Grid>
              <Grid item spacing={1} sm={4}>
                <Input
                  label="H"
                  name="Salmonella_Paratyphi_C_H"
                  type="text"
                  register={register("Salmonella_Paratyphi_C_H")}
                />
              </Grid>
              <Grid item spacing={1} sm={4}>
                <Input
                  label="O"
                  name="Salmonella_Paratyphi_C_O"
                  type="text"
                  register={register("Salmonella_Paratyphi_C_O")}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={1} mt={1}>
          <Grid item xs={12} sm={6}>
            <Textarea
              placeholder="Recommendation"
              name="Recommendation"
              type="text"
              register={register("Recommendation")}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} mt={1}>
          <Grid item xs={12} sm={2}>
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === "Draft" || reportStatus === "Pending"}
              onChange={(e) => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === "Final"}
              style={{
                margin: "0 1rem",
              }}
            />
            <span
              style={{
                fontSize: "1rem",
              }}
            >
              {" "}
              Draft
            </span>
          </Grid>{" "}
          <Grid item xs={12} sm={6}>
            <input
              type="radio"
              name="status"
              value="Final"
              checked={reportStatus === "Final"}
              onChange={(e) => handleChangePart(e)}
              disabled={bill_report_status === "Final"}
              style={{
                margin: "0 1rem",
              }}
            />
            <span
              style={{
                fontSize: "1rem",
              }}
            >
              {" "}
              Final{" "}
            </span>
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={12}>
            {bill_report_status !== "Final" && (
              <GlobalCustomButton
                text={bill_report_status === "Pending" ? "Save" : "Update"}
                onClick={handleSubmit(onSubmit)}
                color="success"
              />
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export function ChemicalPathologyAndTumorMarkers() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);

  const [docStatus, setDocStatus] = useState("Draft");
  const [reportStatus, setReportStatus] = useState("Draft");
  const ClientServ = client.service("labresults");
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;
  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!order.resultDetail?.documentdetail) {
      setValue("Finding", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("Recommendation", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== "Pending") {
      console.log(order.resultDetail.documentdetail);

      Object.entries(order.resultDetail.documentdetail).map(
        ([keys, value], i) =>
          setValue(keys, value, {
            shouldValidate: true,
            shouldDirty: true,
          })
      );
    }

    return () => {};
  }, [order]);

  const getSearchfacility = (obj) => {
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
  const onSubmit = async (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    console.log("===>> form data", { data });
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentType = "Diagnostic Result";
    document.documentname = `${order.serviceInfo.name} Result`;
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = order.orderInfo.orderObj.clientId;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = reportStatus;
    document.billId = order._id;
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

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

    if (bill_report_status === "Pending") {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then((res) => {
          setSuccess(true);
          toast.success("Lab Result created succesfully");
          // toast({
          //   message: "Lab Result created succesfully",
          //   type: "is-success",
          //   dismissible: true,
          //   pauseOnHover: true,
          // });
          setSuccess(false);
        })
        .catch((err) => {
          toast.error("Error creating Lab Result " + err);
        });
    }

    if (bill_report_status === "Draft") {
      ClientServ.patch(order.resultDetail._id, document)
        .then((res) => {
          setSuccess(true);
          toast.success("Lab Result updated succesfully");
          setSuccess(false);
        })
        .catch((err) => {
          toast.error("Error updating Lab Result " + err);
        });
    }
    const newProductEntryModule = {
      selectedFinance: order,
      show: "show",
      // report_status:order.report_status
    };
    await setState((prevstate) => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
  };

  const handleChangeStatus = async (e) => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };
  const handleChangePart = async (e) => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };

  const thyriodHormoneSchema = [
    {
      label: "TSH",
      name: "thyriod_hormone_tsh",
      des: "mIU/L (0.4 - 5.2)",
      minRange: 0.4,
      maxRange: 5.2,
    },
    {
      label: "Free T3",
      name: "thyriod_hormone_Free_T3",
      des: "ug/dL (60.0 – 1800.0)",
      minRange: 60.0,
      maxRange: 1800.0,
    },
    {
      label: "Free T4",
      name: "thyriod_hormone_Free_T4",
      des: "ug/dL (0.8 – 2.8)",
      minRange: 0.8,
      maxRange: 2.8,
    },
    {
      label: "Total T3",
      name: "thyriod_hormone_Total_T3",
      des: "ug/dL (130.0 – 450.0)",
      minRange: 130.0,
      maxRange: 450.0,
    },
    {
      label: "Total T4",
      name: "thyriod_hormone_Total_T4",
      des: "ng/dL (5.0 – 12.0)",
      minRange: 5.0,
      maxRange: 12.0,
    },
    {
      label: "TPO Ab",
      name: "thyriod_hormone_TPO_Ab",
      des: "Iu/mL (0 - 34)",
      minRange: 0,
      maxRange: 34,
    },
  ];

  const femaleHormoneProfileSchema = [
    {
      label: "Estrogen",
      name: "female_hormone_profile_Estrogen",
      des: "pg/mL (10 - 350)",
      minRange: 10,
      maxRange: 350,
    },
    {
      label: "Progesterone",
      name: "female_hormone_profile_Progesterone",
      des: "ng/mL (0 - 300)",
      minRange: 0,
      maxRange: 300,
    },
    {
      label: "FSH",
      name: "female_hormone_profile_FSH",
      des: "mIU/L (0 – 135)",
      minRange: 0,
      maxRange: 135,
    },
    {
      label: "CH",
      name: "female_hormone_profile_CH",
      des: "",
    },
    {
      label: "Prolactin",
      name: "female_hormone_profile_Prolactin",
      des: "ng/mL (20 - 400)",
      minRange: 20,
      maxRange: 400,
    },
    {
      label: "Estradiol",
      name: "female_hormone_profile_Estradiol",
      des: "pg/mL (0 – 400)",
      minRange: 0,
      maxRange: 400,
    },
  ];

  const tumorMakerHormoneSchema = [
    {
      label: "PSA",
      name: "tumor_maker_hormone_PSA",
      des: "ng/mL",
      isRange: false,
    },
    {
      label: "AFP",
      name: "tumor_maker_hormone_AFP",
      des: "ng/mL",
      isRange: false,
    },
    {
      label: "CFA",
      name: "tumor_maker_hormone_CFA",
      des: "ug/L (0.7 - 1.9)",
      minRange: 0.7,
      maxRange: 1.9,
      isRange: true,
    },
    {
      label: "CA-125",
      name: "tumor_maker_hormone_CA-125",
      des: "",
      isRange: true,
    },
    {
      label: "B-HCG",
      name: "tumor_maker_hormone_B-HCG",
      des: "mIU/L (6.3 - 12 )",
      minRange: 6.3,
      maxRange: 12,
      isRange: true,
    },
    {
      label: "CA-15-3",
      name: "tumor_maker_hormone_CA-15-3",
      des: "U/mL (0 - 37)",
      minRange: 0,
      maxRange: 37,
      isRange: true,
    },
    {
      label: "CA-19-9",
      name: "tumor_maker_hormone_CA-19-9",
      des: "U/mL (0 - 37)",
      minRange: 0,
      maxRange: 37,
      isRange: true,
    },
  ];

  const otherTumorMakerHormoneSchema = [
    {
      label: "Cortisol",
      name: "other_tumor_maker_hormone_Cortisol",
      des: "ug/dL (0 - 20)",
      minRange: 0,
      maxRange: 20,
    },
    {
      label: "ACTH",
      name: "other_tumor_maker_hormone_ACTH",
      des: "pg/mL (0 - 60)",
      minRange: 0,
      maxRange: 60,
    },
    {
      label: "Ferritin",
      name: "other_tumor_maker_hormone_Ferritin",
      des: "ng/mL (20 - 300)",
      minRange: 20,
      maxRange: 300,
    },
    {
      label: "Folate",
      name: "other_tumor_maker_hormone_Folate",
      des: "ng/mL (2 - 20)",
      minRange: 2,
      maxRange: 20,
    },
    {
      label: "Vit. B12",
      name: "other_tumor_maker_hormone_Vitamin_B12",
      des: "",
    },
    {
      label: "Vit. D2",
      name: "other_tumor_maker_hormone_Vitamin_D2",
      des: "ng/mL (10 - 100)",
      minRange: 10,
      maxRange: 100,
    },
    {
      label: "Vitamin D3",
      name: "other_tumor_maker_hormone_Vitamin_D3",
      des: "mIU/mL (0 - 20)",
      minRange: 0,
      maxRange: 20,
    },
    {
      label: "Insulin",
      name: "other_tumor_maker_hormone_Insulin",
      des: "",
    },
    {
      label: "C-Peptide",
      name: "other_tumor_maker_hormone_C-Peptide",
      des: "ng/mL (0 - 5)",
      minRange: 0,
      maxRange: 5,
    },
  ];

  const inputStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    padding: "0.9rem",
    width: "100%",
    height: "100%",
    borderRadius: " 4px",
    border: "1.5px solid #BBBBBB",
    width: "100%",
    // on focus
    "&:focus": {
      border: "2px solid #0364FF",
    },
  };
  const labelStyle = {
    position: "absolute",
    left: "1rem",
    top: "-0.5rem",
    padding: "0 0.25rem",
    backgroundColor: "#fff",
    transition: "0.4s",
    wordBreak: "break-word",
  };

  const classes = useStyles();

  const validateAndDisplayMessage = (fieldName, value, minRange, maxRange) => {
    if (value < minRange) {
      return "low";
    } else if (value > maxRange) {
      return "High";
    } else if (value >= minRange && value <= maxRange) {
      return "Normal";
    } else {
      return "Invalid Input";
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p
          style={{ fontWeight: "700", marginBottom: "2px" }}
          className="label is-small"
        >
          Chemical Pathology and Tumor Markers
        </p>

        {/* specimen details field */}
        <Grid container spacing={0.1} mt={1}>
          <Typography
            variant="p"
            sx={{
              color: "blue",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "4px",
            }}
          >
            SPECIMEN Details
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={2}>
              <Input
                label="Specimen"
                name="specimen"
                type="text"
                register={register("specimen", { required: false })}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Input
                label="Date Of Request"
                name="request_date"
                type="text"
                register={register("request_date", { required: true })}
                defaultValue={dayjs(order.createdAt).format(
                  "DD/MM/YYYY hh:mm A"
                )}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <MuiCustomDatePicker
                control={control}
                label="Date Of Collection"
                name="collection_date"
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Input
                label="Time Of Collection"
                name="collection_time"
                type="time"
                register={register("collection_time", { required: false })}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Input
                label="Volume"
                name="volume"
                type="text"
                register={register("volume", { required: false })}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Input
                label="LMP"
                name="lmp"
                type="text"
                register={register("lmp", { required: false })}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={1} mt={2}>
          {/* THYROID HORMONE */}
          <Grid item xs={12} sm={4}>
            <Grid container>
              <Typography
                variant="p"
                sx={{
                  color: "blue",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              >
                THYROID HORMONE
              </Typography>
              <Grid container alignItems="center">
                {thyriodHormoneSchema.map((data, index) => (
                  <Grid key={index} spacing={2} item xs={12} sm={12} mb={2}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={7}>
                        <Input
                          label={data.label}
                          name={data.name}
                          type="text"
                          register={register(`${data.name}`, {
                            required: false,
                          })}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <Typography
                          sx={{
                            fontSize: "10px",
                            fontWeight: "bold",
                            marginBottom: "4px",
                          }}
                        >
                          {data.des}
                        </Typography>
                        {watch(data.name) !== "" && data.des && (
                          <Typography
                            variant="p"
                            sx={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              marginBottom: "4px",
                              color: `${
                                validateAndDisplayMessage(
                                  data.name,
                                  parseFloat(watch(data.name)),
                                  data.minRange,
                                  data.maxRange
                                ) === "Normal"
                                  ? "green"
                                  : "red"
                              }`,
                            }}
                          >
                            {validateAndDisplayMessage(
                              data.name,
                              parseFloat(watch(data.name)),
                              data.minRange,
                              data.maxRange
                            )}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          {/**  FEMALE HORMONE PROFILE */}
          <Grid item xs={12} sm={4}>
            <Grid container>
              <Typography
                variant="p"
                sx={{
                  color: "blue",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              >
                FEMALE HORMONE PROFILE
              </Typography>
              <Grid container alignItems="center">
                {femaleHormoneProfileSchema.map((data, index) => (
                  <Grid key={index} spacing={2} item xs={12} sm={12} mb={2}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={7}>
                        <Input
                          label={data.label}
                          name={data.name}
                          type="text"
                          register={register(`${data.name}`, {
                            required: false,
                          })}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <Typography
                          sx={{
                            fontSize: "10px",
                            fontWeight: "bold",
                            marginBottom: "4px",
                          }}
                        >
                          {data.des}
                        </Typography>
                        {watch(data.name) !== "" && data.des && (
                          <Typography
                            variant="p"
                            sx={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              marginBottom: "4px",
                              color: `${
                                validateAndDisplayMessage(
                                  data.name,
                                  parseFloat(watch(data.name)),
                                  data.minRange,
                                  data.maxRange
                                ) === "Normal"
                                  ? "green"
                                  : "red"
                              }`,
                            }}
                          >
                            {validateAndDisplayMessage(
                              data.name,
                              parseFloat(watch(data.name)),
                              data.minRange,
                              data.maxRange
                            )}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          {/**   TUMOR MARKERS */}
          <Grid item xs={12} sm={4}>
            <Grid container>
              <Typography
                variant="p"
                sx={{
                  color: "blue",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              >
                TUMOR MARKERS
              </Typography>
              <Grid container alignItems="center">
                {tumorMakerHormoneSchema.map((data, index) => (
                  <Grid key={index} spacing={2} item xs={12} sm={12} mb={2}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={7}>
                        <Input
                          label={data.label}
                          name={data.name}
                          type="text"
                          register={register(`${data.name}`, {
                            required: false,
                          })}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <Typography
                          sx={{
                            fontSize: "10px",
                            fontWeight: "bold",
                            marginBottom: "4px",
                          }}
                        >
                          {data.des}
                        </Typography>
                        {watch(data.name) !== "" && data.isRange && (
                          <Typography
                            variant="p"
                            sx={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              marginBottom: "4px",
                              color: `${
                                validateAndDisplayMessage(
                                  data.name,
                                  parseFloat(watch(data.name)),
                                  data.minRange,
                                  data.maxRange
                                ) === "Normal"
                                  ? "green"
                                  : "red"
                              }`,
                            }}
                          >
                            {validateAndDisplayMessage(
                              data.name,
                              parseFloat(watch(data.name)),
                              data.minRange,
                              data.maxRange
                            )}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider
          sx={{
            margin: "20px 0",
            background: "#2d2d2d",
          }}
        />

        <Grid container spacing={1} mt={3}>
          {/**   OTHER HORMONES MARKERS */}
          <Grid item xs={12} sm={12}>
            <Grid container>
              <Typography
                variant="p"
                sx={{
                  color: "blue",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              >
                OTHER HORMONES MARKERS
              </Typography>
              <Grid container alignItems="center">
                {otherTumorMakerHormoneSchema.map((data, index) => (
                  <Grid key={index} spacing={2} item xs={12} sm={4} mb={2}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={7}>
                        <Input
                          label={data.label}
                          name={data.name}
                          type="text"
                          register={register(`${data.name}`, {
                            required: false,
                          })}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <Typography
                          sx={{
                            fontSize: "10px",
                            fontWeight: "bold",
                            marginBottom: "4px",
                          }}
                        >
                          {data.des}
                        </Typography>
                        {watch(data.name) !== "" && data.des && (
                          <Typography
                            variant="p"
                            sx={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              marginBottom: "4px",
                              color: `${
                                validateAndDisplayMessage(
                                  data.name,
                                  parseFloat(watch(data.name)),
                                  data.minRange,
                                  data.maxRange
                                ) === "Normal"
                                  ? "green"
                                  : "red"
                              }`,
                            }}
                          >
                            {validateAndDisplayMessage(
                              data.name,
                              parseFloat(watch(data.name)),
                              data.minRange,
                              data.maxRange
                            )}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* Pathologist Report/Comment*/}
        <Grid container spacing={1} mt={2}>
          <Typography
            variant="p"
            sx={{
              color: "blue",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "4px",
            }}
          >
            Pathologist Report/Comment
          </Typography>
          <Grid item xs={12} sm={12}>
            <Textarea
              placeholder="Pathologist Report/Comment"
              name="pathologist_Report_Comment"
              type="text"
              register={register("pathologist_Report_Comment")}
            />
          </Grid>
        </Grid>

        {/* draft and final radio  field*/}
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={2}>
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === "Draft" || reportStatus === "Pending"}
              onChange={(e) => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === "Final"}
              style={{
                margin: "1rem",
              }}
            />
            <span
              style={{
                fontSize: "1rem",
              }}
            >
              {" "}
              Draft
            </span>
          </Grid>{" "}
          <Grid item xs={12} sm={2}>
            <input
              type="radio"
              name="status"
              value="Final"
              checked={reportStatus === "Final"}
              onChange={(e) => handleChangePart(e)}
              disabled={bill_report_status === "Final"}
              style={{
                margin: "1rem",
              }}
            />
            <span
              style={{
                fontSize: "1rem",
              }}
            >
              {" "}
              Final{" "}
            </span>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={12}>
            {bill_report_status !== "Final" && (
              <GlobalCustomButton
                text={bill_report_status === "Pending" ? "Save" : "Update"}
                onClick={handleSubmit(onSubmit)}
                color="success"
              />
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export function Biochemistry() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);

  const [docStatus, setDocStatus] = useState("Draft");
  const [reportStatus, setReportStatus] = useState("Draft");
  const ClientServ = client.service("labresults");
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;
  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!order.resultDetail?.documentdetail) {
      setValue("Finding", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("Recommendation", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== "Pending") {
      console.log(order.resultDetail.documentdetail);

      Object.entries(order.resultDetail.documentdetail).map(
        ([keys, value], i) =>
          setValue(keys, value, {
            shouldValidate: true,
            shouldDirty: true,
          })
      );
    }

    return () => {};
  }, [order]);

  const getSearchfacility = (obj) => {
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

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    console.log("===>> form data", { data });
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentType = "Diagnostic Result";
    document.documentname = `${order.serviceInfo.name} Result`;
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = order.orderInfo.orderObj.clientId;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = reportStatus;
    document.billId = order._id;
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

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

    if (bill_report_status === "Pending") {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then((res) => {
          setSuccess(true);
          toast.success("Lab Result created succesfully");
          // toast({
          //   message: "Lab Result created succesfully",
          //   type: "is-success",
          //   dismissible: true,
          //   pauseOnHover: true,
          // });
          setSuccess(false);
        })
        .catch((err) => {
          toast.error("Error creating Lab Result " + err);
        });
    }

    if (bill_report_status === "Draft") {
      ClientServ.patch(order.resultDetail._id, document)
        .then((res) => {
          setSuccess(true);
          toast.success("Lab Result updated succesfully");
          setSuccess(false);
        })
        .catch((err) => {
          toast.error("Error updating Lab Result " + err);
        });
    }
    const newProductEntryModule = {
      selectedFinance: order,
      show: "show",
      // report_status:order.report_status
    };
    await setState((prevstate) => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
  };

  const handleChangeStatus = async (e) => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };
  const handleChangePart = async (e) => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };

  const ureaElectolyteCreatinineSchema = [
    {
      label: "Urea",
      name: "urea_electolyte_reatinine_Urea",
      des: "mmol/L ( )",
      sup: false,
      supValue: "",
      sub: false,
      subValue: "",
    },
    {
      label: "Na",
      name: "urea_electolyte_reatinine_Na+",
      des: "mmol/L ( )",
      sup: true,
      supValue: "+",
      sub: false,
      subValue: "",
    },
    {
      label: "K",
      name: "urea_electolyte_reatinine_K+",
      des: " mmol/L ( )",
      sup: true,
      supValue: "+",
      sub: false,
      subValue: "",
    },
    {
      label: "HCO",
      name: "urea_electolyte_reatinine_HCO3",
      des: "mmol/L ( )",
      sup: false,
      supValue: "",
      sub: true,
      subValue: "3",
    },
    {
      label: "Cl",
      name: "urea_electolyte_reatinine_cl",
      des: " mmol/L ( )",
      sup: true,
      supValue: "-",
      sub: false,
      subValue: "",
    },
    {
      label: "Creatinine",
      name: "urea_electolyte_reatinine_Creatinine",
      des: "mmol/L ( )",
      sup: false,
      supValue: "",
      sub: false,
      subValue: "",
    },
  ];

  const lipidProfileSchema = [
    {
      label: "Total Cholesterol",
      name: "lipid_profile_Total_Cholesterol",
      des: "mmol/L ( )",
    },
    {
      label: "LDL-Cholesterol",
      name: "lipid_profile_LDL_Cholesterol",
      des: "mmol/L ( )",
    },
    {
      label: "Triglyceride",
      name: "lipid_profile_Triglyceride",
      des: "mmol/L ( )",
    },
  ];

  const liverFunctionSchema = [
    {
      label: "ALP",
      name: "liver_function_ALP",
      des: "U/L ( )",
    },
    {
      label: "ALT (SGPT)",
      name: "liver_function_ALT",
      des: "U/L ( )",
    },
    {
      label: "AST (SGPT)",
      name: "liver_function_AST",
      des: "U/L ( )",
    },
    {
      label: "Gamma GT ",
      name: "liver_function_Gamma_GT ",
      des: "U/L ( )",
    },
    {
      label: "Total Bilirubin",
      name: "liver_function_Total_Bilirubin",
      des: "umol/L ( )",
    },
    {
      label: "Direct Billirubin",
      name: "liver_function_Direct_Billirubin",
      des: "umol/L ( )",
    },
  ];

  const boneChemistrySchema = [
    {
      label: "Calcium",
      name: "bone_chemistry_Calcium",
      des: "mmol/L ( )",
      sup: false,
      supValue: "",
      sub: false,
      subValue: "",
    },
    {
      label: "Phosphate",
      name: "bone_chemistry_Phosphate",
      des: "mmol/L ( )",
      sup: false,
      supValue: "",
      sub: false,
      subValue: "",
    },
    {
      label: "Mg",
      name: "bone_hemistry_Mg+",
      des: "mmol/L ( )",
      sup: true,
      supValue: "+",
      sub: false,
      subValue: "",
    },
    {
      label: "Uric Acide",
      name: "bone_chemistry_Uric_Acide",
      des: "mmol/L ( )",
      sup: false,
      supValue: "",
      sub: false,
      subValue: "",
    },
  ];

  const cerebroSpinalFluidSchema = [
    {
      label: "Glucose",
      name: "cerebro_Spinal_Fluid_Glucose",
      des: "mmol/L ( )",
      sup: false,
      supValue: "",
      sub: false,
      subValue: "",
    },
    {
      label: "Protein",
      name: "bone_chemistry_Protein",
      des: "g/L ( )",
      sup: false,
      supValue: "",
      sub: false,
      subValue: "",
    },
    {
      label: "Cl",
      name: "bone_hemistry_CL-",
      des: "mmol/L ( )",
      sup: true,
      supValue: "-",
      sub: false,
      subValue: "",
    },
  ];

  const serumProteinsSchema = [
    {
      label: "Total Protein",
      name: "serum_proteins_Total_Protein",
      des: "g/L ( )",
    },
    {
      label: "Albumin",
      name: "serum_proteins_Albumin",
      des: "g/L ( )",
    },
    {
      label: "Globulin",
      name: "serum_proteins_Globulin",
      des: "g/L ( )",
    },
  ];

  const cardiacEnzymeSchema = [
    {
      label: "Troponin",
      name: "cardiac_enzyme_Troponin",
      des: "ng/ml ( )",
    },
    {
      label: "CK-MB ",
      name: "cardiac_enzyme_CK-MB ",
      des: "IU/L ( )",
    },
    {
      label: "Myoglobin",
      name: "cardiac_enzyme_Myoglobin",
      des: "ng/ml ( )",
    },
  ];

  const glucoseSchema = [
    {
      label: "RBG",
      name: "glucose_RBG",
      des: "mmol/L ( )",
    },
    {
      label: "2HPP",
      name: "glucose_2HPP",
      des: "mmol/L ( )",
    },
    {
      label: "OGTT",
      name: "glucose_OGTT",
      des: "mmol/L ( )",
    },
    {
      label: "HbAlc",
      name: "glucose_HbAlc",
      des: "% ( )",
    },
  ];

  const classes = useStyles();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p
          style={{ fontWeight: "700", marginBottom: "2px" }}
          className="label is-small"
        >
          CHEMICAL PATHOLOGY
        </p>

        {/* specimen details field */}
        <Grid container spacing={0.1} mt={1}>
          <Typography
            variant="p"
            sx={{
              color: "blue",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "4px",
            }}
          >
            SPECIMEN Details
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={3}>
              <Input
                label="Specimen"
                name="specimen"
                type="text"
                register={register("specimen", { required: false })}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Input
                label="Date Of Request"
                name="request_date"
                type="text"
                register={register("request_date", { required: true })}
                defaultValue={dayjs(order.createdAt).format(
                  "DD/MM/YYYY hh:mm A"
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <MuiCustomDatePicker
                control={control}
                label="Date Of Collection"
                name="collection_date"
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Input
                label="Time Of Collection"
                name="collection_time"
                type="time"
                register={register("collection_time", { required: false })}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Input
                label="Volume"
                name="volume"
                type="text"
                register={register("volume", { required: false })}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Input
                label="LMP"
                name="lmp"
                type="text"
                register={register("lmp", { required: false })}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={1} mt={2}>
          {/* UREA/ELECTOLYTE/ CREATININE */}
          <Grid item xs={12} sm={8}>
            <Grid container>
              <Typography
                variant="p"
                sx={{
                  color: "blue",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              >
                UREA/ELECTOLYTE/ CREATININE
              </Typography>
              <Grid container alignItems="center">
                {ureaElectolyteCreatinineSchema.map((data, index) => (
                  <Grid key={index} spacing={2} item xs={12} sm={6} mb={2}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={7}>
                        <InputForm
                          label={data.label}
                          name={data.name}
                          type="text"
                          register={register(`${data.name}`, {
                            required: false,
                          })}
                          labelObj={data}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <Typography>
                          {" "}
                          <label className={classes.boldLabel}>
                            {data.des}
                          </label>{" "}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          {/**  LIPID PROFILE */}
          <Grid item xs={12} sm={4}>
            <Grid container>
              <Typography
                variant="p"
                sx={{
                  color: "blue",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              >
                LIPID PROFILE
              </Typography>
              <Grid container alignItems="center">
                {lipidProfileSchema.map((data, index) => (
                  <Grid key={index} spacing={2} item xs={12} sm={12} mb={2}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={7}>
                        <Input
                          label={data.label}
                          name={data.name}
                          type="text"
                          register={register(`${data.name}`, {
                            required: false,
                          })}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <Typography>
                          {" "}
                          <label className={classes.boldLabel}>
                            {data.des}
                          </label>{" "}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={1} mt={2}>
          {/* LIVER FUNCTION */}
          <Grid item xs={12} sm={8}>
            <Grid container>
              <Typography
                variant="p"
                sx={{
                  color: "blue",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              >
                LIVER FUNCTION
              </Typography>
              <Grid container alignItems="center">
                {liverFunctionSchema.map((data, index) => (
                  <Grid key={index} spacing={2} item xs={12} sm={6} mb={2}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={7}>
                        <Input
                          label={data.label}
                          name={data.name}
                          type="text"
                          register={register(`${data.name}`, {
                            required: false,
                          })}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <Typography>
                          {" "}
                          <label className={classes.boldLabel}>
                            {data.des}
                          </label>{" "}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          {/**   BONE CHEMISTRY */}
          <Grid item xs={12} sm={4}>
            <Grid container>
              <Typography
                variant="p"
                sx={{
                  color: "blue",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              >
                BONE CHEMISTRY
              </Typography>
              <Grid container alignItems="center">
                {boneChemistrySchema.map((data, index) => (
                  <Grid key={index} spacing={2} item xs={12} sm={12} mb={2}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={7}>
                        <InputForm
                          label={data.label}
                          name={data.name}
                          type="text"
                          register={register(`${data.name}`, {
                            required: false,
                          })}
                          labelObj={data}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <Typography>
                          {" "}
                          <label className={classes.boldLabel}>
                            {data.des}
                          </label>{" "}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={1} mt={2}>
          {/*  CEREBRO-SPINAL FLUID*/}
          <Grid item xs={12} sm={4}>
            <Grid container>
              <Typography
                variant="p"
                sx={{
                  color: "blue",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              >
                CEREBRO-SPINAL FLUID
              </Typography>
              <Grid container alignItems="center">
                {cerebroSpinalFluidSchema.map((data, index) => (
                  <Grid key={index} spacing={2} item xs={12} sm={12} mb={2}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={7}>
                        <InputForm
                          label={data.label}
                          name={data.name}
                          type="text"
                          register={register(`${data.name}`, {
                            required: false,
                          })}
                          labelObj={data}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <Typography>
                          {" "}
                          <label className={classes.boldLabel}>
                            {data.des}
                          </label>{" "}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          {/**   SERUM PROTEINS */}
          <Grid item xs={12} sm={4}>
            <Grid container>
              <Typography
                variant="p"
                sx={{
                  color: "blue",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              >
                SERUM PROTEINS
              </Typography>
              <Grid container alignItems="center">
                {serumProteinsSchema.map((data, index) => (
                  <Grid key={index} spacing={2} item xs={12} sm={12} mb={2}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={7}>
                        <Input
                          label={data.label}
                          name={data.name}
                          type="text"
                          register={register(`${data.name}`, {
                            required: false,
                          })}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <Typography>
                          {" "}
                          <label className={classes.boldLabel}>
                            {data.des}
                          </label>{" "}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          {/**   CARDIAC ENZYME */}
          <Grid item xs={12} sm={4}>
            <Grid container>
              <Typography
                variant="p"
                sx={{
                  color: "blue",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              >
                CARDIAC ENZYME
              </Typography>
              <Grid container alignItems="center">
                {cardiacEnzymeSchema.map((data, index) => (
                  <Grid key={index} spacing={2} item xs={12} sm={12} mb={2}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={7}>
                        <InputForm
                          label={data.label}
                          name={data.name}
                          type="text"
                          register={register(`${data.name}`, {
                            required: false,
                          })}
                          labelObj={data}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <Typography>
                          {" "}
                          <label className={classes.boldLabel}>
                            {data.des}
                          </label>{" "}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={1} mt={2}>
          {/**  GLUCOSE */}
          <Grid item xs={12} sm={4}>
            <Grid container>
              <Typography
                variant="p"
                sx={{
                  color: "blue",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              >
                GLUCOSE
              </Typography>
              <Grid container alignItems="center">
                {glucoseSchema.map((data, index) => (
                  <Grid key={index} spacing={2} item xs={12} sm={12} mb={2}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={7}>
                        <Input
                          label={data.label}
                          name={data.name}
                          type="text"
                          register={register(`${data.name}`, {
                            required: false,
                          })}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <Typography>
                          {" "}
                          <label className={classes.boldLabel}>
                            {data.des}
                          </label>{" "}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={8}>
            {/* Comment/Recommendation */}
            <Grid container spacing={1} mt={2}>
              <Typography
                variant="p"
                sx={{
                  color: "blue",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              >
                Comment/Recommendation
              </Typography>
              <Grid item xs={12} sm={12}>
                <Textarea
                  placeholder="Comment/Recommendation"
                  name="comment_recommendation"
                  type="text"
                  register={register("comment_recommendation")}
                  sx={{ height: "100%" }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* draft and final radio  field*/}
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={2}>
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === "Draft" || reportStatus === "Pending"}
              onChange={(e) => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === "Final"}
              style={{
                margin: "1rem",
              }}
            />
            <span
              style={{
                fontSize: "1rem",
              }}
            >
              {" "}
              Draft
            </span>
          </Grid>{" "}
          <Grid item xs={12} sm={2}>
            <input
              type="radio"
              name="status"
              value="Final"
              checked={reportStatus === "Final"}
              onChange={(e) => handleChangePart(e)}
              disabled={bill_report_status === "Final"}
              style={{
                margin: "1rem",
              }}
            />
            <span
              style={{
                fontSize: "1rem",
              }}
            >
              {" "}
              Final{" "}
            </span>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={12}>
            {bill_report_status !== "Final" && (
              <GlobalCustomButton
                text={bill_report_status === "Pending" ? "Save" : "Update"}
                onClick={handleSubmit(onSubmit)}
                color="success"
              />
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export function Microbiology() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);

  const [docStatus, setDocStatus] = useState("Draft");
  const [reportStatus, setReportStatus] = useState("Draft");
  const [antibioticsListData, setAntibioticsListData] = useState([]);
  const [isolatedDrug, setIsolatedDrug] = useState("");

  const ClientServ = client.service("labresults");
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  const checkboxChecked = watch("swab");
  const checkboxCheckedOther = watch("others");
  const checkboxCheckedOthersInvestigation = watch("others_investigation");
  const watchantibiotic = watch("antibiotics_susceptibility_drug");

  // console.log("===>>>> order details is called", {
  //   order: order,
  //   draftDoc,
  // });

  useEffect(() => {
    if (!order.resultDetail?.documentdetail) {
      setValue("Finding", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("Recommendation", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== "Pending") {
      setAntibioticsListData(
        order.resultDetail.documentdetail.antibiotics_susceptibility_drug
      );
      Object.entries(order.resultDetail.documentdetail).map(
        ([keys, value], i) =>
          setValue(keys, value, {
            shouldValidate: true,
            shouldDirty: true,
          })
      );
    }

    return () => {};
  }, [order]);

  const getSearchfacility = (obj) => {
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

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }

    data.antibiotics_susceptibility_drug = antibioticsListData;
    document.documentdetail = data;
    document.documentType = "Diagnostic Result";
    document.documentname = `${order.serviceInfo.name} Result`;
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = user; //order.orderInfo.orderObj.clientId;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = reportStatus;
    document.billId = order._id;
    // document.geolocation = {
    //   type: "Point",
    //   coordinates: [state.coordinates.latitude, state.coordinates.longitude],
    // };
    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast.error(
        " Documentation data missing, requires location and facility details"
      );
      return;
    }
    // document.clientobj = user;
    document.documentClassId = user._id;

    if (bill_report_status === "Pending") {
      document.labFormType = state.labFormType;
      console.log("====>>>> create  document after subimmted", {
        document,
      });
      ClientServ.create(document)
        .then((res) => {
          console.log("====>>>> client respone", {
            res,
          });
          setSuccess(true);
          toast.success("Lab Result created succesfully");
          setSuccess(false);
        })
        .catch((err) => {
          console.log("====>>>> client erro", {
            err,
          });
          toast.error("Error creating Lab Result " + err);
        });
    }

    if (bill_report_status === "Draft") {
      ClientServ.patch(order.resultDetail._id, document)
        .then((res) => {
          setSuccess(true);
          toast.success("Lab Result updated succesfully");
          setSuccess(false);
        })
        .catch((err) => {
          toast.error("Error updating Lab Result " + err);
        });
    }
    const newProductEntryModule = {
      selectedFinance: order,
      show: "show",
      // report_status:order.report_status
    };
    await setState((prevstate) => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
  };

  const handleChangeStatus = async (e) => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };
  const handleChangePart = async (e) => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };

  const addAntibioticsSusceptibilityDrugAndIsolates = (data, e) => {
    e.preventDefault();
    console.log("====>>>> start");

    const newItem = {
      antibiotics_susceptibility_drug: isolatedDrug,
      isolate_one: data.isolateOne,
      isolate_two: data.isolateTwo,
      isolate_three: data.isolateThree,
    };

    setAntibioticsListData((prev) => [...prev, newItem]);

    console.log("====>>>> new array", { newItem });

    // Reset form values
    setIsolatedDrug("");
    setValue("isolateOne", "");
    setValue("isolateTwo", "");
    setValue("isolateThree", "");
  };

  const AntibioticsSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "sn",
      selector: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Drugs",
      key: "drugs",
      description: "Drugs",
      selector: (row, i) => row?.antibiotics_susceptibility_drug,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Isolate One",
      key: "isolate_one",
      description: "Isolate One",
      selector: (row) => row?.isolate_one,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Isolate Two",
      key: "isolate_two",
      description: "Isolate Two",
      selector: (row) => row?.isolate_two,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Isolate Three",
      key: "isolate_three",
      description: "Isolate One",
      selector: (row) => row?.isolate_three,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
  ];

  const specimenCheckBoxArray = [
    {
      name: "blood",
      label: "Blood",
    },
    {
      name: "serum",
      label: "Serum",
    },
    {
      name: "sputum",
      label: "Sputum",
    },
    {
      name: "urine",
      label: "Urine",
    },
    {
      name: "csf",
      label: "CSF",
    },
    {
      name: "stool",
      label: "Stool",
    },
    {
      name: "semen",
      label: "Semen",
    },
  ];

  const investigationReportedCheckBoxArray = [
    {
      name: "microscopy_general",
      label: "Microscopy General",
    },
    {
      name: "acid_fast_stain",
      label: "Acid Fast Stain",
    },
    {
      name: "microscopy_special_specify",
      label: "Microscopy (Special) specify",
    },
    {
      name: "zn_stain",
      label: "ZN Stain",
    },
    {
      name: "gram_stain",
      label: "Gram Stain",
    },
    {
      name: "culture",
      label: "Culture",
    },
    {
      name: "sensitivity",
      label: "Sensitivity",
    },
    {
      name: "microfilaria_skin_snip",
      label: "Microfilaria-skin snip",
    },
    {
      name: "mycology",
      label: "Mycology ",
    },
    {
      name: "parasitology_microscopy",
      label: "Parasitology Microscopy",
    },
    {
      name: "fecal_occult_blood",
      label: "Fecal Occult-Blood",
    },
    {
      name: "salmonella_shigella",
      label: "Salmonella/Shigella",
    },
  ];

  const microscopyArray = [
    {
      name: "consistency",
      label: "Consistency",
    },
    {
      name: "blood_mcs",
      label: "Blood",
    },
    {
      name: "rbc",
      label: "RBC",
    },
    {
      name: "mucus",
      label: "Mucus",
    },
    {
      name: "occult",
      label: "Occult ",
    },
    {
      name: "cus_cells_hpfne",
      label: "Pus Cells/Hpf",
    },
    {
      name: "rbc_hpf",
      label: "RBC/Hpf",
    },
    {
      name: "wbc_hpf",
      label: "WBC/Hpf",
    },
    {
      name: "bacterial_cells",
      label: "Bacterial Cells",
    },
    {
      name: "yeast_cells",
      label: "Yeast Cells",
    },
    {
      name: "ova",
      label: "Ova",
    },
    {
      name: "epith_cells",
      label: "Epith Cells",
    },
    {
      name: "crystals_casts",
      label: "Crystals/casts",
    },
    {
      name: "rbRespiratory_bacterial_Panel",
      label: "Respiratory Bacterial Panel",
    },
    {
      name: "respiratory_pcr_screen",
      label: "Respiratory PCR Screen",
    },
    {
      name: "respiratory_viral_panel",
      label: "Respiratory Viral Panel",
    },
    {
      name: "others_mcs",
      label: "Others",
    },
  ];

  const antibioticsSusceptibilityCheckBoxArray = [
    {
      name: "isolateTwo",
      label: "Isolate Two",
    },
    {
      name: "isolateThree",
      label: "Isolate Three",
    },
  ];

  const selectedDrugOptions = [
    "Penicillin",
    "Streptomycin",
    "Tetracycline",
    "Chloramphenicol",
    "Erythromycin",
    "Ampicillin",
    "Nalidixic Acid",
    "Gentamycin",
    "Nitrofurantoin",
    "Ciproflaxin",
    "Ceftriazone",
    "Ceftazidime",
    "Co-trimazole",
    "Meropenem",
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p
          style={{ fontWeight: "700", marginBottom: "2px" }}
          className="label is-small"
        >
          MICROBIOLOGY
        </p>

        {/* specimen field */}
        <Grid container spacing={0.1} mt={2}>
          <Typography
            variant="p"
            sx={{ color: "blue", fontSize: "14px", fontWeight: "bold" }}
          >
            SPECIMEN
          </Typography>
          <Grid container spacing={0.1} alignItems="center">
            {/* justifyContent={"center"} */}
            {specimenCheckBoxArray.map((data, index) => (
              <Grid item key={index} xs={12} sm={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register(data.name)}
                      color="primary"
                      defaultChecked={
                        order?.resultDetail?.documentdetail
                          ? order.resultDetail.documentdetail[data.name]
                          : false
                      }
                    />
                  }
                  label={data.label}
                />
              </Grid>
            ))}
            <Grid item xs={12} sm={6}>
              <Grid container spacing={0.1} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={<Checkbox {...register("swab")} color="primary" />}
                    label="Swab"
                    defaultChecked={
                      order?.resultDetail?.documentdetail
                        ? order.resultDetail.documentdetail["swap"]
                        : false
                    }
                  />
                </Grid>

                {checkboxChecked && (
                  <Grid item xs={12} sm={6}>
                    <Input
                      label="swab site"
                      name="swab_site"
                      type="text"
                      register={register("swab_site", { required: true })}
                    />{" "}
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={0.1} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...register("others")}
                        color="primary"
                        defaultChecked={
                          order?.resultDetail?.documentdetail
                            ? order.resultDetail.documentdetail["swap"]
                            : false
                        }
                      />
                    }
                    label="Others"
                  />
                </Grid>

                {checkboxCheckedOther && (
                  <Grid item xs={12} sm={6}>
                    <Input
                      label="Others"
                      name="others"
                      type="text"
                      register={register("others_text", { required: true })}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* specimen details field */}
        <Grid container spacing={0.1} mt={1}>
          <Typography
            variant="p"
            sx={{
              color: "blue",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "4px",
            }}
          >
            SPECIMEN Details
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={3}>
              <Input
                label="Date Of Request"
                name="request_date"
                type="text"
                register={register("request_date", { required: true })}
                defaultValue={dayjs(order.createdAt).format(
                  "DD/MM/YYYY hh:mm A"
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <MuiCustomDatePicker
                control={control}
                label="Date Of Collection"
                name="collection_date"
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Input
                label="Time Of Collection"
                name="collection_time"
                type="time"
                register={register("collection_time", { required: false })}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Input
                label="Volume"
                name="volume"
                type="text"
                register={register("volume", { required: false })}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* INVESTIGATION REPORTED field */}
        <Grid container spacing={0.1} mt={1}>
          <Typography
            variant="p"
            sx={{
              color: "blue",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "4px",
            }}
          >
            INVESTIGATION REPORTED
          </Typography>
          <Grid container spacing={2} alignItems="center">
            {/* justifyContent={"center"} */}
            {investigationReportedCheckBoxArray.map((data, index) => (
              <Grid item key={index} xs={12} sm={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register(`${data.name}`)}
                      color="primary"
                      defaultChecked={
                        order?.resultDetail?.documentdetail
                          ? order.resultDetail.documentdetail[data.name]
                          : false
                      }
                    />
                  }
                  label={data.label}
                />
              </Grid>
            ))}

            <Grid item xs={12} sm={6}>
              <Grid container spacing={0.1} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...register("others_investigation")}
                        color="primary"
                      />
                    }
                    label="Others(specify)"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {checkboxCheckedOthersInvestigation && (
                    <Input
                      label="Others"
                      name="others_investigation_text"
                      type="text"
                      register={register("others_investigation_text", {
                        required: true,
                      })}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Microscopy Details field */}
        <Grid container spacing={0.1} mt={1}>
          <Typography
            variant="p"
            sx={{
              color: "blue",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            Microscopy
          </Typography>
          <Grid container spacing={2} alignItems="center" mt={0.5}>
            {microscopyArray.map((data, index) => (
              <Grid key={index} item xs={12} sm={3}>
                <Input
                  label={data.label}
                  name={data.name}
                  type="text"
                  register={register(data.name, { required: false })}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Culture & Sensitivity Result field */}
        <Grid container spacing={1} mt={2}>
          <Typography
            variant="p"
            sx={{
              color: "blue",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "4px",
            }}
          >
            Culture & Sensitivity Result
          </Typography>
          <Grid item xs={12} sm={12}>
            <Textarea
              placeholder="Culture & Sensitivity Result"
              name="culture_sensitivity_result"
              type="text"
              register={register("culture_sensitivity_result")}
            />
          </Grid>
        </Grid>

        {/* Antibiotics Susceptibility field */}
        <Grid container spacing={0.1} mt={1}>
          <Typography
            variant="p"
            sx={{
              color: "blue",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "4px",
            }}
          >
            Antibiotics Susceptibility
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={2.5}>
              <CustomSelect
                label="Select Drug"
                name="antibiotics_susceptibility_drug"
                options={selectedDrugOptions}
                onChange={(e) => setIsolatedDrug(e.target.value)}
                defaultValue={isolatedDrug}
              />
            </Grid>
            <Grid item xs={12} sm={2.5}>
              <Input
                label="Isolate One"
                name="isolateOne"
                type="text"
                register={register("isolateOne", {
                  required: isolatedDrug === "" ? false : true,
                })}
              />
            </Grid>
            {antibioticsSusceptibilityCheckBoxArray.map((data, index) => (
              <Grid key={index} item xs={12} sm={2.5}>
                <Input
                  label={data.label}
                  name={data.name}
                  type="text"
                  register={register(data.name, {
                    required: false,
                  })}
                />
              </Grid>
            ))}

            <Grid item xs={12} sm={2}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
                gap={1}
              >
                <GlobalCustomButton
                  onClick={handleSubmit(
                    addAntibioticsSusceptibilityDrugAndIsolates
                  )} //{}
                  disabled={isolatedDrug == "" ? true : false}
                >
                  <AddBoxIcon sx={{ marginRight: "3px" }} fontSize="small" />
                  Add Drug
                </GlobalCustomButton>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Antibiotics Susceptibility  table field */}
        <Grid container spacing={0.1} mt={1}>
          <Box>
            <FormsHeaderText text="Drugs Added list" />
            <Box mt={1} mb={1}>
              <CustomTable
                title={""}
                columns={AntibioticsSchema}
                data={antibioticsListData || []}
                pointerOnHover
                highlightOnHover
                striped
                //onRowClicked={handleRow}
                CustomEmptyData="No Drug added yet..."
                progressPending={false}
                //conditionalRowStyles={conditionalRowStyles}
              />
            </Box>
          </Box>
        </Grid>

        {/* Recommendation field */}
        <Grid container spacing={1} mt={2}>
          <Typography
            variant="p"
            sx={{
              color: "blue",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "4px",
            }}
          >
            Recommendation
          </Typography>
          <Grid item xs={12} sm={12}>
            <Textarea
              placeholder="Recommendation"
              name="Recommendation"
              type="text"
              register={register("Recommendation")}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={2}>
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === "Draft" || reportStatus === "Pending"}
              onChange={(e) => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === "Final"}
              style={{
                margin: "1rem",
              }}
            />
            <span
              style={{
                fontSize: "1rem",
              }}
            >
              {" "}
              Draft
            </span>
          </Grid>{" "}
          <Grid item xs={12} sm={2}>
            <input
              type="radio"
              name="status"
              value="Final"
              checked={reportStatus === "Final"}
              onChange={(e) => handleChangePart(e)}
              disabled={bill_report_status === "Final"}
              style={{
                margin: "1rem",
              }}
            />
            <span
              style={{
                fontSize: "1rem",
              }}
            >
              {" "}
              Final{" "}
            </span>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={12}>
            {bill_report_status !== "Final" && (
              <GlobalCustomButton
                text={bill_report_status === "Pending" ? "Save" : "Update"}
                onClick={handleSubmit(onSubmit)}
                color="success"
              />
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export function Urine() {
  const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);
  const [reportStatus, setReportStatus] = useState("Draft");
  const ClientServ = client.service("labresults");
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  const [docStatus, setDocStatus] = useState("Draft");

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!order.resultDetail?.documentdetail) {
      setValue("Finding", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("Recommendation", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== "Pending") {
      console.log(order.resultDetail.documentdetail);

      Object.entries(order.resultDetail.documentdetail).map(
        ([keys, value], i) =>
          setValue(keys, value, {
            shouldValidate: true,
            shouldDirty: true,
          })
      );
    }

    return () => {};
  }, [order]);

  const getSearchfacility = (obj) => {
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
  const onSubmit = async (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    //  console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentType = "Diagnostic Result";
    document.documentname = `${order.serviceInfo.name} Result`;
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = order.orderInfo.orderObj.clientId;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = reportStatus;
    document.billId = order._id;
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast.error(
        " Documentation data missing, requires location and facility details"
      );
      return;
    }

    if (bill_report_status === "Pending") {
      document.labFormType = state.labFormType;
      dClientServ
        .create(document)
        .then((res) => {
          setSuccess(true);
          toast.success("Lab Result created succesfully");
          setSuccess(false);
        })
        .catch((err) => {
          toast.error("Error creating Lab Result " + err);
        });
    }

    if (bill_report_status === "Draft") {
      dClientServ
        .patch(order.resultDetail._id, document)
        .then((res) => {
          setSuccess(true);
          toast({
            message: "Lab Result updated succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
          toast({
            message: "Error updating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
    const newProductEntryModule = {
      selectedFinance: order,
      show: "show",
      // report_status:order.report_status
    };
    await setState((prevstate) => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
  };

  const handleChangeStatus = async (e) => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };
  const handleChangePart = async (e) => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p style={{ fontWeight: "700" }} className="label is-small">
          Urine
        </p>
        <Grid container spacing={1} mt={1}>
          <Grid item xs={12} sm={3}>
            <Input
              label="Macroscopy"
              name="macroscopy"
              type="text"
              register={register("macroscopy")}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input
              label="Microscopy"
              name="microscopy"
              type="text"
              register={register("microscopy")}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input
              label="Pus Cells/hof"
              name="pusCellsOrhof"
              type="text"
              register={register("pusCellsOrhof")}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input
              label="RBC/hpf"
              name="rbsOrHpf"
              type="text"
              register={register("rbsOrHpf")}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input
              label="Yeast Cells"
              name="yeastCells"
              type="text"
              register={register("yeastCells")}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input
              label="Bacteria"
              name="bacteria"
              type="text"
              register={register("bacteria")}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input
              label="Casts"
              name="casts"
              type="text"
              register={register("casts")}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input
              label="Epith Cells"
              name="epithCells"
              type="text"
              register={register("epithCells")}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input
              label="Crystals"
              name="crystals"
              type="text"
              register={register("crystals")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="T.V"
              name="tv"
              type="text"
              register={register("tv")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Textarea
              label="Culture Yielded"
              name="cultureYielded"
              register={register("cultureYielded")}
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Textarea
              label="Malaria Parasite"
              name="malariaParasite"
              register={register("malariaParasite")}
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Textarea
              label="Recommendation"
              name="Recommendation"
              register={register("Recommendation")}
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === "Draft" || reportStatus === "Pending"}
              onChange={(e) => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === "Final"}
              style={{
                margin: "1rem",
              }}
            />
            <span
              style={{
                fontSize: "1rem",
              }}
            >
              {" "}
              Draft
            </span>
          </Grid>{" "}
          <Grid item xs={12} sm={2}>
            <input
              type="radio"
              name="status"
              value="Final"
              checked={reportStatus === "Final"}
              onChange={(e) => handleChangePart(e)}
              disabled={bill_report_status === "Final"}
              style={{
                margin: "1rem",
              }}
            />
            <span
              style={{
                fontSize: "1rem",
              }}
            >
              {" "}
              Final{" "}
            </span>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={12}>
            {bill_report_status !== "Final" && (
              <GlobalCustomButton
                text={bill_report_status === "Pending" ? "Save" : "Update"}
                onClick={handleSubmit(onSubmit)}
                color="success"
              />
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export function Urinalysis() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);
  const [reportStatus, setReportStatus] = useState("Draft");
  const ClientServ = client.service("labresults");
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  const [docStatus, setDocStatus] = useState("Draft");

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!order.resultDetail?.documentdetail) {
      setValue("Finding", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("Recommendation", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== "Pending") {
      console.log(order.resultDetail.documentdetail);

      Object.entries(order.resultDetail.documentdetail).map(
        ([keys, value], i) =>
          setValue(keys, value, {
            shouldValidate: true,
            shouldDirty: true,
          })
      );
    }

    return () => {};
  }, [order]);

  const getSearchfacility = (obj) => {
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
  const onSubmit = async (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    //  console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentType = "Diagnostic Result";
    document.documentname = `${order.serviceInfo.name} Result`;
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = order.orderInfo.orderObj.clientId;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = reportStatus;
    document.billId = order._id;
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

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

    if (bill_report_status === "Pending") {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then((res) => {
          setSuccess(true);
          toast({
            message: "Lab Result created succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
          toast({
            message: "Error creating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }

    if (bill_report_status === "Draft") {
      ClientServ.patch(order.resultDetail._id, document)
        .then((res) => {
          setSuccess(true);
          toast({
            message: "Lab Result updated succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
          toast({
            message: "Error updating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
    const newProductEntryModule = {
      selectedFinance: order,
      show: "show",
      // report_status:order.report_status
    };
    await setState((prevstate) => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
  };

  const handleChangeStatus = async (e) => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };

  const handleChangePart = async (e) => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };

  const urinalysisSchema = [
    {
      label: "Appearance",
      name: "appearance",
      des: "",
    },
    {
      label: "Color",
      name: "color",
      des: "",
    },
    {
      label: "PH",
      name: "ph",
      des: "",
    },
    {
      label: "Protein",
      name: "protein",
      des: "",
    },
    {
      label: "Sugar",
      name: "sugar",
      des: "",
    },
    {
      label: "Ketones",
      name: "ketones",
      des: "",
    },
    {
      label: "Blood",
      name: "blood",
      des: "",
    },
    {
      label: "Billirubin",
      name: "billirubin",
      des: "",
    },
    {
      label: "S.G",
      name: "sg",
      des: "",
    },
    {
      label: "Nitrite",
      name: "nitrite",
      des: "",
    },
    {
      label: "Urobilin",
      name: "urobilin",
      des: "",
    },
    {
      label: "Urobilinogen",
      name: "urobilinogin",
      des: "",
    },
    {
      label: "Leucocyte",
      name: "leucocyte",
      des: "",
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p style={{ fontWeight: "700" }} className="label is-small">
          URINALYSIS
        </p>
        {/* specimen details field */}
        <Grid container spacing={0.1} mt={1}>
          <Typography
            variant="p"
            sx={{
              color: "blue",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "4px",
            }}
          >
            SPECIMEN Details
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={2.4}>
              <Input
                label="Specimen"
                name="specimen"
                type="text"
                register={register("specimen", { required: false })}
              />
            </Grid>
            <Grid item xs={12} sm={2.4}>
              <Input
                label="Date Of Request"
                name="request_date"
                type="text"
                register={register("request_date", { required: true })}
                defaultValue={dayjs(order.createdAt).format(
                  "DD/MM/YYYY hh:mm A"
                )}
              />
            </Grid>
            <Grid item xs={12} sm={2.4}>
              <MuiCustomDatePicker
                control={control}
                label="Date Of Collection"
                name="collection_date"
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={2.4}>
              <Input
                label="Time Of Collection"
                name="collection_time"
                type="time"
                register={register("collection_time", { required: false })}
              />
            </Grid>
            <Grid item xs={12} sm={2.4}>
              <Input
                label="Volume"
                name="volume"
                type="text"
                register={register("volume", { required: false })}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={2}>
          {urinalysisSchema.map((data, index) => (
            <Grid key={index} spacing={2} item xs={6} sm={2.4} mb={2}>
              <Input
                label={data.label}
                name={data.name}
                type="text"
                register={register(`${data.name}`, {
                  required: false,
                })}
              />
            </Grid>
          ))}
        </Grid>

        {/* Recommendation field */}
        <Grid container spacing={1} mt={2}>
          <Typography
            variant="p"
            sx={{
              color: "blue",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "4px",
            }}
          >
            Recommendation
          </Typography>
        </Grid>

        <Grid container spacing={1} mt={2}>
          <Grid item xs={12} sm={6}>
            <Textarea
              placeholder="Recommendation"
              name="Recommendation"
              type="text"
              register={register("Recommendation")}
            />
          </Grid>
        </Grid>

        <Grid container spacing={1} mt={1}>
          <Grid item xs={12} sm={2}>
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === "Draft" || reportStatus === "Pending"}
              onChange={(e) => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === "Final"}
              style={{
                margin: "1rem",
              }}
            />
            <span
              style={{
                fontSize: "1rem",
              }}
            >
              {" "}
              Draft
            </span>
          </Grid>{" "}
          <Grid item xs={12} sm={2}>
            <input
              type="radio"
              name="status"
              value="Final"
              checked={reportStatus === "Final"}
              onChange={(e) => handleChangePart(e)}
              disabled={bill_report_status === "Final"}
              style={{
                margin: "1rem",
              }}
            />
            <span
              style={{
                fontSize: "1rem",
              }}
            >
              {" "}
              Final{" "}
            </span>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={12}>
            {bill_report_status !== "Final" && (
              <GlobalCustomButton
                text={bill_report_status === "Pending" ? "Save" : "Update"}
                onClick={handleSubmit(onSubmit)}
                color="success"
              />
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export function Stool() {
  const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);
  const [reportStatus, setReportStatus] = useState("Draft");
  const ClientServ = client.service("labresults");
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  const [docStatus, setDocStatus] = useState("Draft");

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!order.resultDetail?.documentdetail) {
      setValue("Finding", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("Recommendation", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== "Pending") {
      console.log(order.resultDetail.documentdetail);

      Object.entries(order.resultDetail.documentdetail).map(
        ([keys, value], i) =>
          setValue(keys, value, {
            shouldValidate: true,
            shouldDirty: true,
          })
      );
    }

    return () => {};
  }, [order]);

  const getSearchfacility = (obj) => {
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

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    //  console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentType = "Diagnostic Result";
    document.documentname = `${order.serviceInfo.name} Result`;
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = order.orderInfo.orderObj.clientId;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = reportStatus;
    document.billId = order._id;
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

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

    if (bill_report_status === "Pending") {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then((res) => {
          setSuccess(true);
          toast({
            message: "Lab Result created succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
          toast({
            message: "Error creating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }

    if (bill_report_status === "Draft") {
      ClientServ.patch(order.resultDetail._id, document)
        .then((res) => {
          setSuccess(true);
          toast({
            message: "Lab Result updated succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
          toast({
            message: "Error updating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
    const newProductEntryModule = {
      selectedFinance: order,
      show: "show",
      // report_status:order.report_status
    };
    await setState((prevstate) => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
  };

  const handleChangeStatus = async (e) => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };
  const handleChangePart = async (e) => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p style={{ fontWeight: "700" }} className="label is-small">
          STOOL
        </p>
        <Grid container spacing={1} mt={1}>
          <Grid item xs={12} sm={4}>
            <Textarea
              placeholder="Macro"
              name="macro"
              type="text"
              register={register("macro")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Textarea
              placeholder="Micro"
              name="micro"
              type="text"
              register={register("macro")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Textarea
              placeholder="Culture"
              name="culture2"
              type="text"
              register={register("macro")}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} mt={1}>
          <Grid item xs={12} sm={12}>
            <Textarea
              placeholder="Recommendation"
              name="Recommendation"
              type="text"
              register={register("Recommendation")}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={2}>
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === "Draft" || reportStatus === "Pending"}
              onChange={(e) => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === "Final"}
              style={{
                margin: "1rem",
              }}
            />
            <span
              style={{
                fontSize: "1rem",
              }}
            >
              {" "}
              Draft
            </span>
          </Grid>{" "}
          <Grid item xs={12} sm={2}>
            <input
              type="radio"
              name="status"
              value="Final"
              checked={reportStatus === "Final"}
              onChange={(e) => handleChangePart(e)}
              disabled={bill_report_status === "Final"}
              style={{
                margin: "1rem",
              }}
            />
            <span
              style={{
                fontSize: "1rem",
              }}
            >
              {" "}
              Final{" "}
            </span>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={12}>
            {bill_report_status !== "Final" && (
              <GlobalCustomButton
                text={bill_report_status === "Pending" ? "Save" : "Update"}
                onClick={handleSubmit(onSubmit)}
                color="success"
              />
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export function HVS() {
  const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);
  const [reportStatus, setReportStatus] = useState("Draft");
  const ClientServ = client.service("labresults");
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  const [docStatus, setDocStatus] = useState("Draft");

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!order.resultDetail?.documentdetail) {
      setValue("Finding", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("Recommendation", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== "Pending") {
      console.log(order.resultDetail.documentdetail);

      Object.entries(order.resultDetail.documentdetail).map(
        ([keys, value], i) =>
          setValue(keys, value, {
            shouldValidate: true,
            shouldDirty: true,
          })
      );
    }

    return () => {};
  }, [order]);

  const getSearchfacility = (obj) => {
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

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    //  console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentType = "Diagnostic Result";
    document.documentname = `${order.serviceInfo.name} Result`;
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = order.orderInfo.orderObj.clientId;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = reportStatus;
    document.billId = order._id;
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

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

    if (bill_report_status === "Pending") {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then((res) => {
          setSuccess(true);
          toast({
            message: "Lab Result created succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
          toast({
            message: "Error creating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }

    if (bill_report_status === "Draft") {
      ClientServ.patch(order.resultDetail._id, document)
        .then((res) => {
          setSuccess(true);
          toast({
            message: "Lab Result updated succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
          toast({
            message: "Error updating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
    const newProductEntryModule = {
      selectedFinance: order,
      show: "show",
      // report_status:order.report_status
    };
    await setState((prevstate) => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
  };

  const handleChangePart = async (e) => {
    console.log(e.target.value);
    setReportStatus(e.target.value);
  };

  useEffect(() => {
    if (!order.resultDetail?.documentdetail) {
      setValue("Finding", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("Recommendation", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== "Pending") {
      console.log(order.resultDetail.documentdetail);

      Object.entries(order.resultDetail.documentdetail).map(
        ([keys, value], i) =>
          setValue(keys, value, {
            shouldValidate: true,
            shouldDirty: true,
          })
      );
    }

    return () => {};
  }, [order]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p style={{ fontWeight: "700" }} className="label is-small">
          HVS CULTURE
        </p>
        <Grid container spacing={1} mt={1}>
          <Grid item xs={12} sm={3}>
            <Input
              label="Pus cells' hpf"
              name="pusCells"
              type="text"
              register={register("pusCells")}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input
              label="Rbcs/hpf"
              name="rbcsOrHpf"
              type="text"
              register={register("rbcsOrHpf")}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input
              label="Yeast Cells"
              name="yeastCells"
              type="text"
              register={register("yeastCells")}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input
              label="Bacteria"
              name="bacteria2"
              type="text"
              register={register("bacteria2")}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input
              label="Casts"
              name="casts"
              type="text"
              register={register("casts")}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input
              label="Epith Cells"
              name="epithCells2"
              type="text"
              register={register("epithCells2")}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input
              label="Crystals"
              name="crystals2"
              type="text"
              register={register("crystals2")}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input
              label="T.V"
              name="tv2"
              type="text"
              register={register("tv2")}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} mt={1}>
          <Grid item xs={12} sm={12}>
            <Textarea
              placeholder="Recommendation"
              name="Recommendation"
              type="text"
              register={register("Recommendation")}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={2}>
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === "Draft" || reportStatus === "Pending"}
              onChange={(e) => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === "Final"}
              style={{
                margin: "1rem",
              }}
            />
            <span
              style={{
                fontSize: "1rem",
              }}
            >
              {" "}
              Draft
            </span>
          </Grid>{" "}
          <Grid item xs={12} sm={2}>
            <input
              type="radio"
              name="status"
              value="Final"
              checked={reportStatus === "Final"}
              onChange={(e) => handleChangePart(e)}
              disabled={bill_report_status === "Final"}
              style={{
                margin: "1rem",
              }}
            />
            <span
              style={{
                fontSize: "1rem",
              }}
            >
              {" "}
              Final{" "}
            </span>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={12}>
            {bill_report_status !== "Final" && (
              <GlobalCustomButton
                text={bill_report_status === "Pending" ? "Save" : "Update"}
                onClick={handleSubmit(onSubmit)}
                color="success"
              />
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export function LabNoteGeneric() {
  const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);

  const [docStatus, setDocStatus] = useState("Draft");
  const [reportStatus, setReportStatus] = useState("Draft");
  const ClientServ = client.service("labresults");
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!order.resultDetail?.documentdetail) {
      setValue("Finding", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("Recommendation", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== "Pending") {
      console.log(order.resultDetail.documentdetail);

      Object.entries(order.resultDetail.documentdetail).map(
        ([keys, value], i) =>
          setValue(keys, value, {
            shouldValidate: true,
            shouldDirty: true,
          })
      );
    }

    return () => {};
  }, [order]);

  const getSearchfacility = (obj) => {
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

  const onSubmit = async (data) => {
    // e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    console.log(data);
    let document = {};
    // data.createdby=user._id
    //  console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentType = "Diagnostic Result";
    document.documentname = `${order.serviceInfo.name} Result`;
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = order.orderInfo.orderObj.clientId;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = reportStatus;
    document.billId = order._id;
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast.error(
        " Documentation data missing, requires location and facility details"
      );
      return;
    }

    if (bill_report_status === "Pending") {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then((res) => {
          //

          setSuccess(true);
          toast.success("Lab Result created succesfully");
          setSuccess(false);
        })
        .catch((err) => {
          toast.error(`Error creating Lab Result  + ${err}`);
        });
    }

    if (bill_report_status === "Draft") {
      ClientServ.patch(order.resultDetail._id, document)
        .then((res) => {
          //

          setSuccess(true);
          toast({
            message: "Lab Result updated succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
          toast({
            message: "Error updating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
    const newProductEntryModule = {
      selectedFinance: order,
      show: "show",
      // report_status:order.report_status
    };
    await setState((prevstate) => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
  };

  const handleChangeStatus = async (e) => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };
  const handleChangePart = async (e) => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };

  return (
    <>
      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={12}>
              <Input
                name="investigation"
                register={register("investigation")}
                type="text"
                placeholder="Investigation"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={12}>
              <Textarea
                name="finding"
                placeholder="Findings"
                register={register("finding")}
                type="text"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={12}>
              <Textarea
                name="recommendation"
                placeholder="Recommendation"
                register={register("recommendation")}
                type="text"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={2}>
              <input
                type="radio"
                name="status"
                value="Draft"
                checked={reportStatus === "Draft" || reportStatus === "Pending"}
                onChange={(e) => {
                  handleChangePart(e);
                }}
                disabled={bill_report_status === "Final"}
                style={{
                  margin: "0 1rem",
                }}
              />
              <span
                style={{
                  fontSize: "1rem",
                }}
              >
                {" "}
                Draft
              </span>
            </Grid>{" "}
            <Grid item xs={12} sm={2}>
              <input
                type="radio"
                name="status"
                value="Final"
                checked={reportStatus === "Final"}
                onChange={(e) => handleChangePart(e)}
                disabled={bill_report_status === "Final"}
                style={{
                  margin: "0 1rem",
                }}
              />
              <span
                style={{
                  fontSize: "1rem",
                }}
              >
                {" "}
                Final{" "}
              </span>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={2}>
              <GlobalCustomButton
                text={bill_report_status === "Pending" ? "Save" : "Update"}
                onClick={handleSubmit(onSubmit)}
                color="success"
              />
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
}

export function LabNoteCreate() {
  const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service("labresults");
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [reportStatus, setReportStatus] = useState("Draft");
  const { state, setState } = useContext(ObjectContext);

  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  const getSearchfacility = (obj) => {
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

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    //  console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentType = "Diagnostic Result";
    document.documentname = `${order.serviceInfo.name} Result`;
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = order.orderInfo.orderObj.clientId;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = reportStatus;
    document.billId = order._id;
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast.error(
        " Documentation data missing, requires location and facility details"
      );
      return;
    }

    if (bill_report_status === "Pending") {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then((res) => {
          setSuccess(true);
          toast({
            message: "Lab Result created succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
          toast.error("Error creating Lab Result " + err);
        });
    }

    if (bill_report_status === "Draft") {
      ClientServ.patch(order.resultDetail._id, document)
        .then((res) => {
          setSuccess(true);
          toast({
            message: "Lab Result updated succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
          toast({
            message: "Error updating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
    const newProductEntryModule = {
      selectedFinance: order,
      show: "show",
      // report_status:order.report_status
    };
    await setState((prevstate) => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
  };

  const handleChangePart = async (e) => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };

  useEffect(() => {
    if (!order.resultDetail?.documentdetail) {
      setValue("Finding", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("Recommendation", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== "Pending") {
      console.log(order.resultDetail.documentdetail);

      Object.entries(order.resultDetail.documentdetail).map(
        ([keys, value], i) =>
          setValue(keys, value, {
            shouldValidate: true,
            shouldDirty: true,
          })
      );
    }

    return () => {};
  }, [order]);

  return (
    <>
      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={12}>
              <Textarea
                name="Finding"
                placeholder="Findings"
                register={register("Finding")}
                type="text"
                disabled={bill_report_status === "Final"}
                style={{
                  cursor: bill_report_status === "Final" && "not-allowed",
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={12}>
              <Textarea
                name="Recommendation"
                placeholder="Recommendation"
                register={register("Recommendation")}
                type="text"
                disabled={bill_report_status === "Final"}
                style={{
                  cursor: bill_report_status === "Final" && "not-allowed",
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2}>
              <input
                type="radio"
                name="status"
                value="Draft"
                checked={reportStatus === "Draft" || reportStatus === "Pending"}
                onChange={(e) => {
                  handleChangePart(e);
                }}
                disabled={bill_report_status === "Final"}
                style={{
                  margin: "0 1rem",
                }}
              />
              <span> Draft</span>
            </Grid>{" "}
            <Grid item xs={12} sm={2}>
              <input
                type="radio"
                name="status"
                value="Final"
                checked={reportStatus === "Final"}
                onChange={(e) => handleChangePart(e)}
                disabled={bill_report_status === "Final"}
                style={{
                  margin: "0 1rem",
                }}
              />
              <span> Final </span>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={2}>
              {bill_report_status !== "Final" && (
                <GlobalCustomButton
                  text={bill_report_status === "Pending" ? "Save" : "Update"}
                  onClick={handleSubmit(onSubmit)}
                  color="success"
                />
              )}
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
}
