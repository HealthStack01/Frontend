import React, { InputHTMLAttributes } from 'react';

interface EmailProps extends InputHTMLAttributes<HTMLInputElement> {}

const Email: React.FC<EmailProps> = ({ ...props }) => {
  return <div>{/* <Input {...props} type='email' /> */}</div>;
};

export default Email;
