import { Box, Card, Checkbox, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
interface ViewCardProps {
  count: number;
  title: string;
  hasFilter?: boolean;
  dataSource?: any;
  isLoading?: boolean;
}

// const demoData = {
//   totalOugoing: 13,
//   totalApprovedReferrals: 20,
//   totalRejectedReferrals: 60,
//   totalRejectionByReason: 70
// }

const RadiologyCard: React.FC<ViewCardProps> = ({
  title,
  count,
  hasFilter = false,
  dataSource,
  isLoading,
}) => {

  const [totalIncomingReferral, setTotalIncomingReferral] = useState(true);
  const [totalOutgoingReferral, setTotalOutgoingReferral] = useState(false);
  const [revenueFromReferrals, setRevenueFromReferrals] = useState(false);
  const [countValue, setcountValue] = useState(count);
  const [arr, setArr] = useState(0);

  const renderDataSource = () => {
    if (totalIncomingReferral) {
      setcountValue(dataSource.totalIncomingReferral);
      return;
    } else if (totalOutgoingReferral) {
      setcountValue(dataSource.totalOutgoingReferral);
      return;
    } else if (revenueFromReferrals) {
      setcountValue(dataSource.totalRejectedClaims);
      setTotalIncomingReferral(true);
      return;
    }
  };

  useEffect(() => {
    renderDataSource();
  }, [arr, count]);

  const RenderFilterGroup = () => {
    const handleChangeTotalIncomingReferral = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;
      setTotalIncomingReferral(value);
      setTotalOutgoingReferral(false);
      setRevenueFromReferrals(false);
      setArr((prevState) => prevState + 1);
    };

    const handleChangeTotalOutgoingReferral = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;
      setTotalIncomingReferral(false);
      setTotalOutgoingReferral(value);
      setRevenueFromReferrals(false);
      setArr((prevState) => prevState + 1);
    };

    const handleChangeRevenueFromReferrals = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;
      setTotalIncomingReferral(false);
      setTotalOutgoingReferral(false);
      setRevenueFromReferrals(value);
      setArr((prevState) => prevState + 1);
    };   

    return (
      <>
        <Stack direction="column">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              m: 0,
              p: 0,
            }}
          >
            <label>{"Total Incoming Referral"}</label>
            <Checkbox
              sx={{ m: 0, p: 0, ml: 2 }}
              size="small"
              checked={totalIncomingReferral}
              onChange={handleChangeTotalIncomingReferral}
              name="totalIncomingReferral"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              m: 0,
              p: 0,
            }}
          >
            <label>{"Total Outgoing Referral"}</label>
            <Checkbox
              sx={{ m: 0, p: 0, ml: 2 }}
              size="small"
              checked={totalOutgoingReferral}
              onChange={handleChangeTotalOutgoingReferral}
              name="totalOutgoingReferral"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              m: 0,
              p: 0,
            }}
          >
            <label>{"Revenue From Referrals"}</label>
            <Checkbox
              sx={{ m: 0, p: 0, ml: 2 }}
              size="small"
              checked={revenueFromReferrals}
              onChange={handleChangeRevenueFromReferrals}
              name="revenueFromReferrals"
            />
          </Box>       
        </Stack>
      </>
    );
  };

  const isFilterObject = () => {
    return { padding: 1.5, width: "75%" };
  };

  if (isLoading === true && isNaN(countValue)) {
    setTimeout(() => {
      setArr((prevState) => prevState + 1);
    }, 3000);

    return (
      <Card
        sx={{
          p: isFilterObject().padding,
          background: "#f9f9f9",
          boxShadow: "0",
          borderRadius: 4,
          width: { xs: "100%" },
          textAlign: "center",
          mr: 1,
          mb: { xs: 1 },
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: isFilterObject().width }}>
          <Typography
            variant="h1"
            sx={{ fontWeight: "bold", fontSize: "15px" }}
          >
            <p>Loading . . .</p>
          </Typography>
        </Box>
      </Card>
    );
  } else
    return (
      <Card
        sx={{
          p: isFilterObject().padding,
          background: "#f9f9f9",
          boxShadow: "0",
          borderRadius: 4,
          width: { xs: "100%" },
          textAlign: "center",
          mr: 1,
          mb: { xs: 1 },
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: isFilterObject().width }}>
          <Typography
            variant="h1"
            sx={{ fontWeight: "bold", fontSize: "15px" }}
          >
            {countValue}
          </Typography>
          <Typography>{title}</Typography>
        </Box>
        <RenderFilterGroup />
      </Card>
    );
};

export default RadiologyCard;
