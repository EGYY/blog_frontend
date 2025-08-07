import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { ThunkExtraArg } from '@/app/providers/StoreProvider';
import { userActions, UserServerResponse } from '@/entities/User';

export const loginByEmail = createAsyncThunk<
    UserServerResponse,
    { email: string; password: string },
    { rejectValue: string; extra: ThunkExtraArg }
>('auth/loginByEmail', async (body, { rejectWithValue, dispatch, extra }) => {
    try {
        const response = await extra.api.post<UserServerResponse>(
            '/auth/login',
            body,
        );
        if (!response.data || !response.data?.accessToken) {
            return rejectWithValue('Некорректный ответ сервера');
        }
        Cookies.set('accessToken', response.data.accessToken, {
            sameSite: 'lax',
            expires: 1,
        });
        dispatch(userActions.setAuthData(response.data));
        return response.data;
    } catch (e: any) {
        if (e?.response?.data?.message) {
            return rejectWithValue(e.response.data.message);
        }
        return rejectWithValue(e.message);
    }
});
