import { IPostData } from ".";

export interface IUser {
   userName: string;
   email: string;
   password: string;
   isActivated: boolean;
   activationLink: string;
   // posts: IPostData[]
}