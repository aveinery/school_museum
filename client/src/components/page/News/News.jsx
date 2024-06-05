import React, { useContext, useState } from 'react';
import styles from './News.module.css';
import NewsItem from '../../UI/NewsItem/NewsItem';
import NewsModalShow from './NewsModalShow/NewsModalShow';
import CreateNewsForm from './CreateNewsForm/CreateNewsForm';
import EditNewsForm from './EditNewsForm/EditNewsForm';
import { Context } from '../../../main';
import { observer } from 'mobx-react-lite';
import useQueryNews from '../../../hooks/useQueryNews';
import useDeleteNews from '../../../hooks/useDeleteNews';
import Spinner from '../../UI/Spinner/Spinner';
import Pagination from '../../UI/Pagination/Pagination';

const News = observer(() => {
  const { user } = useContext(Context);
  const { newsStore } = useContext(Context);

  const [isOpen, setIsOpen] = useState(false);
  const [whichOpen, setWhichOpen] = useState('');
  const [idNews, setIdNews] = useState(null);

  const { deleting, deleteError, handleDelete } = useDeleteNews();
  const { data, loading, error, refetch } = useQueryNews(50);

  const openModal = (nameModal, idNews) => {
    setIsOpen(true);
    setWhichOpen(nameModal);
    setIdNews(idNews);
  };

  const closeModal = () => {
    setIsOpen(false);
    setWhichOpen('');
    setIdNews(null);
  };

  const closeEditModal = (data) => {
    if (data) {
      newsStore.updateNews(data);
    }
    closeModal();
  };

  const closeCreateModal = (data) => {
    if (data) {
      newsStore.addNews([data, ...newsStore.news]);
      newsStore.setTotalCount(newsStore.totalCount + 1);
      newsStore.setPage(1);
      refetch();
    }
    closeModal();
  };

  const handleDeleteNews = async (id) => {
    await handleDelete(id);
    if (newsStore.news.length === 0 && newsStore.page > 1) {
      newsStore.setPage(newsStore.page - 1);
    } else {
      refetch();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <section className={styles.sectionNews}>
      <div className={styles.container}>
        <div className={styles.titles}>
          <h2 className={styles.title}>Новости музея</h2>

          {user.IsAuth ? (
            <button className={styles.btnAdd} onClick={() => openModal('createNews')}>
              Добавить новость
            </button>
          ) : null}
        </div>
        <div className={styles.newsContainer}>
          {loading ? <Spinner /> : null}
          {deleting ? <Spinner /> : null}
          {error ? 'Не удалось загрузить новости' : null}
          {newsStore.news.length === 0 ? (
            <div className={styles.newsNone}>Пока новостей нет...</div>
          ) : (
            newsStore.news.map((newsItem) => (
              <NewsItem
                key={newsItem.id}
                time={formatDate(newsItem.date_publication)}
                src={newsItem.images && newsItem.images.length > 0 ? newsItem.images[0].url : null}
                title={newsItem.title}
                content={newsItem.content}
                open={(modal) => openModal(modal, newsItem.id)}
                onClose={closeModal}
                onDelete={() => handleDeleteNews(newsItem.id)}
                onEdit={(modal) => openModal(modal, newsItem.id)}
              ></NewsItem>
            ))
          )}
          {newsStore.news.length > 0 && <Pagination />}
        </div>
      </div>

      <CreateNewsForm open={whichOpen === 'createNews'} onClose={closeCreateModal}></CreateNewsForm>
      <EditNewsForm open={whichOpen === 'editNews'} onClose={closeEditModal} idNews={idNews}></EditNewsForm>
      <NewsModalShow open={whichOpen === 'showNews'} onClose={closeModal} idNews={idNews}></NewsModalShow>
    </section>
  );
});

export default News;
