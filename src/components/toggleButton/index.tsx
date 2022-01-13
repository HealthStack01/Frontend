import React from 'react';

interface Props {
  label: string;
  onClick: Function;
  inputId: string;
  value: string;
}

const ToggleButton: React.FC<Props> = ({ label, onClick, inputId, value }) => {
  return (
    <label className='switch'>
      <input type='checkbox' />
      <span className='slider round'></span>
    </label>
  );
};

export default ToggleButton;
