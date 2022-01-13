import React from 'react';

interface FlexWrapperProps {
  className?: string;
  display?: string;
  flexDirection?: string;
  alignItems?: string;
  maxWidth?: string;
  margin?: string;
}

const FlexWrapper: React.FC<FlexWrapperProps> = ({ children, className }) => {
  return <div className={className}></div>;
};

export default FlexWrapper;
