import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CONTACTS_ROUTE, DOCUMENTS_ROUTE, GID_ROUTE, MAIN_ROUTE, NEWS_ROUTE } from '../../../utils/consts';
import styles from './Header.module.css';

const NavLinks = ({ to, label, activeLink, onClick }) => {
  return (
    <li className={styles.links}>
      <Link to={to} onClick={onClick} className={activeLink === label ? styles.activeHeaderLink : styles.link}>
        {label}
      </Link>
    </li>
  );
};

const Header = () => {
  const [activeLink, setActiveLink] = useState('Главная');

  const handleClick = (link) => {
    setActiveLink(link);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <p className={styles.logoUp}>Народный музей истории школы</p>
          <p className={styles.logoDown}>имени Александра Федоровича Тягачева</p>
        </div>
        <nav>
          <ul className={styles.navLinks}>
            <NavLinks to={MAIN_ROUTE} label="Главная" activeLink={activeLink} onClick={() => handleClick('Главная')} />
            <NavLinks
              to={CONTACTS_ROUTE}
              label="Контакты"
              activeLink={activeLink}
              onClick={() => handleClick('Контакты')}
            />
            <NavLinks
              to={DOCUMENTS_ROUTE}
              label="Документы"
              activeLink={activeLink}
              onClick={() => handleClick('Документы')}
            />
            <NavLinks to={NEWS_ROUTE} label="Новости" activeLink={activeLink} onClick={() => handleClick('Новости')} />
            <NavLinks to={GID_ROUTE} label="Гид" activeLink={activeLink} onClick={() => handleClick('Гид')} />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
