import React, {useState,useEffect, useCallback, useContext} from 'react'
import styled from "styled-components";
import {ObjectContext} from '../../context';
import {Box, Grid, Card,CardContent,Typography} from "@mui/material";
import {InputLabel, Select, MenuItem } from "@material-ui/core";
import BarChartIcon from '@mui/icons-material/BarChart';
import BusinessIcon from '@mui/icons-material/Business';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DateRangeIcon from '@mui/icons-material/DateRange';
 import { People } from '@mui/icons-material';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import {
    DashboardPageWrapper,
  } from "../dashBoardUiComponent/core-ui/styles.ts";
  import client from '../../feathers';

const Statistics = ({goBack}) => {
   const facilityServer = client.service('facility');
  const clientServe = client.service('client');
  const employeeServer = client.service('employee');
  const appointmentServ = client.service('appointments');
  const [selectedType, setSelectedType] = useState("Hospital");
  const [facility, setFacility] = useState({});
  const [totalAppointments, setTotalAppointments] = useState(null);
  const [totalEmployees, setTotalEmployees] = useState(null);
  const [totalClients, setTotalClients] = useState(null);
  const {state, showActionLoader, hideActionLoader} = useContext(ObjectContext);

  const date = new Date(facility.createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const currentOrganization = state.OrganizationModule.selectedOrganization;

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const getTotalEmployees = useCallback(() => {
    employeeServer.find({
      query: {
        organizationId: currentOrganization._id,
        $limit: 0
      }
    }).then(result => {
      setTotalEmployees(result.total);
    }).catch(err => {
      console.log(err);
    });
  }, [currentOrganization._id]);


  const getTotalClients = useCallback(() => {
    showActionLoader();
    clientServe.find({
      query: {
        organizationId: currentOrganization._id,
        $limit: 0
      }
    }).then(result => {
      hideActionLoader();
      setTotalClients(result.total);
    }).catch(err => {
      hideActionLoader();
      console.log(err);
    });
  }, [currentOrganization._id]);

  const getTotalAppointments = useCallback(() => {
    showActionLoader();
    appointmentServ.find({
      query: {
        organizationId: currentOrganization._id,
        $limit: 0
      }
    }).then(result => {
      hideActionLoader();
      setTotalAppointments(result.total);
    }).catch(err => {
      hideActionLoader();
      console.log(err);
    });
  }, [currentOrganization._id]);


  const getCurrentFacility = useCallback(async () => {
		showActionLoader();
		const id = currentOrganization._id;
		await facilityServer
			.get(id)
			.then(resp => {
				hideActionLoader();
				setFacility(resp);
			})
			.catch(err => {
				hideActionLoader();
				console.log(err);
			});
	}, []);

  
	useEffect(() => {
		getCurrentFacility();
    getTotalAppointments();
    getTotalEmployees();
    getTotalClients();
	}, [getTotalEmployees, getTotalAppointments,  getCurrentFacility]);

  // useEffect(() => {
	// 	getCurrentFacility();
  //   getCurrentAppointment();
  //   getTotalEmployees();
	// }, [getCurrentFacility]);

  return (
    <DashboardPageWrapper>
        <GlobalCustomButton  onClick={goBack}>Go Back</GlobalCustomButton>
         <Box sx={{ m: 2 }}>
          <Typography variant="h5" style={{ textShadow: "1px 1px 2px rgb(0, 45, 92)" }}> Organization statistics</Typography>
          </Box>
     <Grid container backgroundColor="#ebebeb">
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <BarChartIcon fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total Revenue</StyledTypography>
            <StyledNumber backgroundColor="#1abc9c">None</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={3}>
        <StyledCard>
    <StyledCardContent>
      <div>
        <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">
        Billing type 
        </StyledTypography>
        {selectedType === "Employee" && (
          <StyledNumber backgroundColor="#3498db">0</StyledNumber>
        )}
         {selectedType === "Yearly Subscription" && (
          <StyledNumber backgroundColor="#3498db">0</StyledNumber>
        )}
         {selectedType === "Others" && (
          <StyledNumber backgroundColor="#3498db">0</StyledNumber>
        )}
        <StyledFormControl>
          <InputLabel htmlFor="type-dropdown">Type</InputLabel>
          <Select
            value={selectedType}
            onChange={handleTypeChange}
            inputProps={{
              id: "type-dropdown",
            }}
          >
            <MenuItem value="Employee">Employee</MenuItem>
            <MenuItem value="Yearly Subscription">Yearly Subscription</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
            
          </Select>
        </StyledFormControl>
      </div>
    </StyledCardContent>
  </StyledCard>
        </Grid>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <BusinessIcon fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total appointments</StyledTypography>
            <StyledNumber backgroundColor="#3498db">{totalAppointments}</StyledNumber>
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
            <StyledNumber backgroundColor="#9b59b6">{totalEmployees}</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <AccessTimeIcon  fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Last Login</StyledTypography>
            <StyledNumber backgroundColor="#cc0000">None</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <People fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total Clinical Notes </StyledTypography>
            <StyledNumber backgroundColor="#5c5c8a">None</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <DateRangeIcon fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#690002" textTransform="uppercase" margin="0.5rem 0">Date Of Creation</StyledTypography>
            <StyledNumber backgroundColor="#006666">{date.toLocaleDateString("en-US", options)}</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <People fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total Clients</StyledTypography>
            <StyledNumber backgroundColor="#800000">{totalClients}</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <CheckCircleIcon fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Status</StyledTypography>
            <StyledNumber backgroundColor="#999966">{facility.active ? "Active" : "Inactive"}</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
  </Grid>
    </DashboardPageWrapper>
  )
};

const StyledFormControl = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;

  & > label {
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }

  & > select {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    margin-top: 0.5rem;

    &:focus {
      outline: none;
      box-shadow: 0 0 4px #1abc9c;
      border-color: #1abc9c;
    }
  }
`;

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
font-size: 1.2rem;
color: #fff;
background-color: ${({ backgroundColor }) => backgroundColor};
border-radius: 10px;
padding: 0.5rem 1rem;
`;

export default Statistics