const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tag.controller');

router.get('/', tagController.getAll);
router.get('/persona/:personaId', tagController.getByPersona);
router.get('/:id', tagController.getById);
router.post('/', tagController.create);
router.put('/:id', tagController.update);
router.delete('/:id', tagController.delete);

// Relations
router.get('/:id/tareas', tagController.getTareas);

module.exports = router;
