import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import './Dialog.css';

// custom hook
const useConfirm = (title, message) => {
  const [promise, setPromise] = useState(null);

  const confirm = () => new Promise((resolve, reject) => {
    setPromise({resolve});
  });

  const handleConfirm = () => {
    promise?.resolve(true);
    setPromise(null);
  };

  const handleCancel = () => {
    promise?.resolve(false);
    setPromise(null);
  };
  
  // You could replace the Dialog with your library's version
  const ConfirmationDialog = () => (
    promise !== null ? 
    ReactDOM.createPortal(
      <div className="ModalOverlay">
        <div className="ModalWrapper">
          <div className="Modal">
            <div className="ModalHeader">
              {title}
            </div>
            <div className="ModalContent">
              <p>
                {message}
              </p>
            </div>
            <div className="ModalFooter">
              <button className="ConfirmButton" onClick={handleCancel}>取消</button>
              <button className="ConfirmButton" onClick={handleConfirm}>確定</button>
            </div>
          </div>
        </div>
      </div>
      , document.body
    )
    : null
  );
  
  return [ConfirmationDialog, confirm];
};

export default useConfirm;