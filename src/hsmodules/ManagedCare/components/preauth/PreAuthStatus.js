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

<<<<<<< HEAD
const ClaimsStatus = ({closeModal}) => {
  const claimsServer = client.service("claims");
=======
const PreAuthStatus = ({closeModal}) => {
  const preAuthServer = client.service("preauth");
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);

<<<<<<< HEAD
  const selectedClaim = state.ClaimsModule.selectedClaim;

  const {control, register, handleSubmit} = useForm({
    defaultValues: {
      status: selectedClaim.status,
=======
  const selectedPreAuth = state.PreAuthModule.selectedPreAuth;

  const {control, register, handleSubmit} = useForm({
    defaultValues: {
      status: selectedPreAuth.status,
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
    },
  });

  const handleUpdateStatus = async data => {
    showActionLoader();
    const employee = user.currentEmployee;

    const statushx = {
      status: data.status,
      date: new Date(),
      employeename: `${employee.firstname} ${employee.lastname}`,
      employeeId: employee.userId,
      comment: data.comment,
    };

<<<<<<< HEAD
    const prevHistory = selectedClaim.statushx || [];
    const newStatushx = [statushx, ...prevHistory];

    await claimsServer
      .patch(selectedClaim._id, {status: data.status, statushx: newStatushx})
      .then(res => {
        hideActionLoader();
        toast.success("You've successfully updated Claim's status");
        setState(prev => ({
          ...prev,
          ClaimsModule: {
            ...prev.ClaimsModule,
            selectedClaim: res,
=======
    const prevHistory = selectedPreAuth.statushx || [];
    const newStatushx = [statushx, ...prevHistory];

    await preAuthServer
      .patch(selectedPreAuth._id, {status: data.status, statushx: newStatushx})
      .then(res => {
        hideActionLoader();
        toast.success("You've successfully updated Preauthorization's status");
        setState(prev => ({
          ...prev,
          PreAuthModule: {
            ...prev.PreAuthModule,
            selectedPreAuth: res,
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
          },
        }));
        closeModal();
      })
      .catch(err => {
        hideActionLoader();
        console.log(err);
<<<<<<< HEAD
        toast.error(`Failed to updated Claim's Status ${err}`);
=======
        toast.error(`Failed to updated Preauthorization's Status ${err}`);
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
      });
  };

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
<<<<<<< HEAD
              "Queued for Payment",
              "Vetted",
              "Payment Instruction Sent",
              "Paid",
=======
              "Vetted",
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
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
          onClick={handleSubmit(handleUpdateStatus)}
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

<<<<<<< HEAD
export default ClaimsStatus;
=======
export default PreAuthStatus;
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
