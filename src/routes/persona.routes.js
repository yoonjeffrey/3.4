const express = require('express');
const router = express.Router();
const personaController = require('../controllers/persona.controller');

router.get('/', personaController.getAll);
router.get('/tag/:tagId', personaController.getByTag);
router.get('/:id', personaController.getById);
router.post('/', personaController.create);
router.put('/:id', personaController.update);
router.delete('/:id', personaController.delete);

// Relations
router.get('/:id/tareas', personaController.getTareas);

module.exports = router;
