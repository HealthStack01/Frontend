import {Box, Grid} from "@mui/material";
import {useState, useCallback, useContext, useEffect} from "react";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
const notificationsServer = client.service("notification");
import GlobalCustomButton from "../../../../components/buttons/CustomButton";

import Textarea from "../../../../components/inputs/basic/Textarea";
import {ObjectContext, UserContext} from "../../../../context";
import client from "../../../../feathers";

const ReviewRequestComponent = ({closeModal, services}) => {
  const {register, handleSubmit, control} = useForm();
  const {user} = useContext(UserContext);
  const {state, showActionLoader, hideActionLoader} = useContext(ObjectContext);

  const tariff = state.TarrifModule.selectedTarrif;
  const employee = user.currentEmployee;
  const facility = employee.facilityDetail;

  console.log(tariff);

  const handleSendRequest = async data => {
    showActionLoader();
    const notificationObj = {
      type: "Tariff",
      title: `Tariff Service(s) Review Requested`,
      description: `${facility.facilityName} has requested a review for ${services.length} service(s) under Tariff with band-name ${tariff?.band} for the following reason: ${data.description}`,
      facilityId: tariff.organizationId,
      sender: `${employee.firstname} ${employee.lastname}`,
      senderId: employee._id,
      pageUrl: "/app/managed-care/tariff",
      priority: "normal",
      dest_userId: [tariff.organizationId],
    };

    //console.log(notificationObj);

    notificationsServer
      .create(notificationObj)
      .then(res => {
        toast.success("Notification sent");
        hideActionLoader();
        closeModal();
      })
      .catch(error => {
        hideActionLoader();
        toast.error("Error creating Appointment " + error);
      });
  };

  return (
    <Box
      sx={{
        width: "500px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      <Textarea register={register("description")} label="Reason for Review" />

      <Box sx={{display: "flex", gap: 2, width: "100%"}} mt={1}>
        <GlobalCustomButton onClick={handleSubmit(handleSendRequest)}>
          Request Review
        </GlobalCustomButton>

        <GlobalCustomButton color="error" onClick={closeModal}>
          Cancel
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default ReviewRequestComponent;
