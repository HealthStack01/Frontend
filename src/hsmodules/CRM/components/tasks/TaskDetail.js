import {useEffect, useState} from "react";
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

const CRMTaskDetail = ({closeModal, updateTask}) => {
  const {register, handleSubmit, reset} = useForm();
  const [edit, setEdit] = useState(false);

  const formDefaultValues = {
    employee: "Dr. Simpa Dania",
    title: "Doctor",
    type: "Full Time",
    priority: "Surgery",
    information:
      "Lorem ipsum dolor sit amet. Eos consequuntur nisi non accusamus porro eos quaerat obcaecati ea nobis consectetur. Aut Quis esse et quas internos vel labore temporibus.",
  };

  const onSubmit = data => {
    updateTask(data);
    closeModal();
    //reset(formDefaultValues);
  };

  useEffect(() => {
    reset(formDefaultValues);
  }, []);

  return (
    <Box
      sx={{
        width: "500px",
        maxHeight: "80vh",
      }}
      pb={1}
    >
      <Box
        mb={2}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {!edit ? (
          <GlobalCustomButton onClick={() => setEdit(true)}>
            Edit Details
          </GlobalCustomButton>
        ) : (
          <>
            {" "}
            <GlobalCustomButton
              sx={{
                marginRight: "10px",
              }}
              color="success"
              onClick={handleSubmit(onSubmit)}
            >
              Update
            </GlobalCustomButton>
            <GlobalCustomButton
              variant="outlined"
              color="error"
              onClick={() => setEdit(false)}
            >
              Cancel
            </GlobalCustomButton>
          </>
        )}
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          {edit ? (
            <EmployeeSearch />
          ) : (
            <Input
              label="Employee"
              register={register("employee", {required: true})}
              disabled={!edit}
            />
          )}
        </Grid>

        <Grid item xs={12}>
          <Input
            register={register("title", {required: true})}
            label="Title"
            disabled={!edit}
          />
        </Grid>

        <Grid item xs={8}>
          <CustomSelect
            register={register("type", {required: true})}
            label="Type"
            options={["Open", "Closed", "Pending"]}
            disabled={!edit}
            // placeholder="Enter customer name"
          />
        </Grid>

        <Grid item xs={4}>
          <CustomSelect
            register={register("priority", {required: true})}
            label="Priority"
            options={["Open", "Closed", "Pending"]}
            disabled={!edit}
            // placeholder="Enter customer name"
          />
        </Grid>

        <Grid item xs={12}>
          <Textarea
            label="Additional Information"
            placeholder="Write here..."
            register={register("information", {required: true})}
            disabled={!edit}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CRMTaskDetail;
