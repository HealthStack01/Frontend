import React, { useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

const GlobalCheckbox = ({ label }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div>
      <FormControlLabel
      control={<Checkbox checked={checked} onChange={handleChange} />}
      label={label}
    />
    </div>
  );
};

export default GlobalCheckbox;
