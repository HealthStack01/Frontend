import { Box, FormControl, FormHelperText } from '@mui/material';

import React from 'react';
import dayjs, { Dayjs } from 'dayjs';

interface Props {
  label: string;
  // value?: Date;
  onChange?: (_?: React.ChangeEvent<HTMLInputElement>) => void;
  register?: any;
  errors?: any;
  name: any;
}

const BasicTimePicker: React.FC<Props> = ({
  label,
  onChange,
  // value,
  register,
  name,
  errors = {},
}) => {
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs('2014-08-18T21:11:54')
  );
  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ my: 2 }}>
      <FormControl style={{ width: '100%' }}>
        <input {...register} type='time' className='date-picker' />
        {errors[name] && (
          <FormHelperText error>{errors[name].message}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default BasicTimePicker;
