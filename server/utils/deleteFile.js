import path from 'path';
import { unlink } from 'fs';
import { __dirname } from '../index.js';
import { staticPath } from '../index.js';

export const deleteFile = async (url) => {
  await unlink(path.resolve(staticPath, url), (error) => {
    if (error) throw error;
  });
};

