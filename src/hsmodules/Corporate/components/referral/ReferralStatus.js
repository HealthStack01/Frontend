import {useContext, useState} from "react";
import {Box, Grid} from "@mui/material";
import {useForm} from "react-hook-form";
import GroupedRadio from "../../../../components/inputs/basic/Radio/GroupedRadio";
import EmployeeSearch from "../../../helpers/EmployeeSearch";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import CustomSelect from "../../../../components/inputs/basic/Select";
import Textarea from "../../../../components/inputs/basic/Textarea";
import client from "../../../../feathers";
import {ObjectContext, UserContext} from "../../../../context";
import {toast} from "react-toastify";

const ReferralStatus = ({closeModal}) => {
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);

  const {control, register, handleSubmit} = useForm();

 

  return (
    <Box
      sx={{
        width: "600px",
      }}
    >
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12}>
          <CustomSelect
            label="Status"
            control={control}
            name="status"
            options={[
              "Approval Started",
              "Approval Complete",
              "Declined",
              "Queried",
              "Vetted",
              "Submitted",
            ]}
          />
        </Grid>

        <Grid item xs={12}>
          <Textarea
            label="Comment"
            placeholder="Write here..."
            register={register("comment")}
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <GlobalCustomButton
          color="success"
        //   onClick={handleSubmit(handleUpdateStatus)}
        >
          Update Status
        </GlobalCustomButton>

        <GlobalCustomButton onClick={closeModal} color="error">
          Cancel
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default ReferralStatus;
