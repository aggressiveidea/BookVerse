import { authController } from "../controllers/auth.controller";
import { Router } from "express";
import { bookValidatorMiddleware } from "../middlewares/validators/bookValidator.middleware";

const router = Router();
router.post('/login', bookValidatorMiddleware.logedInUser, authController.login);
router.post('/register', bookValidatorMiddleware.registeredUser, authController.Register);

export default router 