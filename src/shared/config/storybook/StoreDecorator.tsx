/* eslint-disable egyy-plugin/layer-imports */
import { Story } from '@storybook/react';

import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { articleReducer } from '@/entities/Article';
import { userReducer } from '@/entities/User';
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleCreateUpdateReducer } from '@/widgets/ArticleCreateUpdate';
import { profileDetailReducer } from '@/widgets/ProfileViewer';

const asyncDefaultReducers: DeepPartial<ReducersList> = {
  user: userReducer,
  profile_detail: profileDetailReducer,
  article_create_update: articleCreateUpdateReducer,
  article: articleReducer,
};

export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
  asyncReducers?: ReducersList,
) => (StoryComponent: Story) => (
  <StoreProvider initialState={state} asyncReducers={{ ...asyncDefaultReducers, ...asyncReducers }}>
    <StoryComponent />
  </StoreProvider>
);
