import React from 'react';
import InputField from '../../UI/InputField/InputField';
import styles from './ContactForm.module.css';

const ContactForm = ({ onClose }) => {
  return (
    <div>
      <h2 className={styles.contactFormTitle}>Заявка на экскурсию</h2>
      <form className={styles.contactsInputs} action="">
        <InputField type="text" placeholder="ФИО"></InputField>
        <InputField type="date" placeholder="Дата"></InputField>
        <InputField type="email" placeholder="Почта"></InputField>
        <InputField type="phone" placeholder="Телефон"></InputField>
        <button className={styles.buttonContacts} onClick={onClose}>
          Отправить
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
