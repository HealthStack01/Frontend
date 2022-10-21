import React from 'react';

interface PageTextProps {
  className?: string;
  fontSize?: any;
  color?: string;
  children?: React.ReactNode | undefined;
}

export const PageText: React.FC<PageTextProps> = ({ className, children }) => (
  <span className={className}>{children}</span>
);
