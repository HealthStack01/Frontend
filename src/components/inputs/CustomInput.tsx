import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface InputProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const BasicTextFields: React.FC<InputProps> = ({ onChange }) => {
  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
    >
      <TextField
        id='outlined-basic'
        label='Outlined'
        variant='outlined'
        onChange={onChange}
      />
      <TextField id='filled-basic' label='Filled' variant='filled' />
      <TextField id='standard-basic' label='Standard' variant='standard' />
    </Box>
  );
};

const CustomInput = () => {
  return (
    <div>
      <BasicTextFields onChange={e => console.log(e)} />
    </div>
  );
};

export default CustomInput;
