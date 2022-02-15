import { Types } from "mongoose";

export enum BookTypesEnum {
   Fuction= 'Fiction',
   NonFiction= 'Non fiction'
}
export interface IBook {
   saler: Types.ObjectId;
   author: string;
   title: string;
   description: string;
   type: string;
   tags: string[];
   price: number
   createdAt: Date;
}
