import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { fetchDocuments } from '../http/documentAPI';
import { Context } from '../main';
import { observer } from 'mobx-react-lite';

// const truncateString = (str, num) => {
//   if (str.length <= num) {
//     return str;
//   }
//   return str.slice(0, num) + '...';
// };

const useQueryDocuments = () => {
  const { documentStore } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDocuments();

        documentStore.setDocuments(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [documentStore]);

  return { loading, error };
};

export default useQueryDocuments;
