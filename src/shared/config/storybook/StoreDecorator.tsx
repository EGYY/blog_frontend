import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import '@/app/styles/index.scss';
import { loginReducer } from '@/features/AuthByEmail/model/slice/loginSlice';

const asyncDefaultReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
  login: loginReducer,
};

export const StoreDecorator = (
  state: StateSchema,
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
) => (StoryComponent: Story) => (
  <StoreProvider initialState={state} asyncReducers={{ ...asyncDefaultReducers, ...asyncReducers }}>
    <StoryComponent />
  </StoreProvider>
);
