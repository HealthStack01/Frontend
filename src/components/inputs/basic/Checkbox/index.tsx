import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React from 'react';

interface CheckboxProps {
  label: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxInput: React.FC<CheckboxProps> = ({ label, name, onChange }) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox name={name} onChange={onChange} />}
        label={label}
      />
    </FormGroup>
  );
};

export default CheckboxInput;
