import { Box, FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { SelectHTMLAttributes, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import client from '../../../../context/feathers';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: any;
  name?: string;
  errorText?: string;
  onChange?: (_: any) => void;
  defaultValue?: string;
}

const CustomSelect: React.FC<SelectProps> = ({ label, options, name, defaultValue, onChange, errorText }) => {
  const [optionsList, setOptionsList] = useState([]);

  useEffect(() => {
    if (options.length) {
      setOptionsList(options);
    } else {
      let Service = options.model && client.service((options as any).model);
      Service.find()
        .then((res) => {
          const list = res.data.map((obj) => ({ value: obj._id, label: obj.name }));
          setOptionsList(list);
        })
        .catch((error) => {
          toast(`error fetching list ${error}`);
        });
    }
  }, []);

  return (
    <Box sx={{ margin: '10px 0' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-autowidth-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          label={label}
          name={name}
          defaultValue={defaultValue}
          onChange={onChange}
          sx={{ background: 'white' }}
        >
          <MenuItem value="" sx={{ width: '100%' }}>
            <em>None</em>
          </MenuItem>
          {optionsList.map((option, index) => (
            <MenuItem value={option.value ? option.value : option} key={index} sx={{ width: '100%' }}>
              {option.label ? option.label : option}
            </MenuItem>
          ))}
        </Select>
        {errorText && <FormHelperText error>{errorText}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default CustomSelect;
