import React, { TextareaHTMLAttributes, useRef } from 'react';
import { Controller } from 'react-hook-form';

import { TextareaField } from './styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  errorText?: string;
  register?: any;
  placeholder?: string;
  sx?: string;
  control?: any;
  handleOnBlur?: any;
  onFocus?: any;
  required?: boolean;
  name?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  placeholder,
  register,
  sx,
  control,
  handleOnBlur,
  onFocus,
  required = false,
  name,
  ...props
}) => {
  if (control)
    return (
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState,
        }) => (
          <div>
            <label>{label}</label>
            <TextareaField
              ref={ref}
              placeholder={placeholder}
              style={sx}
              name={name}
              value={value}
              onChange={onChange}
              onBlur={handleOnBlur}
              onFocus={onFocus}
            />
          </div>
        )}
      />
    );
  return (
    <div>
      <label>{label}</label>
      <TextareaField
        ref={ref}
        placeholder={placeholder}
        style={sx}
        onBlur={handleOnBlur}
        onFocus={onFocus}
        {...props}
        {...register}
      />
    </div>
  );
};

export default Textarea;
