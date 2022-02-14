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
  errorText,
  type = 'text',
  name,
  onChange,
  onKeyDown,
  value,
  placeholder,
}) => (
  <FormControl sx={{ width: '100%', mt: 0.75, mb: 0.75 }}>
    <TextField
      error={!!errorText}
      helperText={errorText}
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
