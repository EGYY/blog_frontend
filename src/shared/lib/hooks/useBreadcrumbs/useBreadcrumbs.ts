import { useMemo } from 'react';
import { useLocation, matchPath } from 'react-router-dom';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type RouteBreadcrumbMap = {
  [pattern: string]: string | ((params: Record<string, string>) => string);
};

const breadcrumbMap: RouteBreadcrumbMap = {
  '/': 'Главная',
  '/articles': 'Статьи',
  '/articles/create': 'Создание статьи',
  '/articles/:id': (params) => `Статья #${params.id}`,
  '/articles/:id/edit': (params) => `Редактирование статьи #${params.id}`,
  '/profile/:id': 'Профиль',
  '/profile/edit': 'Редактирование профиля',
};

export const useBreadcrumbs = (): BreadcrumbItem[] => {
  const location = useLocation();

  return useMemo(() => {
    const segments = location.pathname.split('/').filter(Boolean);

    return segments.reduce<BreadcrumbItem[]>((breadcrumbs, _, index, array) => {
      const accumulatedPath = `/${array.slice(0, index + 1).join('/')}`;

      const matchedEntry = Object.entries(breadcrumbMap)
        .filter(([pattern]) => matchPath({ path: pattern, end: false }, accumulatedPath))
        .sort((a, b) => b[0].length - a[0].length)
        .find(([pattern]) => matchPath({ path: pattern, end: false }, accumulatedPath));

      if (matchedEntry) {
        const [pattern, labelConfig] = matchedEntry;
        const match = matchPath({ path: pattern, end: false }, accumulatedPath);
        const label = typeof labelConfig === 'function'
          ? labelConfig(match?.params as Record<string, string>)
          : labelConfig;

        breadcrumbs.push({
          label,
          href: index === array.length - 1 ? undefined : accumulatedPath,
        });
      }

      return breadcrumbs;
    }, []);
  }, [location.pathname]);
};
