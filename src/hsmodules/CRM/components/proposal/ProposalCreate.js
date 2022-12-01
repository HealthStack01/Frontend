import {useState} from "react";
import {Box, Grid, Typography} from "@mui/material";
import Input from "../../../../components/inputs/basic/Input";
import ModalBox from "../../../../components/modal";
import {FormsHeaderText} from "../../../../components/texts";
import ProposalDescription from "./ProposalDescription";
import {useForm} from "react-hook-form";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import CustomSelect from "../../../../components/inputs/basic/Select";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import {DetailView} from "../lead/LeadDetailView";
import UploadProposal from "./UploadProposal";

const CreateProposal = ({closeModal}) => {
  const {register, control} = useForm();
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [description, setDescription] = useState("");
  const [uploadModal, setUploadModal] = useState(false);

  const toggleDescriptionModal = () => {
    setDescriptionModal(prev => !prev);
  };

  return (
    <Box
      sx={{
        maxHeigth: "80vh",
        width: "50vw",
      }}
    >
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} sm={12}>
          <DetailView />
        </Grid>
        <Grid item lg={12} md={12} sm={12}>
          <Box mb={2} sx={{display: "flex", justifyContent: "space-between"}}>
            <FormsHeaderText text="Description" />
          </Box>

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
            <CKEditor editor={ClassicEditor} data={description} />
          </Box>
        </Grid>
      </Grid>

      <Box sx={{display: "flex", alignItems: "center"}} mt={2}>
        <GlobalCustomButton
          variant="outlined"
          color="error"
          sx={{marginRight: "10px"}}
        >
          Cancel
        </GlobalCustomButton>

        <GlobalCustomButton
          color="info"
          sx={{marginRight: "10px"}}
          onClick={() => console.log(description)}
        >
          Save as Draft
        </GlobalCustomButton>

        <GlobalCustomButton
          sx={{marginRight: "10px"}}
          onClick={() => setUploadModal(true)}
        >
          Upload Proposal
        </GlobalCustomButton>

        <GlobalCustomButton>Send Proposal</GlobalCustomButton>
      </Box>
      <ModalBox
        open={descriptionModal}
        onClose={toggleDescriptionModal}
        header="Proposal Description"
      >
        <ProposalDescription
          closeModal={toggleDescriptionModal}
          setDescription={setDescription}
          description={description}
        />
      </ModalBox>

      <ModalBox
        open={uploadModal}
        onClose={() => setUploadModal(false)}
        header="Upload Proposal"
      >
        <UploadProposal closeModal={() => setUploadModal(false)} />
      </ModalBox>
    </Box>
  );
};

export default CreateProposal;
