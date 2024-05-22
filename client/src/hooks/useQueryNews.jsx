import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { fetchNews } from '../http/newsAPI';
import { Context } from '../main';
import { observer } from 'mobx-react-lite';

// const truncateString = (str, num) => {
//   if (str.length <= num) {
//     return str;
//   }
//   return str.slice(0, num) + '...';
// };

const useQueryNews = (maxLength) => {
  // const [data, setData] = useState(null);
  const { newsStore } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchNews();

        newsStore.setNews(response);
        console.log(newsStore);

        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
        // const result = await response.json();

        // Обрезаем строки в полученных данных
        // const truncatedData = result.map((item) => ({
        //   ...item,
        //   truncatedString: truncateString(item.stringToTruncate, maxLength),
        // }));

        // setData(truncatedData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [maxLength]);

  return { loading, error };
};

export default useQueryNews;
