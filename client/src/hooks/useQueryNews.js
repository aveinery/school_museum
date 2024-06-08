import { useState, useEffect, useContext } from 'react';
import { fetchNews } from '../http/newsAPI';
import { Context } from '../main';

const useQueryNews = (maxLength) => {
  const { newsStore } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const truncateText = (text, length) => {
      if (!text) return '';
      return text.length <= length ? text : text.slice(0, length) + '...';
    };

    try {
      const response = await fetchNews(newsStore.page, newsStore.limit);
      const truncatedNews = response.rows.map((newsItem) => ({
        ...newsItem,
        content: truncateText(newsItem.content, 200),
      }));
      newsStore.setNews(truncatedNews);
      newsStore.setTotalCount(response.count);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [newsStore.page, newsStore.limit]);

  return { loading, error, refetch: fetchData };
};

export default useQueryNews;
