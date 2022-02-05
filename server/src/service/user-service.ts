import { IUserService } from "../interface";
import { userModel } from "../models";
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import mailService from "./mail-service";
import UserDto from '../dto/user-dto'
import tokenService from "./token-service";
import { ApiError } from "../excentions/api-error";

class UserService implements IUserService {
   async registration(userName: string, email: string, password: string) {
      const candidate = await userModel.findOne({email})
      if(candidate) {
         throw ApiError.BadRequest("This email address is already being used");
      }
      const hashPassword = await bcrypt.hash(password, 3);
      const activationLink = uuid.v4();

      const user = await userModel.create({ userName, email, password: hashPassword, activationLink });
      await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);
      console.log('userCREATE', user);
      const userDto = new UserDto(user);
      console.log('userDto', userDto);
      const tokens = tokenService.generateTokens({...userDto});
      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      return { ...tokens, user: userDto }
  }

   async activate(activationLink: string) {
      const user = await userModel.findOne({ activationLink })
      if(!user) {
         throw ApiError.BadRequest("Incorrect activation link");
      }
      user.isActivated = true;
      await user.save();
   }
   async login(email: string, password: string){
      const user = await userModel.findOne({ email })
      if(!user) {
         throw ApiError.BadRequest('User with this email has not been found')
      }
      const isPassEquals = await bcrypt.compare(password, user.password)
      if(!isPassEquals) {
            throw ApiError.BadRequest('Incorrect password')
      }

      const userDto = new UserDto(user)
      const tokens = tokenService.generateTokens({...userDto});
      
      await tokenService.saveToken(userDto.id, tokens.refreshToken);
      return { ...tokens, user: userDto }
   };
   async logout(refreshToken: string) {
      const token = await tokenService.removeToken(refreshToken);
      return token
   };
   async refresh(refreshToken: string) {
      if (!refreshToken) {
         throw ApiError.UnauthorizedError();
     }
     const userData = tokenService.validateRefreshToken(refreshToken);
     const tokenFromDb = await tokenService.findToken(refreshToken);
     if (!userData || !tokenFromDb) {
         throw ApiError.UnauthorizedError();
     }

     const user = await userModel.findById(userData.id);
     const userDto = new UserDto(user);
     const tokens = tokenService.generateTokens({...userDto});

     await tokenService.saveToken(userDto.id, tokens.refreshToken);
     return {...tokens, user: userDto}
   };

   
}

export default new UserService();