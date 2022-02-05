import { Schema, model, connect } from 'mongoose';
import { IUser } from '../interface';
import validator from 'validator';
import { postModel } from './post-model'

const UserSchema = new Schema<IUser>({
   userName: {type: String, required: true},
   email: {type: String, unique: true, required: true},
   password: {type: String, required: true},
   isActivated: {type: Boolean, default: false},
   activationLink: {type: String},
})

export const userModel = model("User", UserSchema)