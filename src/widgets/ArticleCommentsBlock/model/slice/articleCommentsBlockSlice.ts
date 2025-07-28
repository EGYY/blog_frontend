import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '@/entities/Comment';
import { ArticleCommentsBlockSchema } from '../types/articleCommentsBlock';
import { getArticleComments } from '../services/getArticleComments';
import { addCommentToArticle } from '../services/addCommentToArticle';

const initialState: ArticleCommentsBlockSchema = {
  comments: [],
  page: 1,
  total: 0,
  totalPages: 1,
  loading: false,
  error: undefined,
  addCommentForm: {
    loading: false,
    error: undefined,
  },
};

export const articleCommentsBlockSlice = createSlice({
  name: 'articleCommentsBlock',
  initialState,
  reducers: {
    setComments: (state, { payload }: PayloadAction<Comment[]>) => {
      state.comments = payload;
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
    setTotal: (state, { payload }: PayloadAction<number>) => {
      state.total = payload;
    },
    setTotalPages: (state, { payload }: PayloadAction<number>) => {
      state.totalPages = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticleComments.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.addCommentForm.error = undefined;
        state.addCommentForm.loading = false;
        state.comments = [];
      })
      .addCase(getArticleComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.data;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getArticleComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCommentToArticle.pending, (state) => {
        state.addCommentForm.error = undefined;
        state.addCommentForm.loading = true;
      })
      .addCase(addCommentToArticle.fulfilled, (state) => {
        state.addCommentForm.loading = false;
      })
      .addCase(addCommentToArticle.rejected, (state, action) => {
        state.addCommentForm.error = action.payload;
        state.addCommentForm.loading = false;
      });
  },
});

export const { actions: articleCommentsBlockActions } = articleCommentsBlockSlice;

export const { reducer: articleCommentsBlockReducer } = articleCommentsBlockSlice;
