import {
  AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router-dom';
import { UserSchema } from '@/entities/User';
import { LoginSchema } from '@/features/AuthByEmail';
import { UpdateProfileSchema } from '@/features/EditableProfileCard';
import { ArticleSchema } from '@/entities/Article';
import { ArticleCommentsBlockSchema } from '@/widgets/ArticleCommentsBlock';
import { AddCommentFormSchema } from '@/features/AddCommentForm';
import { ProfileDetailSchema } from '@/widgets/ProfileViewer';

export interface StateSchema {
    user: UserSchema,
    login?: LoginSchema,
    update_profile?: UpdateProfileSchema,
    article?: ArticleSchema,
    comment_form?: AddCommentFormSchema
    article_comments_block?: ArticleCommentsBlockSchema,
    profile_detail?: ProfileDetailSchema
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>,
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>,
    add: (key: StateSchemaKey, reducer: Reducer) => void,
    remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager
}

export interface ThunkExtraArg {
    api: AxiosInstance,
    apiAuth: AxiosInstance,
    navigate?: (to: To, options?: NavigateOptions) => void,
}

export interface ThunkExtraArgForTests {
    api: jest.MockedFn<AxiosInstance>,
    navigate?: jest.Mock,
}
