import React from 'react';
import styles from './NewsModalShow.module.css';
import Modal from '../../../UI/Modal/Modal';
import Spinner from '../../../UI/Spinner/Spinner';
import { useShowOneNews } from '../../../../hooks/useShowOneNews';
import DocumentItem from '../../../UI/DocumentItem/DocumentItem';
import linkIcon from '../../../../assets/images/link.svg';

const NewsModalShow = ({ open, onClose, idNews }) => {
  const { loading, error, news } = useShowOneNews(idNews);
  console.log(news);
  return (
    <Modal open={open} onClose={onClose}>
      {loading ? <Spinner /> : null}
      {error ? 'Не удалось загрузить новость' : null}

      <div className={styles.oneNews}>
        <time dateTime={news?.date_publication} className={styles.dateNews}>
          {news?.date_publication}
        </time>
        <h2 className={styles.titleNews}>{news?.title}</h2>
        <p className={styles.contentNews}>{news?.content}</p>

        {news?.links?.length > 0 ? <hr className={styles.horizontalLine}></hr> : null}
        {news?.links?.length > 0 ? <h3 className={styles.titleDescription}>Ссылки</h3> : null}
        {news?.links?.map((link) => (
          <a href={link.url} target="_blank" className={styles.newsLink}>
            <img src={linkIcon} alt="Иконка ссылки" className={styles.linkImg} />
            {link.url}
          </a>
        ))}

        {news?.images?.length > 0 ? <hr className={styles.horizontalLine}></hr> : null}
        {news?.images?.length > 0 ? <h3 className={styles.titleDescription}>Фото</h3> : null}
        <div className={styles.photos}>
          {news?.images?.map((image) => (
            <img src={import.meta.env.VITE_REACT_APP_API_URL + image.url} className={styles.newsPhoto}></img>
          ))}
        </div>

        {news?.files?.length > 0 ? <hr className={styles.horizontalLine}></hr> : null}
        {news?.files?.length > 0 ? <h3 className={styles.titleDescription}>Файлы</h3> : null}
        {news?.files?.map((file) => (
          <DocumentItem key={file.id} documentName={file.name} documentUrl={file.url} showDelete={false}></DocumentItem>
        ))}
      </div>
    </Modal>
  );
};

export default NewsModalShow;
