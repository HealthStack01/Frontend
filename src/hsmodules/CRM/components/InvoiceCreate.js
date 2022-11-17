import { forwardRef } from "react";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import Input from "../../../components/inputs/basic/Input";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";

import { FormsHeaderText } from "../../../components/texts";
import CustomSelect from "../../../components/inputs/basic/Select";
import BasicDatePicker from "../../../components/inputs/Date";
import MuiCustomDatePicker from "../../../components/inputs/Date/MuiDatePicker";
import Textarea from "../../../components/inputs/basic/Textarea";

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

const InvoiceCreate = ({ closeModal }) => {
  const { register } = useForm();
  return (
    <Box
      container
      sx={{
        width: "50vw",
        height: "70vh",
      }}
    >
      {/* ********************************************USER DETAILS SECTION FOR FORM********************************************* */}
      <Box item>
        <FormsHeaderText text="Invoice Create" />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Input
              register={register("customer_name", { required: true })}
              label="Customer Name"
              //placeholder="Enter customer name"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              register={register("phone_number", { required: true })}
              label="Phone Number"
              //placeholder="Enter customer number"
            />
          </Grid>
        </Grid>
      </Box>

      {/* ********************************************ADDRESS SECTION FOR FORM********************************************* */}

      <Box>
        <FormsHeaderText text="Address" />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Input
              register={register("address", { required: true })}
              label="Residential Address"
              //placeholder="Enter customer name"
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              register={register("local_govt", { required: true })}
              label="Local Government Area"
              //placeholder="Enter customer number"
            />
          </Grid>
          {/* </Grid> */}

          {/* ***************************************************************************************** */}

          {/* <Grid container spacing={2}> */}
          <Grid item xs={4}>
            <Input
              register={register("city", { required: true })}
              label="City"
              // placeholder="Enter customer name"
            />
          </Grid>

          <Grid item xs={4}>
            <Input
              register={register("state", { required: true })}
              label="State"
              //placeholder="Enter customer number"
            />
          </Grid>
        </Grid>
      </Box>

      <Box>
        <FormsHeaderText text="Plan" />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomSelect
              register={register("plan", { required: true })}
              label="Plan Type"
              options={["First", "Second", "Third", "Fourth"]}
              //placeholder="Enter customer number"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              register={register("no_month", { required: true })}
              label="No of Months"
              type="text"
              //placeholder="Enter customer number"
            />
          </Grid>
        </Grid>

        {/* ***************************************************************************************** */}

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Input
              register={register("no_month", { required: true })}
              label="No of Month"
              // placeholder="Enter customer name"
            />
          </Grid>

          <Grid item xs={6}>
            <Input
              register={register("amount", { required: true })}
              label="Amount"
              type="NUMBER"
              //placeholder="Enter customer number"
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Button
          variant="outlined"
          color="error"
          sx={{
            width: "150px",
            height: "40px",
            textTransform: "capitalize",
            marginRight: "15px",
          }}
          onClick={closeModal}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          sx={{ width: "150px", height: "40px", textTransform: "capitalize" }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default InvoiceCreate;
