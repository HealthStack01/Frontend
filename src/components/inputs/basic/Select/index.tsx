import {FormHelperText} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, {SelectHTMLAttributes, useEffect, useState} from "react";
import {Controller} from "react-hook-form";
import AcUnitIcon from "@mui/icons-material/AcUnit";

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

const CustomSelect: React.FC<SelectProps> = ({
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

  if (control)
    return (
      <FormControl
        size="small"
        sx={{
          width: "100%",
        }}
      >
        <InputLabel
          shrink
          className="form__label"
          htmlFor={name}
          sx={{
            "&.MuiInputLabel-root": {
              color: "black",
            },

            "&.Mui-focused": {
              color: "#007aff",
            },
          }}
        >
          {label}
          {important && (
            <AcUnitIcon sx={{color: "red", width: "16px", height: "16px"}} />
          )}
        </InputLabel>

        <Controller
          name={name}
          control={control}
          rules={{required: required}}
          render={({
            field: {onChange, value},
            fieldState: {isTouched, isDirty, error},
          }) => (
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={
                <>
                  {label}{" "}
                  {important && (
                    <AcUnitIcon
                      sx={{color: "red", width: "14px", height: "14px"}}
                    />
                  )}
                </>
              }
              disabled={disabled || readonly}
              notched
              value={value}
              onChange={onChange}
              error={error ? true : false}
              sx={{
                background: "white",
                height: "2.2rem",
                color: "#000000",
                fontSize: "0.93rem",

                "& 	.MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "black",
                },
              }}
            >
              {/* <MenuItem value="0" sx={{ width: '100%' }}>
                Select...
              </MenuItem> */}
              {options.map((option, index) => (
                <MenuItem
                  value={option.value || option.name || option}
                  key={index}
                  sx={{width: "100%"}}
                >
                  {option.label || option.name || option}
                </MenuItem>
              ))}
            </Select>
          )}
          defaultValue="" // make sure to set up defaultValue
        />

        {errorText && <FormHelperText error>{errorText}</FormHelperText>}
      </FormControl>
    );
  return (
    <FormControl
      size="small"
      sx={{
        width: "100%",
      }}
    >
      <InputLabel
        shrink
        sx={{
          "&.MuiInputLabel-root": {
            color: "black",
          },

          "&.Mui-focused": {
            color: "#007aff",
          },
        }}
      >
        {label}
        {important && (
          <AcUnitIcon sx={{color: "red", width: "16px", height: "16px"}} />
        )}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        disabled={disabled || readonly}
        label={label}
        name={name}
        notched
        defaultValue={defaultValue || "Cash"}
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
        {...register}
        value={defaultValue}
      >
        {/* <MenuItem value="" sx={{width: "100%"}}>
          Select...
        </MenuItem> */}
        {options.map((option, index) => (
          <MenuItem
            value={option.value || option.name || option}
            key={index}
            sx={{width: "100%"}}
          >
            {option.label || option.name || option}
          </MenuItem>
        ))}
      </Select>
      {errorText && <FormHelperText error>{errorText}</FormHelperText>}
    </FormControl>
  );
};

export default CustomSelect;