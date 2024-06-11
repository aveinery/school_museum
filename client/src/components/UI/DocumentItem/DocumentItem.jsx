import React, { useContext } from 'react';
import fileIcon from '../../../assets/images/file-icon.svg';
import styles from './DocumentItem.module.css';
import { Context } from '../../../main';
import deleteIcon from '../../../assets/images/delete-icon-blue.svg';
import { observer } from 'mobx-react-lite';

const DocumentItem = observer(({ documentName, documentUrl, onDelete, showDelete, onNews }) => {
  const { user } = useContext(Context);
  return (
    <div className={styles.item}>
      <a
        className={styles.btnDocument}
        href={onNews ? documentUrl : import.meta.env.VITE_REACT_APP_API_URL_FILE + documentUrl}
        target="_blank"
      >
        <img className={styles.btnImg} src={fileIcon} alt="Иконка файла" />
        {documentName}
      </a>

      {user.IsAuth && showDelete ? (
        <button className={styles.btnDelete} onClick={onDelete}>
          <img src={deleteIcon} alt="Иконка удаления" className={styles.imgDelete} />
        </button>
      ) : (
        ''
      )}
    </div>
  );
});

export default DocumentItem;
