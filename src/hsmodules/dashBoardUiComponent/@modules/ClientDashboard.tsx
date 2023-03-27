import React, {useEffect, useState } from "react";
import { Box, Card, CardContent, Grid, Typography} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { People } from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';
import {
	TotalNumOfData,
	TotalNewClientWithinAMonth,
	TotalUpcomingAppointment,
	ClientPaymentMode,
	// TotalDischargedPatient,
	// TotalAdmittedPatient,
  } from "../utils/chartData/chartDataHandler";
import client from '../../../feathers';

const ClientDashboard = () => {
const clientService = client.service("/client");
const {totalUpcomingAppointment} = TotalUpcomingAppointment(clientService);
const appointmentServ = client.service('appointments');
const [appointments, setAppointments] = useState([]);

const patientServe = client.service('client');
const [patients, setPatients] = useState(0);

const [clientsByGender, setClientsByGender] = useState([]);

const getAppointments = () => {
	appointmentServ
		.find()
		.then(res => {
			setAppointments(res.data.length);
		})
		.catch(err => {
			console.log(err);
		});
};

const getPatients = () => {
	patientServe
		.find()
		.then(res => {
			setPatients(res.data.length);
		})
		.catch(err => {
			console.log(err);
		});
};

const getClientsByGender = () => {
    patientServe
      .find({
        query: {
           $select: ['gender'],
        //   $group: ['gender'],
          $limit: false,
        },
      })
      .then(res => {
		// console.log("My Res,", res);
        setClientsByGender(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  

useEffect(() => {
getAppointments();
getPatients();
getClientsByGender();
}, []);


// Total clients by gender chart series data
//    const totalClientsByGenderSeries = clientsByGender.map(patient => patient);

//  console.log("Data", totalClientsByGenderSeries)

// Total clients by gender chart options
const totalClientsByGenderOptions = {
	chart: {
	  type: "pie",
	  height: 300,
	},
	labels: ["Male", "Female"],
	colors: ["#e60000", "#2e3b84"],
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
   const totalClientsByGenderSeries = [35, 65];
  
	const monthlyClientAppointmentOptions = {
		chart: {
		  height: 350,
		  type: 'line',
		},
		series: [{
		  name: 'Appointments',
		  data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 70, 90, 110]
		}],
		xaxis: {
		  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		},
		yaxis: {
		  title: {
			text: 'Appointments'
		  }
		}
	  };
	  
	  const monthlyClientAppointmentSeries = [{  name: 'Appointments',  data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 70, 90, 110]
	  }];
	  

  return (
	<>
	<Box sx={{ backgroundColor: '#f5f5f5', pt: 6}}>
	<Grid container spacing={3} justifyContent="center" alignItems="center">
	  {/* Total Appointments Card */}
	  <Grid item xs={12}  md={3}>
		<Card sx={{ borderRadius: 2 }}>
		  <CardContent>
			<Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>
			Total Appointments
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
			  <Box sx={{ flexGrow: 1 }}>
				<Typography variant="h5" fontWeight="bold" component="div">
				 {appointments}
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
				  {patients}
				</Typography>
			  </Box>
			  <Box>
				<People color="primary" sx={{ fontSize: 48, bgcolor: '#dfdfec', p: 1, borderRadius: 8 }} />
			  </Box>
			</Box>
		  </CardContent>
		</Card>
	  </Grid>
  
	  {/* Monthly Client Appointments Chart */}
	  <Grid container justifyContent="space-between" spacing={2} sx={{ marginTop: 4 }}>
	  <Grid item xs={12} md={5} sx={{marginLeft: 9}}>
		<Card>
		  <CardContent>
			<Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>
			  Monthly Client Appointments
			</Typography>
			<Box sx={{ height: 300 }}>
			  <ReactApexChart
				options={monthlyClientAppointmentOptions}
				series={monthlyClientAppointmentSeries}
				type="line"
				height={300}
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
				  series={totalClientsByGenderSeries}
				  type="donut"
				  height={300}
				/>
			  </Box>
			</CardContent>
		  </Card>
		</Grid>
		</Grid>
		</Grid>
		</Box>
		</>
  )
}

export default ClientDashboard