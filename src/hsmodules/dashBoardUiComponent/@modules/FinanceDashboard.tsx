import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { ObjectContext } from "../../../context";
import ViewCardWithFilter from "./@sections/ViewCardWithFilter";
import TotalRevenueIcon from "@mui/icons-material/AttachMoney";
import TotalMoneyCollectedIcon from "@mui/icons-material/MonetizationOn";
import PendingBillsIcon from "@mui/icons-material/ReceiptLong";
import { formatDistanceToNowStrict, format, subDays, addDays } from "date-fns";

import client from "../../../feathers";

import {
  DashboardContainer,
  DashboardPageWrapper,
  StartCardWapper,
} from "../core-ui/styles";
import { userDetails } from "../utils/fetchUserDetails";

import { TotalModeltDataForPresent } from "../utils/chartData/queryHandler";

import {
  FetchTotalRevenue,
  FetchTotalBalance,
  FetchTotalMoneyCollectedWithInPresentRange,
  FetchTotalPendingBills,
  FetchTotalMoneyCollected,
  ModelResult,
} from "../utils/chartData/chartDataHandler";
import is from "date-fns/esm/locale/is/index.js";
import { PageWrapper } from "../../../ui/styled/styles";
import { TableMenu } from "../../../ui/styled/global";
import CustomTable from "../../../components/customtable";
import { financeRevenueData } from "../../Finance/schema";
import FilterMenu from "../../../components/utilities/FilterMenu";
import MuiClearDatePicker from "../../../components/inputs/Date/MuiClearDatePicker";

