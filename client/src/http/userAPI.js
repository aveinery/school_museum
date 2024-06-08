import { $authHost, $host } from './index';
import { jwtDecode } from 'jwt-decode';

const setTokens = (params) => {
  const { token, refreshToken } = params;

  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
};

export const login = async (email, password) => {
  const { data } = await $host.post('api/user/login', { email, password });

  setTokens(data);
  return jwtDecode(data.token);
};

export const refreshToken = async () => {
  const { data } = await $host.post('api/user/refreshToken', { refreshToken: localStorage.getItem('refreshToken') });
  setTokens(data);

  return;
};
