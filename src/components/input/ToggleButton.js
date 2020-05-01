import React, { useCallback } from 'react';
import './ToggleButton.css';

const ToggleButton = ({ title, value = false, onChange = () => {} }) => {
  const handleClick = useCallback((event) => onChange(event.target.checked));

  return (
    <div className="ml-5 mt-2">
      <label htmlFor="toogleA" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id="toogleA"
            type="checkbox"
            className="hidden"
            checked={value}
            onChange={handleClick}
          />
          <div className="toggle__line w-10 h-4 bg-gray-200 rounded-full shadow-inner" />
          <div className="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0" />
        </div>
        <div className="ml-3 text-gray-700 font-medium">{title}</div>
      </label>
    </div>
  );
};

export default ToggleButton;
