import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import React from 'react';

interface RadioProps {
  name: string;
  title?: string;
  options: { value: string; label: string; disabled?: boolean }[] | string[];
  onChange?: (e: any) => void;
  defaultValue?: string;
  disabled?: boolean;
}

const RadioButton: React.FC<RadioProps> = ({
  name,
  title,
  disabled,
  options,
  onChange,
  defaultValue = '',
}) => (
  <FormControl
    disabled={disabled}
    component="fieldset"
    sx={{ width: '100%', mt: 1, mb: 1 }}
  >
    <FormLabel component="legend">{title}</FormLabel>
    <RadioGroup row aria-label={name} name={name} onChange={onChange}>
      {options.map((option, i) => (
        <FormControlLabel
          key={i}
          value={option.value || option || ''}
          control={<Radio />}
          label={option.label || option || ''}
          disabled={option.disabled}
          defaultValue={defaultValue}
          // checked={defaultValue === (option.value || option || '')}
        />
      ))}
    </RadioGroup>
  </FormControl>
);

export default RadioButton;
