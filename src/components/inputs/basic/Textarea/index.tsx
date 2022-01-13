import React, { TextareaHTMLAttributes } from 'react';
import { TextareaField } from './styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, ...props }) => {
  return (
    <div>
      <label>{label}</label>
      <TextareaField {...props}></TextareaField>
    </div>
  );
};

export default Textarea;
