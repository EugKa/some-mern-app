import { Schema, model, connect } from 'mongoose';
import { IPostData } from '../interface';
import validator from 'validator';


const PostSchema = new Schema<IPostData>({
   title: {type: String, required: true},
   description: {type: String, required: true},
   createdAt: { type: Date, required: true}
})

export const postModel = model("Post", PostSchema)