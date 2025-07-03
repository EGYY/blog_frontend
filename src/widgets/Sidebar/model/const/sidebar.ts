import { RoutePath } from '@/shared/config/routes/routes';
import { SidebarItemType } from '../types/sidebar';
import HomeIcon from '@/shared/assets/home.svg';

export const SidebarLinks: SidebarItemType[] = [
  {
    path: RoutePath.main,
    translate_key: 'main',
    icon: HomeIcon,
  },
  {
    path: RoutePath.about,
    translate_key: 'about',
    icon: HomeIcon,
  },
];
