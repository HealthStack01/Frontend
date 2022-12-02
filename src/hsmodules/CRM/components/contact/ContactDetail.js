import {Button, Grid} from "@mui/material";
import {Box} from "@mui/system";
import Input from "../../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";

const ContactDetail = ({closeModal, updateContact}) => {
  const {register, handleSubmit, reset} = useForm();
  const [edit, setEdit] = useState(false);

  const initFormState = {
    contact_name: "James Bond",
    contact_position: "CEO",
    contact_phone: "007-007-007",
    contact_email: "james-bond-007@gmail.com",
  };

  const onSubmit = data => {
    //console.log(data);
    updateContact(data);

    toast.success("Contact successfully added");
  };

  useEffect(() => {
    reset(initFormState);
  }, [reset]);

  return (
    <Box
      sx={{
        width: "400px",
        maxHeight: "80vh",
      }}
    >
      <Box
        mb={2}
        gap={1}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {!edit ? (
          <GlobalCustomButton onClick={() => setEdit(true)}>
            Edit Contact
          </GlobalCustomButton>
        ) : (
          <>
            <GlobalCustomButton
              color="success"
              onClick={handleSubmit(onSubmit)}
            >
              Update Contact
            </GlobalCustomButton>

            <GlobalCustomButton color="error" onClick={() => setEdit(false)}>
              Cancel
            </GlobalCustomButton>
          </>
        )}
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Input
            register={register("contact_name", {required: true})}
            label="Contact Name"
            type="text"
            disabled={!edit}
            //placeholder="Enter customer name"
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            register={register("contact_email", {required: true})}
            label="Contact Email"
            type="email"
            disabled={!edit}
            //placeholder="Enter customer number"
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            register={register("contact_position", {required: true})}
            label="Contact Position"
            type="text"
            disabled={!edit}
            //placeholder="Enter customer number"
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            register={register("contact_phone", {required: true})}
            label="Contact Phone No"
            type="tel"
            disabled={!edit}
            // placeholder="Enter customer name"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactDetail;
