import {Box, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import client from '../../feathers';
import ViewCard from "../dashBoardUiComponent/@modules/@sections/ViewCard";
import {
  DashboardPageWrapper,
  StartCardWapper,
} from "../dashBoardUiComponent/core-ui/styles.ts";

const GlobalAdminHome = () => {
  const facilityServ = client.service('facility');
  const appointmentServ = client.service('appointments');

  const [facilities, setFacilities] = useState([]);
   const [appointments, setAppointments] = useState([]);

  const getFacilities = () => {
		facilityServ
			.find()
			.then(res => {
				setFacilities(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	};

  const getAppointments = () => {
		appointmentServ
			.find()
			.then(res => {
				setAppointments(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	};

  useEffect(() => {
		 getFacilities();
     getAppointments()
	}, []);


  return (
    <DashboardPageWrapper>
     
        <Box>
          <Typography variant="h5">
          Global Dashboard
          </Typography>
        </Box>

      <Box>
        <StartCardWapper>
          <ViewCard count={facilities.length} title="total Organizations" />
          <ViewCard count={16} title="Number of Doc Created" />
          <ViewCard count={56} title="Total Revenue" />
          <ViewCard count={16} title="Total Number of clinical notes" />
          <ViewCard count={appointments.length} title="Total Number of Appointments" />
        </StartCardWapper>

      </Box>
    </DashboardPageWrapper>
  );
};

export default GlobalAdminHome;
