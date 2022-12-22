import {Box, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";

import ViewCard from "./@sections/ViewCard";
import ViewCardWithFilter from "./@sections/ViewCardWithFilter";

import client from "../../../feathers";

import {
  DashboardContainer,
  DashboardPageWrapper,
  StartCardWapper,
} from "../core-ui/styles";
import {userDetails} from "../utils/fetchUserDetails";

import {
  FetchTotalStockQuantity,
  FetchTotalStockValue,
  TotalModeltDataForPresent,
} from "../utils/chartData/queryHandler";

import {
  // FetchTotalPrescriptionOrderWithInPresentRange,
  // FetchTotalPrescriptionBilledWithInPresentRange,
  // FetchTotalPrescriptionPendingWithInPresentRange,
  FetchTotalSaleValueWithInPresentRange,
  FetchTotalStockValueWithInPresentRange,
  FetchTotalStockQuantityWithInPresentRange,
  FetchTotalSalePharmacy,
  FetchTotalClientAtPharmacy,
  FetchTotalSuppiedProduct,
  ModelResult,
} from "../utils/chartData/chartDataHandler";

const InventoryDashboard = () => {
  const [userName, setUserName] = useState("");
  const [facilityName, setFacilityName] = useState("");
  // const orderService = client.service("order");
  const billsService = client.service("/bills");
  const inventoryService = client.service("inventory");
  const productEntryService = client.service("productentry");

  const {fetchTotalClientAtPharmacy} = FetchTotalClientAtPharmacy(billsService);
  const {fetchTotalStockQuantity} = FetchTotalStockQuantity(inventoryService);
  const {fetchTotalStockValue} = FetchTotalStockValue(inventoryService);
  const {fetchTotalSalePharmacy} = FetchTotalSalePharmacy(billsService);
  const {fetchTotalSuppiedProduct} =
    FetchTotalSuppiedProduct(productEntryService);

  const {
    totalPresentDataObject: inventorySaleValuePresentDataObject,
    isLoading,
  } = TotalModeltDataForPresent(
    billsService,
    FetchTotalSaleValueWithInPresentRange
  );

  const {totalPresentDataObject: inventoryStockValuePresentDataObject} =
    TotalModeltDataForPresent(
      inventoryService,
      FetchTotalStockValueWithInPresentRange
    );

  // const { modelResult } = ModelResult(billsService);

  // console.log("model data ===>", {
  //   modelResult: modelResult,
  // });

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
            Welcome to your Inventory Module{" "}
            <span>@Front Desk {facilityName}</span>
          </Typography>
        </Box>

        <StartCardWapper>
          <ViewCard
            count={fetchTotalClientAtPharmacy}
            title="Patients Count At Pharmacy"
          />
          <ViewCard count={`${fetchTotalSalePharmacy}K`} title="Total Sales" />
          <ViewCard count={`${fetchTotalStockValue}K`} title="Total Stock" />
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
              <StartCardWapper>
                <ViewCardWithFilter
                  count={0}
                  title="Total Sale"
                  hasFilter={true}
                  dataSource={inventorySaleValuePresentDataObject}
                  isLoading={isLoading}
                />
              </StartCardWapper>
              <StartCardWapper>
                <ViewCard
                  count={fetchTotalSuppiedProduct}
                  title="Total Supplied Products"
                />
              </StartCardWapper>
            </Box>
            <Box sx={{width: "100%", p: 0, pt: 2, pb: 2}}>
              <StartCardWapper>
                <ViewCardWithFilter
                  count={0}
                  title="Total Stock Value"
                  hasFilter={true}
                  dataSource={inventoryStockValuePresentDataObject}
                  isLoading={isLoading}
                />
              </StartCardWapper>
              <StartCardWapper>
                <ViewCard
                  count={fetchTotalStockQuantity}
                  title="Total Quantity"
                />
              </StartCardWapper>{" "}
            </Box>
            <Box sx={{width: "100%", pt: 2, pb: 2}}></Box>
          </Box>
        </DashboardContainer>
      </Box>
    </DashboardPageWrapper>
  );
};

export default InventoryDashboard;
