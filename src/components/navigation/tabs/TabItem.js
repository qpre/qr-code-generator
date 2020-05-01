import React from 'react';

const TabItem = ({ isActive = false, name = '', onClick = () => {} }) => (
  <li className={isActive ? '-mb-px mr-1' : 'mr-1'}>
    <button
      className={
        isActive
          ? 'bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold'
          : 'bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold'
      }
      onClick={onClick}
    >
      {name}
    </button>
  </li>
);

export default TabItem;
