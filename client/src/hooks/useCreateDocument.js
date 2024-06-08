import { useState, useContext } from 'react';
import { createDocuments } from '../http/documentAPI';
import { Context } from '../main';

const useCreateDocument = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const { documentStore } = useContext(Context);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadDocument(file);
      e.target.value = '';
    }
  };

  const uploadDocument = async (file) => {
    setUploading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append('uploadDocument', file);
      const response = await createDocuments(formData);
      documentStore.addDocument(response);
    } catch (err) {
      setUploadError(err);
    } finally {
      setUploading(false);
    }
  };
  return { uploading, uploadError, handleFileChange };
};

export default useCreateDocument;
