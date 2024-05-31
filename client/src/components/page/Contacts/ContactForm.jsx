import React, { useState } from 'react';
import InputField from '../../UI/InputField/InputField';
import styles from './ContactForm.module.css';
import useSendMail from '../../../hooks/useSendMail';

const ContactForm = ({ onClose }) => {
  const { send, loading, error } = useSendMail();

  const [formData, setFormData] = useState({
    fullname: '',
    date: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await send(formData);
    if (!error) {
      alert('Email sent successfully');
      onClose();
    }
  };
  return (
    <div>
      <h2 className={styles.contactFormTitle}>Заявка на экскурсию</h2>
      <form className={styles.contactsInputs} onSubmit={handleSubmit}>
        <InputField
          type="text"
          placeholder="ФИО"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
        ></InputField>
        <InputField
          type="date"
          placeholder="Дата"
          name="date"
          value={formData.date}
          onChange={handleChange}
        ></InputField>
        <InputField
          type="email"
          placeholder="Почта"
          name="email"
          value={formData.email}
          onChange={handleChange}
        ></InputField>
        <InputField
          type="phone"
          placeholder="Телефон"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        ></InputField>
        <button className={styles.buttonContacts} type="submit" disabled={loading}>
          {loading ? 'Отправка' : 'Отправить'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
