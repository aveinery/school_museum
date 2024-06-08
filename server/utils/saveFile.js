import path from 'path';
import { __dirname } from '../index.js';
import { staticPath } from '../index.js';
import iconv from 'iconv-lite';

export const saveFile = (file) => {
  const binaryString = file.name;
  const decodedName = iconv.decode(Buffer.from(binaryString, 'binary'), 'utf-8');
  console.log(decodedName);
  file.name = decodedName;
  const name = file.name;
  const filename = `${Date.now()}-${name}`;
  const saveUrl = path.resolve(staticPath, filename);

  file.mv(saveUrl);

  return { url: filename, name };
};
