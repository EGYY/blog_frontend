export enum Routes {
    MAIN = 'main',
    ARTICLES = 'articles',
    ARTICLE_DETAIL = 'article_detail',
    PROFILE_EDIT = 'profile_edit',
    PROFILE_DETAIL = 'profile_detail',
    NOT_FOUND = 'not_found'
}

export const RoutePath: Record<Routes, string> = {
  [Routes.MAIN]: '/',
  [Routes.ARTICLES]: '/articles',
  [Routes.ARTICLE_DETAIL]: '/articles/',
  [Routes.PROFILE_EDIT]: '/profile/edit',
  [Routes.PROFILE_DETAIL]: '/profile/',
  [Routes.NOT_FOUND]: '*',
};
