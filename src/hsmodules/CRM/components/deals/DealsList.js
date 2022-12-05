import {Typography} from "@mui/material";
import {Box} from "@mui/system";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import ExpandableSearchInput from "../../../../components/inputs/Search/ExpandableSearch";
import {useState} from "react";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import FilterMenu from "../../../../components/utilities/FilterMenu";
import CustomTable from "../../../../components/customtable";

const DealsList = () => {
  return (
    <Box>
      <Box>
        <Box
          sx={{
            width: "300px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ExpandableSearchInput />
          <Typography>Open Deals</Typography>
        </Box>

        <GlobalCustomButton>Closed Deals</GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default DealsList;

export const OpenDeals = () => {
  return (
    <Box>
      <Box></Box>
    </Box>
  );
};

export const ClosedDeals = () => {
  return (
    <Box>
      <Box></Box>
    </Box>
  );
};
