import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../..';
import { ICreateUserFormState, AuthResponse, IUser } from '../../../interfaces';
import { authLogIn, authLogOut, authRegistration } from '../../../services';

export interface UserState {
  userData: any | IUser,
  isAuth: boolean;
  status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: UserState = {
  isAuth: false,
  status: 'idle',
  userData: {}
};

export const loginAsyncAction = createAsyncThunk(
  'user-data/loginAsyncAction',
  async (user: ICreateUserFormState) => {
    try {
      const { email, password } = user
      const response = await authLogIn(email, password);
      console.log('loginAsyncAction', response);
      localStorage.setItem('token', response.data.accessToken)
      return response.data.user;
    } catch (e) {
      console.log(e); 
    }  
  }
);

export const registrAsyncAction = createAsyncThunk(
  'user-data/registrAsyncAction',
  async (user: ICreateUserFormState) => {
    try {
      const { userName, email, password } = user
      const response = await authRegistration(userName!, email, password);
      console.log('registrAsyncAction', response);
      localStorage.setItem('token', response.data.accessToken)
      return response.data.user;
    } catch (e) {
      console.log(e); 
    }  
  }
);

export const logoutAsyncAction = createAsyncThunk(
  'user-data/logoutAsyncAction',
  async () => {
    try {
      await authLogOut();
      localStorage.removeItem('token')
      return {};
    } catch (e) {
      console.log(e); 
    }  
  }
);

export const checkAuthAsyncAction = createAsyncThunk(
  'user-data/checkAuthAsyncAction',
  async () => {
    try {
      const response = await axios.get<AuthResponse>(`${process.env.REACT_APP_API_URL}/user/refresh`, { withCredentials: true });
      console.log('checkAuthAsyncAction', response);
      localStorage.setItem('token', response.data.accessToken)
      return response.data.user;
    } catch (e) {
      console.log(e); 
    }  
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsyncAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsyncAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.userData = action.payload
        state.isAuth = true
      })
      .addCase(loginAsyncAction.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(registrAsyncAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registrAsyncAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.userData = action.payload
        state.isAuth = true
      })
      .addCase(registrAsyncAction.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(logoutAsyncAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutAsyncAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.userData = action.payload
        state.isAuth = false
      })
      .addCase(logoutAsyncAction.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(checkAuthAsyncAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthAsyncAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.userData = action.payload
        state.isAuth = true
      })
      .addCase(checkAuthAsyncAction.rejected, (state) => {
        state.status = 'failed';
      })
  },
});


export const selectUser = (state: RootState) => state.user;


export default userSlice.reducer;
