import {Box, Stack, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";

import ViewCard from "./@sections/ViewCard";
import AreaChart from "../charts/AreaChart";
import BubbleChart from "../charts/BubbleChart";
import HorizontalBar from "../charts/HorizontalBar";
import PieChart from "../charts/PieChat";

import {
  DashboardContainer,
  DashboardPageWrapper,
  StartCardWapper,
} from "../core-ui/styles";
import {userDetails} from "../utils/fetchUserDetails";

const AdminDashboard = () => {
  const [userName, setUserName] = useState("");
  const [facilityName, setFacilityName] = useState("");

  useEffect(() => {
    const {userFullName, facilityFullName} = userDetails();
    setUserName(userFullName);
    setFacilityName(facilityFullName);
  }, []);

  return (
    <DashboardPageWrapper>
      <Box>
        <Box>
          <Typography variant="h2">
            Hello <span>{userName}</span>👋
          </Typography>
          <Typography variant="body1">
            Welcome to your Client Module{" "}
            <span>@Front Desk {facilityName}</span>
          </Typography>
        </Box>

        <StartCardWapper>
          <ViewCard count={40} title="Total Bands" />
          <ViewCard count={16} title="Total Employees" />
          <ViewCard count={56} title="Total Location" />
        </StartCardWapper>

        <DashboardContainer>
          <Box
            sx={{
              display: "grid",
              width: "100%",
              gridGap: "10px",
              gridTemplateColumns: {lg: "repeat(3, 1fr)", xs: "1fr"},
            }}
          >
            <Box sx={{width: "100%", p: 2}}>
              <HorizontalBar title="Patient Distribution" />
              <Stack direction="row">
                <ViewCard count={40} title="Out Patients" />
                <ViewCard count={16} title="In Patients" />
              </Stack>
            </Box>
            <Box sx={{width: "100%", p: 2}}>
              <AreaChart />
              <PieChart donutSize={0} />
            </Box>
            <Box sx={{width: "100%", p: 2}}>
              <BubbleChart />
            </Box>
          </Box>
        </DashboardContainer>
      </Box>
    </DashboardPageWrapper>
  );
};

export default AdminDashboard;
