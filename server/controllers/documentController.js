import models from "../models/models.js"

import { v4 as uuidv4 } from "uuid"
import path from "path"
import ApiError from "../error/apiError.js"

class DocumentController {
  async create(req, res, next) {
    try {
      const { userId } = req.body
      const { uploadDocument } = req.file

      let url = `${Date.now()}-${file.originalname}`
      let name = req.file.originalname

      uploadDocument.mv(path.resolve(__dirname, "..", "static", url))

      const document = await models.Document.create({ url, name, userId })

      return res.json(document)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {}

  async delete(req, res) {}
}

const documentController = new DocumentController()

export default documentController
