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

const PreAuthStatus = ({closeModal}) => {
  const preAuthServer = client.service("preauth");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);

  const selectedPreAuth = state.PreAuthModule.selectedPreAuth;

  const {control, register, handleSubmit} = useForm({
    defaultValues: {
      status: selectedPreAuth.status,
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
          },
        }));
        closeModal();
      })
      .catch(err => {
        hideActionLoader();
        console.log(err);
        toast.error(`Failed to updated Preauthorization's Status ${err}`);
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

export default PreAuthStatus;
