import React, {useEffect, useState } from "react";
import { Box, Card, CardContent, Grid, Typography} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NewClientIcon from '@mui/icons-material/PersonAddAlt';
import { People } from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';
import {
	DashboardContainer,
	DashboardPageWrapper,
  } from "../core-ui/styles";
import {
	// TotalNumOfData,
	TotalNumOfMaleClient,
	TotalNumOfFemaleClient,
	TotalNewClientWithinAMonth,
	TotalUpcomingAppointment,
	ClientPaymentMode,
  } from "../utils/chartData/chartDataHandler";
import client from '../../../feathers';
import ViewCardWithFilter from './@sections/ViewCardWithFilter';
import {TotalModeltDataForPresent} from "../utils/chartData/queryHandler";
import {
	FetchTotalRevenue,
	FetchTotalBalance,
	FetchTotalMoneyCollectedWithInPresentRange,
	FetchTotalPendingBills,
	FetchTotalMoneyCollected,
	ModelResult,
  } from "../utils/chartData/chartDataHandler";

const ClientDashboard = () => {
const clientService = client.service("/client");
const billsService = client.service("/bills");
const {totalNewClient} = TotalNewClientWithinAMonth(clientService);
const {totalNumMaleClient} = TotalNumOfMaleClient(clientService);
const {totalNumFemaleClient} = TotalNumOfFemaleClient(clientService);
const {paymentModeBarSeries} = ClientPaymentMode(clientService);
const {totalUpcomingAppointment} = TotalUpcomingAppointment(clientService);
const appointmentServ = client.service('appointments');
const [appointments, setAppointments] = useState([]);

const patientServe = client.service('client');
const [patients, setPatients] = useState(0);

const {
    totalPresentDataObject: fetchTotalMoneyCollectedPresentDataObject,
    isLoading,
  } = TotalModeltDataForPresent(
    billsService,
    FetchTotalMoneyCollectedWithInPresentRange
  );

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
        text: "Number of Patients Admitted",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#990033"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
  };

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

	  const genderOptions = {
        series: [45, 40, 15],
        chart: {
          type: 'radialBar',
          height: 400,
          offsetY: -20
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 270,
            hollow: {
              margin: 0,
              size: '40%',
              background: '#fff',
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: 'front',
              dropShadow: {
                enabled: true,
                top: 0,
                left: 0,
                blur: 3,
                opacity: 0.5
              }
            },
            dataLabels: {
              name: {
                fontSize: '22px',
                color: '#333'
              },
              value: {
                fontSize: '16px',
                color: '#6777ef',
                offsetY: 8
              },
              total: {
                show: true,
                label: 'Gender',
                formatter: function(w) {
                  return '100%';
                }
              }
            }
          }
        },
        labels: ['Male', 'Female', 'Others'],
        colors: ['#008ffb', '#f4115c', '#8e8e8e'],
        legend: {
          show: true,
          floating: true,
          position: 'left',
          offsetX: -50,
          offsetY: -10,
          labels: {
            useSeriesColors: true,
          },
          markers: {
            size: 0
          },
          formatter: function(seriesName, opts) {
            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] + "%";
          },
          itemMargin: {
            vertical: 3
          }
        }
      };

	  const chartOptions = {
		chart: {
		  id: 'area-chart',
		  toolbar: {
			show: false
		  }
		},
		dataLabels: {
		  enabled: false
		},
		stroke: {
		  curve: 'smooth'
		},
		xaxis: {
		  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		},
		yaxis: {
		  title: {
			text: 'New Clients',
			style: {
			  fontSize: '14px'
			}
		  },
		  labels: {
			style: {
			  fontSize: '12px'
			}
		  }
		},
		tooltip: {
		  x: {
			show: true
		  }
		},
		fill: {
		  type: 'gradient',
		  gradient: {
			shadeIntensity: 1,
			opacityFrom: 0.7,
			opacityTo: 0.9,
			stops: [0, 90, 100]
		  }
		},
		colors: ['#002D5C']
	  };
	
	  const chartSeries = [
		{
		  name: 'Payments',
		  data: [10, 20, 18, 25, 28, 30, 32, 35, 40, 42, 45, 50]
		}
	  ];
	  

  return (
	<DashboardPageWrapper>
		<Typography variant="h5" style={{ textShadow: "1px 1px 2px rgb(0, 45, 92)" }}>Membership Dashboard</Typography>
	<Box sx={{ backgroundColor: '#f5f5f5', pt: 6}}>
	
		</Box>
	
		</DashboardPageWrapper>
  )
}

export default ClientDashboard