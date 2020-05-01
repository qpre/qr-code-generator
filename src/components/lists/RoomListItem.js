import React, { useState, useEffect } from 'react';
import moment from 'moment';

const RoomListItem = ({
  isActive = false,
  correspondentId,
  lastMessageText = 'new discussion',
  lastMessageDate = null,
  unreadMessagesCount = 0,
  onClick = () => {},
}) => {
  const [lastMessageDateText, setLastMessageDateText] = useState('');

  useEffect(() => {
    if (!lastMessageDate) {
      setLastMessageDateText('');
      return;
    }

    if (moment(lastMessageDate).calendar().includes('Today')) {
      setLastMessageDateText(
        moment(lastMessageDate).calendar().split(' at ')[1]
      );
    } else {
      setLastMessageDateText(
        moment(lastMessageDate).calendar().split(' at ')[0]
      );
    }
  }, [lastMessageDate]);

  return (
    <li
      className={`px-3 flex items-center ${
        isActive ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'
      } cursor-pointer`}
      onClick={onClick}
    >
      <div>
        <img
          className="h-12 w-12 rounded-full"
          src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"
          loading="lazy"
        />
      </div>
      <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
        <div className="flex items-bottom justify-between">
          <p className="text-grey-darkest">{correspondentId}</p>
          <p className="text-xs text-grey-300">{lastMessageDateText}</p>
        </div>
        <p
          className="text-grey-dark mt-1 text-sm truncate"
          style={{ width: 'calc(33vw - 6rem)' }}
        >
          {lastMessageText}
        </p>
      </div>
      {unreadMessagesCount > 0 && (
        <div className="rounded-full h-6 w-6 flex items-center justify-center bg-red-200 text-red-600">
          {unreadMessagesCount}
        </div>
      )}
    </li>
  );
};

export default RoomListItem;
