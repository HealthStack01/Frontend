import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import React from 'react';

import Input from '../basic/Input';

interface Props {
  label: string;
  value?: Date;
  onChange?: (_: React.ChangeEvent<HTMLInputElement>) => void;
}

const BasicDatePicker: React.FC<Props> = ({ label, onChange, value }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Input type="date" label={label} value={value} onChange={onChange} />
      {/* <DatePicker label={label} value={value} onChange={onChange} renderInput={(params) => <Input {...params} />} /> */}
    </LocalizationProvider>
  );
};

export default BasicDatePicker;
