import {Box, Button, Grid} from "@mui/material";
import Input from "../../../../components/inputs/basic/Input";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import {FacilitySearch} from "../../../helpers/FacilitySearch";
import {useForm} from "react-hook-form";
import Textarea from "../../../../components/inputs/basic/Textarea";
import MuiCustomTimePicker from "../../../../components/inputs/Date/MuiTimePicker";

const ScheduleAppointment = ({closeModal}) => {
  const {control, register, handleSubmit} = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <Box sx={{width: "450px", maxHeight: "80vh"}}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FacilitySearch />
        </Grid>

        <Grid item xs={12}>
          <Input label="Company Email" register={register("email")} />
        </Grid>

        <Grid item xs={6}>
          <MuiCustomDatePicker label="Date" name="date" control={control} />
        </Grid>

        <Grid item xs={6}>
          <MuiCustomTimePicker label="Time" name="time" control={control} />
        </Grid>

        <Grid item xs={12}>
          <Textarea
            label="Apppointment Information"
            placeholder="Write here..."
            register={register("information")}
          />
        </Grid>
      </Grid>

      <Box sx={{display: "flex", alignItems: "center"}} mt={2}>
        <Button
          variant="outlined"
          color="warning"
          size="small"
          sx={{
            textTransform: "capitalize",
            marginRight: "15px",
          }}
          onClick={closeModal}
        >
          Cancel
        </Button>

        <Button
          size="small"
          variant="contained"
          sx={{textTransform: "capitalize"}}
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default ScheduleAppointment;
