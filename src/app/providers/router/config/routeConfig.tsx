import { RouteProps } from 'react-router-dom';

import { UserRole } from '@/entities/User';
import { DashboardPage } from '@/pages/AdminPanel';
import { ArticleCreateUpdatePage } from '@/pages/ArticleCreateUpdatePage';
import { ArticleDetailPage } from '@/pages/ArticleDetailPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfileDetailPage } from '@/pages/ProfileDetailPage';
import { ProfilePage } from '@/pages/ProfilePage';
import {
    getRouteAdminDashboard,
    getRouteArticleCreate,
    getRouteArticleDetail,
    getRouteArticles,
    getRouteArticleUpdate,
    getRouteForbidden,
    getRouteMain,
    getRouteProfileDetail,
    getRouteProfileEdit,
    Routes,
} from '@/shared/config/routes/routes';

type AppRouteProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRole[];
};

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
    [Routes.ADMIN_DASHBOARD]: {
        path: getRouteAdminDashboard(),
        element: <DashboardPage />,
        authOnly: true,
        roles: ['ADMIN'],
    },
    [Routes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
    },
    [Routes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    },
};
