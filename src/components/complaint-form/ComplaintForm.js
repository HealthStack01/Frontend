import {Box} from "@mui/material";

import client from "../../feathers";

const PopUpComplaintFormComponent = () => {
  const complaintServer = client.service("complaints");

  return (
    <Box
      sx={{
        width: "400px",
        height: "600px",
      }}
    >
      <Box></Box>
    </Box>
  );
};

export default PopUpComplaintFormComponent;
