import {useContext, useEffect} from "react";
import {useForm} from "react-hook-form";
import GlobalCustomButton from "../../../components/buttons/CustomButton";
import Input from "../../../components/inputs/basic/Input";
import MuiCustomDatePicker from "../../../components/inputs/Date/MuiDatePicker";
import Textarea from "../../../components/inputs/basic/Textarea";
import {Box, Grid, IconButton, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {ObjectContext} from "../../../context";
import {FormsHeaderText} from "../../../components/texts";
import {toast} from "react-toastify";

const PressureAreasTreatmentChart = ({onSubmit}) => {
  const {register, handleSubmit, control} = useForm();
  const {state, setState, toggleSideMenu} = useContext(ObjectContext);

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

  useEffect(() => {
    toast.error(
      "This form isn't available at the moment, will update you when it is.."
    );
  }, []);

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

      <form>
        <Box mb="1rem">
          <MuiCustomDatePicker
            name="repositioningDateAndTime"
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
          <Input
            register={register("repositioningFrom")}
            name="from"
            label="From"
            type="text"
          />
        </Box>
        <Box mb="1rem">
          <Input
            register={register("repositioningTo")}
            name="to"
            label="To"
            type="text"
          />
        </Box>
        <Box mb="1rem">
          <Textarea
            register={register("pressureAreaTxt")}
            name="pressure_area"
            label="Pressure Area Treatment"
            type="text"
          />
        </Box>
        <Box mb="1rem">
          <Textarea
            register={register("skinInspectionComments")}
            name="skin_inspection"
            label="Skin Inspection Comments"
            type="text"
          />
        </Box>
        <Box mb="1rem">
          <Input
            register={register("nameOrSignature")}
            name="name_signature"
            label="Name/Signature"
            type="text"
          />
        </Box>
        <Box mb="1rem">
          <GlobalCustomButton
            color="secondary"
            onClick={handleSubmit(onSubmit)}
          >
            Submit Pressure Area Treatment Chart
          </GlobalCustomButton>
        </Box>
      </form>
    </div>
  );
};

export default PressureAreasTreatmentChart;
