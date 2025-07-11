import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { getProfileData } from '../services/getProfileData';
import { User, UserSchema, UserServerResponse } from '../types/user';

const initialState: UserSchema = {
  userData: undefined,
  loading: false,
  inited: false,
  error: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, { payload }: PayloadAction<UserServerResponse>) => {
      state.userData = payload;
    },
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.userData = { ...state.userData, user: payload };
    },
    logout: (state) => {
      state.userData = undefined;
      state.loading = false;
      state.inited = false;
      state.error = undefined;
      Cookies.remove('accessToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileData.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.inited = false;
      })
      .addCase(getProfileData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = { user: action.payload };
        state.inited = true;
      })
      .addCase(getProfileData.rejected, (state, action) => {
        state.loading = false;
        state.userData = undefined;
        state.error = action.payload;
        state.inited = true;
      });
  },
});

export const { actions: userActions } = userSlice;

export const { reducer: userReducer } = userSlice;
