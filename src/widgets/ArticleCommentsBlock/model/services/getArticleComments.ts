import { createAsyncThunk } from '@reduxjs/toolkit';

import { getArticleCommentsPage } from '../selectors/getArticleCommentsPage/getArticleCommentsPage';
import { CommentsServerResponse } from '../types/articleCommentsBlock';

import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider';

export const getArticleComments = createAsyncThunk<
    CommentsServerResponse,
    string,
    { rejectValue: string; extra: ThunkExtraArg }
>(
    'comment/getCommentsData',
    async (id, { rejectWithValue, extra, getState }) => {
        try {
            const page = getArticleCommentsPage(getState() as StateSchema);
            const response = await extra.api.get<CommentsServerResponse>(
                `/comments/article/${id}`,
                { params: { page } },
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
