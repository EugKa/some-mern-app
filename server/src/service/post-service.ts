import { ApiError } from "../excentions/api-error";
import { userModel, postModel } from "../models";

class PostService {
   async create(owner: string, title: string, description: string) {
      const user = await userModel.findOne({ _id: owner });
      const post = await postModel.create({ owner, title, description })
      // console.log(`PostService-CREATE USER:${user.userName}`);
      
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
      console.log('PostService DEL-ID',id);
      
      const post = await postModel.findOne({ _id: id });
      if (!post) {
         throw ApiError.BadRequest(`No post with id : ${id}`);
      }
     
      await post.remove();
      return { id }
   }

}

export default new PostService();