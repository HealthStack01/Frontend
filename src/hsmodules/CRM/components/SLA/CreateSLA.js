import {useState} from "react";
import {Box, Grid, Typography} from "@mui/material";
import Input from "../../../../components/inputs/basic/Input";
import ModalBox from "../../../../components/modal";
import {FormsHeaderText} from "../../../../components/texts";
import SLADescription from "./SLADescription";
import {useForm} from "react-hook-form";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import CustomSelect from "../../../../components/inputs/basic/Select";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {DetailView} from "../lead/LeadDetailView";

const CreateSLA = ({closeModal}) => {
  const {register, control} = useForm();
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [description, setDescription] = useState("");

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
                SLA Description
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

        <GlobalCustomButton>Send SLA</GlobalCustomButton>
      </Box>
      <ModalBox
        open={descriptionModal}
        onClose={toggleDescriptionModal}
        header="SLA Description"
      >
        <SLADescription
          closeModal={toggleDescriptionModal}
          setDescription={setDescription}
          description={description}
        />
      </ModalBox>
    </Box>
  );
};

export default CreateSLA;
