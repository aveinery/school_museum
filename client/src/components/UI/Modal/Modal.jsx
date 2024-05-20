import React, { useEffect } from 'react';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';

const Modal = ({ children, open, onClose }) => {
  if (!open) return null;

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener('keydown', close);
    console.log('dfdf', open);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return createPortal(
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} />
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
