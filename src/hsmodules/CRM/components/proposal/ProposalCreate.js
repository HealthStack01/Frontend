import { useContext, useState, useEffect } from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import Input from "../../../../components/inputs/basic/Input";
import ModalBox from "../../../../components/modal";
import { FormsHeaderText } from "../../../../components/texts";
import ProposalDescription from "./ProposalDescription";
import { useForm } from "react-hook-form";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { LeadView } from "../lead/LeadDetailView";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import OutboxIcon from "@mui/icons-material/Outbox";
import ArticleIcon from "@mui/icons-material/Article";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { FileUploader } from "react-drag-drop-files";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SendIcon from "@mui/icons-material/Send";

import CustomerDetail, { PageCustomerDetail } from "../global/CustomerDetail";
import { PageLeadDetailView } from "../global/LeadDetail";
import Textarea from "../../../../components/inputs/basic/Textarea";
import { ObjectContext, UserContext } from "../../../../context";
import { v4 as uuidv4 } from "uuid";
import CustomTable from "../../../../components/customtable";
import dayjs from "dayjs";
import { getBase64 } from "../../../helpers/getBase64";
import axios from "axios";
import { getUploadUrl } from "../../../helpers/getUploadUrl";
import client from "../../../../feathers";
import { toast } from "react-toastify";
import { ContactsEmailSource, EmailsSourceList } from "../deals/SendLink";

