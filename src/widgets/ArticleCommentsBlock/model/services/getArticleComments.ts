import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkExtraArg } from '@/app/providers/StoreProvider';
import { CommentsServerResponse } from '../types/articleCommentsBlock';

export const getArticleComments = createAsyncThunk<
CommentsServerResponse, string, { rejectValue: string, extra: ThunkExtraArg }>(
  'comment/getCommentsData',
  async (id, { rejectWithValue, extra }) => {
    try {
      const response = await extra.api.get<CommentsServerResponse>(`/comments/article/${id}`);
      return response.data;
    } catch (e: any) {
      if (e?.response?.data?.message) {
        return rejectWithValue(e.response.data.message);
      }
      return rejectWithValue(e.message);
    }
  },
);
