import React from 'react';

interface CardWrapperProps {
  className?: string;
  display?: string;
  alignItems?: string;
  flexDirection?: string;
  background?: string;
  borderRadius?: string;
  maxWidth?: string;
  margingBottom?: string;
  padding?: string;
}

export const CardWrapper: React.FC<CardWrapperProps> = ({
  children,
  className,
}) => {
  return <div className={className}>{children}</div>;
};
