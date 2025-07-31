import { RouteProps } from 'react-router-dom';

import { ArticleCreateUpdatePage } from '@/pages/ArticleCreateUpdatePage';
import { ArticleDetailPage } from '@/pages/ArticleDetailPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfileDetailPage } from '@/pages/ProfileDetailPage';
import { ProfilePage } from '@/pages/ProfilePage';
import {
  getRouteArticleCreate,
  getRouteArticleDetail,
  getRouteArticles,
  getRouteArticleUpdate,
  getRouteMain,
  getRouteProfileDetail,
  getRouteProfileEdit,
  Routes,
} from '@/shared/config/routes/routes';

type AppRouteProps = RouteProps & {
  authOnly?: boolean
}

export const routeConfig: Record<Routes, AppRouteProps> = {
  [Routes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
  },
  [Routes.ARTICLES]: {
    path: getRouteArticles(),
    element: <ArticlesPage />,
  },
  [Routes.ARTICLE_DETAIL]: {
    path: getRouteArticleDetail(':id'),
    element: <ArticleDetailPage />,
  },
  [Routes.ARTICLE_CREATE]: {
    path: getRouteArticleCreate(),
    element: <ArticleCreateUpdatePage />,
    authOnly: true,
  },
  [Routes.ARTICLE_UPDATE]: {
    path: getRouteArticleUpdate(':id'),
    element: <ArticleCreateUpdatePage />,
    authOnly: true,
  },
  [Routes.PROFILE_EDIT]: {
    path: getRouteProfileEdit(),
    element: <ProfilePage />,
    authOnly: true,
  },
  [Routes.PROFILE_DETAIL]: {
    path: getRouteProfileDetail(':id'),
    element: <ProfileDetailPage />,
  },
  [Routes.NOT_FOUND]: {
    path: '*',
    element: <NotFoundPage />,
  },
};
