import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkExtraArg } from '@/app/providers/StoreProvider';
import { AddCommentFormServerResponse } from '../types/articleCommentsBlock';
import { getArticleComments } from './getArticleComments';

export const addCommentToArticle = createAsyncThunk<
    AddCommentFormServerResponse,
    { articleId: string, content: string },
    { rejectValue: string, extra: ThunkExtraArg }
>(
  'comment/addCommentToArticle',
  async (body, { rejectWithValue, dispatch, extra }) => {
    try {
      const response = await extra.apiAuth.post<AddCommentFormServerResponse>('/comments', body);
      dispatch(getArticleComments(body.articleId));
      return response.data;
    } catch (e: any) {
      if (e?.response?.data?.message) {
        return rejectWithValue(e.response.data.message);
      }
      return rejectWithValue(e.message);
    }
  },
);
