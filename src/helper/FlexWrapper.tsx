import React from 'react';

interface FlexWrapperProps {
  className?: string;
  display?: string;
  flexDirection?: string;
  alignItems?: string;
  maxWidth?: string;
  margin?: string;
}

const FlexWrapper: React.FC<FlexWrapperProps> = ({ className }) => (
  <div className={className} />
);

export default FlexWrapper;
