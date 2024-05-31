import { $authHost, $host } from './index';

export const fetchNews = async () => {
  const { data } = await $host.get('api/news/');
  return data;
};

export const fetchOneNews = async (id) => {
  const { data } = await $host.get('api/news/' + id);
  return data;
};

export const deleteNews = async (id) => {
  const { data } = await $authHost.delete('api/news/' + id);
  return data;
};

export const createNews = async (news) => {
  const { data } = await $authHost.post('api/news/', news);
  return data;
};

export const updateNews = async (id) => {
  const { data } = await $authHost.put('api/news/' + id);
  return data;
};
