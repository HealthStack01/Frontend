import React, {useEffect, useState} from 'react'
import { userDetails } from "../utils/fetchUserDetails";
import {
    DashboardContainer,
    DashboardPageWrapper,
    StartCardWapper,
  } from "../core-ui/styles";
import ViewCard from "./@sections/ViewCard";
import { Box, Typography } from "@mui/material";


const CrmDashboard = () => {
    const [userName, setUserName] = useState("");
    const [facilityName, setFacilityName] = useState("");
  
    useEffect(() => {
      const { userFullName, facilityFullName } = userDetails();
      setUserName(userFullName);
      setFacilityName(facilityFullName);
    }, []);
        return (
            <DashboardPageWrapper>
                <Box>
          <Typography variant="h2">
            Hello <span>{userName}</span>👋
          </Typography>
          <Typography variant="body1">
            Welcome to your Managed Care{" "}
            <span>Dashboard</span>
          </Typography>
        </Box>

        <StartCardWapper>
          <ViewCard count={50} title="Total Claims" />
          <ViewCard count={180} title="Total Referrals" />
          <ViewCard count={16} title="Total Check-in" />
          <ViewCard count={12} title="No. Of HMO Tariff" />
        </StartCardWapper>

            
            </DashboardPageWrapper>
  )
}

export default CrmDashboard
