import {FormHelperText} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, {SelectHTMLAttributes, useEffect, useState} from "react";
import {Controller} from "react-hook-form";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import {toast} from "react-toastify";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: any;
  name?: string;
  errorText?: string;
  onChange?: (_: any) => void;
  defaultValue?: string;
  readonly?: boolean;
  register?: any;
  disabled?: boolean;
  control?: any;
  required?: boolean;
  important?: boolean;
}

const DefaultCustomSelect: React.FC<SelectProps> = ({
  label,
  options,
  name,
  defaultValue,
  onChange,
  errorText,
  readonly,
  register,
  disabled = false,
  control,
  required = false,
  important,
}) => {
  //.log(options);

  return (
    <FormControl
      size="small"
      sx={{
        width: "100%",
      }}
    >
      <InputLabel
        //shrink
        sx={{
          "&.MuiInputLabel-root": {
            color: "black",
            fontSize: "0.95rem",
          },

          "&.Mui-focused": {
            color: "#007aff",
          },
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        disabled={disabled || readonly}
        label={label}
        name={name}
        //notched

        onChange={onChange}
        sx={{
          background: "white",
          height: "2.2rem",
          color: "#000000",
          fontSize: "0.93rem",

          "& 	.MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "black",
          },
        }}
        defaultValue={defaultValue || ""}
      >
        <MenuItem value="" sx={{width: "100%"}}>
          <em>None</em>
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem
            value={option.value ? option.value : option}
            key={index}
            sx={{width: "100%"}}
          >
            {option.label ? option.label : option}
          </MenuItem>
        ))}
      </Select>
      {errorText && <FormHelperText error>{errorText}</FormHelperText>}
    </FormControl>
  );
};

export default DefaultCustomSelect;
