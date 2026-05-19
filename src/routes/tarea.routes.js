const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tarea.controller');

const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);

router.get('/buscar', tareaController.buscarPorTitulo);
router.get('/', tareaController.obtenerTodas);
router.get('/:id', tareaController.obtenerPorId);
router.post('/', tareaController.crear);
router.put('/:id', tareaController.actualizarCompleta);
router.patch('/:id', tareaController.actualizarParcial);
router.delete('/:id', tareaController.eliminar);

// Relation endpoints
router.post('/:id/personas/:personaId', tareaController.addPersona);
router.post('/:id/tags/:tagId', tareaController.addTag);
router.get('/:id/tags', tareaController.getTags);
router.get('/:id/personas', tareaController.getPersonas);

module.exports = router;
