import { useContext, useState } from "react";
import { Box, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import GroupedRadio from "../../../../components/inputs/basic/Radio/GroupedRadio";
import EmployeeSearch from "../../../helpers/EmployeeSearch";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import CustomSelect from "../../../../components/inputs/basic/Select";
import Textarea from "../../../../components/inputs/basic/Textarea";
import client from "../../../../feathers";
import { ObjectContext, UserContext } from "../../../../context";
import { toast } from "react-toastify";

const ReferralStatus = ({ closeModal }) => {
  const referralServer = client.service("referral");
  const { state, setState, showActionLoader, hideActionLoader } =
    useContext(ObjectContext);
  const { user } = useContext(UserContext);

  const selectedReferral = state.ReferralModule.selectedReferral;

  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      status: selectedReferral.status,
    },
  });

  const handleUpdateStatus = async (data) => {
    showActionLoader();
    const employee = user.currentEmployee;

    const statushx = {
      status: data.status,
      actor: `${employee.firstname} ${employee.lastname}`,
      Comments: data.comment,
      action_time: new Date(),
    };

    const prevHistory = state.ReferralModule.selectedReferral.statusHx || [];
    const newStatushx = [statushx, ...prevHistory];

    await referralServer
      .patch(selectedReferral._id, {
        status: data.status,
        statusHx: newStatushx,
      })
      .then((res) => {
        hideActionLoader();
        toast.success("You've successfully updated Referral's status");
        console.log("===>>>> response ", { res });
        setState((prev) => ({
          ...prev,
          ReferralModule: {
            ...prev.ReferralModule,
            selectedReferral: res,
          },
        }));
        closeModal();
      })
      .catch((err) => {
        hideActionLoader();
        console.log(err);
        toast.error(`Failed to updated Referral's  Status ${err}`);
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
            options={["Approval", "Declined", "Queried", "Submitted"]}
          />
        </Grid>

        <Grid item xs={12}>
          <Textarea
            label="Comment"
            placeholder="Write here..."
            name="comment"
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

export default ReferralStatus;
