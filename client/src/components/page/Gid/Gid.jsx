import React from 'react';
import styles from './Gid.module.css';
import excursion from '../../../assets/video/excursion.mp4';
import preview from '../../../assets/images/preview.jpg';

const Gid = () => {
  return (
    <section className={styles.sectionGid}>
      <div className={styles.container}>
        <h2 className={styles.title}>Экскурсия по музею</h2>
        <video controls="controls" className={styles.video} preload="metadata" poster={preview}>
          <source src={excursion} type="video/mp4" />
          Ваш браузер не поддерживает встроенные видео
        </video>
      </div>
    </section>
  );
};

export default Gid;
