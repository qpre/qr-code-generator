import React, { useCallback, useState } from 'react';

const DefaultNavbar = ({
  renderFullSizeContent = () => {},
  renderHamburgerContent = () => {}
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const onClickHamburger = useCallback(
    () => setIsHamburgerOpen(!isHamburgerOpen),
    [isHamburgerOpen]
  );

  return (
    <nav className="bg-white border-b border-color-gray-800 w-full z-10 top-0 fixed navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {renderFullSizeContent()}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={onClickHamburger}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  className="inline-flex"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  className="hidden"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={isHamburgerOpen ? '' : 'hidden md:hidden'}>
        {renderHamburgerContent()}
      </div>
    </nav>
  );
};

export default DefaultNavbar;