const FinanceDashboard = () => {
  const { showActionLoader, hideActionLoader } = useContext(ObjectContext);
  const [userName, setUserName] = useState("");
  const [facilityName, setFacilityName] = useState("");
  const billsService = client.service("/bills");
  const inventoryService = client.service("inventory");
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  //query function
  const { fetchTotalRevenue } = FetchTotalRevenue(billsService);
  const { fetchTotalBalance } = FetchTotalBalance(billsService);
  const { fetchTotalPendingBills } = FetchTotalPendingBills(billsService);
  const { fetchTotalMoneyCollected } = FetchTotalMoneyCollected(billsService);

  const {
    totalPresentDataObject: fetchTotalMoneyCollectedPresentDataObject,
    isLoading,
  } = TotalModeltDataForPresent(
    billsService,
    FetchTotalMoneyCollectedWithInPresentRange
  );

  const { modelResult } = ModelResult(billsService);

  useEffect(() => {
    const { userFullName, facilityFullName } = userDetails();
    setUserName(userFullName);
    setFacilityName(facilityFullName);
  }, []);

  console.log("fetchTotalMoneyCollectedPresentDataObject", {
    fetchTotalMoneyCollectedPresentDataObject,
    isLoading,
  });

  const FinanceRevenueSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row) => row.sn,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Date",
      key: "createdAt",
      description: "Enter Date",
      selector: (row) => format(new Date(row.createdAt), "dd-MM-yy HH:mm"),
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    {
      name: "Category",
      key: "category",
      description: "category",
      selector: (row) => row.category,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Revenue(week)",
      key: "revenueWeek",
      description: "Revenue Per Week",
      selector: (row) => row.revenueWeek,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    {
      name: "Revenue(month)",
      key: "revenueWeek",
      description: "Revenue Per Week",
      selector: (row) => row.revenueWeek,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    {
      name: "Revenue(year)",
      key: "revenuYear",
      description: "Revenue Per Year",
      selector: (row) => row.revenueYear,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    {
      name: "Total Revenue",
      key: "totalRevenue",
      description: "Total Revenue",
      selector: (row) => row.totalRevenue,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
  ];

  const onRowClicked = () => {};

  const handleSearch = (searchValue) => {};

  return (
    <DashboardPageWrapper>
      <Box>
        <Typography
          variant="h5"
          style={{ textShadow: "1px 1px 2px rgb(0, 45, 92)" }}
        >
          Finance Dashboard
        </Typography>
        <Grid
          container
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
          style={{ marginTop: "20px" }}
        >
          {/* Money Collected Card in a week */}
          <Grid item xs={12} md={3}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  fontWeight="bold"
                  gutterBottom
                >
                  Total Revenue (week)
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" fontWeight="bold" component="div">
                      {`₦${fetchTotalMoneyCollectedPresentDataObject.totalInPresentWeek}`}
                    </Typography>
                  </Box>
                  <Box>
                    <TotalRevenueIcon
                      sx={{
                        fontSize: 48,
                        bgcolor: "#dfdfec",
                        p: 1,
                        borderRadius: 8,
                        color: "#002D5C",
                      }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Money Collected Card in a month */}
          <Grid item xs={12} md={3}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  fontWeight="bold"
                  gutterBottom
                >
                  Total Revenue (Month)
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" fontWeight="bold" component="div">
                      {`₦${fetchTotalMoneyCollectedPresentDataObject.totalInPresentMonth}`}
                    </Typography>
                  </Box>
                  <Box>
                    <TotalRevenueIcon
                      sx={{
                        fontSize: 48,
                        bgcolor: "#dfdfec",
                        p: 1,
                        borderRadius: 8,
                        color: "#002D5C",
                      }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Money Collected Card in a year */}
          <Grid item xs={12} md={3}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  fontWeight="bold"
                  gutterBottom
                >
                  Total Revenue (Year)
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" fontWeight="bold" component="div">
                      {`₦${fetchTotalMoneyCollectedPresentDataObject.totalInPresentYear}`}
                    </Typography>
                  </Box>
                  <Box>
                    <TotalRevenueIcon
                      sx={{
                        fontSize: 48,
                        bgcolor: "#dfdfec",
                        p: 1,
                        borderRadius: 8,
                        color: "#002D5C",
                      }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Money Collected Card */}
          {/* <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  fontWeight="bold"
                  gutterBottom
                >
                  Total Money Collected
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" fontWeight="bold" component="div">
                      {`₦${fetchTotalMoneyCollected}`}
                    </Typography>
                  </Box>
                  <Box>
                    <TotalMoneyCollectedIcon
                      sx={{
                        fontSize: 48,
                        bgcolor: "#dfdfec",
                        p: 1,
                        borderRadius: 8,
                        color: "#002D5C",
                      }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid> */}

          {/* Pending Bills Card */}
          {/* <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  fontWeight="bold"
                  gutterBottom
                >
                  Pending Bills
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="div" fontWeight="bold">
                      {`₦${fetchTotalPendingBills}`}
                    </Typography>
                  </Box>
                  <Box>
                    <PendingBillsIcon
                      sx={{
                        fontSize: 48,
                        bgcolor: "#dfdfec",
                        p: 1,
                        borderRadius: 8,
                        color: "#002D5C",
                      }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid> */}

          {/* <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <ViewCardWithFilter
                  count={fetchTotalMoneyCollected}
                  title="Collection Breakdown"
                  hasFilter={true}
                  dataSource={fetchTotalMoneyCollectedPresentDataObject}
                  isLoading={isLoading}
                />
              </CardContent>
            </Card>
          </Grid> */}
        </Grid>

        <div className="level">
          <PageWrapper
            style={{
              flexDirection: "column",
              padding: "0.6rem 1rem",
              marginBottom: "auto",
            }}
          >
            <TableMenu style={{ marginTop: "10px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h2 style={{ marginLeft: "10px", fontSize: "0.95rem" }}>
                  Service Revenue
                </h2>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                {handleSearch && (
                  <div className="inner-table">
                    <FilterMenu onSearch={handleSearch} />
                  </div>
                )}
                <h2 style={{ margin: "0 10px", fontSize: "0.95rem" }}>
                  Search Revenue
                </h2>
                <MuiClearDatePicker
                  value={startDate}
                  setValue={setStartDate}
                  label="Filter By Date"
                  format="dd/MM/yyyy"
                />
              </div>
            </TableMenu>

            <div style={{ width: "100%", height: "450px", overflow: "auto" }}>
              <CustomTable
                title={""}
                columns={FinanceRevenueSchema}
                data={financeRevenueData}
                pointerOnHover
                highlightOnHover
                striped
                onRowClicked={onRowClicked}
                progressPending={loading}
              />
            </div>
          </PageWrapper>
        </div>
      </Box>
    </DashboardPageWrapper>
  );
};

export default FinanceDashboard;
