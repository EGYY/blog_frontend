import { createAsyncThunk } from '@reduxjs/toolkit';

import { User } from '../types/user';

import { axiosWithAuth } from '@/shared/config/api/api';

export const getProfileData = createAsyncThunk<User, void, {rejectValue: string}>(
  'user/getProfileData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosWithAuth.get<User>('/users/profile');
      return response.data;
    } catch (e: any) {
      if (e?.response?.data?.message) {
        return rejectWithValue(e.response.data.message);
      }
      return rejectWithValue(e.message);
    }
  },
);
