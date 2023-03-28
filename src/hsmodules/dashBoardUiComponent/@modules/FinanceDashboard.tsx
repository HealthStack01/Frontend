import {Box, Typography, Card, CardContent, Grid} from "@mui/material";
import React, {useEffect, useState, useContext} from "react";
import {ObjectContext} from '../../../context';
import ViewCardWithFilter from "./@sections/ViewCardWithFilter";
import TotalRevenueIcon from '@mui/icons-material/AttachMoney';
import TotalMoneyCollectedIcon from '@mui/icons-material/MonetizationOn';
import PendingBillsIcon from '@mui/icons-material/ReceiptLong';

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
  FetchTotalPendingBills,
  FetchTotalMoneyCollected,
  ModelResult,
} from "../utils/chartData/chartDataHandler";

const FinanceDashboard = () => {
  const {showActionLoader, hideActionLoader} = useContext(ObjectContext);
  const [userName, setUserName] = useState("");
  const [facilityName, setFacilityName] = useState("");
  const billsService = client.service("/bills");
  const inventoryService = client.service("inventory");

  //query function

  const {fetchTotalRevenue} = FetchTotalRevenue(billsService);
  const {fetchTotalBalance} = FetchTotalBalance(billsService);
  const {fetchTotalPendingBills} = FetchTotalPendingBills(billsService);
  const {fetchTotalMoneyCollected} = FetchTotalMoneyCollected(billsService);

  const {
    totalPresentDataObject: fetchTotalMoneyCollectedPresentDataObject,
    isLoading,
  } = TotalModeltDataForPresent(
    billsService,
    FetchTotalMoneyCollectedWithInPresentRange
  );

  const {modelResult} = ModelResult(billsService);

  useEffect(() => {
    const {userFullName, facilityFullName} = userDetails();
    setUserName(userFullName);
    setFacilityName(facilityFullName);
  }, []);


  return (
    <DashboardPageWrapper>
      <Box>
      <Typography variant="h5" style={{ textShadow: "1px 1px 2px rgb(0, 45, 92)" }}>Finance Dashboard</Typography>
        <Grid container spacing={3} justifyContent="space-between" alignItems="center" style={{marginTop: '20px'}}>
        <Grid item xs={12}  md={3}>
		<Card sx={{ borderRadius: 2 }}>
		  <CardContent>
			<Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>
			Total Revenue
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
			  <Box sx={{ flexGrow: 1 }}>
				<Typography variant="h5" fontWeight="bold" component="div">
				{`₦${fetchTotalRevenue}`}
				</Typography>
			  </Box>
			  <Box>
				<TotalRevenueIcon  sx={{ fontSize: 48, bgcolor: '#dfdfec', p: 1, borderRadius: 8, color:'#002D5C' }} />
			  </Box>
			</Box>
		  </CardContent>
		</Card>
	  </Grid>
   
  
	  {/* Money Collected Card */}
	  <Grid item xs={12} sm={6} md={4}>
		<Card sx={{ borderRadius: 2 }}>
		  <CardContent>
			<Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>
			  Total Money Collected
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
			  <Box sx={{ flexGrow: 1 }}>
				<Typography variant="h5" fontWeight="bold" component="div">
          {`₦${fetchTotalMoneyCollected}`}
				</Typography>
			  </Box>
			  <Box>
				<TotalMoneyCollectedIcon sx={{ fontSize: 48, bgcolor: '#dfdfec', p: 1, borderRadius: 8, color:'#002D5C' }} />
			  </Box>
			</Box>
		  </CardContent>
		</Card>
	  </Grid>
  
	  {/* Pending Bills Card */}
	  <Grid item xs={12} sm={6} md={4}>
		<Card sx={{ borderRadius: 2 }}>
		  <CardContent>
			<Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>
			Pending Bills
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
			  <Box sx={{ flexGrow: 1 }}>
				<Typography variant="h5" component="div" fontWeight="bold">
				{`₦${fetchTotalPendingBills}`}
				</Typography>
			  </Box>
			  <Box>
				<PendingBillsIcon sx={{ fontSize: 48, bgcolor: '#dfdfec', p: 1, borderRadius: 8, color:'#002D5C' }} />
			  </Box>
			</Box>
		  </CardContent>
		</Card>
	  </Grid>
    <Grid item xs={12} sm={6} md={4}>
		<Card sx={{ borderRadius: 2 }}>
		  <CardContent>
      <ViewCardWithFilter
            count={fetchTotalMoneyCollected}
            title="Collection Breakdown"
            hasFilter={true}
            dataSource={fetchTotalMoneyCollectedPresentDataObject}
            isLoading={isLoading}
          />
		  </CardContent>
		</Card>
	  </Grid>
    </Grid>
     {/* Pending Balance Card */}
	
     {/* Money Collected Card */}
	 
          {/* <ViewCard count={`${fetchTotalRevenue}K`} title="Total Revenue" />
          <ViewCard
            count={`${fetchTotalPendingBills}K`}
            title="Pending Bills"
          /> */}
        
        {/* </StartCardWapper> */}
      </Box>
    </DashboardPageWrapper>
  );
};

export default FinanceDashboard;
