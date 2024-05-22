import path from 'path';
import { __dirname } from '../index.js';
import { staticPath } from '../index.js';

export const saveFile = (file) => {
  const name = file.name;
  const filename = `${Date.now()}-${name}`;
  const saveUrl = path.resolve(staticPath, filename);

  file.mv(saveUrl);

  return { url: filename, name };
};
