import React, { TextareaHTMLAttributes, useRef } from 'react';

import { TextareaField } from './styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  errorText?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, ...props }) => (
  <div>
    <label>{label}</label>
    <TextareaField ref={useRef()} {...props} />
  </div>
);

export default Textarea;
