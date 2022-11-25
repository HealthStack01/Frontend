import React from "react";
import {Button} from "@mui/material";
import {SvgIconProps} from "@material-ui/core/SvgIcon";
import {SxProps, Theme} from "@mui/material";

import Spinner from "../spinner";

interface componentProps {
  text?: string;
  onClick?: () => void;
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
  sx?: any;
  style?: React.CSSProperties;
  MuiIcon?: React.ReactElement<SvgIconProps>;
  iconPosition?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  type?: string;
}

const GlobalCustomButton = ({
  text,
  onClick,
  variant,
  size,
  color,
  customStyles,
  MuiIcon,
  disabled,
  children,
  sx,
  style,
  type,
  loading,
}: componentProps) => {
  if (text)
    return (
      <Button
        variant={variant}
        size={size}
        color={color}
        onClick={onClick}
        sx={{
          textTransform: "capitalize",
          ...customStyles,
          ...sx,
          ...style,
        }}
        disabled={disabled}
      >
        {text}
      </Button>
    );
  return (
    <Button
      variant={variant}
      size={size}
      color={color}
      onClick={onClick}
      sx={{
        textTransform: "capitalize",
        ...customStyles,
        ...sx,
        ...style,
      }}
      disabled={disabled}
    >
      {loading ? <Spinner /> : <>{children}</>}
    </Button>
  );
};

GlobalCustomButton.defaultProps = {
  variant: "contained",
  size: "small",
  color: "primary",
  disabled: false,
  loading: false,
};

export default GlobalCustomButton;
