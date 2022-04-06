import {useEffect} from "react";
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';


const modalRoot = document.querySelector('#modal-root');

function Modal({ onClose, largeImageURL, alt }){

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });


  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  
    return createPortal(
      <div className={styles.Overlay} onClick={handleBackdropClick}>
        <div className={styles.Modal}>
          <img src={largeImageURL} alt={alt} />
        </div>
      </div>,
      modalRoot
    );
  
}

Modal.propTypes = {
  largeImageURL: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
};

export default Modal;