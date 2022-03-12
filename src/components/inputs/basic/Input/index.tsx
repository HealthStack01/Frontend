import { FormControl, TextField } from '@mui/material';
import React from 'react';

interface InputProps {
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
  size?: 'small' | 'medium';
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  errorText,
  type = 'text',
  name,
  onChange,
  onKeyDown,
  placeholder,
  size = 'medium',
  disabled = false,
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
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      size={size}
      disabled={disabled}
    />
  </FormControl>
);

export default Input;
