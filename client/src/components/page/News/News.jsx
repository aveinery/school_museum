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
import useDeleteNews from '../../../hooks/useDeleteNews';
import Spinner from '../../UI/Spinner/Spinner';

const News = observer(() => {
  const { user } = useContext(Context);
  const { newsStore } = useContext(Context);

  const [isOpen, setIsOpen] = useState(false);
  const [whichOpen, setWhichOpen] = useState('');
  const [idNews, setIdNews] = useState(null);

  const { deleting, deleteError, handleDelete } = useDeleteNews();
  const { data, loading, error } = useQueryNews(50);

  const openModal = (nameModal, idNews) => {
    setIsOpen(true);
    setWhichOpen(nameModal);
    setIdNews(idNews);
  };

  const formatDate = (dateString) => {
    return dateString.split('T')[0];
  };

  const closeModal = () => {
    setIsOpen(false);
    setWhichOpen('');
    setIdNews(null);
  };

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <section className={styles.sectionNews}>
      <div className={styles.container}>
        <h2 className={styles.title}>Новости музея</h2>

        {user.IsAuth ? (
          <button className={styles.btnAdd} onClick={() => openModal('createNews')}>
            Добавить новость
          </button>
        ) : null}
        <div className={styles.newsContainer}>
          {loading ? <Spinner /> : null}
          {deleting ? <Spinner /> : null}
          {error ? 'Не удалось загрузить новости' : null}
          {newsStore.news.map((newsItem) => (
            <NewsItem
              key={newsItem.id}
              time={formatDate(newsItem.date_publication)}
              src={newsItem.images && newsItem.images.length > 0 ? newsItem.images[0].url : null}
              title={newsItem.title}
              content={newsItem.content}
              open={(modal) => openModal(modal, newsItem.id)}
              onClose={closeModal}
              onDelete={() => handleDelete(newsItem.id)}
            ></NewsItem>
          ))}
        </div>
      </div>

      <CreateNewsForm open={whichOpen === 'createNews'} onClose={closeModal}></CreateNewsForm>
      <EditNewsForm open={whichOpen === 'editNews'} onClose={closeModal}></EditNewsForm>
      <NewsModalShow open={whichOpen === 'showNews'} onClose={closeModal} idNews={idNews}></NewsModalShow>
    </section>
  );
});

export default News;
