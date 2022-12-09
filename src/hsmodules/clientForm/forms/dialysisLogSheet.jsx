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
            {...register("dialysis")}
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
            {...register("dry_weight")}
            name="dry_weight"
            label="Dry Weight"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("last_dialysis")}
            name="last_dialysis"
            label="Last Dialysis WT"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("current")}
            name="current"
            label="Current WT"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("weight")}
            name="weight"
            label="Weight Loses/Gain"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("ultra_filtration")}
            name="ultra_filtration"
            label="Ultra Filtration"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("weight_loss")}
            name="weight_loss"
            label="Weight Loss"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("machine_type")}
            name="machine_type"
            label="Machine Type"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("time_started")}
            name="time_started"
            label="Time Started"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("time_ended")}
            name="time_ended"
            label="Time Ended"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input {...register("bp")} name="bp" label="B/P" type="text" />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("pulse")}
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
          <Input {...register("hepc")} name="hepc" label="HEP.C" type="text" />
        </Box>

        <Box mb="1rem">
          <Input {...register("hepb")} name="hepb" label="HEP.B" type="text" />
        </Box>

        <Box mb="1rem">
          <Input {...register("pvc")} name="pvc" label="PVC" type="text" />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("blood_group")}
            name="blood_group"
            label="Blood Group"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Textarea
            {...register("pre_assessment")}
            name="pre_assessment"
            label="Pre Assessment"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Textarea
            {...register("post_assessment")}
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
            {...register("hr_dialysis")}
            name="hr_dialysis"
            label="HR of Dialysis"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("type_dialysis")}
            name="type_dialysis"
            label="Type of Dialysis"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("concentrate")}
            name="concentrate"
            label="Concentrate"
            type="text"
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register("access_route")}
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
            {...register("blood")}
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
