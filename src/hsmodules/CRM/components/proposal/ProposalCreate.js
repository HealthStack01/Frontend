import {useContext, useState, useEffect} from "react";
import {Box, Grid, IconButton, Typography} from "@mui/material";
import Input from "../../../../components/inputs/basic/Input";
import ModalBox from "../../../../components/modal";
import {FormsHeaderText} from "../../../../components/texts";
import ProposalDescription from "./ProposalDescription";
import {useForm} from "react-hook-form";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {LeadView} from "../lead/LeadDetailView";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import OutboxIcon from "@mui/icons-material/Outbox";
import ArticleIcon from "@mui/icons-material/Article";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {FileUploader} from "react-drag-drop-files";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import CustomerDetail, {PageCustomerDetail} from "../global/CustomerDetail";
import {PageLeadDetailView} from "../global/LeadDetail";
import Textarea from "../../../../components/inputs/basic/Textarea";
import {ObjectContext, UserContext} from "../../../../context";
import {v4 as uuidv4} from "uuid";
import CustomTable from "../../../../components/customtable";
import dayjs from "dayjs";
import {getBase64} from "../../../helpers/getBase64";
import axios from "axios";
import {getUploadUrl} from "../../../helpers/getUploadUrl";
import client from "../../../../feathers";
import {toast} from "react-toastify";

const CreateProposal = ({handleGoBack}) => {
  const dealServer = client.service("deal");
  const {user} = useContext(UserContext);
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const [description, setDescription] = useState("");
  const [attachModal, setAttachModal] = useState(false);
  const [attachedDocs, setAttachedDocs] = useState([]);
  const [draftProposal, setDraftProposal] = useState({});

  useEffect(() => {
    const proposal = state.ProposalModule.selectedProposal;

    setDraftProposal(proposal);

    setDescription(proposal.description || "");
    setAttachedDocs(proposal.attachedFiles || []);

    return () => {
      setState(prev => ({
        ...prev,
        ProposalModule: {...prev.ProposalModule, selectedProposal: {}},
      }));
      setDraftProposal({});
    };
  }, []);

  const handleAttachDoc = document => {
    setAttachedDocs(prev => [document, ...prev]);
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
      selector: row => (
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
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal", color: "#1976d2"}}
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
      selector: row => dayjs(row.createdAt).format("DD/MM/YYYY hh:mm  A "),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "File Type",
      key: "doc_type",
      description: "Enter Date",
      selector: row => row.fileType,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "uppercase",
      },
    },

    {
      name: "Comment",
      style: {color: "#0364FF"},
      key: "doc_type",
      description: "Enter Date",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal"}}
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
      selector: row => (
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

  const handleCreateProposal = async status => {
    if (description === "" && attachedDocs.length === 0)
      return toast.error("You cannot send/save an empty Proposal");

    // return console.log("hello");
    showActionLoader();
    const employee = user.currentEmployee;
    const currentDeal = state.DealModule.selectedDeal;

    if (attachedDocs.length > 0) {
      const promises = attachedDocs.map(async doc => {
        if (doc.isUploaded) {
          return doc;
        } else {
          const base64Url = await getBase64(doc.file);
          return {
            ...doc,
            file: base64Url,
          };
        }
      });

      const docs = await Promise.all(promises);

      const newPromises = docs.map(async doc => {
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

      const attachments = await Promise.all(newPromises);

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
        ? prevProposals.map(item => {
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
        .patch(documentId, {proposal: newProposals})
        .then(res => {
          hideActionLoader();
          setState(prev => ({
            ...prev,
            DealModule: {...prev.DealModule, selectedDeal: res},
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
        .catch(err => {
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
        ? prevProposals.map(item => {
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
        .patch(documentId, {proposal: newProposals})
        .then(res => {
          hideActionLoader();
          setState(prev => ({
            ...prev,
            DealModule: {...prev.DealModule, selectedDeal: res},
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
        .catch(err => {
          hideActionLoader();
          if (status === "Draft") {
            toast.error(`Sorry, Failed to Save Proposal as Draft. ${err}`);
          } else {
            toast.error(`Sorry, Failed to send Proposal. ${err}`);
          }
        });
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
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
            sx={{marginRight: "10px"}}
            onClick={() => handleCreateProposal("Draft")}
          >
            <SaveAsIcon fontSize="small" sx={{marginRight: "5px"}} />
            Save as Draft
          </GlobalCustomButton>

          {/* <GlobalCustomButton color="success" onClick={toggleDescriptionModal}>
            <ArticleIcon fontSize="small" sx={{marginRight: "5px"}} />
            Generate Proposal
          </GlobalCustomButton> */}

          <GlobalCustomButton onClick={() => handleCreateProposal("Sent")}>
            <OutboxIcon fontSize="small" sx={{marginRight: "5px"}} />
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
          <Box sx={{display: "flex", justifyContent: "space-between"}} mb={1.5}>
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
              //onRowClicked={handleRow}
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
      <Typography sx={{fontSize: "0.8rem"}}>
        Select File or Drag and Drop here
      </Typography>
    </Box>
  );
};

export const ProposalAttachDocument = ({closeModal, addAttachedFile}) => {
  const [file, setFile] = useState(null);
  const {register, reset, handleSubmit} = useForm();
  const {user} = useContext(UserContext);

  const handleChange = file => {
    setFile(file);
  };

  const handleAttachFile = data => {
    const employee = user.currentEmployee;
    const document = {
      createdBy: employee.userId,
      createdByName: `${employee.firstname} ${employee.lastname}`,
      createdAt: new Date(),
      fileName: file[0].name,
      fileType: file[0].name.split(".").pop(),
      file: file[0],
      comment: data.comment,
      _id: uuidv4(),
    };

    //console.log(document);
    addAttachedFile(document);
    closeModal();
  };

  return (
    <Box sx={{width: "600px"}}>
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="upload"
        types={["pdf", "docx", "doc"]}
        children={<UploadComponent />}
      />

      <Box
        sx={{display: "flex", alignItems: "center", justifyContent: "center"}}
        mt={2}
      >
        <Typography sx={{fontSize: "0.75rem", color: "#000000"}}>
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

      <Box sx={{display: "flex"}} gap={2} mt={2}>
        <GlobalCustomButton color="error" onClick={closeModal}>
          Cancel
        </GlobalCustomButton>

        <GlobalCustomButton onClick={handleSubmit(handleAttachFile)}>
          Attach File
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};
