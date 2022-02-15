import { Response, Request, NextFunction } from 'express';
import BookAnnouncementService from './service';
import { validationResult } from 'express-validator';
import { ApiError } from '../excentions/api-error';

class BookAnnouncementController {
   async create(req:Request, res: Response, next: NextFunction) {
      try {
         const errors = validationResult(req);
         if(!errors.isEmpty()) {
            return next(ApiError.BadRequest('Validation Error', errors.array()))
         }
         const { saler, author, title, description, type, tags, price } = req.body;
         const userData = await BookAnnouncementService.create(saler, author, title, description, type, tags, price);
         return res.json(userData)
         
      } catch (error) {
         next(error)
      }
   }
   async getAll(req:Request, res: Response, next: NextFunction) {
      try {
         const users = await BookAnnouncementService.getAll();
         return res.json(users);
      } catch (e) {
         next(e);
      }
   }

   async getUserBooksAnnouncements(req:Request, res: Response, next: NextFunction) {
      try {
         const { id } = req.params;
         const users = await BookAnnouncementService.getUserBooksAnnouncements(id);
         return res.json(users);
      } catch (e) {
         next(e);
      }
   }

   async deleteBookAnnouncement(req:Request, res: Response, next: NextFunction) {
      try {
         const { id } = req.params;
         const post = await BookAnnouncementService.deleteBookAnnouncement(id);
         console.log('DELETE-CONTROLLER-POST', id);
         return res.json(post);
      } catch (e) {
         next(e);
      }
   }

   async updateBookAnnouncement(req:Request, res: Response, next: NextFunction) {
      try {
         const { id } = req.params;
         const { title, description, price } = req.body;
         const post = await BookAnnouncementService.updateBookAnnouncement(id, title, description, price);
         return res.json(post);
      } catch (e) {
         next(e);
      }
   }
}

export default new BookAnnouncementController();