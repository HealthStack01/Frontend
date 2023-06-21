import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {Controller, UseFormRegisterReturn} from "react-hook-form";
import {FormHelperText, Typography} from "@mui/material";

interface componentProps {
  options: {label: string; value: string}[];
  register: UseFormRegisterReturn;
  label?: string;
  error?: string;
  defaultValue?: string;
  value: string;
  disabled?: boolean;
}

const SimpleRadioInput = ({
  options,
  register,
  label,
  error,
  defaultValue,
  value,
  disabled,
}: componentProps) => {
  return (
    <FormControl error={error ? true : false} sx={{width: "100%"}}>
      {label && (
        <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>
      )}

      <RadioGroup
        defaultValue={defaultValue}
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        sx={{
          width: "100%",
          justifyContent: "space-between",
          border: "1px solid",
          borderColor: error ? "red" : " #0000003b",
          borderRadius: "3.5px",
        }}
      >
        {options.map(item => {
          return (
            <FormControlLabel
              disabled={disabled}
              key={item.value}
              defaultChecked={defaultValue === item.value}
              sx={{
                width: "50%",
                margin: 0,
                padding: "5px 0",
                color: "#2d2d2d",
                height: "2.05rem",
                backgroundColor:
                  value === item.value || item.value === defaultValue
                    ? "#b5e2fa"
                    : "none",
                "&.Mui-disabled": {
                  backgroundColor:
                    value === item.value || item.value === defaultValue
                      ? "#b5e2fa"
                      : "none",
                },
              }}
              value={item.value}
              control={<Radio {...register} size="small" disabled={disabled} />}
              label={
                <Typography sx={{fontSize: "0.75rem"}}>{item.label}</Typography>
              }
            />
          );
        })}
      </RadioGroup>

      <FormHelperText error variant="outlined">
        {error}
      </FormHelperText>
    </FormControl>
  );
};

export default SimpleRadioInput;
