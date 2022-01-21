import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import React from 'react';

interface RadioProps {
  title?: string;
  options: { value: string; label: string; disabled?: boolean }[];
}

const RadioButton: React.FC<RadioProps> = ({ title, options, ...props }) => (
  <FormControl component="fieldset" sx={{ width: '100%', mt: 1, mb: 1 }}>
    <FormLabel component="legend">{title}</FormLabel>
    <RadioGroup
      row
      aria-label="gender"
      name="row-radio-buttons-group"
      {...props}
    >
      {options.map((option) => (
        <FormControlLabel
          value={option.value}
          control={<Radio />}
          label={option.label}
          disabled={option.disabled}
        />
      ))}
    </RadioGroup>
  </FormControl>
);

export default RadioButton;
