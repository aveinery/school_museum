import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { CONTACTS_ROUTE, DOCUMENTS_ROUTE, GID_ROUTE, MAIN_ROUTE, NEWS_ROUTE } from '../../../utils/consts';
import styles from './Header.module.css';

const NavLinks = ({ to, label, activeLink, onClick }) => {
  return (
    <li className={styles.links}>
      <Link to={to} onClick={onClick} className={activeLink === to ? styles.activeHeaderLink : styles.link}>
        {label}
      </Link>
    </li>
  );
};

const Header = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

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
            <NavLinks to={MAIN_ROUTE} label="Главная" activeLink={activeLink} onClick={() => handleClick(MAIN_ROUTE)} />
            <NavLinks
              to={CONTACTS_ROUTE}
              label="Контакты"
              activeLink={activeLink}
              onClick={() => handleClick(CONTACTS_ROUTE)}
            />
            <NavLinks
              to={DOCUMENTS_ROUTE}
              label="Документы"
              activeLink={activeLink}
              onClick={() => handleClick(DOCUMENTS_ROUTE)}
            />
            <NavLinks to={NEWS_ROUTE} label="Новости" activeLink={activeLink} onClick={() => handleClick(NEWS_ROUTE)} />
            <NavLinks to={GID_ROUTE} label="Гид" activeLink={activeLink} onClick={() => handleClick(GID_ROUTE)} />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
