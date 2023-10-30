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

const ClaimsStatus = ({closeModal, isProviderPayment = false}) => {
  const claimsServer = client.service("claims");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);

  const selectedClaim = state.ClaimsModule.selectedClaim;

  const {control, register, handleSubmit} = useForm({
    defaultValues: {
      status: selectedClaim.status,
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
          },
        }));
        closeModal();
      })
      .catch(err => {
        hideActionLoader();
        console.log(err);
        toast.error(`Failed to updated Claim's Status ${err}`);
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
              {
                name: "Approved",
                value: "Approved",
                disabled: !user.currentEmployee.roles.includes(
                  "Managed Care Claim Authorization"
                ),
              },
              {
                name: "Declined",
                value: "Declined",
                disabled: !user?.currentEmployee?.roles?.includes(
                  "Managed Care Claim Authorization"
                ),
              },
              {
                name: "Vetted",
                value: "Vetted",
                disabled: !user?.currentEmployee?.roles?.includes(
                  "Managed Care Vet Claim"
                ),
              },
              "Queried",
              "Queued for Payment",

              "Payment Instruction Sent",
              "Paid",
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

export default ClaimsStatus;
