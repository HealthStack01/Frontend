import React from "react";
import TextField from "@mui/material/TextField";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {Controller} from "react-hook-form";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";

interface componentProps {
  format?: string;
  label?: string;
  //register?: any;
  defaultValue?: any;
  name: string;
  control: any;
  disabled?: boolean;
  handleChange?: any;
}

const MuiCustomDatePicker = ({
  label,
  format = "dd-MM-yyyy",
  //register,
  defaultValue = "",
  name,
  control,
  disabled = false,
  handleChange,
}: componentProps) => {
  const [value, setValue] = React.useState(null);

  if (!control)
    return (
      <DesktopDatePicker
        label="Date desktop"
        inputFormat={format}
        value={value}
        onChange={handleChange}
        renderInput={params => (
          <TextField
            size="small"
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
          />
        )}
      />
    );
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({
        field: {onChange, onBlur, value, name, ref},
        fieldState: {isTouched, isDirty, error},
        formState,
      }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={label}
            value={value}
            inputFormat={format}
            onChange={data => onChange(data.$d)}
            inputRef={ref}
            disabled={disabled}
            renderInput={params => (
              <TextField
                name={name}
                onBlur={onBlur}
                size="small"
                {...params}
                error={error ? true : false}
                helperText={error ? error.message : null}
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
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default MuiCustomDatePicker;
