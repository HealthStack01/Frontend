import React from 'react';

interface PageTextProps {
  className?: string;
  fontSize?: any;
  color?: string;
}

export const PageText: React.FC<PageTextProps> = ({ className, children }) => {
  return <span className={className}>{children}</span>;
};
