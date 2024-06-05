import React from 'react';
import styles from './InputField.module.css';

const InputField = ({ type, placeholder, onChange, value, name, error }) => {
  return (
    <div className={styles.inputs}>
      <input
        className={styles.inputField}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required
      ></input>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default InputField;
