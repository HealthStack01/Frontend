import {useState, useEffect} from "react";
import {Button, Grid} from "@mui/material";
import {Box} from "@mui/system";
import Input from "../../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";

import {FormsHeaderText} from "../../../../components/texts";
import CustomSelect from "../../../../components/inputs/basic/Select";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import moment from "moment";

export const PageCreatePlan = ({addNewPlan}) => {
  const {register, handleSubmit, control, getValues, reset} = useForm();

  const defaultValues = {
    plan_type: "",
    premium: "",
    no_of_heads: "",
    duration_calendrical: "",
    duration_length: "",
    amount: "",
  };

  const onSubmit = data => {
    const newPlan = {
      ...data,
      _id: `plan-${Math.random()}`,
      created_at: moment.now(),
    };

    addNewPlan(newPlan);
    toast.success("Plan Added successfully");

    reset(defaultValues);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box mb={1} sx={{display: "flex", justifyContent: "space-between"}}>
          <FormsHeaderText text="Plans Section" />

          <GlobalCustomButton onClick={handleSubmit(onSubmit)}>
            <AddCircleOutline fontSize="small" sx={{marginRight: "5px"}} />
            Add Plan
          </GlobalCustomButton>
        </Box>

        <Grid container spacing={1}>
          <Grid item lg={2} md={3} sm={4}>
            <CustomSelect
              label="Plan Type"
              options={["Family", "HMO", "Free", "Personal"]}
              control={control}
              name="plan_type"
            />
          </Grid>

          <Grid item lg={2} md={3} sm={4}>
            <Input
              register={register("premium", {required: true})}
              label="Premium"
              type="number"
            />
          </Grid>

          <Grid item lg={2} md={3} sm={4}>
            <Input
              register={register("no_of_heads", {required: true})}
              label="No of Heads"
              type="number"
              //placeholder="Enter customer number"
            />
          </Grid>

          <Grid item lg={2} md={3} sm={4}>
            <CustomSelect
              label="Duration Calendrical"
              options={["Week(s)", "Month(s)", "Year(s)"]}
              control={control}
              name="duration_calendrical"
            />
          </Grid>

          <Grid item lg={2} md={3} sm={4}>
            <Input
              register={register("duration_length", {required: true})}
              label="Duration Legnth"
              type="number"
              //placeholder="Enter customer number"
            />
          </Grid>

          <Grid item lg={2} md={3} sm={4}>
            <Input
              register={register("amount", {required: true})}
              label="Amount"
              type="NUMBER"
              //placeholder="Enter customer number"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export const ModalCreatePlan = ({addNewPlan}) => {
  const {register, handleSubmit, control, getValues, reset} = useForm();

  const defaultValues = {
    plan_type: "",
    premium: "",
    no_of_heads: "",
    duration_calendrical: "",
    duration_length: "",
    amount: "",
  };

  const onSubmit = data => {
    const newPlan = {
      ...data,
      _id: `plan-${Math.random()}`,
      created_at: moment.now(),
    };

    addNewPlan(newPlan);
    toast.success("Plan Added successfully");

    reset(defaultValues);
  };

  return (
    <>
      <Box
        sx={{
          width: "600px",
        }}
      >
        <Box mb={1} sx={{display: "flex", justifyContent: "space-between"}}>
          <FormsHeaderText text="Plans Section" />

          <GlobalCustomButton onClick={handleSubmit(onSubmit)}>
            <AddCircleOutline fontSize="small" sx={{marginRight: "5px"}} />
            Add Plan
          </GlobalCustomButton>
        </Box>

        <Grid container spacing={1}>
          <Grid item lg={6} md={6} sm={6}>
            <CustomSelect
              label="Plan Type"
              options={["Family", "HMO", "Free", "Personal"]}
              control={control}
              name="plan_type"
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6}>
            <Input
              register={register("premium", {required: true})}
              label="Premium"
              type="number"
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6}>
            <Input
              register={register("no_of_heads", {required: true})}
              label="No of Heads"
              type="number"
              //placeholder="Enter customer number"
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6}>
            <CustomSelect
              label="Duration Calendrical"
              options={["Week(s)", "Month(s)", "Year(s)"]}
              control={control}
              name="duration_calendrical"
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6}>
            <Input
              register={register("duration_length", {required: true})}
              label="Duration Legnth"
              type="number"
              //placeholder="Enter customer number"
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6}>
            <Input
              register={register("amount", {required: true})}
              label="Amount"
              type="NUMBER"
              //placeholder="Enter customer number"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
