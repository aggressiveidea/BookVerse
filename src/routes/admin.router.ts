import { UserController } from "../controllers/user.controller";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get('/all', authMiddleware.checkAdmin, UserController.getAllUsers);
router.get('/:id', authMiddleware.checkAdmin, UserController.getUserByID);
router.put('/:id', authMiddleware.checkAdmin, UserController.updateUser);
router.delete('/:id', authMiddleware.checkAdmin, UserController.deleteUser);

export default router;
