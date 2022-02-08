import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

interface Props {
  label: string;
  value?: Date;
  onChange?: (_: React.ChangeEvent<HTMLInputElement>) => void;
}

const BasicDatePicker: React.FC<Props> = ({ label, onChange, value }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        renderInput={params => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default BasicDatePicker;
