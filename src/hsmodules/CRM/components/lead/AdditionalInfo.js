import {Card} from "@material-ui/core";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import {Box, IconButton, Typography} from "@mui/material";

const AdditionalInformationCard = ({text, action, editing}) => {
  return (
    <Card>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          padding: "10px 15px",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{width: "calc(100% - 50px)"}}>
          <Typography sx={{fontSize: "0.8rem", color: "#000000"}}>
            {text}
          </Typography>
        </Box>

        <IconButton
          size="small"
          onClick={action}
          sx={{width: "40px", height: "40px"}}
          color="error"
          disabled={!editing}
        >
          <DeleteOutline fontSize="small" />
        </IconButton>
      </Box>
    </Card>
  );
};

export default AdditionalInformationCard;
