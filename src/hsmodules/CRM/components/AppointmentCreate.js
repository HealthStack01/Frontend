import { forwardRef } from "react";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import Input from "../../../components/inputs/basic/Input";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { FormsHeaderText } from "../../../components/texts";
import CustomSelect from "../../../components/inputs/basic/Select";
import BasicDatePicker from "../../../components/inputs/Date";
import MuiCustomDatePicker from "../../../components/inputs/Date/MuiDatePicker";
import Textarea from "../../../components/inputs/basic/Textarea";
import { FacilitySearch } from "../../helpers/FacilitySearch";

const DatePickerCustomInput = forwardRef(({ value, onClick }, ref) => (
  <div
    onClick={onClick}
    ref={ref}
    style={{
      width: "100%",
      height: "48px",
      border: "1.5px solid #BBBBBB",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      margin: "0.75rem 0",
      fontSize: "0.85rem",
      padding: "0 15px",
      color: "#000000",
      backgroundColor: "#fff",
    }}
  >
    {value === "" ? "Pick Date" : value}
  </div>
));
const getSearchfacility = (obj) => {
  setChosen(obj);
  if (!obj) {
  }
};

const CrmAppointmentCreate = ({ closeModal }) => {
  const [success, setSuccess] = useState(false);
  const { register } = useForm();
  return (
    <Box
      container
      sx={{
        width: "40vw",
        height: "70vh",
      }}
    >
      {/* ********************************************USER DETAILS SECTION FOR FORM********************************************* */}
      <Box item>
        <FormsHeaderText text="Schedule Appointment" />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FacilitySearch
              getSearchfacility={getSearchfacility}
              clear={success}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              register={register("email", { required: true })}
              label="Company Email"
              //placeholder="Enter customer number"
            />
          </Grid>
          <Grid item xs={12}>
            <MuiCustomDatePicker
              format="dd/MM/yyyy"
              //   label="Projected closing Date"
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: "", alignItems: "center" }}>
        <Button
          variant="contained"
          sx={{
            width: "150px",
            height: "40px",
            textTransform: "capitalize",
            marginTop: "15px",
          }}
          onClick={closeModal}
        >
          Ok
        </Button>
      </Box>
    </Box>
  );
};

export default CrmAppointmentCreate;
