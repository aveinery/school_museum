import { Router } from 'express';
import documentController from '../controllers/documentController.js';
import { authMiddleware } from '../middleware/AuthMiddleware.js';

const router = new Router();

router.post('/', documentController.create);
router.get('/', documentController.getAll);
router.delete('/:id', authMiddleware, documentController.delete);

export default router;
