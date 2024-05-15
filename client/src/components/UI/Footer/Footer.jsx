import React from 'react';
import { CONTACTS_ROUTE } from '../../../utils/consts';
import vkLogo from '../../../assets/images/vk-logo.svg';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer>
      <div className={styles.container}>
        <div className={styles.footerColumn}>
          <p className={styles.organizationName}>
            МОУ Дмитровская средняя общеобразовательная школа №1 им. В.И.Кузнецова <br />
            Народный музей истории школы им. А.Ф. Тягачева
          </p>
          <p>
            <a href="tel:+78121111111" className={styles.phone}>
              (812) 123-45-67
            </a>
          </p>
          <p>Dmit_mou1@mosreg</p>
          <p>141800, Российская Федерация, Московская область, г. Дмитров, улица Школьная, дом 11, корпус 1</p>
        </div>
        <div className={styles.footerColumn}>
          <Link to={CONTACTS_ROUTE} className={styles.contacts}>
            Контакты
          </Link>
        </div>
        <div className={`${styles.footerColumn} ${styles.communities}`}>
          <p className={styles.communitiesText}>Сообщества</p>
          <a href="https://dmou1.edumsko.ru/">Официальный сайт школы</a>
          <a href="https://vk.com/public131105419">
            <img src={vkLogo} className={styles.imgLogo} alt="Ссылка на сообщество школы ВКонтакте" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
