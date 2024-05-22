import React from 'react';
import './NewsModalShow.module.css';
import Modal from '../../../UI/Modal/Modal';

const NewsModalShow = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      Посмотреть новость
    </Modal>
  );
};

export default NewsModalShow;
