import { Box, Card, Checkbox, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
interface ViewCardProps {
  count: number;
  title: string;
  hasFilter?: boolean;
  dataSource?: any;
  isLoading?: boolean;
}

const ViewCardWithFilter: React.FC<ViewCardProps> = ({
  title,
  count,
  hasFilter = false,
  dataSource,
  isLoading,
}) => {
  const [daily, setDaily] = useState(true);
  const [weekly, setWeekly] = useState(false);
  const [monthly, setMonthly] = useState(false);
  const [quarterly, setQuarterly] = useState(false);
  const [annually, setAnnually] = useState(false);
  const [countValue, setcountValue] = useState(count);
  const [arr, setArr] = useState(0);

  const renderDataSource = () => {
    if (daily) {
      setcountValue(dataSource.totalInPresentDay);
      return;
    } else if (weekly) {
      setcountValue(dataSource.totalInPresentWeek);
      return;
    } else if (monthly) {
      setcountValue(dataSource.totalInPresentMonth);
      return;
    } else if (quarterly) {
      setcountValue(dataSource.totalInPresentQuarter);
      return;
    } else if (annually) {
      setcountValue(dataSource.totalInPresentYear);
      return;
    } else {
      setcountValue(dataSource.totalInPresentDay);
      setDaily(true);
      return;
    }
  };

  useEffect(() => {
    renderDataSource();
  }, [arr, count]);

  const RenderFilterGroup = () => {
    const handleChangeDaily = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;
      setDaily(value);
      setWeekly(false);
      setMonthly(false);
      setQuarterly(false);
      setAnnually(false);
      setArr((prevState) => prevState + 1);
    };

    const handleChangeWeekly = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;
      setDaily(false);
      setWeekly(value);
      setMonthly(false);
      setQuarterly(false);
      setAnnually(false);
      setArr((prevState) => prevState + 1);
    };

    const handleChangeMonthly = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;
      setDaily(false);
      setWeekly(false);
      setMonthly(value);
      setQuarterly(false);
      setAnnually(false);
      setArr((prevState) => prevState + 1);
    };

    const handleChangeQuarterly = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;
      setDaily(false);
      setWeekly(false);
      setMonthly(false);
      setQuarterly(value);
      setAnnually(false);
      setArr((prevState) => prevState + 1);
    };

    const handleChangeAnnually = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;
      setDaily(false);
      setWeekly(false);
      setMonthly(false);
      setQuarterly(false);
      setAnnually(value);
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
            <label style={{fontSize:15, fontWeight:"bold"}}>{"Today"}</label>
            <Checkbox
              sx={{ m: 0, p: 0, ml: 2 }}
              size="medium"
              checked={daily}
              onChange={handleChangeDaily}
              name="daily"
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
            <label style={{fontSize:15, fontWeight:"bold"}}>{"This Week"}</label>
            <Checkbox
              sx={{ m: 0, p: 0, ml: 2 }}
              size="medium"
              checked={weekly}
              onChange={handleChangeWeekly}
              name="weekly"
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
            <label style={{fontSize:15, fontWeight:"bold"}}>{"This Month"}</label>
            <Checkbox
              sx={{ m: 0, p: 0, ml: 2 }}
              size="medium"
              checked={monthly}
              onChange={handleChangeMonthly}
              name="monthly"
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
            <label style={{fontSize:15, fontWeight:"bold"}}>{"This Quarter"}</label>
            <Checkbox
              sx={{ m: 0, p: 0, ml: 2 }}
              size="medium"
              checked={quarterly}
              onChange={handleChangeQuarterly}
              name="quarterly"
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
            <label style={{fontSize:15, fontWeight:"bold"}}>{"This Year"}</label>
            <Checkbox
              sx={{ m: 0, p: 0, ml: 2 }}
              size="medium"
              checked={annually}
              onChange={handleChangeAnnually}
              name="annually"
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
        <Typography variant="h6" color="textSecondary" fontWeight="bold" gutterBottom>{title}</Typography>
          <Typography variant="h5" component="div" fontWeight="bold">
          {countValue}
          </Typography>
         
        </Box>
        <RenderFilterGroup />
      </Card>
    );
};

export default ViewCardWithFilter;
