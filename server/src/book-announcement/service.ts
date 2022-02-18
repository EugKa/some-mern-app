import { pipeline } from "stream";
import { ApiError } from "../excentions/api-error";
import { userModel } from "../user";
import { bookAnnoncemenModel } from "./model";
import { lookUpUnwindAddFieldsProjectPipeline } from "./pipeline-stages";
import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId;

class BookAnnouncementService {
   async create(
      saler: string,
      author: string,
      title: string,
      description: string,
      type: string,
      tags: string[],
      price: number,
   ) {
      const user = await userModel.findOne({ _id: saler });
      if(!user) {
         throw ApiError.BadRequest(`BOOK-CREATE-User has not been found`);
      }
      const announcement = await bookAnnoncemenModel.create({ 
         saler,
         author,
         title,
         description,
         type,
         tags,
         price, 
         createdAt: new Date() 
      })            
      return announcement
   }
   async getAll() {
      const announcement = await bookAnnoncemenModel.aggregate(lookUpUnwindAddFieldsProjectPipeline);
      return announcement
   }

   async getUserBooksAnnouncements(saler: string) {
      const announcement = await bookAnnoncemenModel.aggregate([ 
         { $match: { saler: new ObjectId(saler)}},
         ...lookUpUnwindAddFieldsProjectPipeline
      ]);
      return announcement
   }

   async deleteBookAnnouncement(id: string) {      
      const announcement = await bookAnnoncemenModel.findOne({ _id: id });
      if (!announcement) {
         throw ApiError.BadRequest(`No post with id : ${id}`);
      }
      await announcement.remove();
      return { id }
   }

   async updateBookAnnouncement(id: string, title: string, description: string, price: number) {      
      const announcement = await bookAnnoncemenModel.findOneAndUpdate({ _id: id }, { title, description, price}, {
         new: true,
         runValidators: true,
      });
      if (!announcement) {
         throw ApiError.BadRequest(`No post with id : ${id}`);
      }
      const allPost = await bookAnnoncemenModel.find()
      return allPost
   }

   async searchBookAnnouncement(value: string) {      
      
      const announcements = await bookAnnoncemenModel.aggregate([
         {
            $search: {
               "index": 'searchByAuthorTitleDescrIndex',
               "text": {
                  "query": value,
                  "path": ["author", "title", "description"]
               }
            }
         }
      ])
      return announcements
   }

}

export default new BookAnnouncementService();