import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import ViewCard from "./@sections/ViewCard";
import ViewCardWithFilter from "./@sections/ViewCardWithFilter";
import LineChart from "../charts/LineChart";
// import CircleChart from "../charts/CircleChart";
import { PharmacyLineSeriesData } from "../utils/chartData/LineData";

import client from "../../../feathers";

import {
  DashboardContainer,
  DashboardPageWrapper,
  StartCardWapper,
} from "../core-ui/styles";
import { userDetails } from "../utils/fetchUserDetails";

import {
  TotalModeltDataForPresent,
  FetchTotalStockQuantity,
  FetchTotalStockValue,
} from "../utils/chartData/queryHandler";

import {
  FetchTotalPrescriptionOrderWithInPresentRange,
  FetchTotalPrescriptionBilledWithInPresentRange,
  FetchTotalPrescriptionPendingWithInPresentRange,
  FetchTotalSaleValueWithInPresentRange,
  FetchTotalStockValueWithInPresentRange,
  FetchTotalSalePharmacy,
  ModelResult,
} from "../utils/chartData/chartDataHandler";

const PharmacyDashboard = () => {
  const [userName, setUserName] = useState("");
  const [facilityName, setFacilityName] = useState("");

  const orderService = client.service("order");
  const billsService = client.service("/bills");
  const inventoryService = client.service("inventory");

  const {
    totalPresentDataObject: prescriptionOrderPresentDataObject,
    isLoading: isSentLoading,
  } = TotalModeltDataForPresent(
    orderService,
    FetchTotalPrescriptionOrderWithInPresentRange
  );
  const {
    totalPresentDataObject: prescriptionBilledPresentDataObject,
    isLoading,
  } = TotalModeltDataForPresent(
    orderService,
    FetchTotalPrescriptionBilledWithInPresentRange
  );

  const { totalPresentDataObject: prescriptionPendingPresentDataObject } =
    TotalModeltDataForPresent(
      orderService,
      FetchTotalPrescriptionPendingWithInPresentRange
    );

  const { totalPresentDataObject: pharmacyStockValuePresentDataObject } =
    TotalModeltDataForPresent(
      inventoryService,
      FetchTotalStockValueWithInPresentRange
    );

  const { totalPresentDataObject: pharmacySaleValuePresentDataObject } =
    TotalModeltDataForPresent(
      billsService,
      FetchTotalSaleValueWithInPresentRange
    );
  const { fetchTotalStockQuantity } = FetchTotalStockQuantity(inventoryService);
  // const { fetchTotalStockValue } = FetchTotalStockValue(inventoryService);

  const { fetchTotalSalePharmacy } = FetchTotalSalePharmacy(billsService);

  const { monthNameForCurrentYear, pharmacyLineSeriesData } =
    PharmacyLineSeriesData(billsService, inventoryService);

  /**
   * test
   */
  // const { modelResult } = ModelResult(billsService);

  // console.log("model data ===>", {
  //   modelResult: modelResult,
  //   monthNameForCurrentYear: monthNameForCurrentYear,
  //   pharmacySaleValueSeriesData: pharmacyLineSeriesData,
  // });

  useEffect(() => {
    const { userFullName, facilityFullName } = userDetails();
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
            Welcome to your Pharmcy Module{" "}
            <span>@Front Desk {facilityName}</span>
          </Typography>
        </Box>

        <StartCardWapper>
          <ViewCardWithFilter
            count={0}
            title="No Of Prescription Sent"
            hasFilter={true}
            dataSource={prescriptionOrderPresentDataObject}
            isLoading={isLoading}
          />
          <ViewCardWithFilter
            count={0}
            title="No Of Prescription Billed"
            hasFilter={true}
            dataSource={prescriptionBilledPresentDataObject}
            isLoading={isLoading}
          />
          <ViewCard count={`${fetchTotalStockQuantity}K`} title="Total Stock" />
        </StartCardWapper>

        <DashboardContainer>
          <Box
            sx={{
              display: "grid",
              width: "100%",
              gridGap: "10px",
              gridTemplateColumns: { lg: "repeat(3, 1fr)", xs: "1fr" },
              mb: 5,
            }}
          >
            <Box sx={{ width: "100%", p: 2, mb: 5 }}>
              <LineChart
                title="Revenue"
                monthArray={monthNameForCurrentYear}
                series={pharmacyLineSeriesData}
              />
              <StartCardWapper>
                <ViewCardWithFilter
                  count={0}
                  title="Total Stock Value"
                  hasFilter={true}
                  dataSource={pharmacyStockValuePresentDataObject}
                  isLoading={isLoading}
                />
                {/* <ViewCard count={"80K"} title="Total Purchases" /> */}
              </StartCardWapper>
              <Box>
                {/* <StartCardWapper>
                  <ViewCardWithFilter
                    count={0}
                    title="No Of Prescription Dispensed"
                    hasFilter={true}
                    dataSource={prescriptionOrderPresentDataObject}
                    isLoading={isSentLoading}
                  />
                </StartCardWapper> */}
              </Box>
            </Box>
            <Box sx={{ width: "100%", p: 2, mb: 5 }}>
              {/* <LineChart title="Prescription Overview" /> */}
              <StartCardWapper>
                <ViewCardWithFilter
                  count={0}
                  title="Total Sale Value"
                  hasFilter={true}
                  dataSource={pharmacySaleValuePresentDataObject}
                  isLoading={isLoading}
                />
              </StartCardWapper>
            </Box>
            <Box sx={{ width: "100%", p: 2, mb: 5 }}>
              <StartCardWapper>
                <ViewCard
                  count={`${fetchTotalSalePharmacy}K`}
                  title="Total Sales"
                />
              </StartCardWapper>
              <StartCardWapper>
                <Box>
                  <ViewCardWithFilter
                    count={0}
                    title="No Of Prescription Pending"
                    hasFilter={true}
                    dataSource={prescriptionPendingPresentDataObject}
                    isLoading={isLoading}
                  />
                </Box>
              </StartCardWapper>
            </Box>
          </Box>
        </DashboardContainer>
      </Box>
    </DashboardPageWrapper>
  );
};

export default PharmacyDashboard;
