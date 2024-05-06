import { Router } from "express"

const router = new Router()

router.post("/")
router.get("/")
router.delete("/:id")

export default router
