const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/role.middleware');

router.use(authMiddleware);
router.use(isAdmin);

router.get('/search/usuarios-por-etiquetas', adminController.searchUsuariosPorEtiquetas);
router.get('/search/tareas-por-etiquetas', adminController.searchTareasPorEtiquetas);
router.get('/search/etiquetas-por-usuarios', adminController.searchEtiquetasPorUsuarios);

module.exports = router;
