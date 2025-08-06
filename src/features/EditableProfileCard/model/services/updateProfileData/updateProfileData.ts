import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkExtraArg } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';

type UpdateProfileDataBody = FormData;

export const updateProfileData = createAsyncThunk<
    User,
    UpdateProfileDataBody,
    { rejectValue: string; extra: ThunkExtraArg }
>(
    'profile/updateProfileData',
    async (body, { rejectWithValue, dispatch, extra }) => {
        try {
            const response = await extra.apiAuth.patch<User>(
                '/users/profile',
                body,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            if (!response.data) {
                return rejectWithValue('Некорректный ответ сервера');
            }
            dispatch(userActions.setUser(response.data));
            return response.data;
        } catch (e: any) {
            if (e?.response?.data?.message) {
                return rejectWithValue(e.response.data.message);
            }
            return rejectWithValue(e.message);
        }
    },
);
