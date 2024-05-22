import React, { useContext, useState } from 'react';
import styles from './News.module.css';
import NewsItem from '../../UI/NewsItem/NewsItem';
import image from '../../../assets/images/info-1.jpg';
import NewsModalShow from './NewsModalShow/NewsModalShow';
import CreateNewsForm from './CreateNewsForm/CreateNewsForm';
import EditNewsForm from './EditNewsForm/EditNewsForm';
import { Context } from '../../../main';
import { observer } from 'mobx-react-lite';
import useQueryNews from '../../../hooks/useQueryNews';

const News = observer(() => {
  const { newsStore } = useContext(Context);

  const [isOpen, setIsOpen] = useState(false);
  const [whichOpen, setWhichOpen] = useState('');

  const openModal = (nameModal) => {
    setIsOpen(true);
    setWhichOpen(nameModal);
  };

  const formatDate = (dateString) => {
    return dateString.split('T')[0];
  };

  const closeModal = () => {
    setIsOpen(false);
    setWhichOpen('');
  };

  console.log(useQueryNews);
  const { data, loading, error } = useQueryNews(50);

  if (loading) {
    return <div>Loading../</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }
  console.log(newsStore);
  return (
    <section className={styles.sectionNews}>
      <div className={styles.container}>
        <h2 className={styles.title}>Новости музея</h2>
        <button className={styles.btnAdd} onClick={() => openModal('createNews')}>
          Добавить новость
        </button>
        <div className={styles.newsContainer}>
          {newsStore.news.map((newsItem) => (
            <NewsItem
              key={newsItem.id}
              time={formatDate(newsItem.date_publication)}
              src={newsItem.images && newsItem.images.length > 0 ? newsItem.images[0].url : null}
              title={newsItem.title}
              content={newsItem.content}
              open={openModal}
              onClose={closeModal}
            ></NewsItem>
          ))}
          {/* <NewsItem
            time="2024-05-20"
            src={image}
            alt="Фото новости"
            title="Заголовок"
            content="Контент новости  тут очен большой текст который должен обрезаться как то по определенному количеству символов"
            open={openModal}
            onClose={closeModal}
          ></NewsItem>
          <NewsItem
            time="2024-05-20"
            src={image}
            alt="Фото новости"
            title="Заголовок"
            content="Контент новости тут очен большой текст который должен обрезаться как то по определенному количеству символов"
            open={openModal}
            onClose={closeModal}
          ></NewsItem>
          <NewsItem
            time="2024-05-20"
            src={image}
            alt="Фото новости"
            title="Заголовок"
            content="Контент новости тут очен большой текст который должен обрезаться как то по определенному количеству символов"
            open={openModal}
            onClose={closeModal}
          ></NewsItem> */}
        </div>
      </div>

      <CreateNewsForm open={whichOpen === 'createNews'} onClose={closeModal}></CreateNewsForm>
      <EditNewsForm open={whichOpen === 'editNews'} onClose={closeModal}></EditNewsForm>
      <NewsModalShow open={whichOpen === 'showNews'} onClose={closeModal}></NewsModalShow>
    </section>
  );
});

export default News;
