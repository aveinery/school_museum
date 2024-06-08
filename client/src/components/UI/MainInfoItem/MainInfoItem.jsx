import React from 'react';
import styles from './MainInfoItem.module.css';

const MainInfoItem = ({ src, alt, children }) => {
  return (
    <div className={styles.infoItem}>
      <img className={styles.infoImg} src={src} alt={alt} />
      <div className={styles.verticalLine}></div>
      <div className={styles.infoDescription}>{children}</div>
    </div>
  );
};

export default MainInfoItem;
