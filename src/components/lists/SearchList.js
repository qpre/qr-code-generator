import React from 'react';
import SearchInput from '../input/SearchInput';

const SearchList = ({ children, searchValue = '', onSearch = () => {} }) => {
  return (
    <>
      <div className="py-2 px-2 bg-gray-100">
        <SearchInput value={searchValue} onChange={onSearch} />
      </div>

      <ul
        className="bg-gray-100 flex-1 overflow-auto"
        style={{ userSelect: 'none' }}
      >
        {children}
      </ul>
    </>
  );
};

export default SearchList;
