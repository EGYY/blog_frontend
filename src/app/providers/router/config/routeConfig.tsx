import { RouteProps } from 'react-router-dom';

import { ArticleCreateUpdatePage } from '@/pages/ArticleCreateUpdatePage';
import { ArticleDetailPage } from '@/pages/ArticleDetailPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfileDetailPage } from '@/pages/ProfileDetailPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { RoutePath, Routes } from '@/shared/config/routes/routes';

type AppRouteProps = RouteProps & {
  authOnly?: boolean
}

export const routeConfig: Record<Routes, AppRouteProps> = {
  [Routes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
  [Routes.ARTICLES]: {
    path: RoutePath.articles,
    element: <ArticlesPage />,
  },
  [Routes.ARTICLE_DETAIL]: {
    path: `${RoutePath.article_detail}:id`,
    element: <ArticleDetailPage />,
  },
  [Routes.ARTICLE_CREATE]: {
    path: `${RoutePath.article_create}`,
    element: <ArticleCreateUpdatePage />,
    authOnly: true,
  },
  [Routes.ARTICLE_UPDATE]: {
    path: `${RoutePath.article_update}:id/edit`,
    element: <ArticleCreateUpdatePage />,
    authOnly: true,
  },
  [Routes.PROFILE_EDIT]: {
    path: RoutePath.profile_edit,
    element: <ProfilePage />,
    authOnly: true,
  },
  [Routes.PROFILE_DETAIL]: {
    path: `${RoutePath.profile_detail}:id`,
    element: <ProfileDetailPage />,
  },
  [Routes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
