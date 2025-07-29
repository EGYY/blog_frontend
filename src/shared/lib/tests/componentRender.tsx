import { ReducersMapObject } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import i18nFotTests from '@/shared/config/i18n/i18nForTests';
import { Theme } from '@/shared/config/theme/ThemeContext';

export interface componentRenderOptions {
    route?: string
    initialState?: StateSchema
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
    theme?: Theme
}

export const componentRender = (component: ReactNode, options: componentRenderOptions = {}) => {
  const {
    route = '/', initialState, asyncReducers, theme = Theme.LIGHT,
  } = options;
  return render(
    <MemoryRouter
      initialEntries={[route]}
      future={{
        v7_relativeSplatPath: false,
        v7_startTransition: false,
      }}
    >
      <StoreProvider asyncReducers={asyncReducers} initialState={initialState}>
        <I18nextProvider i18n={i18nFotTests}>
          <div className={`app ${theme}`}>
            {component}
          </div>
        </I18nextProvider>
      </StoreProvider>
      ,
    </MemoryRouter>,
  );
};
