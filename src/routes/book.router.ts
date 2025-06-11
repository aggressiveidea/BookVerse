import { Router } from "express"
import { validateBook } from "../middlewares/validators/Validator.middleware"
import { bookController } from "../controllers/Book.controller"
import { authMiddleware } from "../middlewares/auth.middleware"

const router = Router()

router.get("/all", bookController.getAllBooks)
router.get("/:id", bookController.getBookByID)
router.post("/add", authMiddleware.checkAuth, validateBook, bookController.createBook)
router.put("/:id", authMiddleware.checkAuth, validateBook, bookController.updateBook)
router.delete("/:id", authMiddleware.checkAuth, bookController.deleteBook)

export default router