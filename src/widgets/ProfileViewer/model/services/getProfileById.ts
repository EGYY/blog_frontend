import { createAsyncThunk } from '@reduxjs/toolkit';

import { Profile } from '@/entities/Profile';
import { axiosWithAuth } from '@/shared/config/api/api';

export const getProfileById = createAsyncThunk<Profile, string, {rejectValue: string}>(
  'user/getProfileById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosWithAuth.get<Profile>(`/users/profile/${id}`);
      return response.data;
    } catch (e: any) {
      if (e?.response?.data?.message) {
        return rejectWithValue(e.response.data.message);
      }
      return rejectWithValue(e.message);
    }
  },
);
