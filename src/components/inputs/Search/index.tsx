import React from 'react';

import { SearchBox, SearchField } from './styles';

interface Props {
  onChange?: (e) => void;
  className?: string;
  placeholder?: string;
}

const SearchInput: React.FC<Props> = ({ onChange, className, placeholder }) => {
  return (
    <SearchBox className={className}>
      <form name="search">
        <SearchField type="text" className="input" name="txt" onChange={onChange} placeholder={placeholder} />
      </form>
      <i className="bi bi-search"></i>
    </SearchBox>
  );
};

export default SearchInput;
