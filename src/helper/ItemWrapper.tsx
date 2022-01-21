import React from 'react';

interface ItemWrapperProps {
  className?: string;
  display?: string;
  flexDirection?: string;
  alignItems?: string;
  maxWidth?: string;
  margin?: string;
}

export const ItemWrapper: React.FC<ItemWrapperProps> = ({
  className,
  children,
}) => <div className={className}>{children}</div>;
