import { Router } from 'express';
import userController from '../controllers/userController.js';

const router = new Router();

router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/refreshToken', userController.refreshToken);

export default router;
