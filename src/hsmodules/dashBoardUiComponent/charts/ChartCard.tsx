import { Box } from "@mui/system";
import React from "react";
interface ChartCardProps {
  children: React.ReactNode;
  title?: string;
  subheader?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  children,
  title,
  subheader,
  ...other
}) => {
  return (
    <Box
      {...other}
      sx={{
        boxShadow: "4px 4px 20px rgba(255,255,255,0.08)",
        // backgroundColor: '#fdfdfd',
        backgroundColor: "#fdfdfd",
        width: "100%",
        borderRadius: 2,
        mb: 2,
        p: 0,
      }}
    >
      <Box sx={{ width: "100%", mt: 2, p: 0, background: "#f9f9f9" }}>
        {children}
      </Box>
    </Box>
  );
};

export default ChartCard;
