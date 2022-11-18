import {Box, Button, Grid} from "@mui/material";

const LeadDetail = () => {
  return (
    <Box
      container
      sx={{
        width: "800px",
        height: "80vh",
      }}
    >
      <Box sx={{display: "flex", justifyContent: "flex-end"}}>
        <Button
          variant="contained"
          size="small"
          sx={{textTransform: "capitalize", marginRight: "10px"}}
          color="secondary"
        >
          Edit Lead
        </Button>

        <Button
          variant="contained"
          size="small"
          sx={{textTransform: "capitalize", marginRight: "10px"}}
        >
          Assign Staff
        </Button>

        <Button
          variant="contained"
          size="small"
          sx={{textTransform: "capitalize", marginRight: "10px"}}
          color="success"
        >
          Schedule Appointment
        </Button>

        <Button
          variant="outlined"
          size="small"
          sx={{textTransform: "capitalize"}}
        >
          Generate Proposal
        </Button>
      </Box>
      <Grid></Grid>
    </Box>
  );
};

export default LeadDetail;
