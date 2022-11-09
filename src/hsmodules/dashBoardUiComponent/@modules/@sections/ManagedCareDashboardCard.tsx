import { Box, Card, Checkbox, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
interface ViewCardProps {
  count: number;
  title: string;
  hasFilter?: boolean;
  dataSource?: any;
  isLoading?: boolean;
}

const demoData = {
  totalOugoing: 3,
  totalApprovedReferrals: 10,
  totalRejectedReferrals: 30,
  totalRejectionByReason: 50
}

const ManagedCareDashboardCard: React.FC<ViewCardProps> = ({
  title,
  count,
  hasFilter = false,
  dataSource,
  isLoading,
}) => {
  const [outgoing, setOutgoing] = useState(true);
  const [approvedReferrals, setApprovedReferrals] = useState(false);
  const [rejectedReferrals, setRejectedReferrals] = useState(false);
  const [rejectionByReason, setRejectionByReason] = useState(false);
  const [countValue, setcountValue] = useState(count);
  const [arr, setArr] = useState(0);

  const renderDataSource = () => {
    if (outgoing) {
      setcountValue(dataSource.totalOutgoing);
      return;
    } else if (approvedReferrals) {
      setcountValue(dataSource.totalApprovedReferrals);
      return;
    } else if (rejectedReferrals) {
      setcountValue(dataSource.totalRejectedReferrals);
      return;
    } else if (rejectionByReason) {
      setcountValue(dataSource.totalRejectionByReason);
      setOutgoing(true);
      return;
    }
  };

  useEffect(() => {
    renderDataSource();
  }, [arr, count]);

  const RenderFilterGroup = () => {
    const handleChangeOutgoing = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;
      setOutgoing(value);
      setApprovedReferrals(false);
      setRejectedReferrals(false);
      setRejectionByReason(false);
      setArr((prevState) => prevState + 1);
    };

    const handleChangeApprovedReferrals = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;
      setOutgoing(false);
      setApprovedReferrals(value);
      setRejectedReferrals(false);
      setRejectionByReason(false);
      setArr((prevState) => prevState + 1);
    };

    const handleChangeRejectedReferrals = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;
      setOutgoing(false);
      setApprovedReferrals(false);
      setRejectedReferrals(value);
      setRejectionByReason(false);
      setArr((prevState) => prevState + 1);
    };

    const handleChangeRejectedByReason = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;
      setOutgoing(false);
      setApprovedReferrals(false);
      setRejectedReferrals(false);
      setRejectionByReason(value);
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
            <label>{"Outgoing"}</label>
            <Checkbox
              sx={{ m: 0, p: 0, ml: 2 }}
              size="small"
              checked={outgoing}
              onChange={handleChangeOutgoing}
              name="outgoing"
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
            <label>{"Approved Referrals"}</label>
            <Checkbox
              sx={{ m: 0, p: 0, ml: 2 }}
              size="small"
              checked={approvedReferrals}
              onChange={handleChangeApprovedReferrals}
              name="approvedReferrals"
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
            <label>{"Rejected Referrals"}</label>
            <Checkbox
              sx={{ m: 0, p: 0, ml: 2 }}
              size="small"
              checked={rejectedReferrals}
              onChange={handleChangeRejectedReferrals}
              name="rejectedReferrals"
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
            <label>{"Rejected By Reason"}</label>
            <Checkbox
              sx={{ m: 0, p: 0, ml: 2 }}
              size="small"
              checked={rejectionByReason}
              onChange={handleChangeRejectedByReason}
              name="rejectedByReason"
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

export default ManagedCareDashboardCard;
