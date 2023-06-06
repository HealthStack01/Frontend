import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

const GlobalCheckbox = ({ label, checked, onChange, name }) => {
  const handleChange = (event) => {
    onChange(event.target.checked);
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            name={name}
          />
        }
        label={label}
      />
    </div>
  );
};

export default GlobalCheckbox;
