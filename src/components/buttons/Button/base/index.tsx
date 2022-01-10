import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  color?: string;
  background?: string;
  fullwidth?: boolean;
  showicon?: boolean;
  icon?: string;
}

const BaseButton: React.FC<ButtonProps> = ({
  label,
  color,
  background,
  fullwidth,
  showicon,
  icon,
  children,
  ...props
}) => {
  return (
    <button {...props}>
      {showicon ? <i className={icon}></i> : null}
      {label}
      {children}
    </button>
  );
};

export default BaseButton;
