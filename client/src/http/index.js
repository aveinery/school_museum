import axios from 'axios';
import { refreshToken } from './userAPI';

const $host = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

$authHost.interceptors.response.use(authInterceptor, async (error, options) => {
  console.log('test - // inctercepot', { error, options });
  if (error.response.status === 401 && localStorage.getItem('refreshToken')) {
    await refreshToken();

    await $authHost.request({
      method: error.config.method.toUpperCase(),
      url: error.config.url,
      data: error.config.data,
    });
  }
});

export { $host, $authHost };
