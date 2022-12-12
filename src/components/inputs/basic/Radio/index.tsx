import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
<<<<<<< HEAD
} from '@mui/material';
import React from 'react';
=======
} from "@mui/material";
import React from "react";
>>>>>>> c24502e042ad8da4338ab0bdcf0522be789bd0f8

interface RadioProps {
  name: string;
  title?: string;
  options: {value: string; label: string; disabled?: boolean}[] | string[];
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
  defaultValue = "",
  register,
  checked,
  value,
}) => (
  <FormControl disabled={disabled} component="fieldset" sx={{ width: '100%' }}>
    <FormLabel
      sx={{ color: '#000000', fontSize: '0.85rem', margin: 0, padding: 0 }}
      component="legend"
    >
      {title}
    </FormLabel>
    <RadioGroup
      row
      aria-label={name}
      name={name}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
    >
      {options.map((option, i) => (
        <FormControlLabel
          key={i}
          value={option.value || option || ''}
          control={<Radio {...register} sx={{ margin: 0 }} size="small" />}
          label={
            <Typography sx={{ fontSize: '0.8rem', marginLeft: '-5px' }}>
              {option.label || option || ''}
            </Typography>
          }
          disabled={option.disabled}
          defaultValue={defaultValue}
<<<<<<< HEAD
          sx={{ transform: 'scale(0.8)', marginLeft: '-1.2rem' }}
=======
          //sx={{transform: "scale(0.8)"}}
>>>>>>> c24502e042ad8da4338ab0bdcf0522be789bd0f8
          // checked={defaultValue === (option.value || option || '')}
        />
      ))}
    </RadioGroup>
  </FormControl>
);

export default RadioButton;
