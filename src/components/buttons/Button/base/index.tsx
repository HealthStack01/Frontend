import React, { ButtonHTMLAttributes } from 'react';
import Spinner from '../../../spinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  color?: string;
  background?: string;
  fullwidth?: string;
  showicon?: boolean;
  icon?: string;
  loading?: boolean;
  disabled?: boolean;
}

const BaseButton: React.FC<ButtonProps> = ({
  label,
  showicon,
  icon,
  children,
  loading,
  disabled,
  ...props
}) => (
  <button
    {...props}
    disabled={disabled}
    style={{ fontSize: '1rem !important' }}
  >
    {showicon ? <i className={icon} /> : null}
    {loading ? (
      <Spinner />
    ) : (
      <>
        {label}
        {children}
      </>
    )}
  </button>
);

export default BaseButton;
