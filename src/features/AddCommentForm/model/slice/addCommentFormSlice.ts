import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AddCommentFormSchema } from '../types/addCommentForm';

const initialState: AddCommentFormSchema = {
    content: '',
};

export const addCommentFormSlice = createSlice({
    name: 'addCommentForm',
    initialState,
    reducers: {
        setContent: (state, { payload }: PayloadAction<string>) => {
            state.content = payload;
        },
    },
});

export const { actions: addCommentFormActions } = addCommentFormSlice;

export const { reducer: addCommentFormReducer } = addCommentFormSlice;
