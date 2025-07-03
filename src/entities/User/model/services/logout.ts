import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from '@/entities/User';
import { ThunkExtraArg } from '@/app/providers/StoreProvider';
import { RoutePath } from '@/shared/config/routes/routes';

export const logout = createAsyncThunk<boolean, void, {rejectValue: string, extra: ThunkExtraArg}>(
  'user/logout',
  async (_, { rejectWithValue, dispatch, extra }) => {
    try {
      const response = await extra.apiAuth.post<boolean>('/auth/logout');
      dispatch(userActions.logout());
      extra?.navigate?.(RoutePath.main);
      return response.data;
    } catch (e: any) {
      if (e?.response?.data?.message) {
        return rejectWithValue(e.response.data.message);
      }
      return rejectWithValue(e.message);
    }
  },
);
