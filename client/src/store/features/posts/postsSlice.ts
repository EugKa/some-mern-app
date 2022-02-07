import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';
import {  IPost } from '../../../interfaces';
import { getAllPostsService, createPostService, getUserPostsService, deletePostService } from '../../../services';

export interface PostState {
  posts: IPost[] | any;
  userPosts: IPost[] | any;
  status: 'idle' | 'loading' | 'success' | 'failed';
}


const initialState: PostState = {
  status: 'idle',
  posts: [],
  userPosts: []
};

export const createPostAsyncAction = createAsyncThunk(
  'posts-data/createPostAsyncAction',
  async (post: any) => {
    try {
      const { owner, title, description } = post;
      const response = await createPostService(owner, title, description)
      console.log('CR-POST RES ', response);
      return response.data;
    } catch (e) {
      console.log(e); 
    }  
  }
);

export const getAllPostsAsyncAction = createAsyncThunk(
  'posts-data/getAllPostsAsyncAction',
  async () => {
    try {
      const response = await getAllPostsService()
      console.log('GET-ALL-POST RES', response);
      return response.data;
    } catch (e) {
      console.log(e); 
    }  
  }
);

export const getUserPostsAsyncAction = createAsyncThunk(
  'posts-data/getUserPostsAsyncAction',
  async (owner: string) => {
    try {
      const response = await getUserPostsService(owner)
      console.log('getUserPostsAsyncAction', response);
      return response.data;
    } catch (e) {
      console.log(e); 
    }  
  }
);

export const deletePostAsyncAction = createAsyncThunk(
  'posts-data/deletePostAsyncAction',
  async (id: string) => {
    try {
      const response = await deletePostService(id)
      console.log('deletePostAsyncAction', response);
      return response.data;
    } catch (e) {
      console.log(e); 
    }  
  }
);


export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPostsAsyncAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllPostsAsyncAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.posts = action.payload
      })
      .addCase(getAllPostsAsyncAction.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(createPostAsyncAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPostAsyncAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.posts.push(action.payload)
      })
      .addCase(createPostAsyncAction.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(getUserPostsAsyncAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserPostsAsyncAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.userPosts = action.payload
      })
      .addCase(getUserPostsAsyncAction.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(deletePostAsyncAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletePostAsyncAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.posts = state.posts.filter((item: IPost) => item._id !== action.payload)
      })
      .addCase(deletePostAsyncAction.rejected, (state) => {
        state.status = 'failed';
      })
  },
});


export const selectPosts = (state: RootState) => state.posts;


export default postSlice.reducer;
