import React from 'react';
import styles from './MainInfoItem.module.css';

const MainInfoItem = ({ title, src, alt }) => {
  return (
    <div className={styles.infoItem}>
      <img src={src} alt={alt} />
      <p>{title}</p>
    </div>
  );
};

export default MainInfoItem;
