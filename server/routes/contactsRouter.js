import { Router } from 'express';
import contactsController from '../controllers/contactsController.js';

const router = new Router();

router.post('/', contactsController.create);

export default router;
