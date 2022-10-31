import React from 'react';
import { DebounceInput } from 'react-debounce-input';

import Input from './basic/Input';

const InputEl = (props) => <Input {...props} size="small" />;

const DebouncedInput = ({ label, onChangeValue }) => {
  return (
    <DebounceInput
      className="input is-small "
      type="text"
      placeholder={label}
      label={label}
      minLength={1}
      debounceTimeout={400}
      element={InputEl}
      onChange={(e) => onChangeValue(e.target.value)}
    />
  );
};

export default DebouncedInput;
