import React, { useContext, useState } from 'react';
import { Context } from '../main';
import { login } from '../http/userAPI';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTE } from '../utils/consts';

const useQueryLogin = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendLogin = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await login(email, password);
      navigate(MAIN_ROUTE);
      user.setUser(response);
      user.setIsAuth(true);
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    sendLogin,
  };
};

export default useQueryLogin;
