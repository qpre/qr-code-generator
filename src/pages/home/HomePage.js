import React, { useState, useRef, useCallback } from 'react';
import { QRCode } from 'react-qr-svg';

const HomePage = () => {
  const [menuAddress, setMenuAddress] = useState('');
  const inputRef = useRef(null);

  const handleQRCodeGeneration = useCallback(() => {
    setMenuAddress(inputRef.current.value);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            {menuAddress
              ? "Voici le QR Code pour l'adresse suivante"
              : "Entrez l'adresse de votre menu"}
          </h2>
        </div>
        <div className="mt-8">
          <div className="rounded-md shadow-sm">
            <div>
              <input
                ref={inputRef}
                disabled={menuAddress}
                name="adress"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="https://myrestaurantwebsite/mymenu.pdf"
              />
            </div>
          </div>

          <div className="mt-6">
            {menuAddress ? (
              <QRCode
                id="emv-qr-code"
                value={menuAddress}
                className="w-full flex justify-center py-2 px-4"
                style={{
                  position: 'relative',
                }}
              />
            ) : (
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                onClick={handleQRCodeGeneration}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                {'Génerer le QR Code'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
