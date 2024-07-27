import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { ObjectContext, UserContext } from "../../../context";
import TotalRevenueIcon from "@mui/icons-material/AttachMoney";

import client from "../../../feathers";

import {
  DashboardPageWrapper,
} from "../core-ui/styles";
import { userDetails } from "../utils/fetchUserDetails";

import { TotalModeltDataForPresent } from "../utils/chartData/queryHandler";

import {
  FetchTotalMoneyCollectedWithInPresentRange,
  ModelResult,
} from "../utils/chartData/chartDataHandler";
import { PageWrapper } from "../../../ui/styled/styles";
import { TableMenu } from "../../../ui/styled/global";
import CustomTable from "../../../components/customtable";
import { financeRevenueData } from "../../Finance/schema";
import FilterMenu from "../../../components/utilities/FilterMenu";
import { processFinanceRevenueData } from "../utils/aggOrderCategory";
import { toast } from "bulma-toast";
import { calculateTotalRevenuePresent } from "../utils/aggOrder";
import ExcelExport from "../../Finance/ui-components/DownloadExcelButton";
import { set } from "date-fns";

const CustomLoader = () => (
  <div
    style={{
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <img
      src="/loading.gif"
      style={{width: "200px", height: "auto", display: "block"}}
    />
    <Typography sx={{marginTop: "-2rem", fontSize: "0.85rem"}}>
      Hold on, whilst we fetch your data...
    </Typography>
  </div>
);

const FinanceDashboard = () => {
  const { showActionLoader, hideActionLoader } = useContext(ObjectContext);
  const [userName, setUserName] = useState("");
  const [facilityName, setFacilityName] = useState("");
  const billsService = client.service("/bills");
  const inventoryService = client.service("inventory");
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const InventoryServ = client.service("subwallettransactions");
  const [revenueData, setRevenueData] = useState([]);
  const { user } = useContext(UserContext); //,setUser
  const [searchTerm, setSearchTerm] = useState("");
  const [presentOrderData, setPresentOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  

  const { modelResult } = ModelResult(billsService);

  useEffect(() => {
    const { userFullName, facilityFullName } = userDetails();
    setUserName(userFullName);
    setFacilityName(facilityFullName);
  }, []);

  useEffect(() => {
    getRevenuedetails();
    return () => {};
  }, []);


  const getRevenuedetails = () => {  
    return InventoryServ.find({
      query: {
        facility: user.currentEmployee.facilityDetail._id,
        category: "debit",
        // 'info.orderInfo.orderObj.order_category': "Prescription",  // Filter for Prescription order category
        createdAt: {
          $gte: new Date(new Date().getFullYear(), 0, 1).toISOString(), // Start of current year
          $lte: new Date().toISOString() // Current date and time
        },
        $sort: {
          createdAt: -1,
        },
      },
    }).then((res) => {
          const processedData = processFinanceRevenueData(res.data);
          const presentOrderDetails = calculateTotalRevenuePresent(res.data);
          setRevenueData(processedData);
          setPresentOrderData(presentOrderDetails);
          toast({
            message: "Revenue details details succesful",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("====>>>> ERROR <<<<<====",{
            error: err
          })
          toast({
            message: "Error getting revenue details " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    };

  const handleSearch = (searchValue) => {
      setSearchTerm(searchValue);
   };

   const filteredRevenueData = revenueData.filter(item =>
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      name: "Category",
      key: "category",
      description: "category",
      selector: (row) => row.category,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Revenue(day)",
      key: "revenueWeek",
      description: "Revenue Per day",
      selector: (row) => row.revenueDay,
      sortable: true,
      required: true,
      inputType: "NUMBER",
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
      selector: (row) => row.revenueMonth,
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
  ];

  const onRowClicked = () => {};


  if (isLoading) {
    return(
          <Box
    sx={{
      width: "100%",
      height: "calc(100% - 104px)",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <CustomLoader />
  </Box>
    )

  }


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
   {/* Money Collected Card in a day */}
   <Grid item xs={12} md={3}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  fontWeight="bold"
                  gutterBottom
                >
                  Total Revenue (day)
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" fontWeight="bold" component="div">
                      {`₦${presentOrderData.revenueDay.toFixed(0)}`}
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
                      {`₦${presentOrderData.revenueWeek.toFixed(0)}`}
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
                      {`₦${presentOrderData.revenueMonth.toFixed(0)}`} 
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
                      {`₦${presentOrderData.revenueYear.toFixed(0)}`}
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
              <div style={{ display: "flex", alignItems: "center",

                flexDirection: "row",
                gap: "10px",
               }}>
                {/* <h2 style={{ marginLeft: "10px", fontSize: "0.95rem" }}>
                  Service Revenue
                </h2> */}
                <div style={{ display: "flex", alignItems: "center" }}>
                {handleSearch && (
                  <div className="inner-table">
                  <FilterMenu onSearch={handleSearch} />
                  </div>
                )}
                <h2 style={{ margin: "0 10px", fontSize: "0.95rem" }}>
                  Search Revenue by Category
                </h2>
              </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h2 style={{ margin: "0 10px", fontSize: "0.95rem" }}>
                  Download Revenue Data
                </h2>
                <ExcelExport data={filteredRevenueData} fileName="revenue data" />
              </div>
            </TableMenu>

            <div style={{ width: "100%", height: "450px", overflow: "auto" }}>
              <CustomTable
                title={""}
                columns={FinanceRevenueSchema}
                data={filteredRevenueData}
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
