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
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";

const PlanDetail = ({plan, updatePlan, closeModal}) => {
  const {register, handleSubmit, control, getValues, reset} = useForm();
  const [edit, setEdit] = useState(false);

  // const defaultValues = {
  //   plan_type: "",
  //   premium: "",
  //   no_of_heads: "",
  //   duration_calendrical: "",
  //   duration_length: "",
  //   amount: "",
  // };

  const handleUpdatePlan = data => {
    const updated_plan = {
      ...plan,
      ...data,
    };
    updatePlan(updated_plan);
    closeModal();

    toast.success("Plan Updated successfully");
  };

  useEffect(() => {
    reset(plan);
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "600px",
        }}
      >
        <Box
          mb={1.5}
          sx={{display: "flex", justifyContent: "flex-end"}}
          gap={1}
        >
          {edit ? (
            <>
              <GlobalCustomButton color="error" onClick={() => setEdit(false)}>
                Cancel
              </GlobalCustomButton>

              <GlobalCustomButton
                color="success"
                onClick={handleSubmit(handleUpdatePlan)}
              >
                Update Plan
              </GlobalCustomButton>
            </>
          ) : (
            <GlobalCustomButton onClick={() => setEdit(true)}>
              <EditIcon fontSize="small" sx={{marginRight: "5px"}} />
              Edit Plan
            </GlobalCustomButton>
          )}
        </Box>

        <Grid container spacing={1}>
          <Grid item lg={6} md={6} sm={6}>
            <CustomSelect
              label="Plan Type"
              options={["Family", "HMO", "Free", "Personal"]}
              disabled={!edit}
              control={control}
              name="plan_type"
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6}>
            <Input
              register={register("premium", {required: true})}
              label="Premium"
              type="number"
              disabled={!edit}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6}>
            <Input
              register={register("no_of_heads", {required: true})}
              label="No of Heads"
              type="number"
              disabled={!edit}
              //placeholder="Enter customer number"
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6}>
            <CustomSelect
              label="Duration Calendrical"
              options={["Week(s)", "Month(s)", "Year(s)"]}
              disabled={!edit}
              control={control}
              name="duration_calendrical"
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6}>
            <Input
              register={register("duration_length", {required: true})}
              label="Duration Legnth"
              type="number"
              disabled={!edit}
              //placeholder="Enter customer number"
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6}>
            <Input
              register={register("amount", {required: true})}
              label="Amount"
              type="NUMBER"
              disabled={!edit}
              //placeholder="Enter customer number"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PlanDetail;
