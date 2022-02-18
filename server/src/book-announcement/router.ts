import { Router } from 'express';
import { body } from 'express-validator';
import BookAnnouncementController from './controller';
import { authMiddleware } from '../middlewares/auth-middleware';

const routes = Router();

routes.post('/create', authMiddleware, BookAnnouncementController.create);
routes.get('/getAll', BookAnnouncementController.getAll);
routes.get('/getUserBooksAnnouncements/:id',authMiddleware, BookAnnouncementController.getUserBooksAnnouncements);
routes.delete('/delete/:id', authMiddleware, BookAnnouncementController.deleteBookAnnouncement);
routes.patch('/update/:id', authMiddleware, BookAnnouncementController.updateBookAnnouncement);
routes.post('/search', BookAnnouncementController.searchBookAnnouncement);



export default routes