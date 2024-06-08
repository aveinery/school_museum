import React, { useState, useEffect, useContext, useRef } from 'react';
import styles from './CreateNewsForm.module.css';
import Modal from '../../../UI/Modal/Modal';
import addIcon from '../../../../assets/images/add.svg';
import documentIcon from '../../../../assets/images/file-icon.svg';
import { createNews } from '../../../../http/newsAPI';
import { Context } from '../../../../main';
import DocumentItem from '../../../UI/DocumentItem/DocumentItem';
import deleteIcon from '../../../../assets/images/delete-icon.svg';
import {
  MAX_CONTENT_LENGTH,
  MAX_FILES,
  MAX_FILE_SIZE,
  MAX_IMAGES,
  MAX_LINKS,
  MAX_TITLE_LENGTH,
} from '../../../../utils/consts';

const CreateNewsForm = ({ open, onClose }) => {
  const { newsStore } = useContext(Context);

  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState('');
  const [images, setImages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const createHandleKeyDown = (ref) => (event) => {
    if (event.key === 'Enter' && ref.current) {
      ref.current.click();
    }
  };

  const handleKeyDownImg = createHandleKeyDown(imageInputRef);
  const handleKeyDownFile = createHandleKeyDown(fileInputRef);

  const handleAddLink = () => {
    if (newLink.trim() && links.length < MAX_LINKS) {
      setLinks([...links, newLink]);
      setNewLink('');
    }
  };

  const handleRemoveLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.size <= MAX_FILE_SIZE);

    if (validFiles.length + images.length <= MAX_IMAGES) {
      setImages([...images, ...validFiles]);
    }

    e.target.value = '';
  };
  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.size <= MAX_FILE_SIZE);

    if (validFiles.length + documents.length <= MAX_FILES && files.some((file) => file.size < MAX_FILE_SIZE)) {
      setDocuments([...documents, ...validFiles]);
    }
    e.target.value = '';
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

      onClose(response);
    } catch (err) {
      alert('Не удалось создать новость');
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
            required
            maxLength={MAX_TITLE_LENGTH}
          />
          <textarea
            placeholder="Введите текст новости"
            className={styles.txtAreaContent}
            onChange={(e) => setContent(e.target.value)}
            value={content}
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

          {links.map((link, index) => (
            <div key={index} className={styles.linksContainer}>
              <a href={link} target="_blank" className={styles.link}>
                {link}
              </a>
              <button type="button" onClick={() => handleRemoveLink(index)} className={styles.btnDeleteLink}>
                <img src={deleteIcon} alt="Кнопка удаления" className={styles.btnLinkImg} />
              </button>
            </div>
          ))}

          <label className={styles.documentInput} autoFocus onKeyDown={handleKeyDownImg} tabIndex="0">
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
            <label className={styles.documentInput} autoFocus onKeyDown={handleKeyDownFile} tabIndex="0">
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

          <button type="submit" className={styles.buttonCreate}>
            Добавить
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateNewsForm;
