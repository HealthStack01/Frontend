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
        width: "85vw",
      }}
    >
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={12}>
          <Box mb={2}>
            <FormsHeaderText text="Company Details" />
          </Box>

          <Grid container spacing={1}>
            <Grid item lg={6} md={8} sm={12}>
              <Input
                label="Company Name"
                register={register("company_name", {required: true})}
              />
            </Grid>

            <Grid item lg={3} md={4} sm={6}>
              <Input
                label="Deal Probability"
                register={register("deal_probability", {required: true})}
              />
            </Grid>

            <Grid item lg={3} md={4} sm={6}>
              <Input
                label="Deal Size"
                register={register("deal_size", {required: true})}
              />
            </Grid>

            <Grid item lg={3} md={4} sm={6}>
              <CustomSelect
                label="Deal Status"
                options={["Open", "Closed", "Pending"]}
                register={register("deal_status", {required: true})}
              />
            </Grid>

            <Grid item lg={3} md={4} sm={6}>
              <CustomSelect
                label="Next Action"
                options={["First", "Second", "Third"]}
                register={register("next_action", {required: true})}
              />
            </Grid>

            <Grid item lg={3} md={4} sm={6}>
              <MuiCustomDatePicker
                label="Closing Date"
                name="closing_date"
                control={control}
              />
            </Grid>

            <Grid item lg={3} md={4} sm={6}>
              <Input
                label="Weight Forcast"
                register={register("weight_forcast", {required: true})}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6} md={6} sm={12}>
          <Box mb={2} sx={{display: "flex", justifyContent: "space-between"}}>
            <FormsHeaderText text="Description" />
            {/* <GlobalCustomButton onClick={toggleDescriptionModal}>
              Update Description
            </GlobalCustomButton> */}
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
          View Draft
        </GlobalCustomButton>

        <GlobalCustomButton>Generate SLA</GlobalCustomButton>
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
