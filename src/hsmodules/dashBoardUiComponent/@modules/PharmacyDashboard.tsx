import {Box, Typography, Card, CardContent, Grid} from "@mui/material";
import React, {useEffect, useState} from "react";
import ViewCardWithFilter from "./@sections/ViewCardWithFilter";
import TotalStockIcon from '@mui/icons-material/Inventory';
import TotalSalesIcon from '@mui/icons-material/ShoppingCart';
import {PharmacyLineSeriesData} from "../utils/chartData/LineData";
import client from "../../../feathers";

import {
  DashboardPageWrapper,
} from "../core-ui/styles";
import {userDetails} from "../utils/fetchUserDetails";

import {
  TotalModeltDataForPresent,
  FetchTotalStockQuantity,
} from "../utils/chartData/queryHandler";

import {
  FetchTotalPrescriptionOrderWithInPresentRange,
  FetchTotalPrescriptionBilledWithInPresentRange,
  FetchTotalPrescriptionPendingWithInPresentRange,
  FetchTotalSaleValueWithInPresentRange,
  FetchTotalStockValueWithInPresentRange,
  FetchTotalSalePharmacy,
  ModelResult,
} from "../utils/chartData/chartDataHandler";

const PharmacyDashboard = () => {
  const [userName, setUserName] = useState("");
  const [facilityName, setFacilityName] = useState("");

  const orderService = client.service("order");
  const billsService = client.service("/bills");
  const inventoryService = client.service("inventory");

  const {
    totalPresentDataObject: prescriptionOrderPresentDataObject,
    isLoading: isSentLoading,
  } = TotalModeltDataForPresent(
    orderService,
    FetchTotalPrescriptionOrderWithInPresentRange
  );
  const {totalPresentDataObject: prescriptionBilledPresentDataObject} =
    TotalModeltDataForPresent(
      orderService,
      FetchTotalPrescriptionBilledWithInPresentRange
    );
  const {totalPresentDataObject: prescriptionPendingPresentDataObject} =
    TotalModeltDataForPresent(
      orderService,
      FetchTotalPrescriptionPendingWithInPresentRange
    );

  const {totalPresentDataObject: pharmacyStockValuePresentDataObject} =
    TotalModeltDataForPresent(
      inventoryService,
      FetchTotalStockValueWithInPresentRange
    );

  const {totalPresentDataObject: pharmacySaleValuePresentDataObject} =
    TotalModeltDataForPresent(
      billsService,
      FetchTotalSaleValueWithInPresentRange
    );
  const {fetchTotalStockQuantity} = FetchTotalStockQuantity(inventoryService);
  // const { fetchTotalStockValue } = FetchTotalStockValue(inventoryService);

  const {fetchTotalSalePharmacy} = FetchTotalSalePharmacy(billsService);

  const {monthNameForCurrentYear, pharmacyLineSeriesData} =
    PharmacyLineSeriesData(billsService, inventoryService);

  /**
   * test
   */
  const {modelResult} = ModelResult(billsService);

  useEffect(() => {
    const {userFullName, facilityFullName} = userDetails();
    setUserName(userFullName);
    setFacilityName(facilityFullName);
  }, []);
  return (
    <DashboardPageWrapper>
      <Box>
        <Typography variant="h5" style={{ textShadow: "1px 1px 2px rgb(0, 45, 92)" }}>Pharmacy Dashboard</Typography>
        <Grid container spacing={3} justifyContent="center" alignItems="center" style={{marginTop: '20px'}}>
        <Grid item xs={12}  md={6}>
		<Card sx={{ borderRadius: 2 }}>
		  <CardContent>
			<Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>
			Total Stock
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
			  <Box sx={{ flexGrow: 1 }}>
				<Typography variant="h5" fontWeight="bold" component="div">
				{`${fetchTotalStockQuantity}K`}
				</Typography>
			  </Box>
			  <Box>
				<TotalStockIcon  sx={{ fontSize: 48, bgcolor: '#dfdfec', p: 1, borderRadius: 8, color:'#002D5C' }} />
			  </Box>
			</Box>
		  </CardContent>
		</Card>
	  </Grid>
    <Grid item xs={12}  md={6}>
		<Card sx={{ borderRadius: 2 }}>
		  <CardContent>
			<Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>
			Total Sales
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
			  <Box sx={{ flexGrow: 1 }}>
				<Typography variant="h5" fontWeight="bold" component="div">
				{`₦${fetchTotalSalePharmacy}K`}
				</Typography>
			  </Box>
			  <Box>
				<TotalSalesIcon  sx={{ fontSize: 48, bgcolor: '#dfdfec', p: 1, borderRadius: 8, color:'#002D5C' }} />
			  </Box>
			</Box>
		  </CardContent>
		</Card>
	  </Grid>
    <Grid item xs={12} sm={6} md={4}>
		<Card sx={{ borderRadius: 2 }}>
		  <CardContent>
      <ViewCardWithFilter
            count={0}
            title="Total Stock Value"
            hasFilter={true}
            dataSource={pharmacyStockValuePresentDataObject}
            isLoading={isSentLoading}
          />
		  </CardContent>
		</Card>
	  </Grid>
    <Grid item xs={12} sm={6} md={4}>
		<Card sx={{ borderRadius: 2 }}>
		  <CardContent>
      <ViewCardWithFilter
            count={0}
            title="No Of Prescription Dispensed"
            hasFilter={true}
            dataSource={prescriptionOrderPresentDataObject}
            isLoading={isSentLoading}
          />
		  </CardContent>
		</Card>
	  </Grid>
    <Grid item xs={12} sm={6} md={4}>
		<Card sx={{ borderRadius: 2 }}>
		  <CardContent>
      <ViewCardWithFilter
            count={0}
            title="Total Sale Value"
            hasFilter={true}
            dataSource={pharmacySaleValuePresentDataObject}
            isLoading={isSentLoading}
          />
		  </CardContent>
		</Card>
	  </Grid>
     </Grid>  
      </Box>
    </DashboardPageWrapper>
  );
};

export default PharmacyDashboard;
