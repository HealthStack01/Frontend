import {useContext, useState} from "react";
import {Box, Grid} from "@mui/material";
import {useForm} from "react-hook-form";
import GlobalCustomButton from "../../../components/buttons/CustomButton";
import CustomSelect from "../../../components/inputs/basic/Select";
import Textarea from "../../../components/inputs/basic/Textarea";
import client from "../../../feathers";
import {ObjectContext, UserContext} from "../../../context";
import {toast} from "react-toastify";
import {FormsHeaderText} from "../../../components/texts";

const ProviderPaymentClaimsStatus = ({
  closeModal,
  claims = [],
  selectedClaims,
  setSelectedProviders,
}) => {
  const claimsServer = client.service("claims");
  const {state, showActionLoader, hideActionLoader} = useContext(ObjectContext);
  const {user} = useContext(UserContext);

  const selectedClaim = state.ClaimsModule.selectedClaim;

  const {control, register, handleSubmit} = useForm({});

  const handleUpdateStatus = async data => {
    //console.log(data);
    showActionLoader();
    const employee = user.currentEmployee;

    const statushx = {
      status: data.status,
      date: new Date(),
      employeename: `${employee.firstname} ${employee.lastname}`,
      employeeId: employee.userId,
      comment: data.comment,
    };

    const promises = claims.map(async claim => {
      const prevHistory = claim.statushx || [];
      const newStatushx = [statushx, ...prevHistory];

      await claimsServer.patch(claim._id, {
        status: data.status,
        statushx: newStatushx,
      });
      //  .then(res => {
      //    hideActionLoader();
      //    toast.success("You've successfully updated Claim's status");
      //    closeModal();
      //  })
      //  .catch(err => {
      //    hideActionLoader();
      //    toast.error(`Failed to updated Claim's Status ${err}`);
      //  });
    });

    await Promise.all(promises);

    hideActionLoader();
    toast.success(`Updated status for ${claims.length} Claim(s)`);
    selectedClaims && selectedClaims([]);
    setSelectedProviders && setSelectedProviders([]);
    closeModal();
    setToggleCleared(prev => !prev);
    //console.log(data);
  };

  return (
    <Box
      sx={{
        width: "600px",
      }}
    >
      {/* <Box>
        <FormsHeaderText text={`Update status for ${claims.length} Claims`} />
      </Box> */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12}>
          <CustomSelect
            label="Status"
            control={control}
            name="status"
            options={["Queued for Payment", "Payment Instruction Sent", "Paid"]}
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
          Update
        </GlobalCustomButton>

        <GlobalCustomButton onClick={closeModal} color="error">
          Cancel
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default ProviderPaymentClaimsStatus;
