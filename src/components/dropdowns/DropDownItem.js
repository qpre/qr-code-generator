import React from 'react';

const DropDownItem = ({ children }) => (
  <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
    {children}
  </span>
);

export default DropDownItem;
