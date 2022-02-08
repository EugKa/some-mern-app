import { ApiError } from "../excentions/api-error";
import { userModel, postModel } from "../models";

class PostService {
   async create(owner: string, title: string, description: string) {
      const user = await userModel.findOne({ _id: owner });
      if(!user) {
         throw ApiError.BadRequest(`User has not been found`);
      }
      const post = await postModel.create({ owner, title, description, createdAt: new Date() })      
      return post
   }
   async getAll() {
      const post = await postModel.find()
      return post
   }

   async getUserPosts(owner: string) {
      const post = await postModel.find({ owner })
      return post
   }

   async deletePost(id: string) {      
      const post = await postModel.findOne({ _id: id });
      if (!post) {
         throw ApiError.BadRequest(`No post with id : ${id}`);
      }
      await post.remove();
      return { id }
   }

   async updatePost(id: string, title: string, description: string) {      
      const post = await postModel.findOneAndUpdate({ _id: id }, { title, description }, {
         new: true,
         runValidators: true,
      });
      if (!post) {
         throw ApiError.BadRequest(`No post with id : ${id}`);
      }
      const allPost = await postModel.find()
      return allPost
   }

}

export default new PostService();