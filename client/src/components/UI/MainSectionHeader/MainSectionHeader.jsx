import React from 'react';
import styles from './MainSectionHeader.module.css';

const MainSectionHeader = () => {
  return (
    <section className={styles.sectionHeader}>
      <div className={styles.container}>
        <h1 className={styles.textHeader}>
          <p className={styles.firstStroke}>История школы как капля воды</p>
          <p className={styles.secondStroke}>отражается в истории родины</p>
        </h1>
      </div>
    </section>
  );
};

export default MainSectionHeader;
