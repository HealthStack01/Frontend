import React, {useEffect, useState } from "react";
import { Box, Card, CardContent, Grid, Typography} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { People } from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';
import {
	DashboardPageWrapper,
  } from "../core-ui/styles";
import {
	// TotalNumOfData,
	TotalNumOfMaleClient,
	TotalNumOfFemaleClient,
	TotalNewClientWithinAMonth,
	TotalUpcomingAppointment,
  } from "../utils/chartData/chartDataHandler";
import client from '../../../feathers';

const ClientDashboard = () => {
const clientService = client.service("/client");
// const {totalValue} = TotalNumOfData(clientService);
const {totalNewClient} = TotalNewClientWithinAMonth(clientService);
const {totalNumMaleClient} = TotalNumOfMaleClient(clientService);
const {totalNumFemaleClient} = TotalNumOfFemaleClient(clientService);
const {totalUpcomingAppointment} = TotalUpcomingAppointment(clientService);
const appointmentServ = client.service('appointments');
const [appointments, setAppointments] = useState([]);

const patientServe = client.service('client');
const [patients, setPatients] = useState(0);

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
  

useEffect(() => {
getAppointments();
getPatients();
}, []);

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
   const totalClientsByGenderSeries = [totalNumMaleClient, totalNumFemaleClient];
  
	const monthlyNewClientOptions = {
		chart: {
		  height: 350,
		  type: 'line',
		},
		series: [{
		  name: 'New Clients',
		  data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 70, 90, 110]
		}],
		xaxis: {
		  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		},
		yaxis: {
		  title: {
			text: 'New Clients'
		  }
		}
	  };
	  
	  const monthlyNewClienttSeries = [{  name: 'New Clients',  data: [totalNewClient]
	  }];
	  

  return (
	<DashboardPageWrapper>
		<Typography variant="h5" style={{ textShadow: "1px 1px 2px rgb(0, 45, 92)" }}>Membership Dashboard</Typography>
	<Box sx={{ backgroundColor: '#f5f5f5', pt: 6}}>
	
		</Box>
		</DashboardPageWrapper>
  )
}

export default ClientDashboard