import React, { useState, useEffect, useContext } from 'react';
import styles from './CreateNewsForm.module.css';
import Modal from '../../../UI/Modal/Modal';
import addIcon from '../../../../assets/images/add.svg';
import documentIcon from '../../../../assets/images/file-icon.svg';
import { createNews } from '../../../../http/newsAPI';
import { Context } from '../../../../main';
import { observer } from 'mobx-react-lite';

const CreateNewsForm = ({ open, onClose }) => {
  const { newsStore } = useContext(Context);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState('');
  const [images, setImages] = useState([]);
  const [documents, setDocuments] = useState([]);

  const handleAddLink = () => {
    if (newLink.trim()) {
      setLinks([...links, newLink]);
      setNewLink('');
    }
  };

  const handleRemoveLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e) => {
    setImages([...images, ...e.target.files]);
  };
  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleDocumentUpload = (e) => {
    setDocuments([...documents, ...e.target.files]);
  };

  const handleRemoveDocument = (index) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date().toISOString();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('datePublication', date);
    formData.append('links', JSON.stringify(links));

    images.forEach((image) => {
      formData.append('images', image);
    });

    documents.forEach((document) => {
      formData.append('files', document);
    });

    try {
      const response = await createNews(formData);
      newsStore.addNews(response);
      console.log(response);
      console.log(newsStore);

      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!open) {
      setTitle('');
      setContent('');
      setLinks([]);
      setImages([]);
      setDocuments([]);
      setNewLink('');
    }
  }, [open]);
  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.formCreate}>
        <form action="" className={styles.formCreate} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Введите заголовок"
            className={styles.inputTitle}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Введите текст новости"
            className={styles.txtAreaContent}
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>

          <div className={styles.addLink}>
            <input
              className={styles.inputLink}
              type="text"
              placeholder="Введите ссылку"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
            />
            <button type="button" onClick={handleAddLink} className={styles.btnAddLink}>
              <img src={addIcon} alt="Иконка добавления" />
            </button>
          </div>

          {links.map((link, index) => (
            <div key={index} className={styles.linksContainer}>
              <a href={link} target="_blank" className={styles.link}>
                {link}
              </a>
              <button type="button" onClick={() => handleRemoveLink(index)}>
                Удалить
              </button>
            </div>
          ))}

          <label className={styles.documentInput} autoFocus>
            <img className={styles.inputImg} src={documentIcon} alt="Иконка файла"></img>
            Загрузить фото
            <input className={styles.input} type="file" onChange={handleImageUpload} accept=".png,.jpg" />
          </label>
          <div className={styles.imagesPreview}>
            {images.map((image, index) => (
              <div key={index} className={styles.imageContainer}>
                <img src={URL.createObjectURL(image)} alt="Превью фото" className={styles.imagePreview} />
                <button type="button" onClick={() => handleRemoveImage(index)} className={styles.btnDeleteImg}>
                  Удалить
                </button>
              </div>
            ))}
          </div>

          <div>
            <label className={styles.documentInput} autoFocus>
              <img className={styles.inputImg} src={documentIcon} alt="Иконка файла"></img>
              Загрузить документ
              <input
                className={styles.input}
                type="file"
                onChange={handleDocumentUpload}
                accept=".doc,.docx,.xlsx,.pdf,.ppt,.pptx"
              />
            </label>

            {documents.map((document, index) => (
              <div key={index} className={styles.fileContainer}>
                <a href={URL.createObjectURL(document)} target="_blank">
                  {document.name}
                </a>
                <button type="button" onClick={() => handleRemoveDocument(index)}>
                  Удалить
                </button>
              </div>
            ))}
          </div>

          <button type="submit" className={styles.buttonCreate}>
            Отправить
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateNewsForm;
