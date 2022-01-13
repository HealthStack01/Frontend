import React, { InputHTMLAttributes } from 'react';
import Input from '../basic/Input';

interface EmailProps extends InputHTMLAttributes<HTMLInputElement> {}

const Email: React.FC<EmailProps> = ({ ...props }) => {
  return <div>{/* <Input {...props} type='email' /> */}</div>;
};

export default Email;
