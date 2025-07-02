import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosWithAuth } from '@/shared/config/api/api';
import { userActions } from '@/entities/User';

export const logout = createAsyncThunk<boolean, null, {rejectValue: string}>(
  'user/logout',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosWithAuth.post<boolean>('/auth/logout');
      dispatch(userActions.logout());
      return response.data;
    } catch (e) {
      if (e?.response?.data?.message) {
        return rejectWithValue(e.response.data.message);
      }
      return rejectWithValue(e.message);
    }
  },
);
