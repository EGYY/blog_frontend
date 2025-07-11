import { RouteProps } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';
import { RoutePath, Routes } from '@/shared/config/routes/routes';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ArticleDetailPage } from '@/pages/ArticleDetailPage';
import { ProfileDetailPage } from '@/pages/ProfileDetailPage';

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
