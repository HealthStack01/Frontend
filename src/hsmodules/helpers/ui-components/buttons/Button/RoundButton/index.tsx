import React from 'react';

interface Props {
  onClick?: () => void;
}

const RoundButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      style={{
        borderRadius: '32px',
        background: 'transparent',
        border: 'none',
        width: '20px',
        height: '20px',
        cursor: 'pointer',
        margin: ' 1rem',
      }}
      type="submit"
      onClick={onClick}
    >
      +
    </button>
  );
};

export default RoundButton;
