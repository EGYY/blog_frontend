import { SidebarItemType } from '../types/sidebar';

import BookOpenIcon from '@/shared/assets/book-open.svg';
import HomeIcon from '@/shared/assets/home.svg';
import { getRouteArticles, getRouteMain } from '@/shared/config/routes/routes';

export const SidebarLinks: SidebarItemType[] = [
    {
        path: getRouteMain(),
        translate_key: 'main',
        icon: HomeIcon,
    },
    {
        path: getRouteArticles(),
        translate_key: 'articles',
        icon: BookOpenIcon,
    },
];
