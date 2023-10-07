import {Box, Grid} from "@mui/material";
import {useState, useCallback, useContext, useEffect} from "react";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";

import Textarea from "../../../../components/inputs/basic/Textarea";
import {ObjectContext, UserContext} from "../../../../context";
import client from "../../../../feathers";

const ReviewRequestComponent = ({closeModal}) => {
  const {register, handleSubmit, control} = useForm();
  const {user} = useContext(UserContext);
  const {showActionLoader, hideActionLoader} = useContext(ObjectContext);

  const handleSendRequest = async data => {};

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
