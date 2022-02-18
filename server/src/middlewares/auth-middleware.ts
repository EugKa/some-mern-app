import { Response, Request, NextFunction } from 'express';
import tokenService from '../token/service';
import { ApiError } from '../excentions/api-error';
import { JWTPayload } from '../token';

interface RequestWithUser extends Request {
   user: JWTPayload
}


export function authMiddleware(req:RequestWithUser, res: Response, next: NextFunction) {
   try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
         return next(ApiError.UnauthorizedError());
      }

      const accessToken = authorizationHeader.split(' ')[1];
      if (!accessToken) {
         return next(ApiError.UnauthorizedError());
      }

      const userData = tokenService.validateAccessToken(accessToken);
      if (!userData) {
         return next(ApiError.UnauthorizedError());
      }
      
      req.user = userData
      next();
  } catch (e) {
      return next(ApiError.UnauthorizedError());
  }
      
}