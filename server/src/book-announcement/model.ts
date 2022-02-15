import { Schema, model } from 'mongoose';
import { IBook } from './interface';


const BookAnnoncementSchema = new Schema<IBook>({
   author: {type: String, required: true },
   title: {type: String, required: true },
   description: {type: String, required: true },
   createdAt: { type: Date, required: true },
   saler: { type: Schema.Types.ObjectId, ref: 'User', required: true },
   type: { type: String, required: true },
   tags: { type: [String], required: true },
   price: { type: Number, required: true },
})

export const bookAnnoncemenModel = model("BookAnnoncement", BookAnnoncementSchema)