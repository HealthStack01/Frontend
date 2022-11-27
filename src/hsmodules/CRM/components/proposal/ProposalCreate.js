import {forwardRef} from "react";
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
import GlobalCustomButton from "../../../../components/buttons/CustomButton";

const ProposalCreate = ({closeModal}) => {
  const {register} = useForm();
  return (
    <Box
      container
      sx={{
        width: "800px",
        maxHeight: "80vh",
      }}
    >
      {/* ********************************************USER DETAILS SECTION FOR FORM********************************************* */}
      <Box item>
        <FormsHeaderText text="Prospect Details" />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Input
              register={register("customer_name", {required: true})}
              label="Prospect Name"
              //placeholder="Enter customer name"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              register={register("customer_number", {required: true})}
              label="Customer Number"
              //placeholder="Enter customer number"
            />
          </Grid>
        </Grid>
      </Box>

      {/* ********************************************ADDRESS SECTION FOR FORM********************************************* */}

      <Box>
        <FormsHeaderText text="Company Details" />

        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Input
              register={register("address", {required: true})}
              label="Company Name"
              //placeholder="Enter customer name"
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              register={register("local_govt", {required: true})}
              label="Email"
              //placeholder="Enter customer number"
            />
          </Grid>

          <Grid item xs={4}>
            <Input
              register={register("local_govt", {required: true})}
              label="Address"
              //placeholder="Enter customer number"
            />
          </Grid>
        </Grid>
      </Box>

      <Box>
        <FormsHeaderText text="Contact Details" />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Input
              register={register("contact_name", {required: true})}
              label="Contact Name"
              //placeholder="Enter customer name"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              register={register("contact_position", {required: true})}
              label="Contact Position"
              type="text"
              //placeholder="Enter customer number"
            />
          </Grid>

          <Grid item xs={6}>
            <Input
              register={register("contact_phone", {required: true})}
              label="Contact Phone No"
              // placeholder="Enter customer name"
            />
          </Grid>

          <Grid item xs={6}>
            <Input
              register={register("contact_email", {required: true})}
              label="Contact Email"
              type="email"
              //placeholder="Enter customer number"
            />
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Textarea
              label="Additional Information"
              placeholder="Write here..."
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{display: "flex", alignItems: "center"}} mt={2}>
        <GlobalCustomButton
          variant="outlined"
          sx={{
            marginRight: "15px",
          }}
          onClick={closeModal}
          color="error"
        >
          Cancel
        </GlobalCustomButton>

        <GlobalCustomButton
          sx={{
            marginRight: "15px",
            backgroundColor: "#B6CCFE",
            "&:hover": {
              backgroundColor: "#B6CCFE",
            },
          }}
        >
          Save as draft
        </GlobalCustomButton>

        <GlobalCustomButton>Send proposal</GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default ProposalCreate;
