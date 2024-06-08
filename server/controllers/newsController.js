import { File, Image, Link, News } from '../models/models.js';
import linkController from './linkController.js';
import fileController from './fileController.js';
import imageController from './imageController.js';
import ApiError from '../error/apiError.js';
import fileUpload from 'express-fileupload';
import { deleteFile } from '../utils/deleteFile.js';

const includeScheme = [
  {
    model: Link,
    as: 'links',
  },
  {
    model: File,
    as: 'files',
  },
  {
    model: Image,
    as: 'images',
  },
];

class NewsController {
  async create(req, res, next) {
    try {
      const { userId } = req.user;
      const { title, datePublication } = req.body;
      const { files, images } = req.files || {};
      const { content, links } = req.body || {};

      const newItem = await News.create({ title, date_publication: datePublication, content, userId });
      const newsId = newItem.dataValues.id;
      const needPromises = [];

      for (const link of JSON.parse(links)) {
        needPromises.push(linkController.create({ url: link, newsId }));
      }

      if (files) {
        for (const file of Array.isArray(files) ? files : [files]) {
          needPromises.push(fileController.create({ fileUpload: file, newsId }));
        }
      }
      if (images) {
        for (const image of Array.isArray(images) ? images : [images]) {
          needPromises.push(imageController.create({ fileUpload: image, newsId }));
        }
      }

      await Promise.all(needPromises);

      const result = await News.findOne({
        where: { id: newsId },
        include: includeScheme,
      });

      return res.json(result);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    let { limit, page } = req.query;
    page = page || 1;
    limit = limit || 3;
    let offset = page * limit - limit;
    try {
      const news = await News.findAndCountAll({
        order: [['id', 'DESC']],
        include: includeScheme,
        distinct: true,
        limit,
        offset,
      });
      return res.json(news);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const newItem = await News.findOne({
        where: { id },
        include: includeScheme,
      });

      return res.json(newItem);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const images = await Image.findAll({ where: { newsId: id } });
      const files = await File.findAll({ where: { newsId: id } });
      await News.destroy({ where: { id } });

      for (const { dataValues } of images) {
        deleteFile(dataValues.url);
      }

      for (const { dataValues } of files) {
        deleteFile(dataValues.url);
      }

      return res.json({ message: 'Success' });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { title, content, images = [], files = [], links = [] } = req.body;
      console.log(req);
      const { documentFiles = [], imagesFiles = [] } = req.files || {};

      console.log(req.files);
      console.log(images, files, links, imagesFiles, documentFiles);

      const remainingImages = JSON.parse(images);
      const remainingFiles = JSON.parse(files);
      const remainingLinks = JSON.parse(links);

      const needPromises = [];
      needPromises.push(News.update({ title, content }, { where: { id } }));

      const [currentImages, currentFiles, currentLinks] = await Promise.all([
        Image.findAll({ where: { newsId: id } }),
        File.findAll({ where: { newsId: id } }),
        Link.findAll({ where: { newsId: id } }),
      ]);

      for (const { dataValues, id } of currentImages) {
        if (remainingImages.some((remainingImage) => dataValues.id == remainingImage.id)) {
          continue;
        }

        deleteFile(dataValues.url);
        needPromises.push(Image.destroy({ where: { id } }));
      }

      for (const newImage of Array.isArray(imagesFiles) ? imagesFiles : [imagesFiles]) {
        imageController.create({ fileUpload: newImage, newsId: id });
      }

      for (const { dataValues, id } of currentFiles) {
        if (remainingFiles.some((remainingFile) => dataValues.id === remainingFile.id)) {
          continue;
        }

        deleteFile(dataValues.url);
        needPromises.push(File.destroy({ where: { id } }));
      }

      for (const newFile of Array.isArray(documentFiles) ? documentFiles : [documentFiles]) {
        fileController.create({ fileUpload: newFile, newsId: id });
      }

      for (const { dataValues, id } of currentLinks) {
        if (remainingLinks.some((remainingLink) => dataValues.id === remainingLink.id)) {
          continue;
        }

        needPromises.push(Link.destroy({ where: { id } }));
      }

      for (const link of remainingLinks) {
        if (link.id) {
          continue;
        }

        needPromises.push(Link.create({ url: link.url, newsId: id }));
      }

      await Promise.all(needPromises);

      const news = await News.findOne({ where: { id }, include: includeScheme });

      res.status(200).json(news);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

const newsController = new NewsController();

export default newsController;
