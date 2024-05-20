import React from 'react';
import styles from './InputField.module.css';

const InputField = ({ type, placeholder }) => {
  return <input className={styles.inputField} type={type} placeholder={placeholder}></input>;
};

export default InputField;
