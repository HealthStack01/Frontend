import React from 'react';

import { SearchBox, SearchField } from './styles';

const SearchInput = () => {
  return (
    <SearchBox>
      <form name="search">
        <SearchField type="text" className="input" name="txt" />
      </form>
      <i className="bi bi-search"></i>
    </SearchBox>
  );
};

export default SearchInput;
