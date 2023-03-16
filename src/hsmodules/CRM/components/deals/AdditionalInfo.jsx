import DeleteOutline from "@mui/icons-material/DeleteOutline";
import {Box, Grid, IconButton, Typography} from "@mui/material";
import moment from "moment";
import {useForm} from "react-hook-form";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import Input from "../../../../components/inputs/basic/Input";
import Textarea from "../../../../components/inputs/basic/Textarea";

const AdditionalInformationCard = ({action, data}) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        padding: "8px 8px",
        justifyContent: "space-between",
        boxShadow: 2,
        borderRadius: "7.5px",
      }}
    >
      <Box
        sx={{
          width: "80px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          borderRight: "1px solid lightgray",
        }}
      >
        <Typography sx={{fontSize: "0.75rem", color: "#000000"}}>
          {moment(data.created_at).format("L")}
        </Typography>

        <Typography sx={{fontSize: "0.75rem", color: "#000000"}}>
          {moment(data.created_at).format("LT")}
        </Typography>
      </Box>

      <Box sx={{width: "calc(100% - 150px)", display: "flex"}}>
        <Box sx={{width: "100%"}}>
          <Typography sx={{fontSize: "0.75rem", color: "#000000"}}>
            <span
              style={{fontSize: "0.8rem", color: "#0064CC", marginRight: "3px"}}
            >
              {data.created_by} -
            </span>
            {data.information}
          </Typography>
        </Box>
      </Box>

      <IconButton
        size="small"
        onClick={action}
        sx={{width: "30px", height: "30px"}}
        color="error"
      >
        <DeleteOutline fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default AdditionalInformationCard;

export const CreateAdditionalInfo = ({addInfo, closeModal}) => {
  const {register, handleSubmit, control} = useForm();

  const handleAddInfo = data => {
    const newData = {
      created_by: "Sulaimon Olaniran",
      information: data.additional_info,
      created_at: moment.now(),
      _id: `${Math.random()}`,
    };
    addInfo(newData);
    closeModal();
    //console.log(data);
  };

  return (
    <Box
      sx={{
        width: "400px",
      }}
    >
      <Box mb={2}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Textarea
              label="Additional Information"
              placeholder="Write here..."
              register={register("additional_info", {required: true})}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{display: "flex"}}>
        <GlobalCustomButton
          onClick={handleSubmit(handleAddInfo)}
          sx={{marginRight: "10px"}}
        >
          Add Information
        </GlobalCustomButton>

        <GlobalCustomButton onClick={closeModal} color="error">
          Cancel
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};
