import React, {useEffect, useState} from "react";
import {Box, Typography, Card, CardContent, Grid} from "@mui/material";
import LabIcon from '@mui/icons-material/Science';
import PendingIcon from '@mui/icons-material/PlaylistAddCheck';
import ReportIcon from '@mui/icons-material/Description';
import EventIcon from '@mui/icons-material/Event';
import BillsIcon from '@mui/icons-material/Receipt';
import ViewCard from "./@sections/ViewCard";
import ViewCardWithFilter from "./@sections/ViewCardWithFilter";
// import AreaChart from "../charts/AreaChart";
// import BarChart from "../charts/BarChart";
// import BubbleChart from "../charts/BubbleChart";
// import CircleChart from "../charts/CircleChart";

import client from "../../../feathers";

import {
  DashboardContainer,
  DashboardPageWrapper,
  StartCardWapper,
} from "../core-ui/styles";
import {userDetails} from "../utils/fetchUserDetails";

import {TotalModeltDataForPresent} from "../utils/chartData/queryHandler";

import {
  FetchTotalRevenue,
  FetchTotalBalance,
  FetchTotalMoneyCollectedWithInPresentRange,
  ModelResult,
} from "../utils/chartData/chartDataHandler";

const LaboratoryDashboard = () => {
  const [userName, setUserName] = useState("");
  const [facilityName, setFacilityName] = useState("");
  const billsService = client.service("/bills");
  const inventoryService = client.service("inventory");
  const orderService = client.service("order");

  //query function

  const {fetchTotalRevenue} = FetchTotalRevenue(billsService);
  const {fetchTotalBalance} = FetchTotalBalance(billsService);

  const {
    totalPresentDataObject: fetchTotalMoneyCollectedPresentDataObject,
    isLoading,
  } = TotalModeltDataForPresent(
    billsService,
    FetchTotalMoneyCollectedWithInPresentRange
  );

  const {modelResult} = ModelResult(orderService);


  useEffect(() => {
    const {userFullName, facilityFullName} = userDetails();
    setUserName(userFullName);
    setFacilityName(facilityFullName);
  }, []);

  return (
    <DashboardPageWrapper>
      <Box>
      <Typography variant="h5" style={{ textShadow: "1px 1px 2px rgb(0, 45, 92)" }}>Laboratory Dashboard</Typography>
      <Grid container spacing={3} justifyContent="space-between" alignItems="center" style={{marginTop: '20px'}}>
        <Grid item xs={12}  md={3}>
		<Card sx={{ borderRadius: 2 }}>
		  <CardContent>
			<Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>
			Lab Order Reported
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
			  <Box sx={{ flexGrow: 1 }}>
				<Typography variant="h5" fontWeight="bold" component="div">
				    None
				</Typography>
			  </Box>
			  <Box>
				<ReportIcon  sx={{ fontSize: 48, bgcolor: '#dfdfec', p: 1, borderRadius: 8, color:'#002D5C' }} />
			  </Box>
			</Box>
		  </CardContent>
		</Card>
	  </Grid>
    <Grid item xs={12}  md={3}>
		<Card sx={{ borderRadius: 2 }}>
		  <CardContent>
			<Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>
			Most frequent lab tests received
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
			  <Box sx={{ flexGrow: 1 }}>
				<Typography variant="h5" fontWeight="bold" component="div">
				    None
				</Typography>
			  </Box>
			  <Box>
				<LabIcon sx={{ fontSize: 48, bgcolor: '#dfdfec', p: 1, borderRadius: 8, color:'#002D5C' }} />
			  </Box>
			</Box>
		  </CardContent>
		</Card>
	  </Grid>
    <Grid item xs={12}  md={3}>
		<Card sx={{ borderRadius: 2 }}>
		  <CardContent>
			<Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>
			Total Pending Balance
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
			  <Box sx={{ flexGrow: 1 }}>
				<Typography variant="h5" fontWeight="bold" component="div">
        {`₦${fetchTotalBalance}`}
				</Typography>
			  </Box>
			  <Box>
				<PendingIcon  sx={{ fontSize: 48, bgcolor: '#dfdfec', p: 1, borderRadius: 8, color:'#002D5C' }} />
			  </Box>
			</Box>
		  </CardContent>
		</Card>
	  </Grid>
    <Grid item xs={12}  md={3}>
		<Card sx={{ borderRadius: 2 }}>
		  <CardContent>
			<Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>
			Pending Bills
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
			  <Box sx={{ flexGrow: 1 }}>
				<Typography variant="h5" fontWeight="bold" component="div">
				    None
				</Typography>
			  </Box>
			  <Box>
				<BillsIcon  sx={{ fontSize: 48, bgcolor: '#dfdfec', p: 1, borderRadius: 8, color:'#002D5C' }} />
			  </Box>
			</Box>
		  </CardContent>
		</Card>
	  </Grid>
    <Grid item xs={12} sm={6} md={4}>
		<Card sx={{ borderRadius: 2 }}>
		  <CardContent>
      <ViewCardWithFilter
            count={fetchTotalBalance}
            title="Lab orders received"
            hasFilter={true}
            dataSource={fetchTotalMoneyCollectedPresentDataObject}
            isLoading={isLoading}
          />
		  </CardContent>
		</Card>
	  </Grid>
    </Grid>
      </Box>
    </DashboardPageWrapper>
  );
};

export default LaboratoryDashboard;
