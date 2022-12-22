import {Box, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";

import ViewCard from "./@sections/ViewCard";
import ViewCardWithFilter from "./@sections/ViewCardWithFilter";
import LineChart from "../charts/LineChart";
// import BarChart from "../charts/BarChart";
// import BubbleChart from "../charts/BubbleChart";
import CircleChart from "../charts/CircleChart";

import client from "../../../feathers";

import {
  TotalDischargedPatient,
  TotalAdmittedPatient,
  FetchTotalDischargedWithInPresentRange,
  FetchTotalAdmittedWithInPresentRange,
  // TotalNumOfData,
  // TotalBedAvailable,
  // ModelResult,
} from "../utils/chartData/chartDataHandler";
import {
  PendingAdmission,
  // TotalBedSpaces,
  TotalModeltDataForPresent,
  getReAdmissionWithIn30Days,
  AverageLengthOfStayed,
} from "../utils/chartData/queryHandler";
import {CircleSeriesData} from "../utils/chartData/circleSeries";
import {AdmittedAndDischargedPatientLineData} from "../utils/chartData/LineData";
import {MaleAndFemaleColumnSeriesData} from "../utils/chartData/columeData";

import {
  DashboardContainer,
  DashboardPageWrapper,
  StartCardWapper,
} from "../core-ui/styles";
import ColumnChart from "../charts/ColumnChart";
import {userDetails} from "../utils/fetchUserDetails";

const WardDashboard = () => {
  const clientService = client.service("/client");
  const admissionService = client.service("/admission");
  // const locationService = client.service("/location");

  const {circleSeriesArray} = CircleSeriesData(clientService);
  const {totalDischargedPatient, isPending: totalDischargedIsLoading} =
    TotalDischargedPatient(admissionService);
  const {totalAdmittedPatient} = TotalAdmittedPatient(admissionService);
  const totalInPatient = totalAdmittedPatient - totalDischargedPatient; //
  const {monthNameForCurrentYear, admittedAndDischargedPatientLineSeriesData} =
    AdmittedAndDischargedPatientLineData(admissionService);

  const {genderPatientXAxisLabel, maleAndFemaleColumnSeriesData} =
    MaleAndFemaleColumnSeriesData(admissionService);
  const {totalPendingAdmissions} = PendingAdmission(admissionService);
  const {reAdmissionRate} = getReAdmissionWithIn30Days(admissionService);
  const {totalPresentDataObject: patientAdmittedPresentDataObject, isLoading} =
    TotalModeltDataForPresent(
      admissionService,
      FetchTotalAdmittedWithInPresentRange
    );

  const {totalPresentDataObject: patientDischargedPresentDataObject} =
    TotalModeltDataForPresent(
      admissionService,
      FetchTotalDischargedWithInPresentRange
    );

  const {averageLengthOfStayed} = AverageLengthOfStayed(admissionService);

  // const { totalValue: totalLocation } = TotalNumOfData(locationService); //
  // const { wardDataArray, totalBedSpaces } = TotalBedSpaces(locationService);

  /**
   * test
   */
  // const { totalBedAvailable } = TotalBedAvailable(admissionService);

  const dayNameArr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const dayData = [
    {
      name: "2022",
      data: [8, 12, 14, 9, 11, 5, 9],
    },
  ];

  // const { modelResult } = ModelResult(admissionService);
  // const { averageLengthOfStayed } = AverageLengthOfStayed(admissionService);
  console.log("ward modelResult =====>", {
    // genderPatientXAxisLabel: genderPatientXAxisLabel,
    // maleAndFemaleColumnSeriesData,
    patientAdmittedPresentDataObject: patientAdmittedPresentDataObject,
    patientDischargePresentDataObject: patientDischargedPresentDataObject,
    // AverageLengthOfStayed: averageLengthOfStayed,
  });

  /**
   * test
   **/

  const [userName, setUserName] = useState("");
  const [facilityName, setFacilityName] = useState("");

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
          <ViewCard count={40} title="Available Bed Spaces" />
          <ViewCard count={30} title="Occupancy Rate" />
          <ViewCard count={totalPendingAdmissions} title="Pending Admission" />
        </StartCardWapper>
        <StartCardWapper>
          <ViewCardWithFilter
            count={50}
            title="No Of Admitted Patients"
            hasFilter={true}
            dataSource={patientAdmittedPresentDataObject}
            isLoading={isLoading}
          />
          <ViewCardWithFilter
            count={totalDischargedPatient}
            title="No Of Discharged Patients"
            hasFilter={true}
            dataSource={patientDischargedPresentDataObject}
            isLoading={totalDischargedIsLoading}
          />
        </StartCardWapper>

        <DashboardContainer>
          <Box
            sx={{
              display: "grid",
              width: "100%",
              gridGap: "10px",
              gridTemplateColumns: {lg: "repeat(3, 1fr)", xs: "1fr"},
            }}
          >
            <Box sx={{width: "100%", pt: 1, pb: 2}}>
              <LineChart
                title="2022"
                monthArray={monthNameForCurrentYear}
                series={admittedAndDischargedPatientLineSeriesData}
              />
              <ColumnChart
                title="Patient Age"
                series={dayData}
                xLabels={dayNameArr}
              />
            </Box>
            <Box sx={{width: "100%", pt: 1, pb: 2}}>
              <ColumnChart
                title="Patient Age"
                series={maleAndFemaleColumnSeriesData}
                xLabels={genderPatientXAxisLabel}
              />
            </Box>
            <Box sx={{width: "100%", pt: 1, pb: 20}}>
              <ViewCard count={reAdmissionRate} title="Readmission Rate" />
              <ViewCard
                count={averageLengthOfStayed}
                title="Average Length Of Stay"
              />
              <CircleChart
                series={circleSeriesArray}
                labels={["Male", "Female", "Other"]}
                title="Total Client by Gender"
              />
              <ViewCard count={totalInPatient} title="In Patient" />
              <ViewCard count={30} title="Out Patient" />
            </Box>
          </Box>
        </DashboardContainer>
      </Box>
    </DashboardPageWrapper>
  );
};

export default WardDashboard;
