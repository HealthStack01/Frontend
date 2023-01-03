import {Typography} from "@mui/material";
import {Box} from "@mui/system";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import ExpandableSearchInput from "../../../../components/inputs/Search/ExpandableSearch";
import {useState} from "react";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import FilterMenu from "../../../../components/utilities/FilterMenu";
import CustomTable from "../../../../components/customtable";
import OpenDealsList from "./OpenDealsList";
import ClosedDealsList from "./ClosedDealsList";
import PendingDealsList from "./PendingDealsList";

const DealsList = ({setDealDetail}) => {
  const [dealType, setDealType] = useState("open");
  return (
    <Box>
      {dealType === "open" && (
        <OpenDealsList
          showClosedDeals={() => setDealType("closed")}
          showPendingDeals={() => setDealType("pending")}
          setDealDetail={setDealDetail}
        />
      )}

      {dealType === "closed" && (
        <ClosedDealsList
          showOpenDeals={() => setDealType("open")}
          showPendingDeals={() => setDealType("pending")}
          setDealDetail={setDealDetail}
        />
      )}

      {dealType === "pending" && (
        <PendingDealsList
          showOpenDeals={() => setDealType("open")}
          showClosedDeals={() => setDealType("closed")}
          setDealDetail={setDealDetail}
        />
      )}
    </Box>
  );
};

export default DealsList;
