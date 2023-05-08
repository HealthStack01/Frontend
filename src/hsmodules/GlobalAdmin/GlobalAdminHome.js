import React, {useEffect, useState, useContext} from "react";
import {ObjectContext} from '../../context';
import {Box, Grid, Card,CardContent,Typography} from "@mui/material";
import styled from "styled-components";
import BarChartIcon from '@mui/icons-material/BarChart';
import FitnessCenter from '@mui/icons-material/RoomService';
import BusinessIcon from '@mui/icons-material/Business';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
//import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { People } from '@mui/icons-material';
import { Receipt } from '@mui/icons-material';
import { blue } from '@material-ui/core/colors';
import {InputLabel, Select, MenuItem, FormControl } from "@material-ui/core";
import client from '../../feathers';
import {
  DashboardPageWrapper,
} from "../dashBoardUiComponent/core-ui/styles.ts";
import {UserContext} from "../../context";

const GlobalAdminHome = () => {  
  const {showActionLoader, hideActionLoader} = useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const facilityServ = client.service('facility');
  const appointmentServ = client.service('appointments');
  const invoiceServ = client.service('invoice');
  const employeeServ = client.service('employee');
   const clinicaldocumentServ = client.service('clinicaldocument');
   const clientServe = client.service('client');
   const documentServe = client.service('documentation');

   const [totalFacilities, setTotalFacilities] = useState({
    hospitals: 0,
    schools: 0,
    hospitality: 0,
    laboratory: 0,
    pharmacies: 0,
    corporate: 0,
    diagnosticsLab: 0,
    hmo: 0,
    clinic: 0,
    statehmo: 0,
    minofhealth: 0,
  });

   const [totalAppointments, setTotalAppointments] = useState(0);
   const [totalDocCreated, setTotalDocCreated] = useState(0);
   const [totalInvoices, setTotalInvoices] = useState(0);
   const [totalEmployees, setTotalEmployees] = useState(0);
   const [totalClinicalDocument, setTotalClinicalDocument] = useState(0);
<<<<<<< Updated upstream
=======
   const [totalFacilities, setTotalFacilities] = useState(0);
   const [hospitals, setHospitals] = useState(0);
   const [school, setSchool] = useState(0);
   const [hospitality, setHospitality] = useState(0);
    const [laboratory, setLaboratory] = useState(0);
   const [pharmacies, setPharmacies] = useState(0);
   const [corporate, setCorporate] = useState(0);
   const [diagnosticsLab, setDiagnosticsLab] = useState(0);
   const [hmo, setHmo] = useState(0);
   const [clinic, setClinic] = useState(0);
>>>>>>> Stashed changes
   const [totalClients, setTotalClients] = useState(0);


   // Organization by states
   const [lagos, setLagos] = useState("");
   const [ibadan, setIbadan] = useState("");
   const [rivers, setRivers] = useState("");
  const [abuja, setAbuja] = useState("");
  const [edo, setEdo] = useState("");
  const [ilorin, setIlorin] = useState("");
  const [portharcourt, setportharcourt] = useState("");

  const [selectedType, setSelectedType] = useState('hmo');
  const [selectedState, setSelectedState] = useState("Ibadan");

<<<<<<< Updated upstream
=======
  console.log("Facilities", totalFacilities)
>>>>>>> Stashed changes

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleStateChange = event => {
    setSelectedState(event.target.value);
  };
  

  const getDocmentsCreated = () => {
		documentServe
			.find()
			.then(res => {
				setTotalDocCreated(res.total);
			})
			.catch(err => {
				console.log(err);
			});
	};

  const getAppointments = () => {
		appointmentServ
			.find()
			.then(res => {
				setTotalAppointments(res.total);
			})
			.catch(err => {
				console.log(err);
			});
	};

  const getInvoices = () => {
		invoiceServ
			.find()
			.then(res => {
        setTotalInvoices(res.total);
			})
			.catch(err => {
				console.log(err);
			});
	};
  const getEmployees = () => {
		employeeServ
			.find()
			.then(res => {
				setTotalEmployees(res.total);
			})
			.catch(err => {
				console.log(err);
			});
	};
  

  const getClinicaldocument = () => {
		clinicaldocumentServ
			.find()
			.then(res => {
				setTotalClinicalDocument(res.total);
			})
			.catch(err => {
				console.log(err);
			});
	};
  const getClients = () => {
		clientServe
			.find()
			.then(res => {
				setTotalClients(res.total);
			})
			.catch(err => {
				console.log(err);
			});
	};


  const getFacilities = () => {
    showActionLoader();
    facilityServ
      .find()
      .then(res => {
        hideActionLoader();
<<<<<<< Updated upstream
        const facilitiesCounts = {
          hospitals: res.data.filter(hospital => hospital.facilityType === "State HMO").length,
          minofhealth: res.data.filter(minofhealth => minofhealth.facilityType === "MInistry of Health").length,
          statehmo: res.data.filter(statehmo => statehmo.facilityType === "Hospital").length,
          clinic: res.data.filter(clinic => clinic.facilityType === "Clinic").length,
          schools: res.data.filter(school => school.facilityType === "School").length,
          hospitality: res.data.filter(hospitality => hospitality.facilityType === "Hospitality").length,
          laboratory: res.data.filter(laboratory => laboratory.facilityType === "Laboratory").length,
          pharmacies: res.data.filter(pharmacy => pharmacy.facilityType === "Pharmacy").length,
          corporate: res.data.filter(corporate => corporate.facilityType === "Corporate").length,
          diagnosticsLab: res.data.filter(diagnosticsLab => diagnosticsLab.facilityType === "Diagnostics Lab").length,
          hmo: res.data.filter(hmo => hmo.facilityType === "HMO").length,
        };
        setTotalFacilities(prevFacilities => ({
          ...prevFacilities,
          ...facilitiesCounts,
    
        }));
=======
        setTotalFacilities(res.total)
        setHospitals(res.data.filter(hospital => hospital.facilityType === "State HMO").length);
        setMinofhealth(res.data.filter(minofhealth => minofhealth.facilityType === "MInistry of Health").length);
        setStatehmo(res.data.filter(statehmo => statehmo.facilityType === "Hospital").length);
        setClinic(res.data.filter(clinic => clinic.facilityType === "Clinic").length);
        setSchool(res.data.filter(school => school.facilityType === "School").length);
        setHospitality(res.data.filter(hospitality => hospitality.facilityType === "Hospitality").length);
        setLaboratory(res.data.filter(laboratory => laboratory.facilityType === "Laboratory").length);
        setPharmacies(res.data.filter(pharmacy => pharmacy.facilityType === "Pharmacy").length);
        setCorporate(res.data.filter(corporate => corporate.facilityType === "Corporate").length);
        setDiagnosticsLab(res.data.filter(diagnosticsLab => diagnosticsLab.facilityType === "Diagnostics Lab").length);
        setHmo(res.data.filter(hmo => hmo.facilityType === "HMO").length);
>>>>>>> Stashed changes
        setLagos(res.data.filter(state => state.facilityCity === "Lagos").length);
        setIbadan(res.data.filter(state => state.facilityCity === "Ibadan").length);
        setAbuja(res.data.filter(state => state.facilityCity === "Abuja").length);
        setRivers(res.data.filter(state => state.facilityCity === "Rivers State").length);
        setEdo(res.data.filter(state => state.facilityCity === "Edo" ).length);
        setIlorin(res.data.filter(state => state.facilityCity === "ilorin" ).length);
        setportharcourt(res.data.filter(state => state.facilityCity === "Port Harcourt" ).length);
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
     getClinicaldocument()
     getClients();
     getDocmentsCreated();
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
  
  return (
    <DashboardPageWrapper>
        <Box>
          <Typography weight="bold" variant="h5" style={{ textShadow: "1px 1px 2px rgb(0, 45, 92)" }}>
           {`Good ${getGreeting()} ${user.firstname} ${user.lastname}`}
        </Typography>
        </Box>
        <Grid container>
        <Grid item xs={12} md={3}>
          <RevenueStyledCard>
          <BarChartIcon fontSize="inherit" style={{marginLeft:60, fontSize: 50, color: blue[500] }} />
            <StyledCardContent>
            
              <div>
                <RevenueStyledTypography weight="bold" size="1rem" color="#002D5C" textTransform="uppercase" margin="0.5rem 0">
                  Total Revenue
                </RevenueStyledTypography>
                <RevenueStyledNumber backgroundColor="#2196f3">None</RevenueStyledNumber>
              </div>
            </StyledCardContent>
          </RevenueStyledCard>
        </Grid>
        <Grid item xs={12} md={3}>
        <StyledCard>
    <StyledCardContent>
      <div>
        <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">
          Total Organizations by Type
        </StyledTypography>
        <StyledNumber backgroundColor="#3498db">{totalFacilities[selectedType]}</StyledNumber>
      <FormControl>
        <InputLabel htmlFor="type-dropdown">Type</InputLabel>
        <Select
           value={selectedType}
          onChange={handleTypeChange}
          inputProps={{
            id: 'type-dropdown',
          }}
        >
          {Object.keys(totalFacilities).map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl> 

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
        {selectedState === "Port Harcourt" && (
          <StyledNumber backgroundColor="#3498db">{portharcourt}</StyledNumber>
        )}
        {selectedState === "Ilorin" && (
          <StyledNumber backgroundColor="#3498db">{ilorin}</StyledNumber>
        )}
        {selectedState === "Edo" && (
          <StyledNumber backgroundColor="#3498db">{edo}</StyledNumber>
        )}
        {selectedState === "Lagos" && (
          <StyledNumber backgroundColor="#3498db">{lagos}</StyledNumber>
        )}
         {selectedState === "Ibadan" && (
          <StyledNumber backgroundColor="#3498db">{ibadan}</StyledNumber>
        )}
          {selectedState === "Rivers State" && (
          <StyledNumber backgroundColor="#3498db">{rivers}</StyledNumber>
        )}
         {selectedState === "Abuja" && (
          <StyledNumber backgroundColor="#3498db">{abuja}</StyledNumber>
        )}
        
        <StyledFormControl>
          <InputLabel htmlFor="type-dropdown">Type</InputLabel>
          <Select
            value={selectedState}
            onChange={handleStateChange}
            inputProps={{
              id: "type-dropdown",
            }}
          >
            <MenuItem value="Lagos">Lagos</MenuItem>
            <MenuItem value="Port Harcourt">Port Harcourt</MenuItem>
            <MenuItem value="Ilorin">Ilorin</MenuItem>
            <MenuItem value="Edo">Edo</MenuItem>
            <MenuItem value="Ibadan">Ibadan</MenuItem>
            <MenuItem value="Abuja">Abuja</MenuItem>
            <MenuItem value="Rivers State">Rivers State</MenuItem>
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
                <StyledNumber backgroundColor="#0E305D">{totalDocCreated}</StyledNumber>
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
                <StyledNumber backgroundColor="#e74c3c">{totalAppointments}</StyledNumber>
              </div>
            </StyledCardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <StyledCard>
            <StyledCardContent>
              <People fontSize="large" color="primary" />
              <div>
                <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">
                  Total Clients
                </StyledTypography>
                <StyledNumber backgroundColor="#e74c3c">{totalClients}</StyledNumber>
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
          <EventNoteIcon fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total Clinical Notes</StyledTypography>
            <StyledNumber backgroundColor="#cc0000">{totalClinicalDocument}</StyledNumber>
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
            <StyledNumber backgroundColor="#006666">{totalInvoices}</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <FitnessCenter fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total Facilities</StyledTypography>
<<<<<<< Updated upstream
            {/* <StyledNumber backgroundColor="#800000">{totalFacilities}</StyledNumber> */}
=======
            <StyledNumber backgroundColor="#800000">{totalFacilities}</StyledNumber>
>>>>>>> Stashed changes
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
            <StyledNumber backgroundColor="#999966">None</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <CheckCircleIcon fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total check-in</StyledTypography>
            <StyledNumber backgroundColor="#5c5c8a">None</StyledNumber>
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
    padding: 0.3rem;
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

const RevenueStyledCard = styled(Card)`
  color: #002D5C;
  margin: 2rem;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.2);
  }
`;

const RevenueStyledTypography = styled.p`
  font-weight: ${(props) => props.weight};
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
  text-transform: ${(props) => props.textTransform};
  margin: ${(props) => props.margin};
`;

const RevenueStyledNumber = styled.p`
  font-weight: bold;
  font-size: 1.3rem;
  color: #fff;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 5px;
  padding: 0.2rem;
  display: inline-block;
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
padding: 0.3rem 1rem;
`;

export default GlobalAdminHome;
