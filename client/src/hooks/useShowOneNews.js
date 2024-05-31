import { useState, useEffect } from 'react';
import { fetchOneNews } from '../http/newsAPI';

export const useShowOneNews = (id) => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const getNews = async () => {
      setLoading(true);
      try {
        const data = await fetchOneNews(id);
        setNews(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [id]);

  return { news, loading, error };
};
