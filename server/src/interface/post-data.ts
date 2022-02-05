import { Types } from "mongoose";

export interface IPostData {
   title: string;
   description: string;
   // createdAt: Date
   owner: Types.ObjectId
}