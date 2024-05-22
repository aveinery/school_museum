import React from 'react';
import styles from './EditNewsForm.module.css';
import Modal from '../../../UI/Modal/Modal';

const EditNewsForm = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      Редактировать новость
    </Modal>
  );
};

export default EditNewsForm;
