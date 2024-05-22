import React, { useContext, useState } from 'react';
import styles from './Login.module.css';
import useQueryLogin from '../../../hooks/useQueryLogin';
import { Context } from '../../../main';

const Login = () => {
  const { email, password, error, loading, handleEmailChange, handlePasswordChange, handleSubmit } = useQueryLogin();

  return (
    <div className={styles.loginPage}>
      <h2 className={styles.loginTitle}>Вход</h2>
      <div className={styles.loginForm}>
        <form className={styles.loginInputs} onSubmit={handleSubmit}>
          <label className={styles.inputLabel} for="login">
            Логин
          </label>
          <input
            className={styles.loginInput}
            type="text"
            placeholder="Введите логин"
            id="login"
            value={email}
            onChange={handleEmailChange}
          />
          <label className={styles.inputLabel} for="password">
            Пароль
          </label>
          <input
            className={styles.loginInput}
            type="password"
            placeholder="Введите пароль"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
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
