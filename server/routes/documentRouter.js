import { Router } from "express"
import documentController from "../controllers/documentController.js"

const router = new Router()

router.post("/", documentController.create)
router.get("/", documentController.getAll)
router.delete("/:id", documentController.delete)

export default router
