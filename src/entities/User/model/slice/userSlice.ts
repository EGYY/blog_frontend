import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProfileData } from '../services/getProfileData';
import { UserSchema, UserServerResponse } from '../types/user';

const initialState: UserSchema = {
  userData: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, { payload }: PayloadAction<UserServerResponse>) => {
      state.userData = payload;
    },
    logout: (state) => {
      state.userData = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileData.fulfilled, (state, action) => {
        state.userData = { user: action.payload };
      })
      .addCase(getProfileData.rejected, (state) => {
        state.userData = undefined;
      });
  },
});

export const { actions: userActions } = userSlice;

export const { reducer: userReducer } = userSlice;
