import { createAsyncThunk } from '@reduxjs/toolkit';

import { userActions } from '../slice/userSlice';

import { ThunkExtraArg } from '@/app/providers/StoreProvider';

export const logout = createAsyncThunk<boolean, void, {rejectValue: string, extra: ThunkExtraArg}>(
  'user/logout',
  async (_, { rejectWithValue, dispatch, extra }) => {
    try {
      const response = await extra.apiAuth.post<boolean>('/auth/logout');
      dispatch(userActions.logout());
      return response.data;
    } catch (e: any) {
      if (e?.response?.data?.message) {
        return rejectWithValue(e.response.data.message);
      }
      return rejectWithValue(e.message);
    }
  },
);
