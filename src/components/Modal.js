import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

// toggle
const Modal = ({ isShowing, hide, title, content}) => {
  return isShowing ? 
    ReactDOM.createPortal(
      <div className="ModalOverlay">
        <div className="ModalWrapper">
          <div className="Modal">
            <div className="ModalHeader">
              {title}
            </div>
            <div className="ModalContent">
              <p>{content}</p>
            </div>
            <div className="ModalFooter">
              <button className="ConfirmButton" onClick={hide}>取消</button>
              <button className="ConfirmButton" onClick={hide}>確定</button>
            </div>
          </div>
        </div>
      </div>
      , document.body
    )
    : null
}

export default Modal;