import React from 'react';
import styles from './ContactItem.module.css';

const ContactItem = ({ src, alt, title, children }) => {
  return (
    <div className={styles.contactItem}>
      <img className={styles.contactImg} src={src} alt={alt} />
      <div className={styles.itemDescription}>
        <h3 className={styles.contactHeader}>{title}</h3>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ContactItem;
