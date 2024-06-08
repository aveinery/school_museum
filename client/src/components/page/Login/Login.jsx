import React, { useContext, useState } from 'react';
import styles from './Login.module.css';
import useQueryLogin from '../../../hooks/useQueryLogin';
import { Context } from '../../../main';
import useValidation from '../../../hooks/useValidation';

const validate = {
  email: (value) => {
    if (!value) return 'Логин обязателен';
    const email = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return email.test(value) ? '' : 'Неверный логин';
  },
  password: (value) => {
    if (!value) return 'Пароль обязателен';
  },
};

const Login = () => {
  const { error, loading, sendLogin } = useQueryLogin();
  const { values, errors, handleChange, handleSubmit, isSubmitting } = useValidation(
    {
      email: '',
      password: '',
    },
    validate
  );

  const onSubmit = async () => {
    try {
      await sendLogin(values.email, values.password);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.loginPage}>
      <h2 className={styles.loginTitle}>Авторизация</h2>
      <div className={styles.loginForm}>
        <form className={styles.loginInputs} onSubmit={(e) => handleSubmit(e, onSubmit)}>
          <label className={styles.inputLabel} htmlFor="login">
            Логин
          </label>
          <input
            className={styles.loginInput}
            type="text"
            placeholder="Введите логин"
            id="login"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <div className={styles.error}>{errors.email}</div>
          <label className={styles.inputLabel} htmlFor="password">
            Пароль
          </label>
          <input
            className={styles.loginInput}
            type="password"
            placeholder="Введите пароль"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <div className={styles.error}>{errors.password}</div>
          {error && <p className={styles.errorMessage}>Неправильный e-mail или пароль</p>}
          <button className={styles.btnLogin} type="submit" disabled={loading}>
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
