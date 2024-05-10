import { Router } from 'express';
import newsController from '../controllers/newsController.js';
import { authMiddleware } from '../middleware/AuthMiddleware.js';

const router = new Router();

router.post('/', authMiddleware, newsController.create);
router.get('/', newsController.getAll);
router.get('/:id', newsController.getOne);
router.delete('/:id', authMiddleware, newsController.delete);
router.put('/:id', authMiddleware, newsController.update);

export default router;

