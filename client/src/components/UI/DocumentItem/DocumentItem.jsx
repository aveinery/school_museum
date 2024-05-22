import React, { useContext } from 'react';
import fileIcon from '../../../assets/images/file-icon.svg';
import styles from './DocumentItem.module.css';
import { Context } from '../../../main';
import deleteIcon from '../../../assets/images/delete-icon-blue.svg';
import { observer } from 'mobx-react-lite';

const DocumentItem = observer(({ documentName, documentUrl }) => {
  const { user } = useContext(Context);

  return (
    <>
      <a className={styles.btnDocument} href={import.meta.env.VITE_REACT_APP_API_URL + documentUrl}>
        <img className={styles.btnImg} src={fileIcon} alt="Иконка файла" />
        {documentName}
        {user.IsAuth ? (
          <button className={styles.btnDelete}>
            <img src={deleteIcon} alt="Иконка удаления" />
          </button>
        ) : (
          ''
        )}
      </a>
    </>
  );
});

export default DocumentItem;
