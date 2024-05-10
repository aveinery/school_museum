import { Link } from '../models/models.js';

class LinkController {
  async create(params) {
    try {
      const { url, newsId } = params;

      const link = await Link.create({ url, newsId });

      return link;
    } catch (error) {
      console.error('Create link error');
      throw error;
    }
  }

  async delete(params) {
    try {
      const { id } = params;

      await Link.destroy({ where: { id } });

      return { message: 'Success' };
    } catch (error) {
      console.error('Delete link error');
      throw error;
    }
  }
}

const linkController = new LinkController();

export default linkController;

