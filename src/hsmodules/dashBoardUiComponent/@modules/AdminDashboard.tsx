import React, {useEffect, useState} from "react";
import {Box, Stack, Typography, Card, CardContent, Grid} from "@mui/material";
import TotalStockIcon from '@mui/icons-material/Inventory';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import RoomIcon from '@mui/icons-material/Room';
import ViewCard from "./@sections/ViewCard";
import AreaChart from "../charts/AreaChart";
import BubbleChart from "../charts/BubbleChart";
import HorizontalBar from "../charts/HorizontalBar";
import PieChart from "../charts/PieChat";
import ReactApexChart from 'react-apexcharts';
import client from "../../../feathers";
import {
  DashboardContainer,
  DashboardPageWrapper,
} from "../core-ui/styles";
import {
  ClientPaymentMode,
} from "../utils/chartData/chartDataHandler";
import {userDetails} from "../utils/fetchUserDetails";
import {CircleSeriesData} from "../utils/chartData/circleSeries";

const AdminDashboard = () => {
  const clientService = client.service("/client");
  const {circleSeriesArray} = CircleSeriesData(clientService);
  const [userName, setUserName] = useState("");
  const [facilityName, setFacilityName] = useState("");

  const {paymentModeBarSeries} = ClientPaymentMode(clientService);

  const paymentModeOption = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: ["Cash", "HMO", "Plan", "Family", "Comp"],
      title: {
        text: ".",
      },
    },
    yaxis: {
      title: {
        text: "Number of Patients Admitted",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#990033"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
  };

  const totalClientsByGenderOptions = {
    chart: {
      type: "pie",
      height: 300,
    },
    labels: ["Male", "Female", "Other"],
    colors: ["#e60000", "#2e3b84", "#009900"],
    legend: {
      position: "bottom",
    },
    responsive: [
      {
      breakpoint: 480,
      options: {
        chart: {
        width: 200,
        },
        legend: {
        position: "bottom",
        },
      },
      },
    ],
    };



  useEffect(() => {
    const {userFullName, facilityFullName} = userDetails();
    setUserName(userFullName);
    setFacilityName(facilityFullName);
  }, []);

  return (
    <DashboardPageWrapper>
      <Box>
      <Typography variant="h5" style={{ textShadow: "1px 1px 2px rgb(0, 45, 92)" }}>Admin Dashboard</Typography>
        <Grid container spacing={3} justifyContent="center" alignItems="center" style={{marginTop: '20px'}}>
        <Grid item xs={12}  md={4}>
		<Card sx={{ borderRadius: 2 }}>
		  <CardContent>
			<Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>
			Total Bands
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
			  <Box sx={{ flexGrow: 1 }}>
				<Typography variant="h5" fontWeight="bold" component="div">
				None
				</Typography>
			  </Box>
			  <Box>
				<TotalStockIcon  sx={{ fontSize: 48, bgcolor: '#dfdfec', p: 1, borderRadius: 8, color:'#002D5C' }} />
			  </Box>
			</Box>
		  </CardContent>
		</Card>
	  </Grid>
    <Grid item xs={12}  md={4}>
		<Card sx={{ borderRadius: 2 }}>
		  <CardContent>
			<Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>
      Total Employees
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
			  <Box sx={{ flexGrow: 1 }}>
				<Typography variant="h5" fontWeight="bold" component="div">
				None
				</Typography>
			  </Box>
			  <Box>
				<SupervisedUserCircleIcon  sx={{ fontSize: 48, bgcolor: '#dfdfec', p: 1, borderRadius: 8, color:'#002D5C' }} />
			  </Box>
			</Box>
		  </CardContent>
		</Card>
	  </Grid>
    <Grid item xs={12}  md={4}>
		<Card sx={{ borderRadius: 2 }}>
		  <CardContent>
			<Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>
      Total Location
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
			  <Box sx={{ flexGrow: 1 }}>
				<Typography variant="h5" fontWeight="bold" component="div">
				None
				</Typography>
			  </Box>
			  <Box>
				<RoomIcon sx={{ fontSize: 48, bgcolor: '#dfdfec', p: 1, borderRadius: 8, color:'#002D5C' }} />
			  </Box>
			</Box>
		  </CardContent>
		</Card>
	  </Grid>

     {/* Payment Mode Bar Chart */}
		<Grid item xs={12} md={5} sx={{marginRight: 6}}>
		  <Card>
			<CardContent>
			  <Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>
				Payment
			  </Typography>
			  <Box sx={{ height: 300 }}>
        <ReactApexChart
  options={paymentModeOption}
  series={paymentModeBarSeries}
  type="bar"
  height={350}
/>
			  </Box>
			</CardContent>
		  </Card>
		</Grid>
    {/* Total Clients by Gender Chart */}
		<Grid item xs={12} md={5} sx={{marginRight: 6}}>
		  <Card>
			<CardContent>
			  <Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>
				Total Clients by Gender
			  </Typography>
			  <Box sx={{ height: 300 }}>
				<ReactApexChart
				  options={totalClientsByGenderOptions}
				  series={circleSeriesArray}
				  type="donut"
				  height={300}
				/>
			  </Box>
			</CardContent>
		  </Card>
		</Grid>
    </Grid>
      </Box>
    </DashboardPageWrapper>
  );
};

export default AdminDashboard;
