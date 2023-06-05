import {Button, Grid} from "@mui/material";
import {Box} from "@mui/system";
import Input from "../../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import {toast} from "react-toastify";

import {FormsHeaderText} from "../../../../components/texts";
import CustomSelect from "../../../../components/inputs/basic/Select";
import BasicDatePicker from "../../../../components/inputs/Date";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import Textarea from "../../../../components/inputs/basic/Textarea";
import EmployeeSearch from "../../../helpers/EmployeeSearch";

const LeadAddContact = ({closeModal, addContact}) => {
  const {register, handleSubmit, reset} = useForm();

  const initFormState = {
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
  };

  const onSubmit = data => {
    console.log(data);

    addContact(data);

    console.log(data);

    reset(initFormState);

    toast.success("Contact successfully added");
  };

  return (
    <Box
      sx={{
        width: "400px",
        maxHeight: "80vh",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Input
            register={register("contact_name", {required: true})}
            label="Contact Name"
            type="text"
            //placeholder="Enter customer name"
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            register={register("contact_email", {required: true})}
            label="Contact Email"
            type="email"
            //placeholder="Enter customer number"
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            register={register("contact_position", {required: true})}
            label="Contact Position"
            type="text"
            //placeholder="Enter customer number"
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            register={register("contact_phone", {required: true})}
            label="Contact Phone No"
            type="tel"
            // placeholder="Enter customer name"
          />
        </Grid>
      </Grid>

      <Box mt={1}>
        <Button
          variant="contained"
          size="small"
          sx={{
            minWidth: "120px",
            textTransform: "capitalize",
            marginRight: "10px",
          }}
          color="success"
          onClick={handleSubmit(onSubmit)}
        >
          Add Contact
        </Button>

        <Button
          variant="outlined"
          size="small"
          sx={{minWidth: "120px", textTransform: "capitalize"}}
          color="error"
          onClick={closeModal}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default LeadAddContact;
