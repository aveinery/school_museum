import React from 'react';
import styles from './NewsModalShow.module.css';
import Modal from '../../../UI/Modal/Modal';
import Spinner from '../../../UI/Spinner/Spinner';
import { useShowOneNews } from '../../../../hooks/useShowOneNews';
import DocumentItem from '../../../UI/DocumentItem/DocumentItem';
import linkIcon from '../../../../assets/images/link.svg';

const NewsModalShow = ({ open, onClose, idNews }) => {
  const { loading, news, error } = useShowOneNews(idNews);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      {loading ? <Spinner /> : null}
      {error ? 'Не удалось загрузить новость' : null}

      <div className={styles.oneNews}>
        <time dateTime={news?.date_publication} className={styles.dateNews}>
          {formatDate(news?.date_publication)}
        </time>
        <h2 className={styles.titleNews}>{news?.title}</h2>
        <p className={styles.contentNews}>{news?.content}</p>

        {news?.links?.length > 0 ? <hr className={styles.horizontalLine}></hr> : null}
        {news?.links?.length > 0 ? <h3 className={styles.titleDescription}>Ссылки</h3> : null}
        {news?.links?.map((link) => (
          <a href={link.url} target="_blank" className={styles.newsLink} key={link.id}>
            <img src={linkIcon} alt="Иконка ссылки" className={styles.linkImg} />
            {link.url}
          </a>
        ))}

        {news?.images?.length > 0 ? <hr className={styles.horizontalLine}></hr> : null}
        {news?.images?.length > 0 ? <h3 className={styles.titleDescription}>Фото</h3> : null}
        <div className={styles.photos}>
          {news?.images?.map((image) => (
            <a
              href={import.meta.env.VITE_REACT_APP_API_URL + image.url}
              target="_blank"
              className={styles.newsPhoto}
              key={image.id}
            >
              <img src={import.meta.env.VITE_REACT_APP_API_URL_FILE + image.url} className={styles.photo}></img>
            </a>
          ))}
        </div>

        {news?.files?.length > 0 ? <hr className={styles.horizontalLine}></hr> : null}
        {news?.files?.length > 0 ? <h3 className={styles.titleDescription}>Файлы</h3> : null}
        {news?.files?.map((file) => (
          <DocumentItem
            key={file.id}
            documentName={file.name}
            documentUrl={file.url}
            showDelete={false}
            onNews={false}
          ></DocumentItem>
        ))}
      </div>
    </Modal>
  );
};

export default NewsModalShow;
