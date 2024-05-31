import { $authHost, $host } from './index';

export const fetchDocuments = async () => {
  const { data } = await $host.get('api/document/');
  return data;
};

export const createDocuments = async (uploadDocument) => {
  const { data } = await $authHost.post('api/document/', uploadDocument, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const deleteDocuments = async (id) => {
  const { data } = await $authHost.delete('api/document/' + id);
};
