import { Box, FormControl, FormHelperText } from '@mui/material';

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
  defaultValue?: any;
  selected?: any;
}

const BasicDatePicker: React.FC<Props> = ({
  label,
  onChange,
  // value,
  register,
  name,
  errors = {},
  defaultValue,
  selected,
}) => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2014-08-18'));
  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };
  return (
    <Box>
      <FormControl style={{ width: '100%' }}>
        <InputLabel className="form__label" htmlFor={name}>
          {label}
        </InputLabel>
        <input
          {...register}
          type="date"
          className="date-picker"
          defaultValue={defaultValue}
          selected={selected}
          onChange={onChange}
        />
        {errors[name] && (
          <FormHelperText error>{errors[name].message}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default BasicDatePicker;
