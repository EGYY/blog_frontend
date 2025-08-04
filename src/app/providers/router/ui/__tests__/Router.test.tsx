import { screen } from '@testing-library/react';

import { Router } from '../Router';

import { getRouteMain, getRouteProfileEdit } from '@/shared/config/routes/routes';
import { componentRender } from '@/shared/lib/tests/componentRender';
import { testUser } from '@/shared/lib/tests/const/testContstants';

describe('app/router/Router', () => {
  test('should render correctly', async () => {
    componentRender(<Router />, {
      route: getRouteMain(),
    });

    const page = await screen.findByTestId('main-page');
    expect(page).toBeInTheDocument();
  });

  test('should not render if route is not found', async () => {
    componentRender(<Router />, {
      route: '/not-found',
    });
    const notFoundPage = await screen.findByTestId('not-found-page');
    expect(notFoundPage).toBeInTheDocument();
  });

  test('should redirect if auth route', async () => {
    componentRender(<Router />, {
      route: getRouteProfileEdit(),
    });
    const page = await screen.findByTestId('main-page');
    expect(page).toBeInTheDocument();
  });

  test('should render for auth user', async () => {
    componentRender(<Router />, {
      route: getRouteProfileEdit(),
      initialState: {
        user: {
          inited: true,
          loading: false,
          userData: {
            user: testUser,
          },
        },
      },
    });
    const page = await screen.findByTestId('profile-page');
    expect(page).toBeInTheDocument();
  });
});
