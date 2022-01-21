import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: any[];
  name?: string;
  onChange?: (_: any) => void;
}

const CustomSelect: React.FC<SelectProps> = ({
  label,
  options,
  name,
  value,
  onChange,
}) => (
  <div>
    <FormControl sx={{ width: '100%', mt: 1, mb: 1 }}>
      <InputLabel id="demo-simple-select-autowidth-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        autoWidth
        label={label}
        name={name}
        defaultValue={value}
        onChange={onChange}
      >
        <MenuItem value="" sx={{ width: '100%' }}>
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
    </FormControl>
  </div>
);

export default CustomSelect;
