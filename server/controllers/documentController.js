import path from 'path';
import { unlink } from 'fs';
import ApiError from '../error/apiError.js';
import { Document } from '../models/models.js';
import { __dirname } from '../index.js';
import { saveFile } from '../utils/saveFile.js';
import imageController from './imageController.js';
import { staticPath } from '../index.js';
import { deleteFile } from '../utils/deleteFile.js';
import iconv from 'iconv-lite';

class DocumentController {
  async create(req, res, next) {
    try {
      const { userId } = req.user;
      const { uploadDocument } = req.files;

      const { url, name } = saveFile(uploadDocument);

      const document = await Document.create({ url, name, userId });

      return res.json(document);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(_, res) {
    const documents = await Document.findAll({ order: [['id', 'ASC']] });
    return res.json(documents);
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const document = await Document.findOne({ where: { id } });

      if (document) {
        deleteFile(document.dataValues.url);
      }

      await Document.destroy({ where: { id } });
      return res.json({ message: 'Success' });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

const documentController = new DocumentController();

export default documentController;
