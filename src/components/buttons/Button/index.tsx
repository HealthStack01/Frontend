import React from "react";

import {ButtonProps} from "./base";
import {CustomButton} from "./base/styles";

<<<<<<< HEAD
const Button: React.FC<ButtonProps> = ({
  loading,
  disabled,
  children,
  ...props
}) => (
  <CustomButton loading={loading} disabled={disabled} {...props}>
=======
const Button: React.FC<ButtonProps> = ({loading, children, ...props}) => (
  <CustomButton loading={loading} {...props}>
>>>>>>> bb584317912526417cb57109d86115d0005b15d4
    {children}
  </CustomButton>
);

export default Button;
