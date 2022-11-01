import { Avatar, Box } from "@mui/material";
import React from "react";
import { deepOrange } from "@mui/material/colors";

const AppointmentCard = () => {
  return (
    <Box
      sx={{
        padding: "16px",
        borderRadius: "16px",
        backgroundColor: "#fff",
        margin: "0 0 16px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar alt="Avatar" src="" sx={{ bgcolor: deepOrange[500] }}>
          H
        </Avatar>

        <Box sx={{ marginLeft: "16px" }}>
          <h4
            style={{
              fontSize: "40px",
              lineHeight: "32px",
              color: "#0364FF",
              margin: "0",
              padding: "0",
            }}
          >
            Dr. Shawn Hampton
          </h4>
          <p
            style={{
              fontSize: "14px",
              lineHeight: "14px",
              margin: "0",
              padding: "0",
            }}
          >
            Emergency Appointment
          </p>
        </Box>
      </Box>

      <span style={{ padding: "10px", color: "#acacac" }}>
        <i className="bi bi-clock"></i>{" "}
        <small style={{ marginLeft: "4px" }}>Monday, September 22</small>
      </span>
    </Box>
  );
};

export default AppointmentCard;
