import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { SelectHTMLAttributes, useEffect, useState } from 'react';
import { toast } from 'react-toastify';


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


  return (
    <FormControl disabled={readonly} style={{ width: '100%' }}>
      <InputLabel id='demo-simple-select-autowidth-label'>{label}</InputLabel>
      <Select
        labelId='demo-simple-select-autowidth-label'
        id='demo-simple-select-autowidth'
        label={label}
        name={name}
        defaultValue={defaultValue || ''}
        onChange={onChange}
        sx={{ background: 'white' }}
        {...register}
      >
        <MenuItem value='' sx={{ width: '100%' }}>
          <em>None</em>
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem
            value={option.value ? option.value : option}
            key={index}
            sx={{ width: '100%' }}
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
