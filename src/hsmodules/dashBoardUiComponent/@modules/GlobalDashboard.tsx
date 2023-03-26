import {Box, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";

import ViewCard from "./@sections/ViewCard";
import ViewCardWithFilter from "./@sections/ViewCardWithFilter";
import AreaChart from "../charts/AreaChart";
import BarChart from "../charts/BarChart";
import BubbleChart from "../charts/BubbleChart";
import CircleChart from "../charts/CircleChart";

import client from "../../../feathers";

import {
  DashboardContainer,
  DashboardPageWrapper,
  StartCardWapper,
} from "../core-ui/styles";
import {userDetails} from "../utils/fetchUserDetails";

import {TotalModeltDataForPresent} from "../utils/chartData/queryHandler";

import {
  FetchTotalRevenue,
  FetchTotalBalance,
  FetchTotalMoneyCollectedWithInPresentRange,
  FetchTotalPendingBills,
  FetchTotalMoneyCollected,
  ModelResult,
} from "../utils/chartData/chartDataHandler";

const GlobalDashboard = () => {
  const [userName, setUserName] = useState("");
  const [facilityName, setFacilityName] = useState("");
  const billsService = client.service("/bills");
  const inventoryService = client.service("inventory");

  //query function

  const {fetchTotalRevenue} = FetchTotalRevenue(billsService);
  const {fetchTotalBalance} = FetchTotalBalance(billsService);
  const {fetchTotalPendingBills} = FetchTotalPendingBills(billsService);
  const {fetchTotalMoneyCollected} = FetchTotalMoneyCollected(billsService);

  const {
    totalPresentDataObject: fetchTotalMoneyCollectedPresentDataObject,
    isLoading,
  } = TotalModeltDataForPresent(
    billsService,
    FetchTotalMoneyCollectedWithInPresentRange
  );

  const {modelResult} = ModelResult(billsService);

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
            Welcome to your Finance Module{" "}
            <span>@Front Desk {facilityName}</span>
          </Typography>
        </Box>

        <StartCardWapper>
          <ViewCard count={`${fetchTotalRevenue}K`} title="Total Revenue" />
          <ViewCard
            count={`${fetchTotalPendingBills}K`}
            title="Pending Bills"
          />
          <ViewCardWithFilter
            count={fetchTotalMoneyCollected}
            title="Total Money collected"
            hasFilter={true}
            dataSource={fetchTotalMoneyCollectedPresentDataObject}
            isLoading={isLoading}
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
            <Box sx={{width: "100%", p: 0, pt: 2, pb: 2}}>
              <ViewCard
                count={fetchTotalBalance}
                title="Total Pending Balance"
              />
              {/* <AreaChart height={200} title="Trends" />
              <AreaChart height={200} title="New Clients" /> */}
            </Box>
            <Box sx={{width: "100%", pt: 2, pb: 2}}>
              {/* <BarChart title="Payment Mode" />
              <BubbleChart /> */}
            </Box>
            <Box sx={{width: "100%", pt: 2, pb: 2}}>
              {/* <Stack
                direction='row'
                spacing={0.4}
                sx={{ mt: 4 }}
                justifyContent='center'
              >
                <Button>Male</Button>
                <Button>Female</Button>
                <Button>Others</Button>
              </Stack> */}
              {/* <CircleChart /> */}
            </Box>
          </Box>
        </DashboardContainer>
      </Box>
    </DashboardPageWrapper>
  );
};

export default GlobalDashboard;
