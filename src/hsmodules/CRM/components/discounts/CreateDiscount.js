import React, { useContext } from "react";
import Input from "../../../../components/inputs/basic/Input";
import CustomSelect from "../../../../components/inputs/basic/Select";
import { Button, Box, Grid } from "@mui/material";
import { UserContext } from "../../../../context";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

// import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useForm } from "react-hook-form";

export default function CreateDiscount({ closeModal, createDiscount }) {
  const { register, handleSubmit, control } = useForm();
  const { user } = useContext(UserContext);

  const onSubmit = (data) => {
    //return console.log(data);
    const employee = user.currentEmployee;
    const newDiscount = {
      ...data,
      _id: uuidv4(),
      createdDate: new Date(),
      createdBy: employee.userId,
      createdByName: `${employee.firstname} ${employee.lastname}`,
      status: "Not Approved",
    };

    createDiscount(newDiscount);
    closeModal();
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
            label="Discount %"
            type="number"
            placeholder="Enter percentage discount"
            register={register("percent", { required: true })}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <Input
            label="Amount"
            type="number"
            placeholder="Enter Amount"
            register={register("amount", { required: true })}
          />
        </Grid> */}
        {/* <Grid item xs={12}>
          <CustomSelect
            options={["Approved", "Not Approved"]}
            label="Status"
            control={control}
            name="status"
          />
        </Grid> */}
      </Grid>
      <Button
        sx={{ textTransform: "capitalize", my: "10px" }}
        variant="contained"
        onClick={handleSubmit(onSubmit)}
        size="small"
      >
        Add Discount
      </Button>
    </Box>
  );
}
