import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkExtraArg } from '@/app/providers/StoreProvider';

export const toggleLike = createAsyncThunk<
    { liked: boolean },
    string,
    { rejectValue: string; extra: ThunkExtraArg }
>('article/toggleLike', async (id, { rejectWithValue, extra }) => {
    try {
        const response = await extra.apiAuth.post<{ liked: boolean }>(
            `/articles/${id}/like`,
        );
        return response.data;
    } catch (e: any) {
        if (e?.response?.data?.message) {
            return rejectWithValue(e.response.data.message);
        }
        return rejectWithValue(e.message);
    }
});
