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

const ManagedCareDashboardCardTwo: React.FC<ViewCardProps> = ({
  title,
  count,
  hasFilter = false,
  dataSource,
  isLoading,
}) => {

  const [unpaidClaims, setUnpaidClaims] = useState(true);
  const [processedClaims, setProcessedClaims] = useState(false);
  const [pendingClaims, setPendingClaims] = useState(false);
  const [claimsApproved, setClaimsApproved] = useState(false);
  const [rejectedClaims, setRejectedClaims] = useState(false);
  const [countValue, setcountValue] = useState(count);
  const [arr, setArr] = useState(0);

  const renderDataSource = () => {
    if (unpaidClaims) {
      setcountValue(dataSource.totalUnpaidClaims);
      return;
    } else if (processedClaims) {
      setcountValue(dataSource.totalProcessedClaims);
      return;
    } else if (pendingClaims) {
      setcountValue(dataSource.totalPendingClaims);
      return;
    } else if (claimsApproved) {
      setcountValue(dataSource.totalClaimsApproved);
      return;
    } else if (rejectedClaims) {
      setcountValue(dataSource.totalRejectedClaims);
      setUnpaidClaims(true);
      return;
    }
  };

  useEffect(() => {
    renderDataSource();
  }, [arr, count]);

  const RenderFilterGroup = () => {
    const handleChangeUnpaidClaims = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;
      setUnpaidClaims(value);
      setProcessedClaims(false);
      setPendingClaims(false);
      setClaimsApproved(false);
      setRejectedClaims(false);
      setArr((prevState) => prevState + 1);
    };

    const handleChangeProcessedClaims = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;
      setUnpaidClaims(false);
      setProcessedClaims(value);
      setPendingClaims(false);
      setClaimsApproved(false);
      setRejectedClaims(false);
      setArr((prevState) => prevState + 1);
    };

    const handleChangePendingClaims = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;
      setUnpaidClaims(false);
      setProcessedClaims(false);
      setPendingClaims(value);
      setClaimsApproved(false);
      setRejectedClaims(false);
      setArr((prevState) => prevState + 1);
    };

    const handleChangeClaimsApproved = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;
      setUnpaidClaims(false);
      setProcessedClaims(false);
      setPendingClaims(false);
      setClaimsApproved(value);
      setRejectedClaims(false);
      setArr((prevState) => prevState + 1);
    };
    const handleChangeRejectedClaims = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;
      setUnpaidClaims(false);
      setProcessedClaims(false);
      setPendingClaims(false);
      setClaimsApproved(false);
      setRejectedClaims(value);
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
            <label>{"Unpaid Claims"}</label>
            <Checkbox
              sx={{ m: 0, p: 0, ml: 2 }}
              size="small"
              checked={unpaidClaims}
              onChange={handleChangeUnpaidClaims}
              name="unpaidClaims"
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
            <label>{"Processed Claims"}</label>
            <Checkbox
              sx={{ m: 0, p: 0, ml: 2 }}
              size="small"
              checked={processedClaims}
              onChange={handleChangeProcessedClaims}
              name="processedClaims"
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
            <label>{"Pending Claims"}</label>
            <Checkbox
              sx={{ m: 0, p: 0, ml: 2 }}
              size="small"
              checked={pendingClaims}
              onChange={handleChangePendingClaims}
              name="pendingClaims"
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
            <label>{"Claims Approved"}</label>
            <Checkbox
              sx={{ m: 0, p: 0, ml: 2 }}
              size="small"
              checked={claimsApproved}
              onChange={handleChangeClaimsApproved}
              name="claimsApproved"
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
            <label>{"Rejected Claims"}</label>
            <Checkbox
              sx={{ m: 0, p: 0, ml: 2 }}
              size="small"
              checked={rejectedClaims}
              onChange={handleChangeRejectedClaims}
              name="rejectedClaims"
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

export default ManagedCareDashboardCardTwo;
