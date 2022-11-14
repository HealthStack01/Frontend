import React, {TextareaHTMLAttributes, useRef} from "react";

import {TextareaField} from "./styles";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  errorText?: string;
  register?: any;
}

const Textarea: React.FC<TextareaProps> = ({label, register, ...props}) => (
  <div>
    <label>{label}</label>
    <TextareaField ref={useRef()} {...props} {...register} />
  </div>
);

export default Textarea;
