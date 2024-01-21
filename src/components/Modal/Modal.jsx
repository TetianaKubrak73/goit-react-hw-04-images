import React, { useEffect } from 'react';
import style from './Modal.module.css';

const Modal = ({ largeImageURL, alt, onCloseModal }) => {
  useEffect(() => {
    const handleKeydown = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [onCloseModal]);

  const handleBackdropClick = ({ target, currentTarget }) => {
    if (currentTarget === target) {
      onCloseModal();
    }
  };

  return (
    <div className={style.overlay} onClick={handleBackdropClick}>
      <div className={style.modal}>
        <img src={largeImageURL} alt={alt} />
      </div>
    </div>
  );
};

export default Modal;
