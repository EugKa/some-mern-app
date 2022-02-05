import jwt from 'jsonwebtoken'
import { decode } from 'punycode';
import { JWTPayload } from '../interface';
import { tokenModel } from '../models';


class TokenService {
   generateTokens(payload: string | object | Buffer) {
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m'});
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d'});
      return {
         accessToken,
         refreshToken
      }
   }

   async saveToken(userId: string, refreshToken: string) {
      const tokenData = await tokenModel.findOne({ user: userId });
      if(tokenData) {
         tokenData.refreshToken = refreshToken;
         return tokenData.save();
      }
      const token = await tokenModel.create({ user: userId, refreshToken });
      return token;
   }
   async removeToken(refreshToken: string) {
      const tokenData = await tokenModel.deleteOne({ refreshToken })
      return tokenData
   }

   validateAccessToken(token: string) {
      try {
         const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
         return userData as JWTPayload
      } catch (error) {
         return null
      }  
   }

   validateRefreshToken(token: string) {
      try {
         const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET, )
         return userData as JWTPayload
      } catch (error) {
         return null
      }   
   }

   async findToken(refreshToken: string) {
      const tokenData = await tokenModel.findOne({ refreshToken })
      return tokenData
   }
}

export default new TokenService();