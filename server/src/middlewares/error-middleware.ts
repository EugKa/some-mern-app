import { Response, Request, NextFunction } from 'express';
import { ApiError } from '../excentions/api-error';


export function errorMiddleware(error: any[], req:Request, res: Response, next: NextFunction) {
   console.log(error);
   if(error instanceof ApiError) {
      return res.status(error.status).json({ message: error.message, errors: error.errors })
   }
   return res.status(500).json({ message: "Unexpected error"})
}