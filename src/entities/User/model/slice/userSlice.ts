import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { getProfileData } from '../services/getProfileData';
import { UserSchema, UserServerResponse } from '../types/user';

const initialState: UserSchema = {
  userData: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, { payload }: PayloadAction<UserServerResponse>) => {
      state.userData = payload;
    },
    logout: (state) => {
      state.userData = null;
      Cookies.remove('accessToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileData.fulfilled, (state, action) => {
        const accessToken = Cookies.get('accessToken');
        state.userData = { user: action.payload, accessToken };
      })
      .addCase(getProfileData.rejected, (state) => {
        state.userData = null;
      });
  },
});

export const { actions: userActions } = userSlice;

export const { reducer: userReducer } = userSlice;
