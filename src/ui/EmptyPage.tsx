import {Box, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {userDetails} from "../hsmodules/dashBoardUiComponent/utils/fetchUserDetails";

const EmptyPage = () => {
  const [userName, setUserName] = useState("");
  const [facilityName, setFacilityName] = useState("");

  useEffect(() => {
    const {userFullName, facilityFullName} = userDetails();
    setUserName(userFullName);
    setFacilityName(facilityFullName);
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "grid",
        placeItems: "center ",
      }}
    >
      <Box sx={{textAlign: "center"}}>
        <Box>
          <Typography variant="h4">
            Hello <span>{userName}</span>👋
          </Typography>
          <Typography variant="body1">
            Welcome to your company {facilityName}
          </Typography>
        </Box>
        <img src="/empty.png" alt="Empty Notifications" width={400} />
        <h2>There are no notifications available.</h2>
      </Box>
    </Box>
  );
};

export default EmptyPage;
