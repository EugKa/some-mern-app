import { Response, Request, NextFunction } from 'express';
import PostService from '../service/post-service';
import { validationResult } from 'express-validator';
import { ApiError } from '../excentions/api-error';

class PostController {
   async create(req:Request, res: Response, next: NextFunction) {
      try {
         const errors = validationResult(req);
         if(!errors.isEmpty()) {
            return next(ApiError.BadRequest('Validation Error', errors.array()))
         }
         const { owner, title, description } = req.body;
         const userData = await PostService.create(owner, title, description);
         return res.json(userData)
         
      } catch (error) {
         next(error)
      }
   }
   async getAll(req:Request, res: Response, next: NextFunction) {
      try {
         const users = await PostService.getAll();
         return res.json(users);
      } catch (e) {
         next(e);
      }
   }

   async getUserPosts(req:Request, res: Response, next: NextFunction) {
      try {
         const { id } = req.params;
         const users = await PostService.getUserPosts(id);
         return res.json(users);
      } catch (e) {
         next(e);
      }
   }

   async deletePost(req:Request, res: Response, next: NextFunction) {
      try {
         const { id } = req.params;
         const post = await PostService.deletePost(id);
         console.log('DELETE-CONTROLLER-POST', id);
         return res.json(post);
      } catch (e) {
         next(e);
      }
   }
}

export default new PostController();