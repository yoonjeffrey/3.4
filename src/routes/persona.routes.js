import express from 'express';
import * as personaController from '../controllers/persona.controller.js';

const router = express.Router();

router.get('/', personaController.getAll);
router.get('/tag/:tagId', personaController.getByTag);
router.get('/:id', personaController.getById);
router.post('/', personaController.create);
router.put('/:id', personaController.update);
router.delete('/:id', personaController.remove);

// Relations
router.get('/:id/tareas', personaController.getTareas);

export default router;
