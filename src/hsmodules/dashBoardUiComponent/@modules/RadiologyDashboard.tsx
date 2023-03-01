import {Box, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";

import ViewCard from "./@sections/ViewCard";
import LineChart from "../charts/LineChart";
import ColumnChart from "../charts/ColumnChart";
import RadiologyCard from "./@sections/RadiologyCard";

import {
  DashboardContainer,
  DashboardPageWrapper,
  StartCardWapper,
} from "../core-ui/styles";
import {userDetails} from "../utils/fetchUserDetails";

const RadiologyDashboard = () => {
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
          <ViewCard count={50} title="Pending Orders" />
          <ViewCard count={12} title="Referred Clients" />
          <ViewCard count={180} title="Final & Draft Radiology Results" />
          <ViewCard count={16} title="Radiology Appointments" />
        </StartCardWapper>

        <div style={{overflowY: "scroll", height: "65vh"}}>
          <div>
            <div style={{display: "flex", width: "100%"}}>
              <div style={{width: "50%"}}>
                <div style={{background: "#f9f9f9"}}>
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontWeight: "normal",
                      color: "#0364ff",
                      marginLeft: "1rem",
                      marginTop: "1rem",
                    }}
                  >
                    Examinations
                  </Typography>
                  <LineChart
                    title=""
                    series={[
                      {name: "Inflation", data: [0, 25, 50, 75, 100, 125, 150]},
                    ]}
                    monthArray={[
                      "0",
                      "25",
                      "50",
                      "75",
                      "100",
                      "125",
                      "150",
                      "175",
                    ]}
                  />
                </div>
                <div style={{display: "flex", textAlign: "center"}}>
                  <div
                    style={{
                      display: "flex",
                      background: "#f9f9f9",
                      width: "50%",
                      height: "18rem",
                    }}
                  >
                    <div
                      style={{position: "relative", top: "3rem", left: "4rem"}}
                    >
                      <Typography
                        style={{
                          marginBottom: "1.5rem",
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        Check-in vs
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "40px",
                          fontWeight: "bold",
                          color: "#444444",
                        }}
                      >
                        4
                      </Typography>
                    </div>
                    <div
                      style={{
                        position: "relative",
                        top: "3rem",
                        left: "5.5rem",
                      }}
                    >
                      <Typography
                        style={{
                          marginBottom: "1.5rem",
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        Check-out
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "40px",
                          fontWeight: "bold",
                          color: "#444444",
                        }}
                      >
                        4
                      </Typography>
                    </div>
                  </div>
                  <div
                    style={{
                      background: "#f9f9f9",
                      width: "50%",
                      marginLeft: "2rem",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "normal",
                        color: "#444444",
                        marginBottom: "1.2rem",
                        marginTop: "2rem",
                      }}
                    >
                      Arrival To Exam Time
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "40px",
                        fontWeight: "bold",
                        color: "#0364ff",
                        marginBottom: "1.4rem",
                      }}
                    >
                      900K
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        fontWeight: "normal",
                        color: "#444444",
                      }}
                    >
                      (Average wait time)
                    </Typography>
                  </div>
                </div>
              </div>

              <div style={{marginLeft: "2rem", width: "50%"}}>
                <div
                  style={{
                    display: "flex",
                    textAlign: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      background: "#f9f9f9",
                      width: "30%",
                      height: "18rem",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "48px",
                        fontWeight: "bold",
                        color: "#0364ff",
                        marginBottom: "1.6rem",
                        marginTop: "2rem",
                      }}
                    >
                      250
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "normal",
                        color: "#444444",
                        marginBottom: "1rem",
                      }}
                    >
                      Cancelled
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "normal",
                        color: "#444444",
                      }}
                    >
                      Appointments
                    </Typography>
                  </div>
                  <div
                    style={{
                      background: "#f9f9f9",
                      width: "70%",
                      marginLeft: "1rem",
                      height: "18rem",
                    }}
                  >
                    <Typography>Report Turnaround</Typography>
                    <div style={{position: "relative", top: "-1.5rem"}}>
                      <LineChart
                        title=""
                        series={[{name: "Inflation", data: [0, 25, 50, 75]}]}
                        monthArray={[
                          "-80",
                          "-70",
                          "-60",
                          "-50",
                          "-40",
                          "-30",
                          "-20",
                          "-10",
                        ]}
                      />
                    </div>
                  </div>
                </div>

                <div style={{background: "#f9f9f9"}}>
                  <Typography
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      color: "#0064cc",
                      margin: "1.5rem 1.5rem",
                    }}
                  >
                    Revenue generated
                  </Typography>
                  <LineChart
                    title=""
                    series={[
                      {
                        name: "Inflation",
                        data: [100, 200, 300, 400, 500, 600, 700],
                      },
                    ]}
                    monthArray={[
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                    ]}
                  />
                </div>
              </div>
            </div>
            <div style={{display: "flex"}}>
              <div style={{background: "#f9f9f9", width: "30%"}}>
                <RadiologyCard
                  count={0}
                  title="80k"
                  hasFilter={true}
                  dataSource={""}
                  isLoading={false}
                />
              </div>
              <div></div>
              <div style={{background: "#f9f9f9", width: "30%"}}>
                <Typography
                  style={{
                    color: "#00064cc",
                    fontSize: "16px",
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  Frequent Orders
                </Typography>
                <ColumnChart series={""} xLabels={["MRI", "Xray", "USS"]} />
              </div>
            </div>
          </div>
        </div>
      </Box>
    </DashboardPageWrapper>
  );
};

export default RadiologyDashboard;
