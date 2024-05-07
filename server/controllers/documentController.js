import { Document } from "../models/models.js"
import path from "path"
import ApiError from "../error/apiError.js"
import { __dirname } from "../index.js"
import { unlink } from "fs"
import { error } from "console"

class DocumentController {
  async create(req, res, next) {
    try {
      const { userId } = req.body
      const { uploadDocument } = req.files

      const name = uploadDocument.name
      const url = `${Date.now()}-${name}`

      uploadDocument.mv(path.resolve(__dirname, "..", "static", url))

      const document = await Document.create({ url, name, userId })

      return res.json(document)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    const documents = await Document.findAll()
    return res.json(documents)
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params
      const document = await Document.findOne({ where: { id } })
      console.log(req.params)
      console.log(document)

      if (document) {
        await unlink(
          path.resolve(__dirname, "..", "static", document.dataValues.url)
        )
      }

      await Document.destroy({ where: { id } })
      return res.json("udalilos")
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

const documentController = new DocumentController()

export default documentController
