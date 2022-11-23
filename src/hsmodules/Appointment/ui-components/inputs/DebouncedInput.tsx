import React from 'react';
import { DebounceInput } from 'react-debounce-input';

import Input from './basic/Input/index';

const InputEl = (props) => <Input {...props} size="small" />;

const DebouncedInput = ({
  label,
  onChangeValue,
  value,
  minLength,
  onBlur,
  style,
  inputRef,
}) => {
  return (
    <DebounceInput
      className="input is-small "
      type="text"
      placeholder={label}
      label={label}
      value={value}
      minLength={minLength}
      onBlur={(e) => onBlur(e.target.value)}
      debounceTimeout={400}
      element={InputEl}
      inputRef={inputRef}
      onChange={(e) => onChangeValue(e.target.value)}
      style={style}
    />
  );
};

export default DebouncedInput;
