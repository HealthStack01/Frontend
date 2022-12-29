import React from "react";
import TextField from "@mui/material/TextField";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {Controller} from "react-hook-form";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, {Dayjs} from "dayjs";
import {Typography} from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import {Box} from "@mui/system";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";

interface componentProps {
  format?: string;
  label?: string;
  //register?: any;
  defaultValue?: any;
  name: string;
  control: any;
  disabled?: boolean;
  handleChange?: any;
  value?: any;
  important?: boolean;
  required?: boolean;
}

const MuiDateTimePicker = ({
  label,
  //format = "DD/MM/YYYY HH:MM",
  //register,
  defaultValue = "",
  name,
  control,
  disabled = false,
  handleChange,
  value,
  important,
  required,
}: componentProps) => {
  //const [value, setValue] = React.useState(null);
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      rules={{required: required}}
      render={({
        field: {onChange, onBlur, value, name, ref},
        fieldState: {isTouched, isDirty, error},
        formState,
      }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label={
              <>
                {label}
                {important && (
                  <AcUnitIcon
                    sx={{
                      color: "red",
                      width: "15px",
                      height: "15px",
                      margin: "0px",
                      padding: "0",
                    }}
                  />
                )}
              </>
            }
            value={dayjs(value)}
            //inputFormat={format}
            onChange={data => onChange(data)}
            ref={ref}
            disabled={disabled}
            renderInput={params => (
              <TextField
                name={name}
                label={
                  <>
                    {label}
                    {important && (
                      <AcUnitIcon
                        sx={{
                          color: "red",
                          width: "15px",
                          height: "15px",
                          margin: "0px",
                          padding: "0",
                        }}
                      />
                    )}
                  </>
                }
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

export default MuiDateTimePicker;
