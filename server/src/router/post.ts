import { Router } from 'express';
import { body } from 'express-validator';
import postController from '../controllers/post-controller';
import { authMiddleware } from '../middlewares/auth-middleware';

const routes = Router();

routes.post('/create', authMiddleware, postController.create);
routes.get('/getAll', postController.getAll);
routes.get('/getUserPosts/:id',authMiddleware, postController.getUserPosts);
routes.delete('/delete/:id', authMiddleware, postController.deletePost);
routes.patch('/update/:id', authMiddleware, postController.updatePost);


export default routes