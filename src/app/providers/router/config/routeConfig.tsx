import { RouteProps } from 'react-router-dom';
import { AboutPage } from '@/pages/AboutPage';
import { MainPage } from '@/pages/MainPage';
import { RoutePath, Routes } from '@/shared/config/routes/routes';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const routeConfig: Record<Routes, RouteProps> = {
  [Routes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
  [Routes.ABOUT]: {
    path: RoutePath.about,
    element: <AboutPage />,
  },
  [Routes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
