import { SidebarItemType } from '../types/sidebar';

import BookOpenIcon from '@/shared/assets/book-open.svg';
import HomeIcon from '@/shared/assets/home.svg';
import { RoutePath } from '@/shared/config/routes/routes';

export const SidebarLinks: SidebarItemType[] = [
  {
    path: RoutePath.main,
    translate_key: 'main',
    icon: HomeIcon,
  },
  {
    path: RoutePath.articles,
    translate_key: 'articles',
    icon: BookOpenIcon,
  },
];
