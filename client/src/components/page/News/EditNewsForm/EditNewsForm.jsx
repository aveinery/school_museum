import React, { useEffect, useState, useRef } from 'react';
import styles from './EditNewsForm.module.css';
import Modal from '../../../UI/Modal/Modal';
import { useShowOneNews } from '../../../../hooks/useShowOneNews';
import Spinner from '../../../UI/Spinner/Spinner';
import addIcon from '../../../../assets/images/add.svg';
import documentIcon from '../../../../assets/images/file-icon.svg';
import DocumentItem from '../../../UI/DocumentItem/DocumentItem';
import deleteIcon from '../../../../assets/images/delete-icon.svg';
import { updateNews } from '../../../../http/newsAPI';
import {
  MAX_CONTENT_LENGTH,
  MAX_FILES,
  MAX_FILE_SIZE,
  MAX_IMAGES,
  MAX_LINKS,
  MAX_TITLE_LENGTH,
} from '../../../../utils/consts';

const EditNewsForm = ({ open, onClose, idNews }) => {
  const { loading, error, news } = useShowOneNews(idNews);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [clientLinks, setClientLinks] = useState([]);
  const [serverLinks, setServerLinks] = useState([]);
  const [newLink, setNewLink] = useState('');
  const [images, setImages] = useState([]);
  const [serverImages, setServerImages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [serverDocuments, setServerDocuments] = useState([]);

  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const createHandleKeyDown = (ref) => (event) => {
    if (event.key === 'Enter' && ref.current) {
      ref.current.click();
    }
  };

  const handleKeyDownImg = createHandleKeyDown(imageInputRef);
  const handleKeyDownFile = createHandleKeyDown(fileInputRef);

  useEffect(() => {
    if (news) {
      setTitle(news?.title);
      setContent(news?.content);
      setServerLinks(news?.links || []);
      setServerImages(news?.images || []);
      setServerDocuments(news?.files || []);
    }
  }, [news]);

  useEffect(() => {
    if (!open) {
      setClientLinks([]);
      setNewLink('');
      setImages([]);
      setDocuments([]);
    }
  }, [open]);

  const handleAddLink = () => {
    if (newLink.trim() && clientLinks.length + serverLinks.length < MAX_LINKS) {
      setClientLinks([...clientLinks, { url: newLink }]);
      setNewLink('');
    }
  };

  const handleRemoveLink = (index) => {
    setClientLinks(clientLinks.filter((_, i) => i !== index));
  };

  const handleRemoveServerLink = (link) => {
    setServerLinks(serverLinks.filter((links) => links.id !== link.id));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length + serverImages.length <= MAX_IMAGES) {
      setImages([...images, ...files]);
    }
    e.target.value = '';
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleRemoveServerImage = (image) => {
    setServerImages(serverImages.filter((img) => img.id !== image.id));
  };

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.size <= MAX_FILE_SIZE);

    if (validFiles.length + documents.length + serverDocuments.length <= MAX_FILES) {
      setDocuments([...documents, ...validFiles]);
    }
    e.target.value = '';
  };

  const handleRemoveDocument = (index) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const handleRemoveServerDocument = (document) => {
    setServerDocuments(serverDocuments.filter((doc) => doc.id !== document.id));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date().toISOString();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('links', JSON.stringify([...serverLinks, ...clientLinks]));
    formData.append('images', JSON.stringify(serverImages));
    formData.append('files', JSON.stringify(serverDocuments));

    images.forEach((image) => {
      formData.append('imagesFiles', image);
    });

    documents.forEach((document) => {
      formData.append('documentFiles', document);
    });

    try {
      const response = await updateNews(idNews, formData);
      onClose(response);
    } catch (err) {
      alert('Не удалось обновить новость');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      {loading ? <Spinner /> : null}
      {error ? 'Не удалось загрузить новость' : null}

      <div key={idNews}>
        <form action="" onSubmit={handleSubmit} className={styles.editNewsForm}>
          <time dateTime={news?.date_publication} className={styles.dateNews}>
            {formatDate(news?.date_publication)}
          </time>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.inputTitle}
            placeholder="Введите заголовок"
            maxLength={MAX_TITLE_LENGTH}
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.txtAreaContent}
            wrap="hard"
            maxLength={MAX_CONTENT_LENGTH}
          ></textarea>

          <div className={styles.addLink}>
            <input
              className={styles.inputLink}
              type="text"
              placeholder="Введите ссылку (не более 5)"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
            />
            <button type="button" onClick={handleAddLink} className={styles.btnAddLink}>
              <img src={addIcon} alt="Иконка добавления" />
            </button>
          </div>
          {clientLinks.map((link, index) => (
            <div key={index} className={styles.linksContainer}>
              <a href={link.url} target="_blank" className={styles.link}>
                {link.url}
              </a>
              <button type="button" onClick={() => handleRemoveLink(index)} className={styles.btnDeleteLink}>
                <img src={deleteIcon} alt="Кнопка удаления" className={styles.btnLinkImg} />
              </button>
            </div>
          ))}
          {serverLinks.map((link) => (
            <div key={link.id} className={styles.linksContainer}>
              <a href={link.url} target="_blank" className={styles.link}>
                {link.url}
              </a>
              <button type="button" onClick={() => handleRemoveServerLink(link)} className={styles.btnDeleteLink}>
                <img src={deleteIcon} alt="Кнопка удаления" className={styles.btnLinkImg} />
              </button>
            </div>
          ))}

          <label className={styles.documentInput} autoFocus tabIndex="0" onKeyDown={handleKeyDownImg}>
            <img className={styles.inputImg} src={documentIcon} alt="Иконка файла"></img>
            Загрузить фото
            <input
              className={styles.input}
              type="file"
              onChange={handleImageUpload}
              accept=".png,.jpg"
              ref={imageInputRef}
            />
          </label>
          <p className={styles.warning}>Не более 10 фото</p>
          <div className={styles.imagesPreview}>
            {serverImages.map((image) => (
              <div key={image.id} className={styles.imageContainer}>
                <img
                  src={import.meta.env.VITE_REACT_APP_API_URL_FILE + image.url}
                  alt="Превью фото"
                  className={styles.imagePreview}
                />
                <button type="button" onClick={() => handleRemoveServerImage(image)} className={styles.btnDeleteImg}>
                  Удалить
                </button>
              </div>
            ))}
          </div>
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
            <label className={styles.documentInput} autoFocus tabIndex="0" onKeyDown={handleKeyDownFile}>
              <img className={styles.inputImg} src={documentIcon} alt="Иконка файла"></img>
              Загрузить файл
              <input
                className={styles.input}
                type="file"
                onChange={handleDocumentUpload}
                accept=".doc,.docx,.xlsx,.pdf,.ppt,.pptx"
                ref={fileInputRef}
              />
            </label>
            <p className={styles.warning}>Не более 5 файлов размером не более 20Мб</p>
            {serverDocuments.map((document) => (
              <div key={document.id}>
                <DocumentItem
                  documentName={document.name}
                  documentUrl={document.url}
                  onDelete={() => handleRemoveServerDocument(document)}
                  onNews={false}
                  showDelete={true}
                ></DocumentItem>
              </div>
            ))}
            {documents.map((document, index) => (
              <div key={index}>
                <DocumentItem
                  documentName={document.name}
                  documentUrl={URL.createObjectURL(document)}
                  onDelete={() => handleRemoveDocument(index)}
                  onNews={true}
                  showDelete={true}
                ></DocumentItem>
              </div>
            ))}
          </div>

          <button type="submit" className={styles.buttonEdit}>
            Изменить
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EditNewsForm;
