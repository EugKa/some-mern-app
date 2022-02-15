import { Router } from 'express';

import user from '../user/router';
import bookAnnouncement from '../book-announcement/router';

let rootRouter = Router();

rootRouter.use('/user', user);
rootRouter.use('/book', bookAnnouncement);

export default rootRouter;
