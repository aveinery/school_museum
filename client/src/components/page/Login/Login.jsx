import React from 'react';
import styles from './Login.module.css';

const Login = () => {
  return (
    <div className={styles.loginPage}>
      <h2 className={styles.loginTitle}>Вход</h2>
      <div className={styles.loginForm}>
        <form
          className={styles.loginInputs}
          action="
        "
        >
          <label className={styles.inputLabel} for="login">
            Логин
          </label>
          <input className={styles.loginInput} type="text" placeholder="ffd" id="login" />
          <label className={styles.inputLabel} for="password">
            Пароль
          </label>
          <input className={styles.loginInput} type="password" id="password" />
          <button className={styles.btnLogin}>Войти</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
