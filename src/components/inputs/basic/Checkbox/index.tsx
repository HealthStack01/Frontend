import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React from 'react';

interface CheckboxProps {
  label: string;
  name?: string;
  errorText?: string;
  disabled?: boolean;
  onChange?: (_: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxInput: React.FC<CheckboxProps> = ({ label, name, onChange, disabled, errorText }) => (
  <FormGroup>
    <FormControlLabel control={<Checkbox name={name} onChange={onChange} disabled={disabled} />} label={label} />
    <label>{errorText}</label>
  </FormGroup>
);

export default CheckboxInput;
