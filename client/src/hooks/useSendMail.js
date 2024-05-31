import { useState } from 'react';
import { sendMail } from '../http/contactsAPI';

const useSendMail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const send = async (mail) => {
    setLoading(true);
    setError(null);
    try {
      console.log(mail);
      await sendMail(mail);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    send,
    loading,
    error,
  };
};

export default useSendMail;
