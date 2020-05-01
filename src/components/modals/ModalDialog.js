import React from 'react';

const ModalDialog = ({
  onClose = () => {},
  renderTitle = () => {},
  renderContent = () => {},
  renderActions = () => {},
  width = 'w-10/12'
}) => {
  return (
    <div className="modal opacity-1 fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
      <div
        className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
        onClick={onClose}
      ></div>

      <div
        className={`modal-container bg-white ${width} mx-auto rounded shadow-lg z-50`}
      >
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">{renderTitle()}</p>
            <div className="modal-close cursor-pointer z-50 " onClick={onClose}>
              <svg
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>

          <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
            {renderContent()}
          </div>

          <div className="flex justify-end pt-2">{renderActions()}</div>
        </div>
      </div>
    </div>
  );
};

export default ModalDialog;
