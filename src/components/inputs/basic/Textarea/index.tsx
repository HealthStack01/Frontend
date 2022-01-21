import React, { TextareaHTMLAttributes } from 'react';

import { TextareaField } from './styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, ...props }) => (
  <div>
    <label>{label}</label>
    <TextareaField {...props} />
  </div>
);

export default Textarea;
