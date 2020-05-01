import React from "react";

const PageContent = ({ children }) => (
  <div className="py-12 h-auto">
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  </div>
);

export default PageContent;
