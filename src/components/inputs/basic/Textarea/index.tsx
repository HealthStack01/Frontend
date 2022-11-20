import React, { TextareaHTMLAttributes, useRef } from 'react';

import { TextareaField } from './styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  errorText?: string;
  register?: any;
  placeholder?: string;
  sx?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  placeholder,
  register,
  sx,
  ...props
}) => (
  <div>
    <label>{label}</label>
    <TextareaField
      ref={useRef()}
      placeholder={placeholder}
      style={sx}
      {...props}
      {...register}
    />
  </div>
);

export default Textarea;
