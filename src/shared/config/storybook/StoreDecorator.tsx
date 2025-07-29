import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
// eslint-disable-next-line egyy-plugin/layer-imports
import '@/app/styles/index.scss';
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const asyncDefaultReducers: ReducersList = {};

export const StoreDecorator = (
  state: StateSchema,
  asyncReducers?: ReducersList,
) => (StoryComponent: Story) => (
  <StoreProvider initialState={state} asyncReducers={{ ...asyncDefaultReducers, ...asyncReducers }}>
    <StoryComponent />
  </StoreProvider>
);
