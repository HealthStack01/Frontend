import {TextField, IconButton} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";

const MuiClearDatePicker = ({
  value,
  setValue,
  format = "dd-MM-yyyy",
  label = "Filter Date",
}) => {
  const handleOnClear = () => {
    setValue(null);
  };

  const handleOnChane = newValue => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        inputFormat={format}
        value={value}
        onChange={data => handleOnChane(data)}
        renderInput={params => (
          <div style={{position: "relative", display: "inline-block"}}>
            <TextField
              {...params}
              sx={{
                width: "100%",
                fontSize: "0.8rem",
                //height: "2rem",
                "& .MuiInputBase-input": {
                  WebkitTextFillColor: "black",
                  fontSize: "0.8rem",
                  height: "2.2rem",
                  padding: "0 10px",
                },

                "& 	.MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "black",
                  color: "black",
                },

                "& .MuiFormLabel-root": {
                  color: "black",
                },

                "& .MuiFormLabel-root.Mui-disabled": {
                  color: "black",
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {value !== null && (
              <IconButton
                size="small"
                style={{
                  position: "absolute",
                  top: ".21rem",
                  margin: "auto",
                  right: "2rem",
                }}
                onClick={() => handleOnClear()}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
          </div>
        )}
      />
    </LocalizationProvider>
  );
};

export default MuiClearDatePicker;
