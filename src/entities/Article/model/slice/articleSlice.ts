import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getArticleData } from '../services/getArticleData';
import { getArticleRecommedations } from '../services/getArticleRecommedations';
import { getArticlesList } from '../services/getArticlesList';
import { toggleLike } from '../services/toggleLike';
import { Article, ArticleSchema, ArticleView } from '../types/article';

const initialState: ArticleSchema = {
  article: undefined,
  loading: false,
  error: undefined,
  recommedations: [],
  recommedationsLoading: false,
  recommendationsError: undefined,
  articles: [],
  loadingArticles: true,
  pageArticles: 1,
  totalArticles: 0,
  view: localStorage.getItem('viewCards') as ArticleView || ArticleView.GRID,
  errorArticles: undefined,
  _inited_articles: false,
};

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    changeSubscribe: (state, action: PayloadAction<boolean>) => {
      if (state.article) {
        state.article.subscribed = action.payload;
      }
    },
    setArticle: (state, { payload }: PayloadAction<Article>) => {
      state.article = payload;
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
    setArticles: (state, { payload }: PayloadAction<Article[]>) => {
      state.articles = payload;
    },
    setLoadingArticles: (state, { payload }: PayloadAction<boolean>) => {
      state.loadingArticles = payload;
    },
    setErrorArticles: (state, { payload }: PayloadAction<string>) => {
      state.errorArticles = payload;
    },
    setViewArticles: (state, { payload }: PayloadAction<ArticleView>) => {
      localStorage.setItem('viewCards', payload);
      state.view = payload;
    },
    setArticlesPage: (state, { payload }: PayloadAction<number>) => {
      state.pageArticles = payload;
    },
    setInitedArticles: (state, { payload }: PayloadAction<boolean>) => {
      state._inited_articles = payload;
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
      })
      .addCase(getArticlesList.pending, (state, action) => {
        state.loadingArticles = true;
        state.errorArticles = undefined;
        if (action.meta.arg.replace) {
          state.articles = [];
          state.pageArticles = 1;
        }
      })
      .addCase(getArticlesList.fulfilled, (state, action) => {
        state.loadingArticles = false;
        if (action.meta.arg.replace) {
          state.articles = action.payload.data;
        } else {
          state.articles = [...state.articles, ...action.payload.data];
        }
        state.totalArticles = action.payload.total;
      })
      .addCase(getArticlesList.rejected, (state, action) => {
        state.loadingArticles = false;
        state.error = action.payload;
      })
      .addCase(getArticleRecommedations.pending, (state) => {
        state.recommedationsLoading = true;
        state.recommendationsError = undefined;
        state.recommedations = [];
      })
      .addCase(getArticleRecommedations.fulfilled, (state, action) => {
        state.recommedationsLoading = false;
        state.recommedations = action.payload;
      })
      .addCase(getArticleRecommedations.rejected, (state, action) => {
        state.recommedationsLoading = false;
        state.recommendationsError = action.payload;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        if (state.article) {
          state.article.liked = action.payload.liked;
          if (action.payload.liked) {
            state.article.likesCount += 1;
          } else {
            state.article.likesCount -= 1;
          }
        }
      });
  },
});

export const { actions: articleActions } = articleSlice;

export const { reducer: articleReducer } = articleSlice;
