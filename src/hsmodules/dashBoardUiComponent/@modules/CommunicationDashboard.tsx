import {Box, Typography, Card, CardContent, Grid} from "@mui/material";
import React, {useEffect, useState} from "react";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ChatIcon from '@mui/icons-material/Chat';
import { GroupAdd } from '@mui/icons-material';
import SmsIcon from '@mui/icons-material/Sms';
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

const CommunicationDashboard = () => {
  const [userName, setUserName] = useState("");
  const [facilityName, setFacilityName] = useState("");

  const clientService = client.service("/client");
  // const admissionService = client.service("/admission");
  const appointmentService = client.service("/appointments");
  const {totalValue} = TotalNumOfData(clientService);
  const {totalNewClient} = TotalNewClientWithinAMonth(appointmentService);
  const {totalUpcomingAppointment} = TotalUpcomingAppointment(clientService);
  const {monthNameForCurrentYear, newClientLineSeriesData} =
    clientLineData(clientService);
  console.log(clientLineData, "clientsss");
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

  return (
    <DashboardPageWrapper>
      <Box>
      <Typography variant="h5" style={{ textShadow: "1px 1px 2px rgb(0, 45, 92)" }}>Communication Dashboard</Typography>
        <Grid container spacing={3} justifyContent="space-between" alignItems="center" style={{marginTop: '20px'}}>
        <Grid item xs={12}  md={3}>
		<Card sx={{ borderRadius: 2 }}>
		  <CardContent>
			<Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>
			Total Emails Sent
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
			  <Box sx={{ flexGrow: 1 }}>
				<Typography variant="h5" fontWeight="bold" component="div">
           0
				</Typography>
			  </Box>
			  <Box>
				<EmailOutlinedIcon  sx={{ fontSize: 48, bgcolor: '#dfdfec', p: 1, borderRadius: 8, color:'#002D5C' }} />
			  </Box>
			</Box>
		  </CardContent>
		</Card>
	  </Grid>
   
  
	  {/* Money Collected Card */}
	  <Grid item xs={12} sm={6} md={3}>
		<Card sx={{ borderRadius: 2 }}>
		  <CardContent>
			<Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>
      Total Channels Created
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
			  <Box sx={{ flexGrow: 1 }}>
				<Typography variant="h5" fontWeight="bold" component="div">
          0
				</Typography>
			  </Box>
			  <Box>
				<GroupAdd sx={{ fontSize: 48, bgcolor: '#dfdfec', p: 1, borderRadius: 8, color:'#002D5C' }} />
			  </Box>
			</Box>
		  </CardContent>
		</Card>
	  </Grid>
  
	  {/* Active Chat Card */}
	  <Grid item xs={12} sm={6} md={3}>
		<Card sx={{ borderRadius: 2 }}>
		  <CardContent>
			<Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>
			Active Chats
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
			  <Box sx={{ flexGrow: 1 }}>
				<Typography variant="h5" component="div" fontWeight="bold">
			    0
				</Typography>
			  </Box>
			  <Box>
				<ChatIcon sx={{ fontSize: 48, bgcolor: '#dfdfec', p: 1, borderRadius: 8, color:'#002D5C' }} />
			  </Box>
			</Box>
		  </CardContent>
		</Card>
	  </Grid>
    <Grid item xs={12} sm={6} md={3}>
		<Card sx={{ borderRadius: 2 }}>
		  <CardContent>
			<Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>
			Total SMS sent
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
			  <Box sx={{ flexGrow: 1 }}>
				<Typography variant="h5" component="div" fontWeight="bold">
			    0
				</Typography>
			  </Box>
			  <Box>
				<SmsIcon sx={{ fontSize: 48, bgcolor: '#dfdfec', p: 1, borderRadius: 8, color:'#002D5C' }} />
			  </Box>
			</Box>
		  </CardContent>
		</Card>
	  </Grid>
    </Grid>
      </Box>
    </DashboardPageWrapper>
  );
};

export default CommunicationDashboard;
