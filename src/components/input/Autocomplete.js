import React, { useCallback, useEffect, useState } from 'react';

const Autocomplete = ({
  suggestions = [],
  onChange = () => {},
  value = '',
  className = '',
  placeholder = '',
  disabled,
}) => {
  const [displaySuggestions, setDisplaySuggestions] = useState(false);

  const onInputChange = useCallback(
    (event) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    setFilteredSuggestions(
      suggestions
        // TODO: add custom filters
        .filter((s) => s.startsWith(value) && s !== value)
    );
  }, [suggestions, value]);

  return (
    <span className="relative">
      <input
        className={
          'focus:outline-none focus:shadow-outline border border-gray-300 bg-gray-200 py-2 px-4 appearance-none leading-normal focus:outline-none focus:bg-white focus:border-gray-500 ' +
          className
        }
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onInputChange}
        onFocus={() => setDisplaySuggestions(true)}
        onBlur={() => setTimeout(() => setDisplaySuggestions(false), 200)}
        disabled={disabled}
      />
      <div
        className="absolute border border-gray-300 bg-white rounded-lg left-0 overflow-y-auto min-w-full"
        role="menu"
        style={{
          display:
            displaySuggestions && filteredSuggestions.length > 0
              ? 'block'
              : 'none',
          maxHeight: '300px',
        }}
      >
        <ul className="dropdown-content">
          {filteredSuggestions.map((s) => (
            <li
              key={s}
              className="dropdown-item hover:bg-gray-200 py-2 px-4"
              onClick={() => {
                onChange(s);
                setDisplaySuggestions(false);
              }}
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </span>
  );
};

export default Autocomplete;
