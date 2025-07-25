import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import '@/app/styles/index.scss';
import { loginReducer } from '@/features/AuthByEmail/model/slice/loginSlice';
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const asyncDefaultReducers: ReducersList = {
  login: loginReducer,
};

export const StoreDecorator = (
  state: StateSchema,
  asyncReducers?: ReducersList,
) => (StoryComponent: Story) => (
  <StoreProvider initialState={state} asyncReducers={{ ...asyncDefaultReducers, ...asyncReducers }}>
    <StoryComponent />
  </StoreProvider>
);
