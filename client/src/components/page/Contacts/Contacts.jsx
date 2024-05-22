import React, { useState } from 'react';
import styles from './Contacts.module.css';
import ContactItem from '../../UI/ContactItem/ContactItem';
import phoneIcon from '../../../assets/images/phone.svg';
import locationIcon from '../../../assets/images/location.svg';
import vkLogo from '../../../assets/images/vk-logo-contacts.svg';
import communityIcon from '../../../assets/images/community.svg';
import emailIcon from '../../../assets/images/email.svg';
import registrationLogo from '../../../assets/images/registration.svg';
import YMap from '../../UI/YMap/YMap';
import Modal from '../../UI/Modal/Modal';
import ContactForm from './ContactForm';

const Contacts = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <YMap />

      <section className={styles.sectionContacts}>
        <div className={styles.container}>
          <h2 className={styles.contactsHeader}>Контактная информация</h2>

          <div className={styles.contactsContainer}>
            <div className={styles.column}>
              <ContactItem title="Адрес" src={locationIcon} alt="Иконка геолокации">
                <p>141800, Российская Федерация, Московская область, г. Дмитров, улица Школьная, дом 11, корпус 1</p>
              </ContactItem>
              <ContactItem title="Руководитель музея" src={phoneIcon} alt="Иконка телефона">
                <p>Шатохина Анна Александровна</p>
                <a href="tel:+78121111111" className={styles.phone}>
                  (812) 123-45-67
                </a>
              </ContactItem>
              <ContactItem title="Директор школы" src={phoneIcon} alt="Иконка телефона">
                <p>Чернышова Татьяна Алексеевна</p>
                <a href="tel:+78121111111" className={styles.phone}>
                  (812) 123-45-67
                </a>
              </ContactItem>
            </div>

            <div className={styles.column}>
              <ContactItem title="Почта" src={emailIcon} alt="Иконка почты">
                <p>Dmit_mou1@mosreg.ru</p>
              </ContactItem>
              <ContactItem title="Сообщества" src={communityIcon} alt="Иконка сообществ">
                <a href="https://dmou1.edumsko.ru/">Официальный сайт школы</a>
                <a className={styles.vk} href="https://vk.com/public131105419">
                  <img src={vkLogo} className={styles.imgLogo} alt="Ссылка на сообщество школы ВКонтакте" />
                </a>
              </ContactItem>
            </div>

            <div className={styles.column}>
              <button className={styles.contactsButton} onClick={openModal}>
                <span>Подать заявку на экскурсию</span>
              </button>

              <Modal open={isOpen} onClose={closeModal}>
                <ContactForm onClose={closeModal}></ContactForm>
              </Modal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;
