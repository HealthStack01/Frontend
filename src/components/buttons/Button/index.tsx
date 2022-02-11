import React from 'react';

import { ButtonProps } from './base';
import { CustomButton } from './base/styles';

const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <CustomButton {...props}>{children}</CustomButton>
);

export default Button;
