import { useState, useContext } from 'react';
import { Context } from '../main';
import { deleteDocuments } from '../http/documentAPI';

const useDeleteDocument = () => {
  const { documentStore } = useContext(Context);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async (id) => {
    setDeleting(true);
    setDeleteError(null);
    try {
      await deleteDocuments(id);
      documentStore.deleteDocument(id);
    } catch (error) {
      setDeleteError(error);
    } finally {
      setDeleting(false);
    }
  };

  return { deleting, deleteError, handleDelete };
};

export default useDeleteDocument;
