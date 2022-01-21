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

const CardWrapper: React.FC<CardWrapperProps> = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export default CardWrapper;
