import { Box } from "@mui/material";
import React from "react";
import GridRow from "../../core-ui/Grid/GridRow";

const AppointmentGrid = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        marginTop: "24px",
        padding: "10px",
      }}
    >
      <GridRow />
      <GridRow month="FEB" />
      <GridRow month="MAR" />
      <GridRow month="APR" />
      <GridRow month="MAY" />
      <GridRow month="JUN" />
      <GridRow month="JUL" />
      <GridRow month="AUG" />
      <GridRow month="SEP" />
      <GridRow month="OCT" />
      <GridRow month="NOV" />
      <GridRow month="DEC" />
    </Box>
  );
};

export default AppointmentGrid;
