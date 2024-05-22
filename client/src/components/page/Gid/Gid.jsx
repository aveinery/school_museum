import React from 'react';
import styles from './Gid.module.css';

const Gid = () => {
  return (
    <section className={styles.sectionGid}>
      <div className={styles.container}>
        <h2 className={styles.title}>Интерактивный гид по музею</h2>
        <div className={styles.panorama}></div>
      </div>
    </section>
  );
};

export default Gid;
