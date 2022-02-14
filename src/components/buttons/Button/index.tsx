import React from 'react';

import { ButtonProps } from './base';
import { CustomButton } from './base/styles';

const Button: React.FC<ButtonProps> = ({ ...props }) => <CustomButton {...props} />;

export default Button;
