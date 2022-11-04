<<<<<<< HEAD
import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { SelectHTMLAttributes, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
=======
import {FormHelperText} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, {SelectHTMLAttributes, useEffect, useState} from "react";
import {toast} from "react-toastify";
>>>>>>> bb584317912526417cb57109d86115d0005b15d4

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: any;
  name?: string;
  errorText?: string;
  onChange?: (_: any) => void;
  defaultValue?: string;
  readonly?: boolean;
  register?: any;
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
}) => {
<<<<<<< HEAD
  return (
    <FormControl disabled={readonly} style={{ width: '100%' }}>
=======
  console.log(options);

  return (
    <FormControl disabled={readonly} style={{width: "100%"}}>
>>>>>>> bb584317912526417cb57109d86115d0005b15d4
      <InputLabel id="demo-simple-select-autowidth-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        label={label}
        name={name}
        //defaultValue={defaultValue || "Cash"}
        onChange={onChange}
        sx={{background: "white", height: "48px"}}
        {...register}
        value={defaultValue}
      >
<<<<<<< HEAD
        <MenuItem value="" sx={{ width: '100%' }}>
=======
        <MenuItem value="" sx={{width: "100%"}}>
>>>>>>> bb584317912526417cb57109d86115d0005b15d4
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

export default CustomSelect;
