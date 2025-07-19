import { ReducersMapObject } from '@reduxjs/toolkit';
import { FC } from 'react';
import { Provider } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { StateSchema } from '../config/StateSchema';
import { createReduxStore } from '../config/store';

interface StoreProviderProps {
    initialState?: StateSchema,
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
}

export const StoreProvider: FC<StoreProviderProps> = (props) => {
  const { children, initialState, asyncReducers } = props;

  const store = createReduxStore(initialState, asyncReducers as ReducersMapObject<StateSchema>);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
