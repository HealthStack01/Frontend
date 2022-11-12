import React from "react";
import TextField from "@mui/material/TextField";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

interface componentProps {
  format?: string;
  label?: string;
  register?: any;
}

const MuiCustomDatePicker = ({
  label,
  format = "MM/DD/YYYY",
  register,
}: componentProps) => {
  const [value, setValue] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        inputFormat={format}
        {...register}
        renderInput={params => (
          <TextField
            size="small"
            {...params}
            sx={{marginTop: "0.75rem", width: "100%"}}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default MuiCustomDatePicker;
