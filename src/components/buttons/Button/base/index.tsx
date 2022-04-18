import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  color?: string;
  background?: string;
  fullwidth?: string;
  showicon?: boolean;
  icon?: string;
}

const BaseButton: React.FC<ButtonProps> = ({
  label,
  showicon,
  icon,
  children,
  ...props
}) => (
  <button {...props}>
    {showicon ? <i className={icon} /> : null}
    {label}
    {children}
  </button>
);

export default BaseButton;
