import React from "react";
import { Button as CustomButton } from "./styles";
import { ButtonProps } from "./BaseButton";

const Button: React.FC<ButtonProps> = ({ children, sx, ...props }) => {
  return (
    <CustomButton {...props} sx={sx}>
      {children}
    </CustomButton>
  );
};

export default Button;
