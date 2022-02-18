import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../..';
import { ICreateUserFormState, AuthResponse, IUser } from '../../../interfaces';
import { authLogIn, authLogOut, authRegistration } from '../../../services';



export interface UserState {
  userData: IUser | null,
  isAuth: boolean;
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string | null | undefined | unknown
}

const initialState: UserState = {
  isAuth: false,
  status: 'idle',
  userData: null,
  error: null
};

export const loginAsyncAction = createAsyncThunk(
  'user-data/loginAsyncAction',
  async (user: ICreateUserFormState, { rejectWithValue }) => {
    try {
      const { email, password } = user
      const response = await authLogIn(email, password);
      localStorage.setItem('token', response.data.accessToken)
      return response.data.user;
    } catch (e:any) { 
      return rejectWithValue(e.response.data.message)
    }  
  }
);

export const registrAsyncAction = createAsyncThunk(
  'user-data/registrAsyncAction',
  async (user: ICreateUserFormState, { rejectWithValue }) => {
    try {
      const { userName, email, password } = user
      const response = await authRegistration(userName!, email, password);
      localStorage.setItem('token', response.data.accessToken)
      return response.data.user;
    } catch (e: any) {
      return rejectWithValue(e.response.data.message)
    }  
  }
);

export const logoutAsyncAction = createAsyncThunk(
  'user-data/logoutAsyncAction',
  async (_, { rejectWithValue }) => {
    try {
      await authLogOut();
      localStorage.removeItem('token')
      return null;
    } catch (e:any) {
      return rejectWithValue(e.response.data)
    }  
  }
);

export const checkAuthAsyncAction = createAsyncThunk(
  'user-data/checkAuthAsyncAction',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<AuthResponse>(`${process.env.REACT_APP_API_URL}/user/refresh`, { withCredentials: true });
      localStorage.setItem('token', response.data.accessToken)
      return response.data.user;
    } catch (e:any) {
      return rejectWithValue(e.response.data)
    }  
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeError(state, action: PayloadAction<null>) {
      state.error = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsyncAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsyncAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.userData = action.payload
        state.error = null
        state.isAuth = true;

      })
      .addCase(loginAsyncAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload
      })

      .addCase(registrAsyncAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registrAsyncAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.userData = action.payload
        state.isAuth = true
        state.error = null
      })
      .addCase(registrAsyncAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload
      })

      .addCase(logoutAsyncAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutAsyncAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.userData = action.payload
        state.isAuth = false
        state.error = null
      })
      .addCase(logoutAsyncAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload
      })

      .addCase(checkAuthAsyncAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthAsyncAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.userData = action.payload;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(checkAuthAsyncAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});

export const { changeError } = userSlice.actions
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;

