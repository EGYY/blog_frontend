import { createAsyncThunk } from '@reduxjs/toolkit';

import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider';
import { ArticlesServerResponse } from '@/entities/Article';

export const getProfileArticles = createAsyncThunk<
    ArticlesServerResponse,
    void,
    { rejectValue: string; extra: ThunkExtraArg }
>(
    'profile/getProfileArticles',
    async (_, { rejectWithValue, extra, getState }) => {
        try {
            const state = getState() as StateSchema;
            const page = state.update_profile?.pageArticles || 1;
            const currentFilters = state.update_profile?.currentFilters || {};
            const params = new URLSearchParams({
                page: String(page),
                authorId: String(state.user.userData?.user.id),
                ...currentFilters,
            });
            const response = await extra.api.get<ArticlesServerResponse>(
                '/articles',
                { params },
            );
            return response.data;
        } catch (e: any) {
            if (e?.response?.data?.message) {
                return rejectWithValue(e.response.data.message);
            }
            return rejectWithValue(e.message);
        }
    },
);
