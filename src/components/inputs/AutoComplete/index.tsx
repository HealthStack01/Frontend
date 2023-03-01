import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import * as React from 'react';

interface Props {
  options: any;
  label: string;
  name?: string;
  value: any;
  onChange?: (_: React.ChangeEvent<HTMLInputElement>) => void;
  onInputChage?: () => void;
  register?: any;
}
const AutoCompleteBox: React.FC<Props> = ({
  options,
  label,
  value,
  onChange,
  onInputChage,
  name,
  register,
}) => {
  return (
    <Autocomplete
      multiple
      id="tags-standard"
      options={options}
      value={value}
      onChange={onChange}
      onInputChange={onInputChage}
      getOptionLabel={(option) => option?.label || option}
      sx={{ width: '100%', fontSize: '1rem' }}
      renderInput={(params) => (
        <TextField
          {...params}
          // label={label}
          name={name}
          {...register}
          variant="standard"
          placeholder={label}
        />
      )}
    />
  );
};

export default AutoCompleteBox;
