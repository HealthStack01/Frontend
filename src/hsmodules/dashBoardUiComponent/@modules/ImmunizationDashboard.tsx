import {Box, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";

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

const ImmunizationDashboardComponent = () => {
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
  // console.log(clientLineData, 'clientsss')
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
        <Box>
          <Typography variant="h2">
            Hello <span>{userName}</span>👋
          </Typography>
          <Typography variant="body1">
            Welcome to your Client Module{" "}
            <span>@Front Desk {facilityName}</span>
          </Typography>
        </Box>

        <StartCardWapper>
          <ViewCard count={totalValue} title="Total Clients" />
          <ViewCard
            count={totalUpcomingAppointment}
            title="Upcoming Appointments"
          />
          <ViewCard count={totalNewClient} title="Total New Clients" />
          {/* <ViewCard count={30} title={`Doctor's on Duty`} /> */}
        </StartCardWapper>

        <DashboardContainer>
          <Box
            sx={{
              display: "grid",
              width: "100%",
              gridGap: "10px",
              // background: "#ffcc99", // "#f9f9f9",

              gridTemplateColumns: {lg: "repeat(3, 1fr)", xs: "1fr"},
            }}
          >
            <Box sx={{width: "100%", p: 2}}>
              <ColumnChart
                title="Payment Mode"
                series={paymentModeBarSeries}
                xLabels={["Cash", "HMO", "Comp", "Family Plan", "All"]}
              />
            </Box>
            <Box sx={{width: "100%", p: 2}}>
              <LineChart
                title="New Clients"
                monthArray={monthNameForCurrentYear}
                series={newClientLineSeriesData}
              />
            </Box>
            <Box sx={{width: "100%", p: 2}}>
              <CircleChart
                series={circleSeriesArray}
                labels={["Male", "Female", "Other"]}
                title="Total Client by Gender"
              />
              {/* <Stack direction="row">
                <ViewCard count={totalDischargedPatient} title="Out Patients" />
                <ViewCard count={totalInPatient} title="In Patients" />
              </Stack> */}
            </Box>
          </Box>
        </DashboardContainer>
      </Box>
    </DashboardPageWrapper>
  );
};

export default ImmunizationDashboardComponent;
