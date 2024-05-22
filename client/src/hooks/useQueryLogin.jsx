import React, { useContext, useState } from 'react';
import { Context } from '../main';
import { observer } from 'mobx-react-lite';
import { login } from '../http/userAPI';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTE } from '../utils/consts';

const useQueryLogin = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login(email, password);
      console.log('Login successful', response);
      navigate(MAIN_ROUTE);
      user.setUser(response);
      user.setIsAuth(true);
      // Здесь вы можете сохранить токен или перенаправить пользователя
    } catch (err) {
      setError('Login failed');
      console.error('Login error', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    password,
    error,
    loading,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
};

export default useQueryLogin;
