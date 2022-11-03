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
  defaultValue?: any;
}

const BasicDatePicker: React.FC<Props> = ({
  label,
  onChange,
  // value,
  register,
  name,
  errors = {},
  defaultValue,
}) => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2014-08-18'));
  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ my: 2 }}>
      <FormControl style={{ width: '100%' }}>
        <input
          {...register}
          type='date'
          className='date-picker'
          defaultValue={defaultValue}
        />
        {errors[name] && (
          <FormHelperText error>{errors[name].message}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default BasicDatePicker;
