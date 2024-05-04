import React, {useState, useContext, useEffect, useRef} from "react";
import {Box, Grid, Button as MuiButton, Typography} from "@mui/material";
import {
    DashboardContainer,
    DashboardPageWrapper,
    StartCardWapper,
  } from "../../dashBoardUiComponent/core-ui/styles";
const ReportComponent =()=>{




    return(
        <>
         <Box>
          <Typography variant="h2">
            Hello <span></span>👋
          </Typography>
          <Typography variant="body1">
            Welcome to your Managed Care <span>Dashboard</span>
          </Typography>
        </Box>

      
        </>

    )

}

export default ReportComponent;