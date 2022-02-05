import { Router } from 'express';
import { body } from 'express-validator';
import { authMiddleware } from '../middlewares/auth-middleware';

const routes = Router();

routes.post('/create', authMiddleware);
routes.get('/getAll', authMiddleware);
routes.delete('/delete', authMiddleware);
routes.put('/update', authMiddleware);


export default routes