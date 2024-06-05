import React from 'react';
import styles from './MainSectionFooter.module.css';

const MainSectionFooter = () => {
  return (
    <section className={styles.sectionMain}>
      <div className={styles.container}>
        <p className={styles.sectionDescription}>
          Сегодня наш школьный музей - это не только собрание экспонатов, книг, наглядных пособий для уроков истории,
          литературы, краеведения, но и средство воспитания полезных и необходимых для жизни навыков, площадка для
          исследовательской работы учащихся, источник самообразования самого учителя
        </p>
      </div>
    </section>
  );
};

export default MainSectionFooter;
