import { Router } from 'express';
import userController from '../controllers/user-controller';
import { body } from 'express-validator';
import { authMiddleware } from '../middlewares/auth-middleware';

const routes = Router();

routes.post('/registration',
   body('userName').isLength({ min: 6, max: 32 }),
   body('email').isEmail(),
   body('password').isLength({ min: 6, max: 32 }),
   userController.registration
);
routes.post('/login', userController.login);
routes.post('/logout', userController.logout);
routes.get('/activate/:link', userController.activate);
routes.get('/refresh', userController.refresh);

export default routes

