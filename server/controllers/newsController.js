import { News } from "../models/models.js"
import { v4 as uuidv4 } from "uuid"

class NewsController {
  async create(req, res) {
    const { title, date_publication, content } = req.body
    const { link } = req.body
    const { img } = req.files
    let imgName = uuidv4() + ".jpg"
    const { file } = req.files
    let fileName = uuidv4() + ".jpg"
  }

  async getAll(req, res) {}

  async getOne(req, res) {}

  async delete(req, res) {}

  async update(req, res) {}
}

const newsController = new NewsController()

export default newsController
