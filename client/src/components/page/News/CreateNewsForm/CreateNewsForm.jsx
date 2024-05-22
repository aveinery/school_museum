import React from 'react';
import styles from './CreateNewsForm.module.css';
import Modal from '../../../UI/Modal/Modal';

const CreateNewsForm = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <form action="">
        <input type="text" placeholder="Введите заголовок" />
      </form>
    </Modal>
  );
};

export default CreateNewsForm;
