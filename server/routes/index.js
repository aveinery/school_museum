import { Router } from 'express';
import documentRouter from './documentRouter.js';
import newsRouter from './newsRouter.js';
import userRouter from './userRouter.js';
import contactsRouter from './contactsRouter.js';

const router = new Router();

router.use('/user', userRouter);
router.use('/document', documentRouter);
router.use('/news', newsRouter);
router.use('/contacts', contactsRouter);

export default router;
