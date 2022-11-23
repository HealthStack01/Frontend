import { Box, FormControl, FormHelperText, TextField } from '@mui/material';
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { InputLabel } from './styles';

interface Props {
  label: string;
  // value?: Date;
  onChange?: (_?: React.ChangeEvent<HTMLInputElement>) => void;
  register?: any;
  errors?: any;
  name: any;
  value: 'string';
}

const BasicDateTimePicker: React.FC<Props> = ({
  label,
  onChange,
  value,
  register,
  name,
  errors = {},
}) => {
  const [values, setValue] = React.useState<Dayjs | null>(
    dayjs('2014-08-18T21:11:54')
  );
  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ my: 2 }}>
      <FormControl style={{ width: '100%' }}>
        <input
          {...register}
          type="datetime-local"
          className="date-picker"
          value={value}
          onChange={onChange}
          style={{
            height: '38px',
          }}
        />
        <InputLabel className="form__label" htmlFor={name}>
          {label}
        </InputLabel>
        {errors[name] && (
          <FormHelperText error>{errors[name].message}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default BasicDateTimePicker;
