import React from 'react';
import { Button } from '@mui/material';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

interface componentProps {
  text?: string;
  onClick: () => void;
  variant?: 'contained' | 'text' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
  bgColor?: string;
  customStyles?: React.CSSProperties;
  sx?: React.CSSProperties;
  style: React.CSSProperties;
  MuiIcon?: React.ReactElement<SvgIconProps>;
  iconPosition?: string;
  disabled?: boolean;
  children: React.ReactNode;
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
}: componentProps) => {
  if (text)
    return (
      <Button
        variant={variant}
        size={size}
        color={color}
        onClick={onClick}
        sx={{
          textTransform: 'capitalize',
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
        textTransform: 'capitalize',
        ...customStyles,
        ...sx,
        ...style,
      }}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

GlobalCustomButton.defaultProps = {
  variant: 'contained',
  size: 'small',
  color: 'primary',
  disabled: false,
};

export default GlobalCustomButton;
