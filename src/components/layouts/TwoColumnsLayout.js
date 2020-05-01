import React from 'react';

const TwoColumnsLayout = ({
  renderLeftColumn = () => {},
  renderRightColumn = () => {},
}) => {
  return (
    <div className="flex h-full">
      {/* <!-- Left --> */}
      <div className="w-1/3 flex flex-col border-r">{renderLeftColumn()}</div>

      <div className="w-2/3 flex flex-col">{renderRightColumn()}</div>
    </div>
  );
};

export default TwoColumnsLayout;
