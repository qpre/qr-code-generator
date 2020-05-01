import React, { useCallback } from 'react';

const SearchInput = ({ value = '', placeholder, onChange = () => {} }) => {
  const handleChange = useCallback((e) => onChange(e.target.value), []);

  return (
    <input
      type="text"
      value={value}
      className="w-full border px-2 py-2 text-sm rounded"
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default SearchInput;
