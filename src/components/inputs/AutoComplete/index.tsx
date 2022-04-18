import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import * as React from 'react';

interface Props {
  options: any;
  label: string;
  name?: string;
  value: any;
  onChange?: (_: React.ChangeEvent<HTMLInputElement>) => void;
}
const AutoCompleteBox: React.FC<Props> = ({
  options,
  label,
  value,
  onChange,
  name,
}) => {
  return (
    <Autocomplete
      freeSolo
      disablePortal
      options={options}
      value={value}
      onChange={onChange}
      sx={{ width: '100%' }}
      renderInput={(params) => (
        <TextField {...params} label={label} name={name} />
      )}
    />
  );
};

export default AutoCompleteBox;
