import {useState, useContext, useCallback, useEffect} from "react";
import {Box, Button, Grid, Typography} from "@mui/material";
import {ObjectContext, UserContext} from "../../../../context";
import Input from "../../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import CustomTable from "../../../../components/customtable";
import client from "../../../../feathers";
import ModalBox from "../../../../components/modal";
import SendIcon from "@mui/icons-material/Send";
import {toast} from "react-toastify";
import GlobalStyles from "@mui/material/GlobalStyles";
import {getContactColumns} from "../colums/columns";

const inputGlobalStyles = (
  <GlobalStyles
    styles={{
      ".ck.ck-balloon-panel": {
        zIndex: "1400 !important", // Put a higher value that your MUI Dialog (generaly 1300)
      },
    }}
  />
);

const SendLinkViaEmail = ({
  closeModal,
  defaultToEmail,
  disableToEmailChange,
  orgType,
  id
}) => {
  const emailServer = client.service("email");
  const {user} = useContext(UserContext);
  const {state, showActionLoader, hideActionLoader} = useContext(ObjectContext);
  const [emailsModal, setEmailModals] = useState(true);
  const [toEmailModal, setToEmailModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [destinationEmail, setDestinationEmail] = useState(defaultToEmail);
  const [emailBody, setEmailBody] = useState(
    `<p>Please follow this <a style="color:red;" href=${`https://citizen-healthstack.netlify.app/signup/corporate-beneficiary/${id}`}>LINK</a>  
    to create your account and update your details.</p>`
  ); //add /${id}
  const [indvemailBody, setIndvEmailBody] = useState(
    `<p>Please follow this <a style="color:red;" href=${`https://citizen-healthstack.netlify.app/signup/${
      orgType ? orgType : "individual"
    }/${id}`}>LINK</a> to create an Organization </p>`
  );
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm();

  useEffect(() => {
    //const deal = state.DealModule.selectedDeal;

    reset({
      to: destinationEmail,
      name: user.currentEmployee.facilityDetail.facilityName,
      subject: "Create Your Account",
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
    let document={}
    if (emailBody === "")
      return toast.error("Please, You cannot send an empty Email");
    const facility = user.currentEmployee.facilityDetail;
    showActionLoader();
if (orgType!=="individual"){
  document = {
      organizationId: facility._id,
      organizationName: facility.facilityName,
      html: emailBody,
      text: "",
      status: "pending",
      ...data,
    };
  }else{
  document = {
      organizationId: facility._id,
      organizationName: facility.facilityName,
      html: indvemailBody,
      text: "",
      status: "pending",
      ...data,
    };

  }

    await emailServer
      .create(document)
      .then(res => {
        Object.keys(data).forEach(key => {
          data[key] = "";
        });

        reset(data);
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
        width: "60vw",
      }}
    >
      <ModalBox
        open={emailsModal}
        //onClose={() => setEmailModals(false)}
        header="Plese Select Your Email Source"
      >
        <EmailsSourceList selectEmail={handleSelectEmail} />
      </ModalBox>

      <ModalBox
        open={toEmailModal}
        onClose={() => setToEmailModal(false)}
        header="Select Contact To Receive Email"
      >
        <ContactsEmailSource selectEmail={handleSelectDestinationEmail} />
      </ModalBox>

      <ModalBox
        open={emailsModal}
        //onClose={() => setEmailModals(false)}
        header="Plese Select Your Email Source"
      >
        <EmailsSourceList selectEmail={handleSelectEmail} />
      </ModalBox>

      <Grid container spacing={1} mb={2}>
        <Grid item lg={6} md={6} sm={6}>
          <Input
            important
            label="Name"
            register={register("name", {required: "Please enter Name"})}
            errorText={errors?.name?.message}
          />
        </Grid>

        <Grid item lg={6} md={6} sm={6}>
          <Input
            important
            label="Subject"
            register={register("subject", {required: "Please enter Subject"})}
            errorText={errors?.subject?.message}
          />
        </Grid>

        <Grid item lg={6} md={6} sm={6} gap={1}>
          <Input
            important
            label="From"
            register={register("from", {required: "Please Add Source Email"})}
            errorText={errors?.from?.message}
            disabled
          />
          <GlobalCustomButton
            sx={{marginTop: "5px"}}
            color="success"
            onClick={() => setEmailModals(true)}
          >
            Change Source Email
          </GlobalCustomButton>
        </Grid>

        <Grid item lg={6} md={6} sm={6}>
          <Input
            important
            label="To"
            register={register("to", {
              required: "Please Enter Destination Email",
            })}
            errorText={errors?.to?.message}
          />
          {!disableToEmailChange && (
            <GlobalCustomButton
              sx={{marginTop: "5px"}}
              color="secondary"
              onClick={() => setToEmailModal(true)}
            >
              Change Destination Email
            </GlobalCustomButton>
          )}
        </Grid>

        <Grid item xs={12}>
          {orgType!=="individual"?
          <Box
            sx={{
              ".ck-editor__editable_inline": {
                minHeight: "15vh",
                maxHeight: "30vh",
              },
            }}
          >
            {inputGlobalStyles}
            <CKEditor
              editor={ClassicEditor}
              data={emailBody}
              onChange={(event, editor) => {
                const data = editor.getData();
                setEmailBody(data);
              }}
            />
          </Box>:
            <Box
            sx={{
              ".ck-editor__editable_inline": {
                minHeight: "15vh",
                maxHeight: "30vh",
              },
            }}
          >
            {inputGlobalStyles}
            <CKEditor
              editor={ClassicEditor}
              data={indvemailBody}
              onChange={(event, editor) => {
                const data = editor.getData();
                setEmailBody(data);
              }}
            />
          </Box>
          }
        </Grid>
      </Grid>

      <Box>
        <GlobalCustomButton onClick={handleSubmit(handleSendEmail)}>
          Send Link Via Email
          <SendIcon fontSize="small" sx={{marginLeft: "4px"}} />
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default SendLinkViaEmail;

export const EmailsSourceList = ({selectEmail}) => {
  const facilityConfigServer = client.service("facility-config");
  const {user} = useContext(UserContext);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFacilities = async () => {
    setLoading(true);
    if (user.currentEmployee) {
      const findConfig = await facilityConfigServer.find({
        query: {
          organizationId: user.currentEmployee.facilityDetail._id,
          $limit: 200,
          $sort: {
            createdAt: -1,
          },
        },
      });

      await setFacilities(findConfig.data);
      setLoading(false);
    } else {
      if (user.stacker) {
        const findConfig = await facilityConfigServer.find({
          query: {
            $limit: 100,
            $sort: {
              facility: -1,
            },
          },
        });

        await setFacilities(findConfig.data);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (user) {
      getFacilities();
    } else {
      return;
    }
    facilityConfigServer.on("created", obj => getFacilities());
    facilityConfigServer.on("updated", obj => getFacilities());
    facilityConfigServer.on("patched", obj => {
      getFacilities();
    });
    facilityConfigServer.on("removed", obj => getFacilities());
    return () => {};
  }, []);

  const handleRow = data => {
    selectEmail(data.emailConfig.username);
  };

  const columns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
      width: "60px",
    },
    {
      name: "Username",
      key: "sn",
      description: "Enter name of Company",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row?.emailConfig?.username}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      style: {
        color: "#1976d2",
        textTransform: "capitalize",
      },
    },
    {
      name: "Server",
      key: "emailConfig",
      description: "SN",
      selector: (row, i) => row.emailConfig.server,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "SMTP",
      key: "emailConfig",
      description: "SN",
      selector: (row, i) => row.emailConfig.smtp,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Security",
      key: "emailConfig",
      description: "SN",
      selector: (row, i) =>
        row.emailConfig.security ? "Has Security" : "No Security",
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Description/Note",
      key: "emailConfig",
      description: "SN",
      selector: (row, i) => row.emailConfig.note,
      sortable: true,
      inputType: "HIDDEN",
    },
  ];

  return (
    <Box sx={{width: "80vw"}}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <CustomTable
          title={""}
          columns={columns}
          data={facilities}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={handleRow}
          progressPending={loading}
        />
      </Box>
    </Box>
  );
};

export const ContactsEmailSource = ({selectEmail}) => {
  const dealServer = client.service("deal");
  const {state} = useContext(ObjectContext);
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const contactColumns = getContactColumns(null, false, true);

  const getDealContacts = useCallback(async () => {
    const id = state.DealModule.selectedDeal._id;
    setLoading(true);
    const resp = await dealServer.find({
      query: {
        _id: id,
        $select: ["contacts"],
      },
    });

    //console.log(resp.data);
    setContacts(resp.data[0].contacts);
    setLoading(false);
  }, []);

  const conditionalRowStyles = [
    {
      when: row => row.active === false,
      style: {
        backgroundColor: "pink",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];

  useEffect(() => {
    getDealContacts();
  }, []);

  const handleRow = item => {
    selectEmail(item.email);
  };

  return (
    <Box sx={{width: "85vw", maxHeight: "80vh"}}>
      <Box mb={1.5}>
        <CustomTable
          title={"Contact List"}
          columns={contactColumns}
          data={contacts}
          //data={["", ""]}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={handleRow}
          CustomEmptyData="You haven't added any contact yet, Click edit to add.."
          progressPending={loading}
          conditionalRowStyles={conditionalRowStyles}
        />
      </Box>

      <GlobalCustomButton
        onClick={() => selectEmail(state.DealModule.selectedDeal.email)}
      >
        Use Default Customer Email
      </GlobalCustomButton>
    </Box>
  );
};
