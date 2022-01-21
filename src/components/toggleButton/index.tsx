import React from 'react';

interface Props {
  label: string;
  onClick: Function;
  inputId: string;
  value: string;
}

const ToggleButton: React.FC<Props> = () => (
  <label className="switch">
    <input type="checkbox" />
    <span className="slider round" />
  </label>
);

export default ToggleButton;
