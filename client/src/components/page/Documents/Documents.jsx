import React, { useContext } from 'react';
import styles from './Documents.module.css';
import DocumentItem from '../../UI/DocumentItem/DocumentItem';
import { Context } from '../../../main';
import documentIcon from '../../../assets/images/file-icon.svg';
import useQueryDocuments from '../../../hooks/useQueryDocuments';

const Documents = () => {
  const { user } = useContext(Context);
  const { documentStore } = useContext(Context);

  const { loading, error } = useQueryDocuments();

  if (loading) {
    return <div>Loading../</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  console.log(documentStore);
  return (
    <section className={styles.documentSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Документы</h2>
        <div className={styles.documentBox}>
          {user.IsAuth ? (
            <form action="" method="" encType="multipart/form-data">
              <label className={styles.documentInput} autoFocus>
                <img className={styles.inputImg} src={documentIcon} alt="Иконка файла"></img>
                Выберите документ
                <input className={styles.input} type="file" onChange={this.form.submit()} name="myFile" />
              </label>
            </form>
          ) : (
            ''
          )}
          {documentStore.documents.map((document) => (
            <DocumentItem key={document.id} documentName={document.name} documentUrl={document.url}></DocumentItem>
          ))}
          {/* <DocumentItem documentName="dsdsd"></DocumentItem>
          <DocumentItem documentName="dsdsd"></DocumentItem>
          <DocumentItem documentName="dsdsd"></DocumentItem>
          <DocumentItem documentName="dsdsd"></DocumentItem>
          <DocumentItem documentName="dsdsd"></DocumentItem>
          <DocumentItem documentName="dsdsd"></DocumentItem>
          <DocumentItem documentName="dsdsd"></DocumentItem>
          <DocumentItem documentName="dsdsd"></DocumentItem>
          <DocumentItem documentName="dsdsd"></DocumentItem> */}
        </div>
      </div>
    </section>
  );
};

export default Documents;
