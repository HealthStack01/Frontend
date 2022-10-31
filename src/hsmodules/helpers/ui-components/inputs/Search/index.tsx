import React from 'react';
import { DebounceInput } from 'react-debounce-input';

import { SearchBox, SearchField } from './styles';

interface Props {
  onChange?: (e) => void;
  className?: string;
  label?: string;
  placeholder?: string;
}

const SearchInput: React.FC<Props> = ({
  onChange,
  label,
  className,
  placeholder,
}) => {
  return (
    <SearchBox className={className}>
      <DebounceInput
        className="input is-small "
        type="text"
        placeholder={placeholder}
        label={label}
        minLength={1}
        debounceTimeout={400}
        element={SearchField}
        onChange={(e) => onChange(e.target.value)}
      />
      <i className="bi bi-search"></i>
    </SearchBox>
  );
};

export default SearchInput;
