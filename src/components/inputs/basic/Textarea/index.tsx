import React, { TextareaHTMLAttributes, useRef } from "react";

import { TextareaField } from "./styles";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  errorText?: string;
  register?: any;
  placeholder?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, placeholder, register, ...props }) => (
  <div>
    <label>{label}</label>
    <TextareaField ref={useRef()} placeholder={placeholder} {...props} {...register} />
  </div>
);

export default Textarea;
