import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import bookAnnouncementReducer from './features/book-announcement/slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    bookAnnouncements: bookAnnouncementReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
