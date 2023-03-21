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
import {InputLabel, Select, MenuItem } from "@material-ui/core";
import client from '../../feathers';
import {
  DashboardPageWrapper,
} from "../dashBoardUiComponent/core-ui/styles.ts";
import {UserContext} from "../../context";

const GlobalAdminHome = () => {

  // const mockData = {
  //   hospitals: 12,
  //   diagnostics: 6,
  //   pharmacies: 23,
  //   corporate: 50,
  //   diagnosticsLab: 4,
  //   hmo: 2
  // };
  
  const {user} = useContext(UserContext);
  const facilityServ = client.service('facility');
  const appointmentServ = client.service('appointments');
  const invoiceServ = client.service('invoice');
  const employeeServ = client.service('employee');
  // const patientServ = client.service('client');

  const [facilities, setFacilities] = useState([]);
   const [appointments, setAppointments] = useState([]);
   const [invoices, setInvoices] = useState([]);
   const [employees, setEmployees] = useState([]);
  //  const [patients, setPatients] = useState([]);
   const [hospitals, setHospitals] = useState(0);
   const [school, setSchool] = useState(0);
   const [hospitality, setHospitality] = useState(0);
    const [laboratory, setLaboratory] = useState(0);
   const [pharmacies, setPharmacies] = useState(0);
   const [corporate, setCorporate] = useState(0);
   const [diagnosticsLab, setDiagnosticsLab] = useState(0);
   const [hmo, setHmo] = useState(0);



   const [selectedType, setSelectedType] = useState("Hospital");
  const [selectedState, setSelectedState] = useState("Edo");

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleStateChange = event => {
    setSelectedState(event.target.value);
  };

  // const getFacilities = () => {
	// 	facilityServ
	// 		.find()
	// 		.then(res => {
	// 			setFacilities(res.data);
	// 		})
	// 		.catch(err => {
	// 			console.log(err);
	// 		});
	// };

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


  const getFacilities = () => {
    facilityServ
      .find()
      .then(res => {
        setHospitals(res.data.filter(hospital => hospital.facilityType === "Hospital").length);
        setSchool(res.data.filter(school => school.facilityType === "School").length);
        setHospitality(res.data.filter(hospitality => hospitality.facilityType === "Hospitality").length);
        setLaboratory(res.data.filter(laboratory => laboratory.facilityType === "Laboratory").length);
        setPharmacies(res.data.filter(pharmacy => pharmacy.facilityType === "Pharmacy").length);
        setCorporate(res.data.filter(corporate => corporate.facilityType === "Corporate").length);
        setDiagnosticsLab(res.data.filter(diagnosticsLab => diagnosticsLab.facilityType === "Diagnostics Lab").length);
        setHmo(res.data.filter(hmo => hmo.facilityType === "HMO").length);
         console.log("Facility Data", res.data.facilityType)
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
      // getPatients();
      //  setData(mockData);
	}, []);

  

  return (
    <DashboardPageWrapper>
        <Box>
          <Typography weight="bold" variant="h5">
        {user.firstname} {user.lastname}
          </Typography>
        </Box>
        <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <StyledCard>
            <StyledCardContent>
              <BarChartIcon fontSize="large" color="primary" />
              <div>
                <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">
                  Total Revenue
                </StyledTypography>
                <StyledNumber backgroundColor="#1abc9c">₦12,00000</StyledNumber>
              </div>
            </StyledCardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={3}>
        <StyledCard>
    <StyledCardContent>
      <div>
        <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">
          Total Organizations by Type
        </StyledTypography>
        {selectedType === "Hospital" && (
          <StyledNumber backgroundColor="#3498db">{hospitals}</StyledNumber>
        )}
         {selectedType === "School" && (
          <StyledNumber backgroundColor="#3498db">{school}</StyledNumber>
        )}
           {selectedType === "Hospitality" && (
          <StyledNumber backgroundColor="#3498db">{hospitality}</StyledNumber>
        )}
         {selectedType === "Laboratory" && (
          <StyledNumber backgroundColor="#3498db">{laboratory}</StyledNumber>
        )}
         {selectedType === "DiagnosticLab" && (
          <StyledNumber backgroundColor="#3498db">{diagnosticsLab}</StyledNumber>
        )}
        {selectedType === "Total Pharmacies" && (
          <StyledNumber backgroundColor="#2ecc71">{pharmacies}</StyledNumber>
        )}
        {selectedType === "Corporate" && (
          <StyledNumber backgroundColor="#e67e22">{corporate}</StyledNumber>
        )}
          {selectedType === "HMO" && (
          <StyledNumber backgroundColor="#e67e22">{hmo}</StyledNumber>
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
            <MenuItem value="Hospital">Hospitals</MenuItem>
            <MenuItem value="School">Schools</MenuItem>
            <MenuItem value="Hospitality">Hospitality</MenuItem>
            <MenuItem value="Laboratory">Laboratory</MenuItem>
            <MenuItem value="Total Diagnostics">Diagnostics</MenuItem>
            <MenuItem value="Total Pharmacies">Pharmacies</MenuItem>
            <MenuItem value="Corporate">Corporate</MenuItem>
            <MenuItem value="Total Diagnostics">Diagnostics Lab</MenuItem>
            <MenuItem value="HMO">HMO</MenuItem>
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
                <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">
                  Number of Doc Created
                </StyledTypography>
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
                <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">
                  Total Appointments
                </StyledTypography>
                <StyledNumber backgroundColor="#e74c3c">{appointments.length}</StyledNumber>
              </div>
            </StyledCardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <StyledCard>
            <StyledCardContent>
              <EventNoteIcon fontSize="large" color="primary" />
              <div>
                <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">
                  Total Clients
                </StyledTypography>
                <StyledNumber backgroundColor="#e74c3c">{appointments.length}</StyledNumber>
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
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total Clinical Notes</StyledTypography>
            <StyledNumber backgroundColor="#9b59b6">3</StyledNumber>
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
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total check-in</StyledTypography>
            <StyledNumber backgroundColor="#9b59b6">10</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
        <Grid item xs={12} md={3}>
  <StyledCard>
    <StyledCardContent>
      <div>
        <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">
          Total Organizations by State
        </StyledTypography>
        <StyledNumber backgroundColor="#3498db">{facilities.length}</StyledNumber>
        <StyledFormControl>
          <InputLabel htmlFor="state-dropdown">State</InputLabel>
          <Select
            value={selectedState}
            onChange={handleStateChange}
            inputProps={{
              id: "state-dropdown",
            }}
          >
            <MenuItem value="Edo">Edo</MenuItem>
            <MenuItem value="Lagos">Lagos</MenuItem>
            <MenuItem value="Kaduna">Kaduna</MenuItem>
            <MenuItem value="Kano">Kano</MenuItem>
            <MenuItem value="Oyo">Oyo</MenuItem>
          </Select>
        </StyledFormControl>
      </div>
    </StyledCardContent>
  </StyledCard>
</Grid>
        </Grid>
    </DashboardPageWrapper>
  );
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
font-size: 1.5rem;
color: #fff;
background-color: ${({ backgroundColor }) => backgroundColor};
border-radius: 10px;
padding: 0.5rem 1rem;
`;


export default GlobalAdminHome;
