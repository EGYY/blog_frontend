export enum Routes {
    MAIN = 'main',
    ABOUT = 'about'
}

export const RoutePath: Record<Routes, string> = {
  [Routes.MAIN]: '/',
  [Routes.ABOUT]: '/about',
};
