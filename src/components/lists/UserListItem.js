import React from 'react';

const UserListItem = ({
  name = '',
  isSelected = false,
  onClick = () => {},
  onDoubleClick = () => {},
}) => (
  <div
    className={`px-3 flex items-center ${
      isSelected ? 'bg-gray-100' : 'bg-white hover:bg-gray-100'
    } cursor-pointer`}
    onClick={onClick}
    onDoubleClick={onDoubleClick}
  >
    <div>
      <img
        className="h-12 w-12 rounded-full"
        src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"
      />
    </div>
    <div className="ml-4 flex-1 border-b border-grey-lighter py-6">
      <div className="flex items-bottom justify-between">
        <p className="text-grey-darkest">{name}</p>
      </div>
    </div>
  </div>
);

export default UserListItem;
