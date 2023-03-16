import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AreaChart from "../charts/AreaChart";
import PieChart from "../charts/PieChat";
import {
  DashboardPageWrapper,
  StartCardWapper
} from "../core-ui/styles";
import { userDetails } from "../utils/fetchUserDetails";
import ViewCard from "./@sections/ViewCard";

const CrmDashboard = () => {
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
        <Typography variant="h2">
          Hello <span>{userName}</span>👋
        </Typography>
        <Typography variant="body1">
          Welcome to your Managed Care <span>Dashboard</span>
        </Typography>
      </Box>

      <StartCardWapper>
        <ViewCard count={50} title="Total Claims" />
        <ViewCard count={180} title="Total Referrals" />
        <ViewCard count={16} title="Total Check-in" />
        <ViewCard count={12} title="No. Of HMO Tariff" />
      </StartCardWapper>

      <Box style={{display: "flex", alignItems: "center"}}>
        <div style={{width: "60%", height: "40%", background: "#f9f9f9"}}>
          <h5 style={{color: "#0064cc", fontWeight: "700", fontSize: "24px"}}>
            Deals
          </h5>
          <PieChart />
        </div>
        <div style={{marginLeft: "2rem", width: "60%", background: "#f9f9f9"}}>
          <h5 style={{color: "#0064cc", fontWeight: "700", fontSize: "24px"}}>
            Amount
          </h5>
          <AreaChart />
        </div>
      </Box>
    </DashboardPageWrapper>
  );
};

export default CrmDashboard;
