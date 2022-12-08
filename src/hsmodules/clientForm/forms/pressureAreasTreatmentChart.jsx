import {useContext} from "react";
import {useForm} from "react-hook-form";
import GlobalCustomButton from "../../../components/buttons/CustomButton";
import Input from "../../../components/inputs/basic/Input";
import MuiCustomDatePicker from "../../../components/inputs/Date/MuiDatePicker";
import Textarea from "../../../components/inputs/basic/Textarea";
import {Box, Grid, IconButton, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {ObjectContext} from "../../../context";
import {FormsHeaderText} from "../../../components/texts";

const PressureAreasTreatmentChart = ({onSubmit}) => {
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
        <FormsHeaderText text="Pressure Areas Treatment Chart" />

        <IconButton onClick={closeForm}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb="1rem">
          <MuiCustomDatePicker
            name="date_time"
            label="Date & Time"
            control={control}
          />
        </Box>
        <Box mb="1rem">
          <Typography sx={{fontSize: "0.9rem"}}>
            Repositioning (using Codes)
          </Typography>
        </Box>
        <Box mb="1rem">
          <Input {...register("from")} name="from" label="From" type="text" />
        </Box>
        <Box mb="1rem">
          <Input {...register("to")} name="to" label="To" type="text" />
        </Box>
        <Box mb="1rem">
          <Textarea
            {...register("pressure_area")}
            name="pressure_area"
            label="Pressure Area Treatment"
            type="text"
          />
        </Box>
        <Box mb="1rem">
          <Textarea
            {...register("skin_inspection")}
            name="skin_inspection"
            label="Skin Inspection Comments"
            type="text"
          />
        </Box>
        <Box mb="1rem">
          <Input
            {...register("name_signature")}
            name="name_signature"
            label="Name/Signature"
            type="text"
          />
        </Box>
        <Box mb="1rem">
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

export default PressureAreasTreatmentChart;
