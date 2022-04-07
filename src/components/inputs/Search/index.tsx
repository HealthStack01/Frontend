import React from 'react';

import { SearchBox, SearchField } from './styles';

interface Props {
  onChange?: (e) => void;
}

const SearchInput: React.FC<Props> = ({ onChange }) => {
  return (
    <SearchBox>
      <form name="search">
        <SearchField type="text" className="input" name="txt" onChange={onChange} />
      </form>
      <i className="bi bi-search"></i>
    </SearchBox>
  );
};

export default SearchInput;
