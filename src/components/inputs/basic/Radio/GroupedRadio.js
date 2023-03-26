import React from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Radio,
  Typography,
} from "@mui/material";
import {useWatch, useController} from "react-hook-form";
//import {FormLabel} from "../";

const GroupedRadio = ({
  control,
  label,
  name,
  options,
  row,
  disabled,
  required = false,
}) => {
  const {
    field: {ref, value, onChange, ...inputProps},
    formState: {errors},
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  const handleChange = value => {
    onChange(value);
  };

  return (
    <div>
      <FormControl>
        <FormLabel
          sx={{color: "#000000", fontSize: "0.8rem"}}
          component="legend"
          //required={required}
        >
          {label}
        </FormLabel>
        <FormGroup row={true}>
          {options.map(option => (
            <FormControlLabel
              // sx={{transform: "scale(0.8)", marginLeft: "-1.2rem"}}
              control={
                <Radio
                  {...inputProps}
                  onChange={() => handleChange(option)}
                  sx={{margin: 0}}
                  size="small"
                  disabled={disabled}
                  checked={value === option}
                  inputRef={ref}
                />
              }
              label={
                <Typography sx={{fontSize: "0.75rem", marginLeft: "-5px"}}>
                  {option}
                </Typography>
              }
              key={option}
            />
          ))}
        </FormGroup>
      </FormControl>
      <FormHelperText error variant="outlined">
        {errors?.[name]?.message || " "}
      </FormHelperText>
    </div>
  );
};

export default GroupedRadio;
