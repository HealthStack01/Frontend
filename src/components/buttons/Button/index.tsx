import React from 'react';

import { ButtonProps } from './base';
import { CustomButton } from './base/styles';

const Button: React.FC<ButtonProps> = ({
  loading,
  disabled,
  children,
  ...props
}) => (
  <CustomButton loading={loading} disabled={disabled} {...props}>
    {children}
  </CustomButton>
);

export default Button;
