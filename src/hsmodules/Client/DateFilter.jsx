import * as React from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import {MobileDatePicker} from "@mui/x-date-pickers/MobileDatePicker";
import {Box} from "@mui/material";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

export default function ClientListDateFilter({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  filterByDate,
}) {
  const [value, setValue] = React.useState(dayjs(""));

  const handleChange = newValue => {
    setValue(newValue);
  };

  const handleChangeStartDate = value => {
    setStartDate(value);
  };

  const handleChangeEndDate = value => {
    setEndDate(value);
  };

  function compareDates() {
    //console.log(startDate, endDate);

    console.log(
      dayjs("2010-10-20").isBetween(startDate, dayjs(endDate), "day")
    );
  }

  return (
    <Box
      sx={{
        width: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      gap={1.5}
    >
      <Box
        sx={{
          width: "500px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Start Date"
              inputFormat="MM/DD/YYYY"
              value={startDate}
              onChange={data => handleChangeStartDate(data.$d)}
              renderInput={params => (
                <TextField {...params} error={false} size="small" />
              )}
            />
          </LocalizationProvider>
        </Box>

        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="End Date"
              inputFormat="MM/DD/YYYY"
              value={endDate}
              onChange={data => handleChangeEndDate(data.$d)}
              renderInput={params => (
                <TextField {...params} error={false} size="small" />
              )}
              maxDate={dayjs()}
              minDate={startDate}
            />
          </LocalizationProvider>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <GlobalCustomButton onClick={filterByDate} color="secondary">
          <FilterAltIcon fontSize="small" sx={{marginRight: "5px"}} />
          Filter List
        </GlobalCustomButton>
      </Box>
    </Box>
  );
}
