import { useState, useContext } from 'react';
import { Context } from '../main';
import { deleteNews } from '../http/newsAPI';

const useDeleteNews = () => {
  const { newsStore } = useContext(Context);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async (id) => {
    setDeleting(true);
    setDeleteError(null);
    try {
      await deleteNews(id);
      newsStore.deleteNews(id);

      if (
        newsStore.news.length < newsStore.limit &&
        newsStore.page < Math.ceil(newsStore.totalCount / newsStore.limit)
      ) {
        const additionalData = await fetchNews(newsStore.page + 1, newsStore.limit);
        newsStore.setNews([...newsStore.news, ...additionalData.rows]);
      }
    } catch (error) {
      setDeleteError(error);
    } finally {
      setDeleting(false);
    }
  };

  return { deleting, deleteError, handleDelete };
};

export default useDeleteNews;
