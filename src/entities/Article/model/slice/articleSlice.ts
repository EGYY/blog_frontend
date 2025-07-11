import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getArticleData } from '../services/getArticleData';
import { Article, ArticleSchema } from '../types/article';

const initialState: ArticleSchema = {
  article: undefined,
  loading: false,
  error: undefined,
};

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticle: (state, { payload }: PayloadAction<Article>) => {
      state.article = payload;
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticleData.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.article = undefined;
      })
      .addCase(getArticleData.fulfilled, (state, action) => {
        state.loading = false;
        state.article = action.payload;
      })
      .addCase(getArticleData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: articleActions } = articleSlice;

export const { reducer: articleReducer } = articleSlice;
