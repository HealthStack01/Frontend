import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';

interface RadioProps {
  title?: string;
  options: { value: string; label: string; disabled?: boolean }[] | string[];
  onChange?: (e: any) => void;
}

const RadioButton: React.FC<RadioProps> = ({ title, options, onChange }) => (
  <FormControl component="fieldset" sx={{ width: '100%', mt: 1, mb: 1 }}>
    <FormLabel component="legend">{title}</FormLabel>
    <RadioGroup row aria-label="gender" name="row-radio-buttons-group" onChange={onChange}>
      {options.map((option, i) => (
        <FormControlLabel
          key={i}
          value={option.value || option || ''}
          control={<Radio />}
          label={option.label || option}
          disabled={option.disabled}
        />
      ))}
    </RadioGroup>
  </FormControl>
);

export default RadioButton;
