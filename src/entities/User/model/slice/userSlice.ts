import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    },
  },
});

export const { actions: userActions } = userSlice;

export const { reducer: userReducer } = userSlice;
