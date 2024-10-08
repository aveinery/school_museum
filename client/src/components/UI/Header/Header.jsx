import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CONTACTS_ROUTE, DOCUMENTS_ROUTE, GID_ROUTE, MAIN_ROUTE, NEWS_ROUTE } from '../../../utils/consts';
import styles from './Header.module.css';
import burger from '../../../assets/images/burger.svg';

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClick = (link) => {
    setActiveLink(link);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1 className={styles.logoUp}>Народный музей истории школы</h1>
          <h1 className={styles.logoDown}>имени Александра Федоровича Тягачева</h1>
        </div>
        <nav>
          <ul
            className={`${styles.navLinks} ${menuOpen ? styles.active : ''}`}
            aria-hidden={isMobile && menuOpen ? false : true}
          >
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
          <div className={styles.burger} onClick={toggleMenu}>
            <button className={styles.burger}>
              <img src={burger} alt="Иконка меню" />
            </button>
          </div>
        </nav>
        {isMobile && menuOpen && (
          <div className={`${styles.sideDrawer} ${menuOpen ? styles.active : ''}`}>
            <ul className={styles.burgerLinks}>
              <NavLinks
                to={MAIN_ROUTE}
                label="Главная"
                activeLink={activeLink}
                onClick={() => handleClick({ MAIN_ROUTE })}
              />
              <NavLinks
                to={CONTACTS_ROUTE}
                label="Контакты"
                activeLink={activeLink}
                onClick={() => handleClick({ CONTACTS_ROUTE })}
              />
              <NavLinks
                to={DOCUMENTS_ROUTE}
                label="Документы"
                activeLink={activeLink}
                onClick={() => handleClick({ DOCUMENTS_ROUTE })}
              />
              <NavLinks
                to={NEWS_ROUTE}
                label="Новости"
                activeLink={activeLink}
                onClick={() => handleClick({ NEWS_ROUTE })}
              />
              <NavLinks to={GID_ROUTE} label="Гид" activeLink={activeLink} onClick={() => handleClick({ GID_ROUTE })} />
            </ul>
          </div>
        )}
        <div className={`${styles.overlay} ${menuOpen ? styles.active : ''}`} onClick={toggleMenu}></div>
      </div>
    </header>
  );
};

export default Header;
