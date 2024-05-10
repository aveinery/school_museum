import { Router } from 'express';
import documentRouter from './documentRouter.js';
import newsRouter from './newsRouter.js';
import userRouter from './userRouter.js';

const router = new Router();

router.use('/user', userRouter);
router.use('/document', documentRouter);
router.use('/news', newsRouter);

export default router;

