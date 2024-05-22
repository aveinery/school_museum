import { File } from '../models/models.js';
import { saveFile } from '../utils/saveFile.js';
import { deleteFile } from '../utils/deleteFile.js';

class FileController {
  async create(params) {
    try {
      const { fileUpload, newsId } = params;
      const { url, name } = saveFile(fileUpload);

      const file = await File.create({ url, name, newsId });

      return file;
    } catch (error) {
      console.error('Create file error', error);
      throw error;
    }
  }

  async delete(params) {
    try {
      const { id } = params;
      const file = await File.findOne({ where: { id } });

      if (file) {
        deleteFile(file.dataValues.url);
      }

      await File.destroy({ where: { id } });
      return { message: 'Success' };
    } catch (error) {
      console.error('Delete file error');
      throw error;
    }
  }
}

const fileController = new FileController();

export default fileController;
