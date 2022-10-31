import { FormHelperText } from '@mui/material';
import React from 'react';

import { InputBox, InputField, InputLabel } from './styles';

interface InputProps {
  label?: string;
  inputId?: string;
  errors?: boolean;
  errorText?: string;
  onChange?: (_: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (_) => void;
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
  // size = 'medium',
  disabled = false,
}) => (
  <div>
    <InputBox>
      <InputField
        className="form__input"
        onChange={onChange}
        type={type}
        defaultValue={defaultValue}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        disabled={disabled}
      />
      <InputLabel className="form__label" htmlFor={name}>
        {label}
      </InputLabel>
    </InputBox>
    {errorText && <FormHelperText error>{errorText}</FormHelperText>}
  </div>
);

export default Input;
