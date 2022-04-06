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
  defaultValue?: string;
  value?: any;
  placeholder?: string;
  size?: 'small' | 'medium';
  disabled?: boolean;
  inputRef?: any;
}

// Reset Input MUI

// https://stackoverflow.com/questions/57419955/how-to-set-or-clear-value-of-material-ui-input-in-reactjs

const Input: React.FC<InputProps> = ({
  label,
  errorText,
  type = 'text',
  name,
  defaultValue = '',
  onChange,
  onKeyDown,
  placeholder,
  size = 'medium',
  disabled = false,
  inputRef,
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
      defaultValue={defaultValue}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      size={size}
      disabled={disabled}
      sx={{ background: 'white' }}
      inputRef={inputRef}
    />
  </FormControl>
);

export default Input;
