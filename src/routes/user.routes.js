const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes
router.put('/:id', authMiddleware, userController.update);
router.delete('/:id', authMiddleware, userController.deletePhysical);
router.patch('/:id/activate', authMiddleware, userController.activate);
router.patch('/:id/deactivate', authMiddleware, userController.deactivate);

module.exports = router;
