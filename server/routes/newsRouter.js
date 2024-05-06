import { Router } from "express"

const router = new Router()

router.post("/")
router.get("/")
router.get("/:id")
router.delete("/:id")
router.put("/:id")

export default router
