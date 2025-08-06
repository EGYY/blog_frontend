export enum Routes {
    MAIN = 'main',
    ARTICLES = 'articles',
    ARTICLE_DETAIL = 'article_detail',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_UPDATE = 'article_update',
    PROFILE_EDIT = 'profile_edit',
    PROFILE_DETAIL = 'profile_detail',
    NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteArticles = () => '/articles';
export const getRouteArticleDetail = (id: string) => `/articles/${id}`;
export const getRouteArticleCreate = () => '/articles/create';
export const getRouteArticleUpdate = (id: string) => `/articles/${id}/edit`;
export const getRouteProfileEdit = () => '/profile/edit';
export const getRouteProfileDetail = (id: string) => `/profile/${id}`;
