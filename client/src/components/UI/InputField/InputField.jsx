import React from 'react';
import styles from './InputField.module.css';

const InputField = ({ type, placeholder, onChange, value, name }) => {
  return (
    <input
      className={styles.inputField}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      required
    ></input>
  );
};

export default InputField;
