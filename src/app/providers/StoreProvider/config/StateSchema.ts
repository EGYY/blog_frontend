import {
    AnyAction,
    CombinedState,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router-dom';

import { ArticleSchema } from '@/entities/Article';
import { UserSchema } from '@/entities/User';
import { AddCommentFormSchema } from '@/features/AddCommentForm';
import { ArticlesFiltersSchema } from '@/features/ArticlesFilters';
import { AuthSchema } from '@/features/AuthByEmail';
import { UpdateProfileSchema } from '@/features/EditableProfileCard';
import { SaveScrollPostitionSchema } from '@/features/SaveScrollPostition';
import { MainPageSchema } from '@/pages/MainPage';
import { rtkApi } from '@/shared/config/api/rtkApi';
import { ToastSchema } from '@/shared/lib/components/Toast';
import { ArticleCommentsBlockSchema } from '@/widgets/ArticleCommentsBlock';
import { ArticleCreateUpdateSchema } from '@/widgets/ArticleCreateUpdate';
import { ProfileDetailSchema } from '@/widgets/ProfileViewer';

export interface StateSchema {
    user: UserSchema;
    scroll: SaveScrollPostitionSchema;
    toasts: ToastSchema;
    main_page?: MainPageSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
    auth?: AuthSchema;
    update_profile?: UpdateProfileSchema;
    article?: ArticleSchema;
    article_create_update?: ArticleCreateUpdateSchema;
    articles_filters?: ArticlesFiltersSchema;
    comment_form?: AddCommentFormSchema;
    article_comments_block?: ArticleCommentsBlockSchema;
    profile_detail?: ProfileDetailSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (
        state: StateSchema,
        action: AnyAction,
    ) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
    apiAuth: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkExtraArgForTests {
    api: jest.MockedFn<AxiosInstance>;
    navigate?: jest.Mock;
}
