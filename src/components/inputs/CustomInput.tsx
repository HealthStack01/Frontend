import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as React from 'react';

interface InputProps {
  onChange?: (_: React.ChangeEvent<HTMLInputElement>) => void;
}
export const BasicTextFields: React.FC<InputProps> = ({ onChange }) => (
  <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    <TextField
      id="outlined-basic"
      label="Outlined"
      variant="outlined"
      onChange={onChange}
    />
    <TextField id="filled-basic" label="Filled" variant="filled" />
    <TextField id="standard-basic" label="Standard" variant="standard" />
  </Box>
);

function CustomInput() {
  return (
    <div>
      <BasicTextFields />
    </div>
  );
}

export default CustomInput;
