import { FormControl, TextField } from '@mui/material';
import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  inputId?: string;
  errors?: boolean;
  errorText?: string;
  onChange?: (_: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (_: React.KeyboardEvent<HTMLDivElement>) => void;
  helperText?: string;
  name?: string;
  type?: string;
  value?: any;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  errors,
  type = 'text',
  name,
  onChange,
  onKeyDown,
  helperText,
  value,
  placeholder,
}) => (
  <FormControl sx={{ width: '100%', mt: 1, mb: 1 }}>
    <TextField
      error={errors}
      helperText={helperText}
      id="component-simple"
      onChange={onChange}
      type={type}
      label={label}
      name={name}
      value={value}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
    />
  </FormControl>
);

export default Input;
