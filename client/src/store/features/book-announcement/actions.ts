import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  createBookAnnouncementService, 
  getAllBookAnnouncementsService, 
  getUserBookAnnouncementsService, 
  deleteBookAnnouncementService, 
  updateBookAnnouncementService,
  searchBookAnnouncementService
} from '../../../services';


export const createBookAnnouncementAsyncAction = createAsyncThunk(
  'book-announcement/createBookAnnouncementAsyncAction',
  async (bookAnnouncement: any, { rejectWithValue }) => {
   try {
     const { saler, author, title, description, type, tags, price } = bookAnnouncement;
     const response = await createBookAnnouncementService(saler, author, title, description, type, tags, price)
     return response.data;
   } catch (e:any) { 
     return rejectWithValue(e.response.data)
   }  
  }
);
 
export const getAllBookAnnouncementsAsyncAction = createAsyncThunk(
  'book-announcement/getAllBookAnnouncementsAsyncAction',
  async (_, { rejectWithValue }) => {
   try {
    const response = await getAllBookAnnouncementsService()
    return response.data;
   } catch (e:any) { 
    return rejectWithValue(e.response.data)
   }  
  }
);


export const getUserBookAnnouncementsAsyncAction = createAsyncThunk(
  'book-announcement/getUserBookAnnouncementsAsyncAction',
  async (saler: string, { rejectWithValue }) => {
   try {
    const response = await getUserBookAnnouncementsService(saler)
    return response.data;
   } catch (e:any) { 
    return rejectWithValue(e.response.data)
   }    
  }
);

export const deleteBookAnnouncementAsyncAction = createAsyncThunk(
  'book-announcement/deleteBookAnnouncementAsyncAction',
  async (id: string, { rejectWithValue }) => {
   try {
    const response = await deleteBookAnnouncementService(id)
    return response.data;
   } catch (e:any) { 
    return rejectWithValue(e.response.data)
   }   
  }
);

export const updateBookAnnouncementAsyncAction = createAsyncThunk(
  'book-announcement/updateBookAnnouncementAsyncAction',
  async (bookAnnouncement: { id: string, title: string, description: string, price: number }, { rejectWithValue }) => {
   const { id, title, description, price } = bookAnnouncement;
   try {
    const response = await updateBookAnnouncementService(id, title, description, price)
    return response.data;
   } catch (e:any) { 
    return rejectWithValue(e.response.data)
   }   
  }
);
 
export const searchBookAnnouncementsAsyncAction = createAsyncThunk(
  'book-announcement/searchBookAnnouncementsAsyncAction',
  async (value: string, { rejectWithValue }) => {
   try {
    const response = await searchBookAnnouncementService(value)
    return response.data;
   } catch (e:any) { 
    return rejectWithValue(e.response.data)
   }   
  }
);