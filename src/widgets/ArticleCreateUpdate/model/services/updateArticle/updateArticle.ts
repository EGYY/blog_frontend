import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkExtraArg } from '@/app/providers/StoreProvider';
import { ArticleType } from '@/entities/Article';

type UpdateArticlePayload = {
    id: string;
    body: FormData;
};

export const updateArticle = createAsyncThunk<
    ArticleType,
    UpdateArticlePayload,
    { rejectValue: string, extra: ThunkExtraArg }
>(
  'article/updateArticle',
  async ({ id, body }, { rejectWithValue, extra }) => {
    try {
      const response = await extra.apiAuth.patch<ArticleType>(`/articles/${id}`, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (e: any) {
      if (e?.response?.data?.message) {
        return rejectWithValue(e.response.data.message);
      }
      return rejectWithValue(e.message);
    }
  },
);
