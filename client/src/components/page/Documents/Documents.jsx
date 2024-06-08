import React, { useContext, useRef } from 'react';
import styles from './Documents.module.css';
import DocumentItem from '../../UI/DocumentItem/DocumentItem';
import { Context } from '../../../main';
import documentIcon from '../../../assets/images/file-icon.svg';
import useQueryDocuments from '../../../hooks/useQueryDocuments';
import useCreateDocument from '../../../hooks/useCreateDocument';
import useDeleteDocument from '../../../hooks/useDeleteDocument';
import Spinner from '../../UI/Spinner/Spinner';
import { observer } from 'mobx-react-lite';

const Documents = observer(() => {
  const { user } = useContext(Context);
  const { documentStore } = useContext(Context);

  const { loading, error } = useQueryDocuments();
  const { uploading, uploadError, handleFileChange } = useCreateDocument();
  const { deleting, deleteError, handleDelete } = useDeleteDocument();
  const fileInputRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <section className={styles.documentSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Документы</h2>
        <div className={styles.documentBox}>
          {deleteError ? 'Не удалось удалить документ' : null}
          {uploadError ? 'Не удалось загрузить документ' : null}
          {user.IsAuth ? (
            <form action="" method="" encType="multipart/form-data">
              <label className={styles.documentInput} autoFocus tabIndex="0" onKeyDown={handleKeyDown}>
                <img className={styles.inputImg} src={documentIcon} alt="Иконка файла"></img>
                {uploading ? 'Документ загружается...' : 'Выберите документ'}
                <input
                  ref={fileInputRef}
                  className={styles.input}
                  type="file"
                  onChange={handleFileChange}
                  name="myFile"
                  accept=".doc,.docx,.xlsx,.pdf,.ppt,.pptx"
                />
              </label>
              <p className={styles.warning}>Не более 20Мб</p>
            </form>
          ) : (
            ''
          )}
          {loading ? <Spinner></Spinner> : null}
          {deleting ? <Spinner /> : null}
          {error ? 'Не удалось загрузить документы' : null}
          {documentStore.documents.map((document) => (
            <DocumentItem
              key={document.id}
              documentName={document.name}
              documentUrl={document.url}
              onDelete={() => handleDelete(document.id)}
              showDelete={true}
              onNews={false}
            ></DocumentItem>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Documents;
