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
//import {ContactsEmailSource, EmailsSourceList} from "../deals/SendLink";

const CommunicationEmailCreate = ({closeModal}) => {
  const emailServer = client.service("email");
  const {user} = useContext(UserContext);
  const {state, showActionLoader, hideActionLoader} = useContext(ObjectContext);
  const [emailsModal, setEmailModals] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [destinationEmail, setDestinationEmail] = useState("");
  const [toEmailModal, setToEmailModal] = useState(false);
  const [emailBody, setEmailBody] = useState("");

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm();

  useEffect(() => {
    //const deal = state.DealModule.selectedDeal.email;
    reset({
      to: "",
      name: user.currentEmployee.facilityDetail.facilityName,
      subject: "",
      from: selectedEmail,
    });
  }, [selectedEmail, destinationEmail]);

  const handleSelectEmail = email => {
    setSelectedEmail(email);
    setEmailModals(false);
  };

  const handleSelectDestinationEmail = email => {
    setDestinationEmail(email);
    setToEmailModal(false);
  };

  const handleSendEmail = async data => {
    const facility = user.currentEmployee.facilityDetail;
    showActionLoader();

    // const attachedHTML = attachedFiles
    //   ? `<br> <p>Find Below Attached Documents to this Email:   ${attachedFiles.map(
    //       item => `<br> <a href=${item.file}>${item.fileName}</a> `
    //     )}  </p>`
    //   : "";

    const document = {
      organizationId: facility._id,
      organizationName: facility.facilityName,
      // html: description.concat(attachedHTML),
      html: emailBody,
      text: "",
      status: "pending",
      ...data,
    };

    //return console.log(document);

    await emailServer
      .create(document)
      .then(res => {
        hideActionLoader();
        closeModal();
        toast.success(`Email was sent successfully`);
      })
      .catch(err => {
        hideActionLoader();
        console.log(err);
        toast.error(`Sorry, Failed to send Email ${err}`);
      });
  };

  return (
    <Box
      sx={{
        width: "50vw",
      }}
    >
      <ModalBox
        open={emailsModal}
        //onClose={() => setEmailModals(false)}
        header="Plese Select Your Email Source"
      >
        <EmailsSourceList selectEmail={handleSelectEmail} />
      </ModalBox>

      {/* <ModalBox
        open={toEmailModal}
        onClose={() => setToEmailModal(false)}
        header="Select Contact To Receive Email"
      >
        <ContactsEmailSource selectEmail={handleSelectDestinationEmail} />
      </ModalBox> */}

      <Box
        sx={{display: "flex", justifyContent: "flex-end"}}
        mb={2}
        mt={-1}
        gap={1.5}
      >
        <GlobalCustomButton
          sx={{marginTop: "5px"}}
          color="success"
          onClick={() => setEmailModals(true)}
        >
          Change Source Email
        </GlobalCustomButton>
        {/* 
        <GlobalCustomButton
          sx={{marginTop: "5px"}}
          color="secondary"
          onClick={() => setToEmailModal(true)}
        >
          Change Destination Email
        </GlobalCustomButton> */}
      </Box>

      <Grid container spacing={1} mb={2}>
        <Grid item lg={6} md={6} sm={6}>
          <Input
            important
            label="Name"
            register={register("name", {require: "Please enter Name"})}
            errorText={errors?.name?.message}
          />
        </Grid>

        <Grid item lg={6} md={6} sm={6}>
          <Input
            important
            label="Subject"
            register={register("subject", {require: "Please enter Subject"})}
            errorText={errors?.subject?.message}
          />
        </Grid>

        <Grid item lg={6} md={6} sm={6} gap={1}>
          <Input
            important
            label="From"
            register={register("from", {require: "Please Add Source Email"})}
            errorText={errors?.from?.message}
            disabled
          />
        </Grid>

        <Grid item lg={6} md={6} sm={6}>
          <Input
            important
            label="To"
            register={register("to", {
              require: "Please Enter Destination Email",
            })}
            errorText={errors?.to?.message}
          />
        </Grid>

        <Grid item lg={12} md={12} sm={12}>
          <Box>
            <Box
              sx={{
                height: "40px",
                backgroundColor: "#0075D9",
                display: "flex",
                alignItems: "center",
                paddingLeft: "25px",
              }}
            >
              <Typography
                sx={{
                  color: "#ffffff",
                  fontWeight: "600",
                }}
              >
                Email Body
              </Typography>
            </Box>

            <Box className="ck-edition-sla">
              <CKEditor
                editor={ClassicEditor}
                data={emailBody}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setEmailBody(data);
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box>
        <GlobalCustomButton onClick={handleSubmit(handleSendEmail)}>
          Send Email
          <SendIcon fontSize="small" sx={{marginLeft: "4px"}} />
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default CommunicationEmailCreate;
