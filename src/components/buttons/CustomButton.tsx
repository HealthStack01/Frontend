import React from "react";
import {Button} from "@mui/material";
import {SvgIconProps} from "@material-ui/core/SvgIcon";

interface componentProps {
  text: string;
  onClick: () => void;
  variant?: "contained" | "text" | "outlined";
  size?: "small" | "medium" | "large";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  bgColor?: string;
  customStyles?: React.CSSProperties;
  MuiIcon?: React.ReactElement<SvgIconProps>;
  iconPosition?: string;
}

const GlobalCustomButton = ({
  text,
  onClick,
  variant,
  size,
  color,
  customStyles,
  MuiIcon,
  iconPosition,
}: componentProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      color={color}
      onClick={onClick}
      sx={{
        textTransform: "capitalize",
        ...customStyles,
      }}
    >
      {MuiIcon && iconPosition === "start" && MuiIcon}
      {text}
      {MuiIcon && iconPosition === "end" && MuiIcon}
    </Button>
  );
};

GlobalCustomButton.defaultProps = {
  variant: "contained",
  size: "small",
  color: "primary",
  iconPosition: "start",
};

export default GlobalCustomButton;
