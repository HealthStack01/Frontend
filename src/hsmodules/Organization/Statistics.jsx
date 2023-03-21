import React from 'react'
import styled from "styled-components";
import {Box, Grid, Card,CardContent,Typography} from "@mui/material";
import BarChartIcon from '@mui/icons-material/BarChart';
import BusinessIcon from '@mui/icons-material/Business';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PharmacyIcon from '@mui/icons-material/LocalPharmacy';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { People } from '@mui/icons-material';
import { Receipt } from '@mui/icons-material';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import {
    DashboardPageWrapper,
  } from "../dashBoardUiComponent/core-ui/styles.ts";
const Statistics = ({goBack}) => {
  return (
    <DashboardPageWrapper>
        <GlobalCustomButton  onClick={goBack}>Go Back</GlobalCustomButton>
         <Box sx={{ m: 2 }}>
          <Typography weight="bold" variant="h5">
           Organization statistics
          </Typography>
          </Box>
     <Grid container>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <BarChartIcon fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total Revenue</StyledTypography>
            <StyledNumber backgroundColor="#1abc9c">₦140,000</StyledNumber>
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
            <StyledNumber backgroundColor="#3498db">220</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <LocalHospitalIcon fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total Employees</StyledTypography>
            <StyledNumber backgroundColor="#9b59b6">19</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <PharmacyIcon fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total Clinical Notes </StyledTypography>
            <StyledNumber backgroundColor="#9b59b6">35</StyledNumber>
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
            <StyledNumber backgroundColor="#9b59b6">21 January, 2023</StyledNumber>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={3}>
      <StyledCard>
        <StyledCardContent>
          <LocalHospitalIcon fontSize="large" color="primary" />
          <div>
            <StyledTypography weight="bold" size="1rem" color="#333" textTransform="uppercase" margin="0.5rem 0">Total Clients</StyledTypography>
            <StyledNumber backgroundColor="#9b59b6">31</StyledNumber>
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
  </Grid>
    </DashboardPageWrapper>
  )
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

export default Statistics