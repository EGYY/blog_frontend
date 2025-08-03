import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getProfileById } from '../services/getProfileById';
import { ProfileDetailSchema } from '../types/profileDetail';

const initialState: ProfileDetailSchema = {
  loading: false,
  error: undefined,
  profile: undefined,
};

export const profileDetailSlice = createSlice({
  name: 'profileDetail',
  initialState,
  reducers: {
    changeSubscribe: (state, action: PayloadAction<boolean>) => {
      if (state.profile) {
        state.profile.subscribed = action.payload;
      }
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setError: (state, { payload }: PayloadAction<string | undefined>) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileById.pending, (state) => {
        state.error = undefined;
        state.loading = true;
      })
      .addCase(getProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getProfileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: profileDetailActions } = profileDetailSlice;

export const { reducer: profileDetailReducer } = profileDetailSlice;
