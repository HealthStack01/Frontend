import {Box, Typography, Card, CardContent, Grid} from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import React, {useEffect, useState, useContext} from "react";
import ReactApexChart from 'react-apexcharts';
import NewClientIcon from '@mui/icons-material/PersonAddAlt';
import UpcomingAppointmentIcon from '@mui/icons-material/EventAvailable';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import TotalClientIcon from '@mui/icons-material/PeopleAlt';
import {UserContext} from "../../../context";

import client from "../../../feathers";
import {
  TotalNumOfData,
  TotalNewClientWithinAMonth,
  TotalUpcomingAppointment,
  ClientPaymentMode,
} from "../utils/chartData/chartDataHandler";
import {CircleSeriesData} from "../utils/chartData/circleSeries";
import {clientLineData} from "../utils/chartData/LineData";
import {TotalModeltDataForPresent} from "../utils/chartData/queryHandler";
import {
		
	FetchTotalMoneyCollectedWithInPresentRange,
  } from "../utils/chartData/chartDataHandler";

import {
  DashboardContainer,
  DashboardPageWrapper,
} from "../core-ui/styles";
import CircleChart from "../charts/CircleChart";
import {userDetails} from "../utils/fetchUserDetails";
import ViewCardWithFilter from './@sections/ViewCardWithFilter';

const ClinicDashboard = () => {
  const [userName, setUserName] = useState("");
  const [facilityName, setFacilityName] = useState("");
  const {user} = useContext(UserContext);
  const billsService = client.service("/bills");

  const clientService = client.service("/client");
  // const admissionService = client.service("/admission");
  const appointmentService = client.service("/appointments");
  const {totalValue} = TotalNumOfData(clientService);
  const {totalNewClient} = TotalNewClientWithinAMonth(appointmentService);
  const {totalUpcomingAppointment} = TotalUpcomingAppointment(clientService);
  const {monthNameForCurrentYear, newClientLineSeriesData} =
    clientLineData(clientService);
	

	const {
		totalPresentDataObject: fetchTotalMoneyCollectedPresentDataObject,
		isLoading,
	  } = TotalModeltDataForPresent(
		billsService,
		FetchTotalMoneyCollectedWithInPresentRange
	  );

  const {circleSeriesArray} = CircleSeriesData(clientService);
  const {paymentModeBarSeries} = ClientPaymentMode(clientService);


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
      enabled: true,
    },
    xaxis: {
      categories: ["Cash", "HMO", "Plan", "Family", "Comp"],
      title: {
        text: ".",
      },
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

     var options = {
          series: [{
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        }],
          chart: {
          type: 'bar',
          height: 380
        },
        plotOptions: {
          bar: {
            barHeight: '100%',
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: 'bottom'
            },
          }
        },
        colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
          '#f48024', '#69d2e7'
        ],
        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
            colors: ['#fff']
          },
          formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        xaxis: {
          categories: ['General outputpatient', 'ENT (Ear, Nose & Throat', 'Obstertics(Obstertics & Gynae', 'Orthpedic', 'Endocrinology', 'Cardiology', 'Inpatient'
          ],
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        title: {
            text: 'Specialization',
            align: 'center',
            floating: true
        },
        subtitle: {
            text: 'Category Names as DataLabels inside bars',
            align: 'center',
        },
        tooltip: {
          theme: 'dark',
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function () {
                return ''
              }
            }
          }
        }
        };

  const useStyles = makeStyles({
	title: {
	  fontSize: '1.5rem',
	  textShadow: '1px 1px 2px rgb(0, 45, 92)',
	},
  });
  const classes = useStyles();

  return (
    <DashboardPageWrapper>
		 <Box>
         <Typography className={classes.title}>
       {`Hi, ${getGreeting()} ${user.firstname}`} ! <br/> Welcome to your Clinic Module
        </Typography>
        </Box>
      <Box>
  <DashboardContainer>
  <Box sx={{ backgroundColor: '#f5f5f5', pt: 6}}>
	<Grid container spacing={3} justifyContent="center" alignItems="center">
	  {/* Total Client Card */}
	  <Grid item xs={12}  md={3}>
		<Card sx={{ borderRadius: 2 }}>
		  <CardContent>
			<Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>
			Total Clients
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
			  <Box sx={{ flexGrow: 1 }}>
				<Typography variant="h5" fontWeight="bold" component="div">
				 {totalNewClient}
				</Typography>
			  </Box>
			  <Box>
				<NewClientIcon sx={{ fontSize: 48, bgcolor: '#dfdfec', p: 1, borderRadius: 8, color:'#002D5C' }} />
			  </Box>
			</Box>
		  </CardContent>
		</Card>
	  </Grid>
   
  
	  {/* Upcoming Appointments Card */}
	  <Grid item xs={12} sm={6} md={3}>
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
				<UpcomingAppointmentIcon sx={{ fontSize: 48, bgcolor: '#dfdfec', p: 1, borderRadius: 8, color:'#002D5C' }} />
			  </Box>
			</Box>
		  </CardContent>
		</Card>
	  </Grid>
  
	  {/* Total Doctor on Duty Card */}
	  <Grid item xs={12} sm={6} md={3}>
		<Card sx={{ borderRadius: 2 }}>
		  <CardContent>
			<Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>
			Doctors on Duty
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
			  <Box sx={{ flexGrow: 1 }}>
				<Typography variant="h5" component="div" fontWeight="bold">
				  {totalValue}
				</Typography>
			  </Box>
			  <Box>
				<LocalHospitalIcon sx={{ fontSize: 48, bgcolor: '#dfdfec', p: 1, borderRadius: 8, color:'#002D5C' }} />
			  </Box>
			</Box>
		  </CardContent>
		</Card>
	  </Grid>
	   {/* Total Doctor on Duty Card */}
	   <Grid item xs={12} sm={6} md={3}>
	   <Card>
		  <CardContent>
      <ViewCardWithFilter
            count={12}
            title="Total New Client"
            hasFilter={true}
            dataSource={fetchTotalMoneyCollectedPresentDataObject}
            isLoading={isLoading}
          />
		  </CardContent>
		</Card>
	  </Grid>
   
   
    {/* Payment Mode Bar Chart */}
		<Grid item xs={12} md={3} sx={{marginRight: 6, marginBottom: 6}}>
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
		<Grid item xs={12} md={3} sx={{marginRight: 6}}>
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
		   {/* Total Clients by Gender Chart */}
		   <Grid item xs={12} md={3} sx={{marginRight: 6}}>
		  <Card>
			<CardContent>
			  <Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>
				Patient Distribution
			  </Typography>
			  <Box sx={{ height: 300 }}>
				<ReactApexChart
				  options={options} 
				  series={options.series} 
				  type="bar" height={350}
				/>
			  </Box>
			</CardContent>
		  </Card>
		</Grid>
    </Grid>
    </Box>
        </DashboardContainer>
      </Box>
    </DashboardPageWrapper>
  );
};

export default ClinicDashboard;
