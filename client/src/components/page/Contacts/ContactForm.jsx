import React, { useState } from 'react';
import InputField from '../../UI/InputField/InputField';
import styles from './ContactForm.module.css';
import useSendMail from '../../../hooks/useSendMail';
import useValidation from '../../../hooks/useValidation';

const validate = {
  fullname: (value) => {
    const nameRegex =
      /^([А-ЯA-Z]|[А-ЯA-Z][\x27а-яa-z]{1,}|[А-ЯA-Z][\x27а-яa-z]{1,}\-([А-ЯA-Z][\x27а-яa-z]{1,}|(оглы)|(кызы)))\040[А-ЯA-Z][\x27а-яa-z]{1,}(\040[А-ЯA-Z][\x27а-яa-z]{1,})?$/;
    return nameRegex.test(value) ? '' : 'Неверное ФИО';
  },
  date: (value) => {
    if (!value) return 'Дата обязательна';
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today ? '' : 'Дата не может быть раньше сегодняшнего дня';
  },
  email: (value) => {
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return emailRegex.test(value) ? '' : 'Неверный email адрес';
  },
  phone: (value) => {
    const phoneRegex = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    return phoneRegex.test(value) ? '' : 'Неверный номер телефона';
  },
};

const ContactForm = ({ onClose }) => {
  const { send, loading, error } = useSendMail();

  const { values, errors, handleChange, handleSubmit, isSubmitting } = useValidation(
    {
      fullname: '',
      date: '',
      email: '',
      phone: '',
    },
    validate
  );

  const onSubmit = async () => {
    try {
      await send(values);
      if (!error) {
        alert('Успешная отправка');
        onClose();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className={styles.contactFormTitle}>Заявка на экскурсию</h2>
      <form className={styles.contactsInputs} onSubmit={(e) => handleSubmit(e, onSubmit)}>
        <InputField
          type="text"
          placeholder="ФИО"
          name="fullname"
          value={values.fullname}
          onChange={handleChange}
          error={errors.fullname}
        ></InputField>
        <InputField
          type="date"
          placeholder="Дата"
          name="date"
          value={values.date}
          onChange={handleChange}
          error={errors.date}
        ></InputField>
        <InputField
          type="email"
          placeholder="Почта"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        ></InputField>
        <InputField
          type="phone"
          placeholder="Телефон"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
        ></InputField>
        {error ? <span className={styles.error}>Произошла ошибка. Попробуйте еще раз.</span> : null}
        <button
          className={styles.buttonContacts}
          type="submit"
          disabled={Object.values(errors).some((error) => error !== '')}
        >
          {loading ? 'Отправка' : 'Отправить'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
