import React, { useContext } from 'react';
import styles from './NewsItem.module.css';
import iconEdit from '../../../assets/images/edit-icon.svg';
import iconDelete from '../../../assets/images/delete-icon.svg';
import { Context } from '../../../main';
import { observer } from 'mobx-react-lite';

const NewsItem = observer(({ time, src, alt, title, content, open, onDelete, onEdit }) => {
  const { user } = useContext(Context);
  return (
    <article className={styles.news}>
      <div className={styles.newsContainer}>
        <div className={styles.btnAndTxt}>
          <div className={styles.textNews}>
            <time className={styles.dateNews} dateTime={time}>
              {time}
            </time>
            <h2 className={styles.titleNews}>{title}</h2>
            <p className={styles.contentNews}>{content}</p>
          </div>
          <button className={styles.showNews} onClick={() => open('showNews')}>
            Посмотреть
          </button>
        </div>

        {user.IsAuth ? (
          <>
            <button className={styles.btnEdit} onClick={() => onEdit('editNews')}>
              <img src={iconEdit} alt="Иконка редактирования" />
            </button>
            <button className={styles.btnDelete} onClick={onDelete}>
              <img src={iconDelete} alt="Иконка удаления" />
            </button>
          </>
        ) : (
          ''
        )}
        {src === null ? null : (
          <img className={styles.imgNews} src={import.meta.env.VITE_REACT_APP_API_URL_FILE + src} alt={alt} />
        )}
      </div>
      <hr className={styles.horizontalLine}></hr>
    </article>
  );
});

export default NewsItem;
