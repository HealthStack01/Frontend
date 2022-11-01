import { Box, FormControl, FormHelperText } from '@mui/material';

import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { InputBox, InputLabel } from '../basic/Input/styles';

interface Props {
  label: string;
  // value?: Date;
  onChange?: (_?: React.ChangeEvent<HTMLInputElement>) => void;
  register?: any;
  errorText?: string;
  name: any;
}

const BasicDatePicker: React.FC<Props> = ({
  label,
  onChange,
  // value,
  register,
  name,
  errorText,
}) => {
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs('2014-08-18T21:11:54')
  );
  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ my: 2 }}>
      <InputBox>
        <input {...register} type='date' className='date-picker form__input' />
        <InputLabel className='form__label' htmlFor={name}>
          {label}
        </InputLabel>
        {errorText && (
          <p style={{ color: 'red', fontSize: '0.7rem', textAlign: 'left' }}>
            {errorText}
          </p>
        )}
      </InputBox>
    </Box>
  );
};

export default BasicDatePicker;
