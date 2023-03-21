import React, {useEffect, useState, useContext} from "react";
import {Box, Grid, Card,CardContent,Typography} from "@mui/material";
import styled from "styled-components";
import BarChartIcon from '@mui/icons-material/BarChart';
import BusinessIcon from '@mui/icons-material/Business';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PharmacyIcon from '@mui/icons-material/LocalPharmacy';
import { People } from '@mui/icons-material';
import { Receipt } from '@mui/icons-material';
import client from '../../feathers';
import {
  DashboardPageWrapper,
} from "../dashBoardUiComponent/core-ui/styles.ts";
import {UserContext} from "../../context";

const GlobalAdminHome = () => {
  const {user} = useContext(UserContext);
  const facilityServ = client.service('facility');
  const appointmentServ = client.service('appointments');
  const invoiceServ = client.service('invoice');
  const employeeServ = client.service('employee');
  const patientServ = client.service('client');

  const [facilities, setFacilities] = useState([]);
   const [appointments, setAppointments] = useState([]);
   const [invoices, setInvoices] = useState([]);
   const [employees, setEmployees] = useState([]);
   const [patients, setPatients] = useState([]);

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
  const getInvoices = () => {
		invoiceServ
			.find()
			.then(res => {
				setInvoices(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	};
  const getEmployees = () => {
		employeeServ
			.find()
			.then(res => {
				setEmployees(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	};

  const getPatients = () => {
		patientServ
			.find()
			.then(res => {
				setPatients(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	};

  useEffect(() => {
		 getFacilities();
     getAppointments()
     getInvoices();
     getEmployees();
      getPatients();
	}, []);


  return (
    <DashboardPageWrapper>
        <Box>
          <Typography weight="bold" variant="h5">
        {user.firstname} {user.lastname}
          </Typography>
        </Box>
     <Grid container>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <BarChartIcon fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total Revenue</StyledTypography>
            <StyledNumber backgroundColor="#1abc9c">₦12,00000</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <BusinessIcon fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total Organizations by Type </StyledTypography>
            <StyledNumber backgroundColor="#3498db">{facilities.length}</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <BusinessIcon fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Number of Doc Created</StyledTypography>
            <StyledNumber backgroundColor="#3498db">340</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <EventNoteIcon fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total Appointments</StyledTypography>
            <StyledNumber backgroundColor="#e74c3c">{appointments.length}</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <LocalHospitalIcon fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total Clinical Notes</StyledTypography>
            <StyledNumber backgroundColor="#9b59b6">3</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <People fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total Employees</StyledTypography>
            <StyledNumber backgroundColor="#9b59b6">{employees.length}</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <LocalHospitalIcon fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total Hospitals</StyledTypography>
            <StyledNumber backgroundColor="#9b59b6">10</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <LocalHospitalIcon fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total Patients</StyledTypography>
            <StyledNumber backgroundColor="#9b59b6">{patients.length}</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <LocalHospitalIcon fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total Diagnostics</StyledTypography>
            <StyledNumber backgroundColor="#9b59b6">10</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <PharmacyIcon fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total Pharmacies</StyledTypography>
            <StyledNumber backgroundColor="#9b59b6">10</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <LocalHospitalIcon fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total HMO</StyledTypography>
            <StyledNumber backgroundColor="#9b59b6">10</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <LocalHospitalIcon fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total organization by (State)</StyledTypography>
            <StyledNumber backgroundColor="#9b59b6">10</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <LocalHospitalIcon fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total Active/inactive</StyledTypography>
            <StyledNumber backgroundColor="#9b59b6">10</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <LocalHospitalIcon fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total check-in</StyledTypography>
            <StyledNumber backgroundColor="#9b59b6">10</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <LocalHospitalIcon fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total Leads</StyledTypography>
            <StyledNumber backgroundColor="#9b59b6">10</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <LocalHospitalIcon fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total proposals</StyledTypography>
            <StyledNumber backgroundColor="#9b59b6">10</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <Receipt color="primaryDark"  fontSize="large" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total Invoices</StyledTypography>
            <StyledNumber backgroundColor="#9b59b6">{invoices.length}</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
  </Grid>
    </DashboardPageWrapper>
  );
};

const StyledCard = styled(Card)`
  background-color: #fff;
  margin: 1rem;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.2);
  }
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const StyledTypography = styled(Typography)`
font-weight: ${({ weight }) => weight || 'normal'};
font-size: ${({ size }) => size || 'inherit'};
line-height: ${({ lineHeight }) => lineHeight || 'inherit'};
color: ${({ color }) => color || 'inherit'};
text-align: ${({ align }) => align || 'inherit'};
margin: ${({ margin }) => margin || '0'};
padding: ${({ padding }) => padding || '0'};
text-transform: ${({ textTransform }) => textTransform || 'none'};
`;


const StyledNumber = styled(Typography)`
font-weight: bold;
font-size: 1.5rem;
color: #fff;
background-color: ${({ backgroundColor }) => backgroundColor};
border-radius: 10px;
padding: 0.5rem 1rem;
`;


export default GlobalAdminHome;
