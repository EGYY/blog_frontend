import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { UpdateProfileSchema } from '../types/UpdateProfileSchema';

const initialState: UpdateProfileSchema = {
  loading: false,
  error: undefined,
};

export const updateProfileSlice = createSlice({
  name: 'update/profile',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setError: (state, { payload }: PayloadAction<string | undefined>) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfileData.pending, (state) => {
        state.error = undefined;
        state.loading = true;
      })
      .addCase(updateProfileData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: updateProfileActions } = updateProfileSlice;

export const { reducer: updateProfileReducer } = updateProfileSlice;
