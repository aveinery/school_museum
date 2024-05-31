import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { fetchNews } from '../http/newsAPI';
import { Context } from '../main';
import { observer } from 'mobx-react-lite';

const useQueryNews = (maxLength) => {
  const { newsStore } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchNews();

        newsStore.setNews(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [newsStore]);

  return { loading, error };
};

export default useQueryNews;
