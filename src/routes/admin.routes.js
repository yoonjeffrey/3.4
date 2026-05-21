import express from 'express';
import * as adminController from '../controllers/admin.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/role.middleware.js';

const router = express.Router();

router.use(authMiddleware);
router.use(isAdmin);

router.get('/search/usuarios-por-etiquetas', adminController.searchUsuariosPorEtiquetas);
router.get('/search/tareas-por-etiquetas', adminController.searchTareasPorEtiquetas);
router.get('/search/etiquetas-por-usuarios', adminController.searchEtiquetasPorUsuarios);

export default router;
