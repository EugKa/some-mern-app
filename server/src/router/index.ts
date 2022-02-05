import { Router } from 'express';

import user from './user';
import post from './post';

let rootRouter = Router();

rootRouter.use('/user', user);
rootRouter.use('/post', post);

export default rootRouter;
