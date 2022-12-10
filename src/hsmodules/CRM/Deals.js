import {Box} from "@mui/material";
import {useState} from "react";
import ClosedDealDetails from "./components/deals/ClosedDealDetail";
import DealsList from "./components/deals/DealsList";
import OpenDealDetail from "./components/deals/OpenDealDetail";

const Deals = () => {
  const [dealDetail, setDealDetail] = useState(null);

  const handleGoBack = () => [setDealDetail(null)];

  return (
    <Box>
      {dealDetail === null && <DealsList setDealDetail={setDealDetail} />}

      {dealDetail !== null && dealDetail === "closed-detail" && (
        <ClosedDealDetails handleGoBack={handleGoBack} />
      )}

      {dealDetail !== null && dealDetail === "open-detail" && (
        <OpenDealDetail handleGoBack={handleGoBack} />
      )}
    </Box>
  );
};

export default Deals;
