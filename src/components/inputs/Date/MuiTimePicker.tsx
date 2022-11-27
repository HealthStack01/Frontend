import React from "react";
import TextField from "@mui/material/TextField";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import {Controller} from "react-hook-form";

interface componentProps {
  format?: string;
  label?: string;
  //register?: any;
  defaultValue?: any;
  name: string;
  control: any;
  disabled?: boolean;
}

const MuiCustomTimePicker = ({
  label,
  format = "DD-MM-YYYY",
  //register,
  defaultValue = "",
  name,
  control,
  disabled = false,
}: componentProps) => {
  const [value, setValue] = React.useState(null);

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
          <TimePicker
            label={label}
            value={value}
            //inputFormat={format}
            onChange={data => onChange(data.$d)}
            inputRef={ref}
            disabled={disabled}
            renderInput={params => (
              <TextField
                name={name}
                onBlur={onBlur}
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
                {...params}
                error={error ? true : false}
                sx={{
                  width: "100%",
                  fontSize: "0.8rem",
                  height: "40px",
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                    fontSize: "0.8rem",
                    height: "40px",
                    padding: "0 10px",
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default MuiCustomTimePicker;
