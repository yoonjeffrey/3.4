import express from 'express';
import * as tagController from '../controllers/tag.controller.js';

const router = express.Router();

router.get('/', tagController.getAll);
router.get('/persona/:personaId', tagController.getByPersona);
router.get('/:id', tagController.getById);
router.post('/', tagController.create);
router.put('/:id', tagController.update);
router.delete('/:id', tagController.remove);

// Relations
router.get('/:id/tareas', tagController.getTareas);

export default router;
