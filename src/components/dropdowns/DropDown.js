import React, { useState } from 'react';

const DropDown = ({ renderItems = () => {}, renderTitle = () => {} }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const onClickDropDown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="ml-3 relative">
      <div onClick={onClickDropDown}>{renderTitle()}</div>
      <div
        style={{ display: isDropdownOpen ? 'block' : 'none' }}
        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10"
      >
        <div className="py-1 rounded-md bg-white shadow-xs">
          {renderItems()}
        </div>
      </div>

      <div
        className="fixed w-screen h-screen top-0 left-0 right-0 bottom-0 z-5"
        style={{ display: isDropdownOpen ? 'block' : 'none' }}
        onClick={onClickDropDown}
      />
    </div>
  );
};

export default DropDown;
