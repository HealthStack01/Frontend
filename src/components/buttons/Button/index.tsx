import React from 'react';
import { ButtonProps } from './base';
import { CustomButton } from './base/styles';

const Button: React.FC<ButtonProps> = ({
  showicon = 'false',
  icon,
  ...props
}) => {
  return <CustomButton {...props}></CustomButton>;
};

export default Button;
