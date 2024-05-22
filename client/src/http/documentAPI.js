import { $authHost, $host } from './index';

export const fetchDocuments = async () => {
  const { data } = await $host.get('api/document/');
  return data;
};
