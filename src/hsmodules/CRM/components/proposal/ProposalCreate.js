import {useState} from "react";
import {Box, Grid, Typography} from "@mui/material";
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
import CustomerDetail, {PageCustomerDetail} from "../global/CustomerDetail";
import {PageLeadDetailView} from "../global/LeadDetail";

const CreateProposal = ({handleGoBack}) => {
  const {register, control} = useForm();
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [description, setDescription] = useState("");

  const toggleDescriptionModal = () => {
    setDescriptionModal(prev => !prev);
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
            onClick={() => console.log(description)}
          >
            <SaveAsIcon fontSize="small" sx={{marginRight: "5px"}} />
            Save as Draft
          </GlobalCustomButton>

          <GlobalCustomButton color="success" onClick={toggleDescriptionModal}>
            <ArticleIcon fontSize="small" sx={{marginRight: "5px"}} />
            Generate Proposal
          </GlobalCustomButton>

          <GlobalCustomButton>
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
                onInit={editor => {
                  editor.plugins.get("FileRepository").createUploadAdapter =
                    loader => {
                      return console.log(loader);
                    };
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDescription(data);
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <ModalBox
        open={descriptionModal}
        onClose={toggleDescriptionModal}
        header="SLA Description"
      >
        <ProposalDescription
          closeModal={toggleDescriptionModal}
          setDescription={setDescription}
          description={description}
        />
      </ModalBox>
    </Box>
  );
};

export default CreateProposal;
