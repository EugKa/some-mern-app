import { Response, Request, NextFunction } from 'express';
import userService from '../service/user-service';
import { validationResult } from 'express-validator';
import { ApiError } from '../excentions/api-error';

class PostController {
   async createPost(req:Request, res: Response, next: NextFunction) {
      try {
         const errors = validationResult(req);
         if(!errors.isEmpty()) {
            return next(ApiError.BadRequest('Validation Error', errors.array()))
         }
         const { userName, email, password } = req.body;
         const userData = await userService.registration(userName, email, password);
         return res.json(userData)
         
      } catch (error) {
         next(error)
      }
   }
}

export default new PostController();