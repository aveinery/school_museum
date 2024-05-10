import { Image } from '../models/models.js';
import { saveFile } from '../utils/saveFile.js';
import { deleteFile } from '../utils/deleteFile.js';

class ImageController {
  async create(params) {
    try {
      const { fileUpload, newsId } = params;
      const { url } = saveFile(fileUpload);

      const image = await Image.create({ url, newsId });

      return image;
    } catch (error) {
      console.error('Create image error');
      throw error;
    }
  }

  async delete(params) {
    try {
      const { id } = params;
      const image = await Image.findOne({ where: { id } });

      if (image) {
        deleteFile(image.dataValues.url);
      }

      await Image.destroy({ where: { id } });
      return { message: 'Success' };
    } catch (error) {
      console.error('Delete image error');
      throw error;
    }
  }
}

const imageController = new ImageController();

export default imageController;

