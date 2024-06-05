import { $authHost, $host } from './index';

export const fetchDocuments = async () => {
  const { data } = await $host.get('api/document/');
  return data;
};

export const createDocuments = async (uploadDocument) => {
  console.log(uploadDocument);
  const { data } = await $authHost.post('api/document/', uploadDocument);
  return data;
};

export const deleteDocuments = async (id) => {
  const { data } = await $authHost.delete('api/document/' + id);
};
