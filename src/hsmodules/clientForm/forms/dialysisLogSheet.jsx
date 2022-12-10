import {useContext} from "react";
import {useForm} from "react-hook-form";
import GlobalCustomButton from "../../../components/buttons/CustomButton";
import Input from "../../../components/inputs/basic/Input";
import MuiCustomDatePicker from "../../../components/inputs/Date/MuiDatePicker";
import Textarea from "../../../components/inputs/basic/Textarea";
import {Box, Grid, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {ObjectContext} from "../../../context";
import {FormsHeaderText} from "../../../components/texts";

const DialysisLogSheet = ({onSubmit}) => {
  const {register, handleSubmit, control} = useForm();

  const {state, setState} = useContext(ObjectContext);

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
  };

  return (
    <div className="card">
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb="1rem">
          <Input {...register("Name")} name="Name" label="Name" type="text" />
        </Box>

        <Box mb="1rem">
          <MuiCustomDatePicker name="date" label="Date" control={control} />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("noOfDialysis")}
            name="dialysis"
            label="No of Dialysis"
            type="number"
          />
        </Box>

        <Box mb="1rem">
          <Input {...register("age")} name="age" label="Age" type="number" />
        </Box>

        <Box mb="1rem">
          <Input {...register("sex")} name="sex" label="Sex" type="text" />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("dryWgt")}
            name="dry_weight"
            label="Dry Weight"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("diagonsis")}
            name="diagonsis"
            label="Diagonsis"
            type="text"
          />
        </Box>
        <Box mb="1rem">
          <Input
            {...register("lastDialysisWgt")}
            name="last_dialysis"
            label="Last Dialysis WT"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("currentWgt")}
            name="current"
            label="Current WT"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("wgtLossOrGain")}
            name="weight"
            label="Weight Loses/Gain"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("ultraFiltration")}
            name="ultra_filtration"
            label="Ultra Filtration"
            type="text"
          />
        </Box>
        <Box mb="1rem">
          <Input
            {...register("postDialysisWgt")}
            name="postDialysisWgt"
            label="Post Dialysis WT"
            type="text"
          />
        </Box>
        <Box mb="1rem">
          <Input
            {...register("wgtLoss")}
            name="weight_loss"
            label="Weight Loss"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("macType")}
            name="machine_type"
            label="Machine Type"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("timeStarted")}
            name="time_started"
            label="Time Started"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("timeEnded")}
            name="time_ended"
            label="Time Ended"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input {...register("bP")} name="bP" label="B/P" type="text" />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("pulseRate")}
            name="pulse"
            label="Pulse"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input {...register("resp")} name="resp" label="Resp" type="text" />
        </Box>

        <Box mb="1rem">
          <Input {...register("temp")} name="temp" label="Temp" type="text" />
        </Box>

        <Box mb="1rem">
          <Input {...register("sp02")} name="sp02" label="Sp02" type="text" />
        </Box>

        <Box mb="1rem">
          <Input {...register("hiv")} name="hiv" label="HIV" type="text" />
        </Box>

        <Box mb="1rem">
          <Input {...register("hepC")} name="hepC" label="HEP.C" type="text" />
        </Box>

        <Box mb="1rem">
          <Input {...register("hepB")} name="hepB" label="HEP.B" type="text" />
        </Box>

        <Box mb="1rem">
          <Input {...register("pvc")} name="pvc" label="PVC" type="text" />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("bldGrp")}
            name="blood_group"
            label="Blood Group"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Textarea
            {...register("preAssessment")}
            name="pre_assessment"
            label="Pre Assessment"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Textarea
            {...register("postAssessment")}
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
            {...register("hrOfDialysis")}
            name="hr_dialysis"
            label="HR of Dialysis"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("typeOfDialysis")}
            name="type_dialysis"
            label="Type of Dialysis"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("conc")}
            name="concentrate"
            label="Concentrate"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("accessRoute")}
            name="access_route"
            label="Access Route"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("heparin")}
            name="heparin"
            label="Heparin"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("bld")}
            name="blood"
            label="Blood"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("infusion")}
            name="infusion"
            label="Infusion"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("drugs")}
            name="drugs"
            label="Drugs"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("epogen")}
            name="epogen"
            label="Epogen"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("cannulation")}
            name="cannulation"
            label="Cannulation"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("sodium")}
            name="sodium"
            label="Sodium"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("potassium")}
            name="potassium"
            label="Potassium"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("chloride")}
            name="chloride"
            label="Chloride"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("bicerp")}
            name="bicerp"
            label="Bicerp"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input {...register("urea")} name="urea" label="Urea" type="text" />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("nurse")}
            name="nurse"
            label="Nurse"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("salvage")}
            name="salvage"
            label="Salvage"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("maintenance")}
            name="maintenance"
            label="Maintenance"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input {...register("ktv")} name="ktv" label="KTV" type="text" />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("eodema")}
            name="eodema"
            label="EODEMA"
            type="text"
          />
        </Box>

        <Box>
          <GlobalCustomButton
            text="Submit Form"
            customStyles={{
              marginRight: "5px",
            }}
          />
        </Box>
      </form>
    </div>
  );
};

export default DialysisLogSheet;
