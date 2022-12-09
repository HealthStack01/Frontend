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
  register?: any;
  checked?: any;
  value?: any;
}

const RadioButton: React.FC<RadioProps> = ({
  name,
  title,
  disabled,
  options,
  onChange,
  defaultValue = '',
  register,
  checked,
  value,
}) => (
  <FormControl
    disabled={disabled}
    component="fieldset"
    sx={{ width: '100%', mt: 1, mb: 1 }}
  >
    <FormLabel component="legend">{title}</FormLabel>
    <RadioGroup
      row
      aria-label={name}
      name={name}
      onChange={onChange}
      value={value}
    >
      {options.map((option, i) => (
        <FormControlLabel
          key={i}
          value={option.value || option || ''}
          control={<Radio {...register} />}
          label={option.label || option || ''}
          disabled={option.disabled}
          defaultValue={defaultValue}
          sx={{ transform: 'scale(0.8)', marginLeft: '-1.2rem' }}
          // checked={defaultValue === (option.value || option || '')}
        />
      ))}
    </RadioGroup>
  </FormControl>
);

export default RadioButton;
