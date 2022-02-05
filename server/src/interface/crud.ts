import UserDto from "../dto/user-dto";

export interface IUserService {
   registration: (userName: string, email: string, password: string) => Promise<{
      user: UserDto;
      accessToken: string;
      refreshToken: string;
  }>
   activate: (activationLink: string) => Promise<void>;
   login: (email: string, password: string) => Promise<{
      user: UserDto;
      accessToken: string;
      refreshToken: string;
   }>;
   logout: (refreshToken: string) => Promise<any>;
   refresh: (refreshToken: string) => Promise<any>;
}