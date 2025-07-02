import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { axiosClassic } from '@/shared/config/api/api';
import { userActions, UserServerResponse } from '@/entities/User';

export const loginByEmail = createAsyncThunk<UserServerResponse, {email: string, password: string}, {rejectValue: string}>(
  'login/loginByEmail',
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosClassic.post<UserServerResponse>('/auth/login', body);
      if (response.data.accessToken) {
        Cookies.set('accessToken', response.data.accessToken, {
          domain: 'localhost',
          sameSite: 'strict',
          expires: 1,
        });
      }
      dispatch(userActions.setAuthData(response.data));
      return response.data;
    } catch (e) {
      if (e?.response?.data?.message) {
        return rejectWithValue(e.response.data.message);
      }
      return rejectWithValue(e.message);
    }
  },
);
