import React from 'react';

const LeftAccentBanner = ({ children, color = 'orange' }) => (
  <div
    className={`bg-${color}-100 border-l-4 border-${color}-500 text-${color}-700 p-4 mt-4 mb-4`}
    role="alert"
  >
    {children}
  </div>
);

export default LeftAccentBanner;
