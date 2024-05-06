import { Router } from "express"
import documentController from "../controllers/documentController.js"

const router = new Router()

router.post("/", documentController.create)
router.get("/", (req, res) => {
  res.json({ message: "fff" })
})
router.delete("/:id")

export default router
