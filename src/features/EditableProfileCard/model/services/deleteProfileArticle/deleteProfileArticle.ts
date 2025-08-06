import { createAsyncThunk } from '@reduxjs/toolkit';

import { getProfileArticles } from '../getProfileArticles/getProfileArticles';

import { ThunkExtraArg } from '@/app/providers/StoreProvider';
import { ArticleType } from '@/entities/Article';

export const deleteProfileArticle = createAsyncThunk<
    ArticleType,
    string,
    { rejectValue: string; extra: ThunkExtraArg }
>(
    'profile/deleteProfileArticle',
    async (id, { rejectWithValue, extra, dispatch }) => {
        try {
            const response = await extra.apiAuth.delete<ArticleType>(
                `/articles/${id}`,
            );
            dispatch(getProfileArticles());
            return response.data;
        } catch (e: any) {
            if (e?.response?.data?.message) {
                return rejectWithValue(e.response.data.message);
            }
            return rejectWithValue(e.message);
        }
    },
);
