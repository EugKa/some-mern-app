import { ApiError } from "../excentions/api-error";
import { userModel } from "../models";
import { postModel } from "../models/post-model";

class PostService {
   async create(owner: string, title: string, description: string) {
      console.log(`PostService TITLE: ${title} DESC: ${description}`);
      const post = await postModel.create({ owner, title, description })
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

}

export default new PostService();