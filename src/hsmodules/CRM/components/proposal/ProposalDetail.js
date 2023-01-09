import {useContext, useState, useEffect, useCallback} from "react";
import {Box, Grid, IconButton, Typography} from "@mui/material";
import Input from "../../../../components/inputs/basic/Input";
import ModalBox from "../../../../components/modal";
import {FormsHeaderText} from "../../../../components/texts";
import ProposalDescription from "./ProposalDescription";
import {useForm} from "react-hook-form";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Badge from "@mui/material/Badge";
import ChatIcon from "@mui/icons-material/Chat";
import BlockIcon from "@mui/icons-material/Block";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DocViewer, {DocViewerRenderers} from "@cyntler/react-doc-viewer";
import Drawer from "@mui/material/Drawer";

import {DetailView, CustomerView, LeadView} from "../lead/LeadDetailView";
import ChatInterface from "../../../../components/chat/ChatInterface";
import CustomerDetail, {PageCustomerDetail} from "../global/CustomerDetail";
import {PageLeadDetailView} from "../global/LeadDetail";
import {ObjectContext, UserContext} from "../../../../context";
import dayjs from "dayjs";
import CustomTable from "../../../../components/customtable";
import {toast} from "react-toastify";

import {pdfjs} from "react-pdf";
import {Document, Page} from "react-pdf";
import ProposalChat from "./ProposalChat";
import client from "../../../../feathers";

const ProposalDetail = ({handleGoBack}) => {
  const dealServer = client.service("deal");
  const {state, setState} = useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [description, setDescription] = useState("");
  const [chat, setChat] = useState(false);
  const [attachedDocs, setAttachedDocs] = useState([]);
  const [docViewModal, setDocviewModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState({});
  const [unreadMsgs, setUnreadMsgs] = useState([]);

  useEffect(() => {
    const proposal = state.ProposalModule.selectedProposal;

    setDescription(proposal.description || "");
    setAttachedDocs(proposal.attachedFiles || []);

    return () => {
      setState(prev => ({
        ...prev,
        ProposalModule: {...prev.ProposalModule, selectedProposal: {}},
      }));
    };
  }, [setState, state.ProposalModule]);

  const handleDeleteFile = () => {
    toast.error("Sorry, you cannot make changes to this documennt");
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
        <IconButton size="small" color="error" onClick={handleDeleteFile}>
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

  const handleRow = doc => {
    console.log(doc);
    setSelectedDoc(doc);
    setDocviewModal(true);
  };

  const getUnreadMessagesCount = useCallback(async () => {
    setUnreadMsgs([]);
    const id = state.DealModule.selectedDeal._id;
    const userId = user.currentEmployee.userId;
    const proposalId = state.ProposalModule.selectedProposal._id;
    // console.log(userId);
    await dealServer
      .get(id)
      .then(resp => {
        const proposals = resp.proposal || [];
        const selectedProposal = proposals.find(
          item => item._id === proposalId
        );

        const msgs = selectedProposal.chat || [];
        msgs.map(msg => {
          if (
            msg.senderId === userId ||
            msg.seen.includes(userId) ||
            unreadMsgs.includes(msg._id)
          ) {
            return;
          } else {
            return setUnreadMsgs(prev => [msg._id, ...prev]);
          }
        });
      })
      .catch(err => {
        // toast.error("There was an error getting messages for this chat");
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getUnreadMessagesCount();

    dealServer.on("created", obj => getUnreadMessagesCount());
    dealServer.on("updated", obj => getUnreadMessagesCount());
    dealServer.on("patched", obj => getUnreadMessagesCount());
    dealServer.on("removed", obj => getUnreadMessagesCount());
  }, [getUnreadMessagesCount]);

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <ModalBox
        open={docViewModal}
        onClose={() => setDocviewModal(false)}
        header={`View Document ${selectedDoc?.fileName}`}
      >
        <Box sx={{width: "85vw", height: "85vh"}}>
          {selectedDoc?.fileType === "pdf" ? (
            <iframe
              src={selectedDoc?.file}
              title={selectedDoc?.fileName}
              style={{width: "100%", height: "100%"}}
            />
          ) : (
            <iframe
              title={selectedDoc?.fileName}
              style={{width: "100%", height: "100%"}}
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
            Proposal Detail
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
          }}
          gap={1}
        >
          <Badge
            badgeContent={unreadMsgs.length}
            color="secondary"
            sx={{marginRight: "10px"}}
          >
            <GlobalCustomButton onClick={() => setChat(true)}>
              <ChatIcon fontSize="small" sx={{marginRight: "5px"}} />
              Chats
            </GlobalCustomButton>
          </Badge>
        </Box>
      </Box>

      <Grid container spacing={2} p={2} justify="center">
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

            {/* <GlobalCustomButton onClick={() => setAttachModal(true)}>
              <AttachFileIcon fontSize="small" />
              Attach New File
            </GlobalCustomButton> */}
          </Box>

          <Box>
            <CustomTable
              columns={attachedFileColumns}
              data={attachedDocs}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={handleRow}
              CustomEmptyData="There was no file attached to this Proposal..."
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
                disabled={true}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Drawer
        anchor="right"
        open={chat}
        onClose={() => setChat(false)}
        onOpen={() => setChat(true)}
      >
        <Box
          sx={{
            width: "500px",
            height: "100vh",
            overflowY: "hidden",
          }}
        >
          <ProposalChat closeChat={() => setChat(false)} />
        </Box>
      </Drawer>
    </Box>
  );
};

export default ProposalDetail;
