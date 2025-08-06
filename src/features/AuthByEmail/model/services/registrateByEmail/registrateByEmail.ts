import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { ThunkExtraArg } from '@/app/providers/StoreProvider';
import { userActions, UserServerResponse } from '@/entities/User';

export const registrateByEmail = createAsyncThunk<
    UserServerResponse,
    { email: string; password: string; name?: string },
    { rejectValue: string; extra: ThunkExtraArg }
>(
    'auth/registrateByEmail',
    async (body, { rejectWithValue, dispatch, extra }) => {
        try {
            const response = await extra.api.post<UserServerResponse>(
                '/auth/registration',
                body,
            );
            if (!response.data || !response.data?.accessToken) {
                return rejectWithValue('Некорректный ответ сервера');
            }
            Cookies.set('accessToken', response.data.accessToken, {
                domain: 'localhost',
                sameSite: 'strict',
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
    },
);
