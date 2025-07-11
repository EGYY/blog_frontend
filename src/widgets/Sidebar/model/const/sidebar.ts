import { RoutePath } from '@/shared/config/routes/routes';
import { SidebarItemType } from '../types/sidebar';
import HomeIcon from '@/shared/assets/home.svg';
import BookOpenIcon from '@/shared/assets/book-open.svg';

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
