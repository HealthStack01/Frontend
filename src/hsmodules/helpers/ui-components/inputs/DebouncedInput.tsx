import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';

import Input from './basic/Input';

const DebouncedInput = ({
  label,
  onChangeValue,
  defaultValue,
  disabled,
  onBlur,
}) => {
  const [value, setValue] = useState('testing default value');

  console.log(value);

  const InputEl = (props) => (
    <Input {...props} defaultValue={defaultValue} disabled={disabled} />
  );

  const handleChange = (e) => {
    onChangeValue(e.target.value);
    setValue(e.target.value);
  };

  return (
    <DebounceInput
      className="input is-small "
      type="text"
      label={label}
      minLength={1}
      debounceTimeout={400}
      element={InputEl}
      onChange={handleChange}
      onBlur={(e) => onBlur(e.target.value)}
    />
  );
};

export default DebouncedInput;
