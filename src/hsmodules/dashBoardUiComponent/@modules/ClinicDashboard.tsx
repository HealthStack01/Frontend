import {Box, Typography, Card, CardContent, Grid} from "@mui/material";
import React, {useEffect, useState} from "react";
import ReactApexChart from 'react-apexcharts';
import EventIcon from '@mui/icons-material/Event';
import { People } from '@mui/icons-material';
import ViewCard from "./@sections/ViewCard";
import LineChart from "../charts/LineChart";
import ColumnChart from "../charts/ColumnChart";


import client from "../../../feathers";
import {
  TotalNumOfData,
  TotalNewClientWithinAMonth,
  TotalUpcomingAppointment,
  ClientPaymentMode,
  // TotalDischargedPatient,
  // TotalAdmittedPatient,
} from "../utils/chartData/chartDataHandler";
import {CircleSeriesData} from "../utils/chartData/circleSeries";
import {clientLineData} from "../utils/chartData/LineData";

import {
  DashboardContainer,
  DashboardPageWrapper,
  StartCardWapper,
} from "../core-ui/styles";
import CircleChart from "../charts/CircleChart";
import {userDetails} from "../utils/fetchUserDetails";

const ClinicDashboard = () => {
  const [userName, setUserName] = useState("");
  const [facilityName, setFacilityName] = useState("");
  const [paymentModeData, setPaymentModeData] = useState([]);

  const clientService = client.service("/client");
  // const admissionService = client.service("/admission");
  const appointmentService = client.service("/appointments");
  const {totalValue} = TotalNumOfData(clientService);
  const {totalNewClient} = TotalNewClientWithinAMonth(appointmentService);
  const {totalUpcomingAppointment} = TotalUpcomingAppointment(clientService);
  const {monthNameForCurrentYear, newClientLineSeriesData} =
    clientLineData(clientService);

  const {circleSeriesArray} = CircleSeriesData(clientService);
  const {paymentModeBarSeries} = ClientPaymentMode(clientService);
  // const { totalDischargedPatient } = TotalDischargedPatient(admissionService);
  // const { totalAdmittedPatient } = TotalAdmittedPatient(admissionService);
  // const totalInPatient = totalAdmittedPatient - totalDischargedPatient;

  useEffect(() => {
    const {userFullName, facilityFullName} = userDetails();
    setUserName(userFullName);
    setFacilityName(facilityFullName);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return "morning";
    } else if (hour >= 12 && hour < 18) {
      return "afternoon";
    } else {
      return "evening";
    }
  }

// Total clients by gender chart options
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
  
  // Total clients by gender chart series data
   //const totalClientsByGenderSeries = [35, 65];

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
      enabled: false,
    },
    xaxis: {
      categories: ["Cash", "HMO", "Plan", "Family", "Comp"],
    },
    yaxis: {
      title: {
        text: "Number of Payments",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#002D5C"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
  };

  return (
    <DashboardPageWrapper>
      <Box>
        {/* <Box>
          <Typography variant="h2">
            Hello <span>{userName}</span>👋
          </Typography>
          <Typography variant="body1">
            Welcome to your Client Module{" "}
            <span>@Front Desk {facilityName}</span>
          </Typography>
        </Box> */}
        <Typography variant="h5" style={{ textShadow: "1px 1px 2px rgb(0, 45, 92)" }}>
  {`Good ${getGreeting()}, 
   Welcome to your Clinic Dashboard`}</Typography>
        <DashboardContainer>
        {/* <StartCardWapper> */}
    <Box sx={{ backgroundColor: '#f5f5f5', pt: 6}}>
	<Grid container spacing={3} justifyContent="center" alignItems="center">
	  {/* Total Appointments Card */}
	  <Grid item xs={12}  md={3}>
		<Card sx={{ borderRadius: 2 }}>
		  <CardContent>
			<Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>
			Total New Clients
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
			  <Box sx={{ flexGrow: 1 }}>
				<Typography variant="h5" fontWeight="bold" component="div">
				 {totalNewClient}
				</Typography>
			  </Box>
			  <Box>
				<EventIcon color="primary" sx={{ fontSize: 48, bgcolor: '#dfdfec', p: 1, borderRadius: 8 }} />
			  </Box>
			</Box>
		  </CardContent>
		</Card>
	  </Grid>
   
  
	  {/* Upcoming Appointments Card */}
	  <Grid item xs={12} sm={6} md={4}>
		<Card sx={{ borderRadius: 2 }}>
		  <CardContent>
			<Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>
			  Upcoming Appointments
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
			  <Box sx={{ flexGrow: 1 }}>
				<Typography variant="h5" fontWeight="bold" component="div">
				  {totalUpcomingAppointment}
				</Typography>
			  </Box>
			  <Box>
				<EventIcon color="primary" sx={{ fontSize: 48, bgcolor: '#dfdfec', p: 1, borderRadius: 8 }} />
			  </Box>
			</Box>
		  </CardContent>
		</Card>
	  </Grid>
  
	  {/* Total Clients Card */}
	  <Grid item xs={12} sm={6} md={4}>
		<Card sx={{ borderRadius: 2 }}>
		  <CardContent>
			<Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>
			Total Clients
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
			  <Box sx={{ flexGrow: 1 }}>
				<Typography variant="h5" component="div" fontWeight="bold">
				  {totalValue}
				</Typography>
			  </Box>
			  <Box>
				<People color="primary" sx={{ fontSize: 48, bgcolor: '#dfdfec', p: 1, borderRadius: 8 }} />
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
          {/* <ViewCard count={totalValue} title="Total Clients" />
          <ViewCard
            count={totalUpcomingAppointment}
            title="Upcoming Appointments"
          />
          <ViewCard count={totalNewClient} title="Total New Clients" /> */}
          {/* <ViewCard count={30} title={`Doctor's on Duty`} /> */}
        {/* </StartCardWapper> */}

      
          {/* <Box
            sx={{
              display: "grid",
              width: "100%",
              gridGap: "10px",
              // background: "#ffcc99", // "#f9f9f9",

              gridTemplateColumns: {lg: "repeat(3, 1fr)", xs: "1fr"},
            }}
          >
            <Box sx={{width: "100%", p: 2}}>
              <ColumnChart
                title="Payment Mode"
                series={paymentModeBarSeries}
                xLabels={["Cash", "HMO", "Comp", "Family Plan", "All"]}
              />
            </Box>
            <Box sx={{width: "100%", p: 2}}>
              <LineChart
                title="New Clients"
                monthArray={monthNameForCurrentYear}
                series={newClientLineSeriesData}
              />
            </Box>
            <Box sx={{width: "100%", p: 2}}>
              <CircleChart
                series={circleSeriesArray}
                labels={["Male", "Female", "Other"]}
                title="Total Client by Gender"
              />
            </Box>
          </Box> */}
        </DashboardContainer>
      </Box>
    </DashboardPageWrapper>
  );
};

export default ClinicDashboard;
