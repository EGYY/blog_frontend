import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { deleteProfileArticle } from '../services/deleteProfileArticle/deleteProfileArticle';
import { getProfileArticles } from '../services/getProfileArticles/getProfileArticles';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { UpdateProfileSchema } from '../types/UpdateProfileSchema';

const initialState: UpdateProfileSchema = {
    loading: false,
    error: undefined,
    articles: [],
    loadingArtilces: false,
    currentFilters: undefined,
    pageArticles: 1,
    totalArticles: 0,
};

export const updateProfileSlice = createSlice({
    name: 'update/profile',
    initialState,
    reducers: {
        setLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.loading = payload;
        },
        setError: (state, { payload }: PayloadAction<string | undefined>) => {
            state.error = payload;
        },
        setPageArticles: (state, { payload }: PayloadAction<number>) => {
            state.pageArticles = payload;
        },
        setCurrentFilters: (
            state,
            { payload }: PayloadAction<any | undefined>,
        ) => {
            state.currentFilters = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateProfileData.pending, (state) => {
                state.error = undefined;
                state.loading = true;
            })
            .addCase(updateProfileData.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateProfileData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getProfileArticles.pending, (state) => {
                state.loadingArtilces = true;
            })
            .addCase(getProfileArticles.fulfilled, (state, action) => {
                state.loadingArtilces = false;
                state.totalArticles = action.payload.total;
                state.articles = action.payload.data;
            })
            .addCase(deleteProfileArticle.pending, (state) => {
                state.error = undefined;
            })
            .addCase(deleteProfileArticle.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { actions: updateProfileActions } = updateProfileSlice;

export const { reducer: updateProfileReducer } = updateProfileSlice;
