import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';
import {  IBook } from '../../../interfaces';
import { 
  createBookAnnouncementAsyncAction, 
  getAllBookAnnouncementsAsyncAction, 
  getUserBookAnnouncementsAsyncAction, 
  deleteBookAnnouncementAsyncAction, 
  updateBookAnnouncementAsyncAction 
} from './actions';

export interface PostState {
  bookAnnouncements: IBook[];
  userBookAnnouncements: IBook[];
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string | null | undefined | unknown

}

const initialState: PostState = {
  status: 'idle',
  bookAnnouncements: [],
  userBookAnnouncements: [],
  error: null
};


export const bookAnnouncementSlice = createSlice({
  name: 'bookAnnouncements',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBookAnnouncementsAsyncAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllBookAnnouncementsAsyncAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.bookAnnouncements = action.payload;
        state.error = null;
      })
      .addCase(getAllBookAnnouncementsAsyncAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(createBookAnnouncementAsyncAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBookAnnouncementAsyncAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.bookAnnouncements.push(action.payload)
        state.error = null;
      })
      .addCase(createBookAnnouncementAsyncAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(getUserBookAnnouncementsAsyncAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserBookAnnouncementsAsyncAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.userBookAnnouncements = action.payload;
        state.error = null;
      })
      .addCase(getUserBookAnnouncementsAsyncAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(deleteBookAnnouncementAsyncAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBookAnnouncementAsyncAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.bookAnnouncements = state.bookAnnouncements.filter((item: IBook) => item._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteBookAnnouncementAsyncAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })


      .addCase(updateBookAnnouncementAsyncAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBookAnnouncementAsyncAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.bookAnnouncements = action.payload;
        state.error = null;
      })
      .addCase(updateBookAnnouncementAsyncAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});

export const selectbookAnnouncements = (state: RootState) => state.bookAnnouncements;


export default bookAnnouncementSlice.reducer;