const CreateProposal = ({ handleGoBack }) => {
  const dealServer = client.service("deal");
  const emailServer = client.service("email");
  const { user } = useContext(UserContext);
  const { state, setState, showActionLoader, hideActionLoader } =
    useContext(ObjectContext);
  const [description, setDescription] = useState("");
  const [attachModal, setAttachModal] = useState(false);
  const [attachedDocs, setAttachedDocs] = useState([]);
  const [draftProposal, setDraftProposal] = useState({});
  const [docViewModal, setDocviewModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState({});
  const [sendModal, setSendModal] = useState(false);

  useEffect(() => {
    const proposal = state.ProposalModule.selectedProposal;

    setDraftProposal(proposal);

    setDescription(proposal.description || "");
    setAttachedDocs(proposal.attachedFiles || []);

    return () => {
      setState((prev) => ({
        ...prev,
        ProposalModule: { ...prev.ProposalModule, selectedProposal: {} },
      }));
      setDraftProposal({});
    };
  }, []);

  const handleAttachDoc = (document) => {
    setAttachedDocs((prev) => [document, ...prev]);
  };

  const attachedFileColumns = [
    {
      name: "S/N",
      key: "sn",
      description: "Enter Date",
      selector: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "60px",
    },
    {
      name: "Attached By",
      key: "filename",
      description: "Enter Date",
      selector: (row) => (
        <Typography
          sx={{
            fontSize: "0.8rem",
            whiteSpace: "normal",
            color: "#1976d2",
            textTransform: "capitalize",
          }}
          data-tag="allowRowEvents"
        >
          {row.createdByName}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "200px",
    },

    {
      name: "File Name",
      key: "filename",
      description: "Enter Date",
      selector: (row) => (
        <Typography
          sx={{ fontSize: "0.8rem", whiteSpace: "normal", color: "#1976d2" }}
          data-tag="allowRowEvents"
        >
          {row.fileName}
        </Typography>
      ),

      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Date",
      //style: {color: "#0364FF"},
      key: "date",
      description: "Enter Date",
      selector: (row) => dayjs(row.createdAt).format("DD/MM/YYYY hh:mm  A "),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "File Type",
      key: "doc_type",
      description: "Enter Date",
      selector: (row) => row.fileType,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "uppercase",
      },
    },

    {
      name: "Comment",
      style: { color: "#0364FF" },
      key: "doc_type",
      description: "Enter Date",
      selector: (row) => (
        <Typography
          sx={{ fontSize: "0.8rem", whiteSpace: "normal" }}
          data-tag="allowRowEvents"
        >
          {row.comment}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Action",
      key: "doc_type",
      description: "Enter Date",
      selector: (row) => (
        <IconButton size="small" color="error">
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "uppercase",
      },
    },
  ];

  const handleCreateProposal = async (status) => {
    if (description === "" && attachedDocs.length === 0)
      return toast.error("You cannot send/save an empty Proposal");

    showActionLoader();
    const employee = user.currentEmployee;
    const currentDeal = state.DealModule.selectedDeal;

    if (attachedDocs.length > 0) {
      const promises = attachedDocs.map(async (doc) => {
        if (doc.isUploaded) {
          return doc;
        } else {
          const fileUrl = await getUploadUrl(doc.file);
          return {
            ...doc,
            file: fileUrl,
            isUploaded: true,
          };
        }
      });

      const attachments = await Promise.all(promises);

      const document = {
        attachedFiles: attachments,
        description: description,
        createdAt: new Date(),
        createdBy: employee.userId,
        createdByName: `${employee.firstname} ${employee.lastname}`,
        customerName: currentDeal.name,
        customerEmail: currentDeal.email,
        customerPhone: currentDeal.phone,
        customerAddress: currentDeal.address,
        customerCity: currentDeal.city,
        customerLGA: currentDeal.lga,
        customerState: currentDeal.state,
        customerCountry: currentDeal.country,
        dealId: currentDeal._id,
        status: status,
        _id: uuidv4(),
      };

      const prevProposals = currentDeal.proposal || [];

      const isDraft = Object.keys(draftProposal).length > 0;

      const newProposals = isDraft
        ? prevProposals.map((item) => {
            if (item._id === draftProposal._id) {
              return {
                ...item,
                description: description,
                attachedFiles: attachments,
                status: status,
                updatedAt: new Date(),
              };
            } else {
              return item;
            }
          })
        : [document, ...prevProposals];

      //const newProposals = [document, ...prevProposals];

      const documentId = currentDeal._id;
      await dealServer
        .patch(documentId, { proposal: newProposals })
        .then((res) => {
          hideActionLoader();
          setState((prev) => ({
            ...prev,
            DealModule: { ...prev.DealModule, selectedDeal: res },
          }));

          setAttachedDocs([]);
          setDescription("");
          if (status === "Draft") {
            toast.success(
              `You have successfully Saved this Proposal as a Draft`
            );
          } else {
            toast.success(`Proposal was sent succesfully`);
          }
        })
        .catch((err) => {
          hideActionLoader();
          if (status === "Draft") {
            toast.error(`Sorry, Failed to Save Proposal as Draft. ${err}`);
          } else {
            toast.error(`Sorry, Failed to send Proposal. ${err}`);
          }
        });
    } else {
      const document = {
        attachedFiles: [],
        description: description,
        createdAt: new Date(),
        createdBy: employee.userId,
        createdByName: `${employee.firstname} ${employee.lastname}`,
        customerName: currentDeal.name,
        customerEmail: currentDeal.email,
        customerPhone: currentDeal.phone,
        customerAddress: currentDeal.address,
        customerCity: currentDeal.city,
        customerLGA: currentDeal.lga,
        customerState: currentDeal.state,
        customerCountry: currentDeal.country,
        dealId: currentDeal._id,
        status: status,
        _id: uuidv4(),
      };

      const prevProposals = currentDeal.proposal || [];

      const isDraft = Object.keys(draftProposal).length > 0;

      const newProposals = isDraft
        ? prevProposals.map((item) => {
            if (item._id === draftProposal._id) {
              return {
                ...item,
                description: description,
                attachedFiles: [],
                status: status,
                updatedAt: new Date(),
              };
            } else {
              return item;
            }
          })
        : [document, ...prevProposals];

      const documentId = currentDeal._id;
      await dealServer
        .patch(documentId, { proposal: newProposals })
        .then((res) => {
          hideActionLoader();
          setState((prev) => ({
            ...prev,
            DealModule: { ...prev.DealModule, selectedDeal: res },
          }));

          setAttachedDocs([]);
          setDescription("");
          if (status === "Draft") {
            toast.success(
              `You have successfully Saved this Proposal as a Draft`
            );
          } else {
            toast.success(`Proposal was sent succesfully`);
          }
        })
        .catch((err) => {
          hideActionLoader();
          if (status === "Draft") {
            toast.error(`Sorry, Failed to Save Proposal as Draft. ${err}`);
          } else {
            toast.error(`Sorry, Failed to send Proposal. ${err}`);
          }
        });
    }
  };

  const handleSendProposal = async (emailData) => {
    showActionLoader();
    const employee = user.currentEmployee;
    const currentDeal = state.DealModule.selectedDeal;
    const facility = user.currentEmployee.facilityDetail;

    if (attachedDocs.length > 0) {
      const promises = attachedDocs.map(async (doc) => {
        if (doc.isUploaded) {
          return doc;
        } else {
          const fileUrl = await getUploadUrl(doc.file);
          return {
            ...doc,
            file: fileUrl,
            isUploaded: true,
          };
        }
      });

      const attachments = await Promise.all(promises);

      const document = {
        attachedFiles: attachments,
        description: description,
        createdAt: new Date(),
        createdBy: employee.userId,
        createdByName: `${employee.firstname} ${employee.lastname}`,
        customerName: currentDeal.name,
        customerEmail: currentDeal.email,
        customerPhone: currentDeal.phone,
        customerAddress: currentDeal.address,
        customerCity: currentDeal.city,
        customerLGA: currentDeal.lga,
        customerState: currentDeal.state,
        customerCountry: currentDeal.country,
        dealId: currentDeal._id,
        status: "Sent",
        _id: uuidv4(),
      };

      const attachedHTML = `<br> <p>Find Below Attached Documents to this Email:   ${attachments.map(
        (item) => `<br> <a href=${item.file}>${item.fileName}</a> `
      )}  </p>`;

      const emailDocument = {
        organizationId: facility._id,
        organizationName: facility.facilityName,
        html: description.concat(attachedHTML),
        text: "",
        status: "pending",
        // attachments: attachments.map(item => {
        //   return {
        //     path: item.file,
        //     filename: item.fileName,
        //   };
        // }),
        ...emailData,
      };

      const prevProposals = currentDeal.proposal || [];

      const isDraft = Object.keys(draftProposal).length > 0;

      const newProposals = isDraft
        ? prevProposals.map((item) => {
            if (item._id === draftProposal._id) {
              return {
                ...item,
                description: description,
                attachedFiles: attachments,
                status: "Sent",
                updatedAt: new Date(),
              };
            } else {
              return item;
            }
          })
        : [document, ...prevProposals];

      //const newProposals = [document, ...prevProposals];

      const documentId = currentDeal._id;
      await dealServer
        .patch(documentId, { proposal: newProposals })
        .then((res) => {
          return emailServer.create(emailDocument).then((resp) => {
            hideActionLoader();
            setState((prev) => ({
              ...prev,
              DealModule: { ...prev.DealModule, selectedDeal: res },
            }));

            setAttachedDocs([]);
            setDescription("");
            setSendModal(false);
            toast.success(`Proposal was sent succesfully`);
          });
        })
        .catch((err) => {
          hideActionLoader();
          toast.error(`Sorry, Failed to send Proposal. ${err}`);
        });
    } else {
      const document = {
        attachedFiles: [],
        description: description,
        createdAt: new Date(),
        createdBy: employee.userId,
        createdByName: `${employee.firstname} ${employee.lastname}`,
        customerName: currentDeal.name,
        customerEmail: currentDeal.email,
        customerPhone: currentDeal.phone,
        customerAddress: currentDeal.address,
        customerCity: currentDeal.city,
        customerLGA: currentDeal.lga,
        customerState: currentDeal.state,
        customerCountry: currentDeal.country,
        dealId: currentDeal._id,
        status: "Sent",
        _id: uuidv4(),
      };

      const emailDocument = {
        organizationId: facility._id,
        organizationName: facility.facilityName,
        html: description,
        text: "",
        status: "pending",
        ...emailData,
      };

      const prevProposals = currentDeal.proposal || [];

      const isDraft = Object.keys(draftProposal).length > 0;

      const newProposals = isDraft
        ? prevProposals.map((item) => {
            if (item._id === draftProposal._id) {
              return {
                ...item,
                description: description,
                attachedFiles: [],
                status: "Sent",
                updatedAt: new Date(),
              };
            } else {
              return item;
            }
          })
        : [document, ...prevProposals];

      const documentId = currentDeal._id;
      await dealServer
        .patch(documentId, { proposal: newProposals })
        .then((res) => {
          return emailServer.create(emailDocument).then((resp) => {
            hideActionLoader();
            setState((prev) => ({
              ...prev,
              DealModule: { ...prev.DealModule, selectedDeal: res },
            }));

            setAttachedDocs([]);
            setDescription("");
            setSendModal(false);
            toast.success(`Proposal was sent succesfully`);
          });
        })
        .catch((err) => {
          hideActionLoader();
          toast.error(`Sorry, Failed to send Proposal. ${err}`);
        });
    }
  };

  const handleRow = (doc) => {
    console.log(doc);
    setSelectedDoc(doc);
    setDocviewModal(true);
  };

  const showSendModal = () => {
    if (description === "" && attachedDocs.length === 0)
      return toast.error("You cannot send/save an empty Proposal");
    setSendModal(true);
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <ModalBox
        open={sendModal}
        onClose={() => setSendModal(false)}
        header="Send Proposal"
      >
        <SendProposalOrSLA handleSend={handleSendProposal} />
      </ModalBox>
      <ModalBox
        open={docViewModal}
        onClose={() => setDocviewModal(false)}
        header={`View Document ${selectedDoc?.fileName}`}
      >
        <Box sx={{ width: "85vw", height: "85vh" }}>
          {selectedDoc?.fileType === "pdf" ? (
            <iframe
              src={selectedDoc?.file}
              title={selectedDoc?.fileName}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <iframe
              title={selectedDoc?.fileName}
              style={{ width: "100%", height: "100%" }}
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${selectedDoc?.file}`}
            />
          )}
        </Box>
      </ModalBox>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #f8f8f8",
          backgroundColor: "#f8f8f8",
        }}
        mb={2}
        p={2}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          gap={1}
        >
          <GlobalCustomButton onClick={handleGoBack}>
            <ArrowBackIcon />
            Go Back
          </GlobalCustomButton>

          <Typography
            sx={{
              fontSize: "0.95rem",
              fontWeight: "600",
            }}
          >
            Create Proposal
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
          }}
          gap={1}
        >
          <GlobalCustomButton
            color="info"
            sx={{ marginRight: "10px" }}
            onClick={() => handleCreateProposal("Draft")}
          >
            <SaveAsIcon fontSize="small" sx={{ marginRight: "5px" }} />
            Save as Draft
          </GlobalCustomButton>

          {/* <GlobalCustomButton color="success" onClick={toggleDescriptionModal}>
            <ArticleIcon fontSize="small" sx={{marginRight: "5px"}} />
            Generate Proposal
          </GlobalCustomButton> */}

          <GlobalCustomButton onClick={showSendModal}>
            <OutboxIcon fontSize="small" sx={{ marginRight: "5px" }} />
            Send Proposal
          </GlobalCustomButton>
        </Box>
      </Box>

      <Grid container spacing={2} p={2}>
        <Grid item lg={12} md={12} sm={12}>
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} small={12}>
              <PageCustomerDetail />
            </Grid>

            <Grid item lg={12} md={12} small={12}>
              <PageLeadDetailView />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between" }}
            mb={1.5}
          >
            <FormsHeaderText text="Attached Files" />

            <GlobalCustomButton onClick={() => setAttachModal(true)}>
              <AttachFileIcon fontSize="small" />
              Attach New File
            </GlobalCustomButton>
          </Box>

          <Box>
            <CustomTable
              columns={attachedFileColumns}
              data={attachedDocs}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={handleRow}
              CustomEmptyData="You haven't Attached any file(s) yet..."
              progressPending={false}
            />
          </Box>
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
                Proposal Description
              </Typography>
            </Box>

            <Box className="ck-edition-sla">
              <CKEditor
                editor={ClassicEditor}
                data={description}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDescription(data);
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* <ModalBox
        open={descriptionModal}
        onClose={toggleDescriptionModal}
        header="SLA Description"
      >
        <ProposalDescription
          closeModal={toggleDescriptionModal}
          setDescription={setDescription}
          description={description}
        />
      </ModalBox> */}

      <ModalBox
        open={attachModal}
        onClose={() => setAttachModal(false)}
        header="Attach A Document"
      >
        <ProposalAttachDocument
          closeModal={() => setAttachModal(false)}
          addAttachedFile={handleAttachDoc}
        />
      </ModalBox>
    </Box>
  );
};

export default CreateProposal;

const UploadComponent = ({}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        border: "1px dashed gray",
        cursor: "pointer",
        borderRadius: "7.5px",
      }}
    >
      <FileUploadOutlinedIcon />
      <Typography sx={{ fontSize: "0.8rem" }}>
        Select File or Drag and Drop here
      </Typography>
    </Box>
  );
};

export const SendProposalOrSLA = ({ handleSend }) => {
  const emailServer = client.service("email");
  const { user } = useContext(UserContext);
  const { state, showActionLoader, hideActionLoader } =
    useContext(ObjectContext);
  const [emailsModal, setEmailModals] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [destinationEmail, setDestinationEmail] = useState(
    state.DealModule.selectedDeal.email || ""
  );
  const [toEmailModal, setToEmailModal] = useState(false);

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const deal = state.DealModule.selectedDeal;
    reset({
      to: destinationEmail,
      name: user.currentEmployee.facilityDetail.facilityName,
      subject: "Proposal",
      from: selectedEmail,
    });
  }, [selectedEmail, destinationEmail]);

  const handleSelectEmail = (email) => {
    setSelectedEmail(email);
    setEmailModals(false);
  };

  const handleSendProposalOrSLA = (data) => {
    handleSend(data);
  };

  const handleSelectDestinationEmail = (email) => {
    setDestinationEmail(email);
    setToEmailModal(false);
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

      <Box
        sx={{ display: "flex", justifyContent: "flex-end" }}
        mb={2}
        mt={-1}
        gap={1.5}
      >
        <GlobalCustomButton
          sx={{ marginTop: "5px" }}
          color="success"
          onClick={() => setEmailModals(true)}
        >
          Change Source Email
        </GlobalCustomButton>

        <GlobalCustomButton
          sx={{ marginTop: "5px" }}
          color="secondary"
          onClick={() => setToEmailModal(true)}
        >
          Change Destination Email
        </GlobalCustomButton>
      </Box>

      <Grid container spacing={1} mb={2}>
        <Grid item lg={6} md={6} sm={6}>
          <Input
            important
            label="Name"
            register={register("name", { require: "Please enter Name" })}
            errorText={errors?.name?.message}
          />
        </Grid>

        <Grid item lg={6} md={6} sm={6}>
          <Input
            important
            label="Subject"
            register={register("subject", { require: "Please enter Subject" })}
            errorText={errors?.subject?.message}
          />
        </Grid>

        <Grid item lg={6} md={6} sm={6} gap={1}>
          <Input
            important
            label="From"
            register={register("from", { require: "Please Add Source Email" })}
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
      </Grid>

      <Box>
        <GlobalCustomButton onClick={handleSubmit(handleSendProposalOrSLA)}>
          Send Document
          <SendIcon fontSize="small" sx={{ marginLeft: "4px" }} />
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export const ProposalAttachDocument = ({ closeModal, addAttachedFile }) => {
  const [file, setFile] = useState(null);
  const [base64, setBase64] = useState(null);
  const { register, reset, handleSubmit } = useForm();
  const { user } = useContext(UserContext);

  const handleChange = (file) => {
    getBase64(file[0])
      .then((res) => {
        // console.log(file);
        setFile(file);
        setBase64(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAttachFile = (data) => {
    const employee = user.currentEmployee;
    const document = {
      createdBy: employee.userId,
      createdByName: `${employee.firstname} ${employee.lastname}`,
      createdAt: new Date(),
      fileName: file[0].name,
      fileType: file[0].name.split(".").pop(),
      file: base64,
      comment: data.comment,
      _id: uuidv4(),
    };

    //console.log(document);
    addAttachedFile(document);
    closeModal();
  };

  return (
    <Box sx={{ width: "600px" }}>
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="upload"
        types={["pdf", "docx", "doc"]}
        children={<UploadComponent />}
      />

      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        mt={2}
      >
        <Typography sx={{ fontSize: "0.75rem", color: "#000000" }}>
          {file
            ? `File name: ${file[0].name}`
            : "You haven't selected any file"}
        </Typography>
      </Box>

      <Box mt={2}>
        <Textarea
          label="Comments"
          placeholder="write here...."
          register={register("comment")}
        />
      </Box>

      <Box sx={{ display: "flex" }} gap={2} mt={2}>
        <GlobalCustomButton color="error" onClick={closeModal}>
          Cancel
        </GlobalCustomButton>

        <GlobalCustomButton
          disabled={file === null || base64 === null}
          onClick={handleSubmit(handleAttachFile)}
        >
          Attach File
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export const ProposalSignedAttachDocument = ({
  addAttachedFile,
  handleUploadFile,
  closeModal,
}) => {
  const [file, setFile] = useState(null);
  const [base64, setBase64] = useState(null);
  const { register, reset, handleSubmit } = useForm();
  const { user } = useContext(UserContext);
  const { state } = useContext(ObjectContext);

  const handleChange = (file) => {
    getBase64(file[0])
      .then((res) => {
        // console.log(file);
        setFile(file);
        setBase64(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAttachFile = (data) => {
    const employee = user.currentEmployee;

    const newFile = {
      updatedBy: employee.userId,
      updatedByName: `${employee.firstname} ${employee.lastname}`,
      updatedAt: new Date(),
      fileName: file[0].name,
      fileType: file[0].name.split(".").pop(),
      file: base64,
      docStatus: "Approved",
      comment: data.comment,
    };

    addAttachedFile(newFile);
    toast.success("SLA signed document was attached");
  };

  return (
    <Box sx={{ width: "600px" }}>
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="upload"
        types={["pdf", "docx", "doc"]}
        children={<UploadComponent />}
      />

      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        mt={2}
      >
        <Typography sx={{ fontSize: "0.75rem", color: "#000000" }}>
          {file
            ? `File name: ${file[0].name}`
            : "You haven't selected any file"}
        </Typography>
      </Box>

      <Box mt={2}>
        <Textarea
          label="Comments"
          placeholder="write here...."
          register={register("comment")}
        />
      </Box>

      <Box sx={{ display: "flex" }} gap={2} mt={2}>
        <GlobalCustomButton color="error" onClick={closeModal}>
          Cancel
        </GlobalCustomButton>

        <GlobalCustomButton
          disabled={file === null || base64 === null}
          onClick={handleSubmit(handleAttachFile)}
        >
          Attach File
        </GlobalCustomButton>
        <GlobalCustomButton
          disabled={file === null || base64 === null}
          onClick={handleUploadFile}
        >
          Approved File
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

{
  /* <p>Below are attached files:</p><p>first_name : <a href="https://www.livescores.com/?tz=1">https://www.livescores.com/?tz=1</a></p><p>second_name : <a href="https://www.livescores.com/?tz=1">https://www.livescores.com/?tz=1</a></p><p>thirdname : https://www.livescores.com/?tz=1</p> */
}
