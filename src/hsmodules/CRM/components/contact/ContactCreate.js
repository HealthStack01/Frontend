import {useContext} from "react";
import {Button, Grid} from "@mui/material";
import {Box} from "@mui/system";
import Input from "../../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {ObjectContext} from "../../../../context";

const ContactCreate = ({closeModal, createContact, server}) => {
  const {register, handleSubmit, reset} = useForm();
  const {state, setState} = useContext(ObjectContext);

  const initFormState = {
    name: "",
    position: "",
    email: "",
    phoneno: "",
  };

  const onSubmit = async data => {
    if (server) {
      createContact({...data, active: true});
    } else {
      createContact({...data, active: true});
      reset(initFormState);
      toast.success("Contact successfully added");
    }
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
            register={register("name", {required: true})}
            label="Contact Name"
            type="text"
            important
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            register={register("email", {required: true})}
            label="Contact Email"
            type="email"
            important
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            register={register("position", {required: true})}
            label="Contact Position"
            type="text"
            important
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            register={register("phoneno", {required: true})}
            label="Contact Phone No"
            type="tel"
            important
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

export default ContactCreate;
