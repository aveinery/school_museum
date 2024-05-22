import { $authHost, $host } from './index';

export const fetchNews = async () => {
  const { data } = await $host.get('api/news/');
  return data;
};
