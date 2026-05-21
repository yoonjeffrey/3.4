import express from 'express';
import * as userController from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/role.middleware.js';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes (Admin only)
router.get('/', authMiddleware, isAdmin, userController.getAll);
router.put('/:id', authMiddleware, isAdmin, userController.update);
router.delete('/:id', authMiddleware, isAdmin, userController.deletePhysical);
router.patch('/:id/activate', authMiddleware, isAdmin, userController.activate);
router.patch('/:id/deactivate', authMiddleware, isAdmin, userController.deactivate);

export default router;
