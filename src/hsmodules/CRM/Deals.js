import {Box} from "@mui/material";
import {useState} from "react";
import ClosedDealDetails from "./components/deals/ClosedDealDetail";
import DealsList from "./components/deals/DealsList";
import OpenDealDetail from "./components/deals/OpenDealDetail";
import LeadDetail from "./components/lead/LeadDetailView";

const Deals = () => {
  const [dealDetail, setDealDetail] = useState(null);

  const handleGoBack = () => [setDealDetail(null)];

  return (
    <Box>
      {dealDetail === null && <DealsList setDealDetail={setDealDetail} />}

      {dealDetail !== null && dealDetail === "detail" && (
        <LeadDetail handleGoBack={handleGoBack} />
      )}

      {/* {dealDetail !== null && dealDetail === "open-detail" && (
        <LeadDetail handleGoBack={handleGoBack} />
      )} */}
    </Box>
  );
};

export default Deals;
