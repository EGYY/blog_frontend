import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18nFotTests from '@/shared/config/i18n/i18nForTests';

export interface componentRenderOptions {
    route?: string
}

export const componentRender = (component: ReactNode, options: componentRenderOptions = {}) => {
  const { route = '/' } = options;
  return render(
    <MemoryRouter
      initialEntries={[route]}
      future={{
        v7_relativeSplatPath: false,
        v7_startTransition: false,
      }}
    >
      <I18nextProvider i18n={i18nFotTests}>
        {component}
      </I18nextProvider>
      ,
    </MemoryRouter>,
  );
};
