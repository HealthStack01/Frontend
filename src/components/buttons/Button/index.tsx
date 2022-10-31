import React from 'react';

import { ButtonProps } from './base';
import { CustomButton } from './base/styles';

const Button: React.FC<ButtonProps> = ({ loading, children, ...props }) => (
  <CustomButton loading={loading} {...props}>
    {children}
  </CustomButton>
);

export default Button;
