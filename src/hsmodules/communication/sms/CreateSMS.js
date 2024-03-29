import {useContext, useState, useEffect, useCallback} from "react";
import {Box, Grid, IconButton, Typography} from "@mui/material";
import Input from "../../../components/inputs/basic/Input";
import ModalBox from "../../../components/modal";
//import {FormsHeaderText} from "../../../components/texts";
import {useForm} from "react-hook-form";
//import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import GlobalCustomButton from "../../../components/buttons/CustomButton";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DocViewer, {DocViewerRenderers} from "@cyntler/react-doc-viewer";
import Drawer from "@mui/material/Drawer";
import EmailIcon from "@mui/icons-material/Email";
import SendIcon from "@mui/icons-material/Send";

import {ObjectContext, UserContext} from "../../../context";
import dayjs from "dayjs";
import CustomTable from "../../../components/customtable";
import {toast} from "react-toastify";

import {pdfjs} from "react-pdf";
import {Document, Page} from "react-pdf";
import client from "../../../feathers";
import {EmailsSourceList} from "../../CRM/components/deals/SendLink";
import Textarea from "../../../components/inputs/basic/Textarea";
import axios from "axios";
//import {ContactsEmailSource, EmailsSourceList} from "../deals/SendLink";

const CommunicationSMSCreate = ({closeModal}) => {
  const smsServer = client.service("sms");
  const sendSmsServer = client.service("sendsms");
  const emailServer = client.service("email");
  const {user} = useContext(UserContext);
  const {state, showActionLoader, hideActionLoader} = useContext(ObjectContext);

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const handleSendSMS = async data => {
    const facility = user.currentEmployee.facilityDetail;
    showActionLoader();

    //return console.log(document);

    const document = {
      message: data.message,
      receiver: data.phone_number,
      subject: data.subject,
      facilityName: facility.facilityName,
      facilityId: facility._id,
    };

    // return console.log(document);

    return sendSmsServer
      .create(document)
      .then(res => {
        hideActionLoader();
        closeModal();
        toast.success("You've successfully sent SMS");
      })
      .catch(error => {
        hideActionLoader();
        toast.error(`Failed to send SMS ${error}`);
      });
  };

  return (
    <Box
      sx={{
        width: "600px",
      }}
    >
      <Grid container spacing={1} mb={2}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Input
            label="Subject"
            register={register("subject")}
            errorText={errors?.name?.number}
          />
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Input
            important
            label="Phone Number"
            register={register("phone_number", {
              require: "Please enter Name",
            })}
            errorText={errors?.name?.number}
          />
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Textarea
            important
            label="Message"
            register={register("message", {
              require: "Please enter Subject",
            })}
            errorText={errors?.message?.message}
          />
        </Grid>
      </Grid>

      <Box>
        <GlobalCustomButton onClick={handleSubmit(handleSendSMS)}>
          Send SMS
          <SendIcon fontSize="small" sx={{marginLeft: "4px"}} />
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default CommunicationSMSCreate;
