export enum BookTypesEnum {
   Fiction= 'Fiction',
   NonFiction= 'Non fiction'
}
export interface IBook {
   _id: string;
   author: string;
   title: string;
   description: string;
   createdAt: Date;
   saler: string;
   type: BookTypesEnum;
   tags: string[];
   price: number;

}












