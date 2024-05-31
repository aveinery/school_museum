import { useState, useContext } from 'react';
import { Context } from '../main';
import { deleteNews } from '../http/newsAPI';

const useDeleteNews = () => {
  const { newsStore } = useContext(Context);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async (id) => {
    console.log(id);
    setDeleting(true);
    setDeleteError(null);
    try {
      await deleteNews(id);
      newsStore.deleteNews(id);
    } catch (error) {
      setDeleteError(error);
    } finally {
      setDeleting(false);
    }
  };

  return { deleting, deleteError, handleDelete };
};

export default useDeleteNews;
