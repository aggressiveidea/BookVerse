import { Router } from "express"
import { validateRegister, validateLogin } from "../middlewares/validators/Validator.middleware"
import { authController } from "../controllers/auth.controller"

const router = Router()

router.post("/register", validateRegister, authController.Register)
router.post("/login", validateLogin, authController.login)

export default router
