import { lazy } from 'react';

export const ArticleCreateUpdatePageAsync = lazy(
    () => import('./ArticleCreateUpdatePage'),
);
