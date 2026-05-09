const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/role.middleware');

router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes (Admin only)
router.get('/', authMiddleware, isAdmin, userController.getAll);
router.put('/:id', authMiddleware, isAdmin, userController.update);
router.delete('/:id', authMiddleware, isAdmin, userController.deletePhysical);
router.patch('/:id/activate', authMiddleware, isAdmin, userController.activate);
router.patch('/:id/deactivate', authMiddleware, isAdmin, userController.deactivate);

module.exports = router;
