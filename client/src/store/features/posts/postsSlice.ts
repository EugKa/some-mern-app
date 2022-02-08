import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';
import {  IPost } from '../../../interfaces';
import { getAllPostsService, createPostService, getUserPostsService, deletePostService, updatePostService } from '../../../services';

export interface PostState {
  posts: IPost[];
  userPosts: IPost[];
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string | null | undefined | unknown

}


const initialState: PostState = {
  status: 'idle',
  posts: [],
  userPosts: [],
  error: null
};

export const createPostAsyncAction = createAsyncThunk(
  'posts-data/createPostAsyncAction',
  async (post: any, { rejectWithValue }) => {
    try {
      const { owner, title, description } = post;
      const response = await createPostService(owner, title, description)
      console.log('CR-POST RES ', response);
      return response.data;
    } catch (e:any) { 
      return rejectWithValue(e.response.data)
    }  
  }
);

export const getAllPostsAsyncAction = createAsyncThunk(
  'posts-data/getAllPostsAsyncAction',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllPostsService()
      console.log('GET-ALL-POST RES', response);
      return response.data;
    } catch (e:any) { 
      return rejectWithValue(e.response.data)
    }  
  }
);


export const getUserPostsAsyncAction = createAsyncThunk(
  'posts-data/getUserPostsAsyncAction',
  async (owner: string, { rejectWithValue }) => {
    try {
      const response = await getUserPostsService(owner)
      console.log('getUserPostsAsyncAction', response);
      return response.data;
    } catch (e:any) { 
      return rejectWithValue(e.response.data)
    }    
  }
);

export const deletePostAsyncAction = createAsyncThunk(
  'posts-data/deletePostAsyncAction',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await deletePostService(id)
      return response.data;
    } catch (e:any) { 
      return rejectWithValue(e.response.data)
    }   
  }
);

export const updatePostAsyncAction = createAsyncThunk(
  'posts-data/updatePostAsyncAction',
  async (post: any, { rejectWithValue }) => {
    const { id, title, description } = post;
    try {
      const response = await updatePostService(id, title, description)
      return response.data;
    } catch (e:any) { 
      return rejectWithValue(e.response.data)
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
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(getAllPostsAsyncAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(createPostAsyncAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPostAsyncAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.posts.push(action.payload)
        state.error = null;
      })
      .addCase(createPostAsyncAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(getUserPostsAsyncAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserPostsAsyncAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.userPosts = action.payload;
        state.error = null;
      })
      .addCase(getUserPostsAsyncAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(deletePostAsyncAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletePostAsyncAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.posts = state.posts.filter((item: IPost) => item._id !== action.payload);
        state.error = null;
      })
      .addCase(deletePostAsyncAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })


      .addCase(updatePostAsyncAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePostAsyncAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(updatePostAsyncAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});

export const selectPosts = (state: RootState) => state.posts;


export default postSlice.reducer;
