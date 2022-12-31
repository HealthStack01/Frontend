import {useContext, useState, useEffect} from "react";
import {Box, Grid, Typography, IconButton} from "@mui/material";
import Input from "../../../../components/inputs/basic/Input";
import ModalBox from "../../../../components/modal";
import {FormsHeaderText} from "../../../../components/texts";
import SLADescription from "./SLADescription";
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

import {LeadView} from "../lead/LeadDetailView";
import ChatInterface from "../../../../components/chat/ChatInterface";
import CustomerDetail, {PageCustomerDetail} from "../global/CustomerDetail";
import {ObjectContext} from "../../../../context";
import dayjs from "dayjs";
import {toast} from "react-toastify";
import {PageLeadDetailView} from "../global/LeadDetail";
import CustomTable from "../../../../components/customtable";

const SLADetail = ({handleGoBack}) => {
  const {state, setState} = useContext(ObjectContext);
  const [description, setDescription] = useState("");
  const [chat, setChat] = useState(false);
  const [attachedDocs, setAttachedDocs] = useState([]);

  useEffect(() => {
    const sla = state.SLAModule.selectedSLA;

    setDescription(sla.description || "");
    setAttachedDocs(sla.attachedFiles || []);

    return () => {
      setState(prev => ({
        ...prev,
        SLAModule: {...prev.SLAModule, selectedSLA: {}},
      }));
    };
  }, []);

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
            SLA Detail
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
          }}
          gap={1}
        >
          <Badge badgeContent={4} color="secondary" sx={{marginRight: "10px"}}>
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
              //onRowClicked={handleRow}
              CustomEmptyData="There was no file attached to this SLA..."
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
                SLA Description
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

      <SwipeableDrawer
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
          <ChatInterface closeChat={() => setChat(false)} />
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default SLADetail;
