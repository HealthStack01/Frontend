import {Button, Grid} from "@mui/material";
import {Box} from "@mui/system";
import Input from "../../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";
import DatePicker from "react-datepicker";

import {FormsHeaderText} from "../../../../components/texts";
import CustomSelect from "../../../../components/inputs/basic/Select";
import BasicDatePicker from "../../../../components/inputs/Date";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import Textarea from "../../../../components/inputs/basic/Textarea";
import EmployeeSearch from "../../../helpers/EmployeeSearch";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";

const LeadAssignTask = ({closeModal, addTask}) => {
  const {register, handleSubmit, reset} = useForm();

  const formDefaultValues = {
    title: "",
    type: "",
    priority: "",
    information: "",
  };

  const onSubmit = data => {
    addTask(data);
    reset(formDefaultValues);
  };

  return (
    <Box
      sx={{
        width: "500px",
        maxHeight: "80vh",
      }}
    >
      <Grid container spacing={2} pt={1}>
        <Grid item xs={12}>
          <EmployeeSearch />
        </Grid>

        <Grid item xs={12}>
          <Input register={register("title", {required: true})} label="Title" />
        </Grid>

        <Grid item xs={8}>
          <CustomSelect
            register={register("type", {required: true})}
            label="Type"
            options={["Open", "Closed", "Pending"]}
            // placeholder="Enter customer name"
          />
        </Grid>

        <Grid item xs={4}>
          <CustomSelect
            register={register("priority", {required: true})}
            label="Priority"
            options={["Open", "Closed", "Pending"]}
            // placeholder="Enter customer name"
          />
        </Grid>

        <Grid item xs={12}>
          <Textarea
            label="Additional Information"
            placeholder="Write here..."
            register={register("information", {required: true})}
          />
        </Grid>
      </Grid>

      <Box mt={1}>
        <GlobalCustomButton
          sx={{
            marginRight: "10px",
          }}
          color="success"
          onClick={handleSubmit(onSubmit)}
        >
          Assign
        </GlobalCustomButton>

        <GlobalCustomButton
          variant="outlined"
          color="error"
          onClick={closeModal}
        >
          Cancel
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default LeadAssignTask;
