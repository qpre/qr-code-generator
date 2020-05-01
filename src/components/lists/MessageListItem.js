import React from 'react';
import moment from 'moment';

const MessageListItem = ({
  senderName,
  isSender = false,
  messageHtmlContent = '',
  dateSent = Date.now(),
}) => (
  <div className={`flex mb-2 ${isSender ? 'justify-end ml-20' : 'mr-20'}`}>
    <div
      className="rounded py-2 px-3"
      style={{
        backgroundColor: isSender ? '#C6F6D5' : '#F2F2F2',
      }}
    >
      {isSender && <p className="text-sm text-blue-300">{senderName}</p>}
      <p
        className="text-sm mt-1"
        // :'(
        dangerouslySetInnerHTML={{ __html: messageHtmlContent }}
      />
      <p className="text-right text-xs text-grey-dark mt-1">
        {moment(dateSent).calendar()}
      </p>
    </div>
  </div>
);

export default MessageListItem;
