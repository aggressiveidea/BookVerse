import { bookController } from "../controllers/Book.controller"
import { Router } from "express"
import { bookValidatorMiddleware } from "../middlewares/validators/bookValidator.middleware"

const router = Router()

router.get("/all", bookController.getAllBooks)

router.post("/", bookValidatorMiddleware.validBook, bookController.createBook)

router.get("/:id", bookController.getBookByID)

router.put("/:id", bookValidatorMiddleware.validBook, bookController.updateBook)

router.delete("/:id", bookController.deleteBook)

export default router
