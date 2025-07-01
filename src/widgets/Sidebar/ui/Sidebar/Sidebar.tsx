import { FC, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Sidebar.module.scss';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import SidebarIcon from '@/shared/assets/sidebar.svg';
import { AppLink, AppLinkType } from '@/shared/ui/AppLink/AppLink';
import HomeIcon from '@/shared/assets/home.svg';
import { LanguageSwitcher } from '@/widgets/LanguageSwitcher';
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher';

interface SidebarProps {
    className?: string
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  const { t } = useTranslation('sidebar');
  const [collapsed, setCollapsed] = useState(JSON.parse(localStorage.getItem('sidebar')) as boolean || false);

  const toggleSidebar = () => {
    setCollapsed((prev) => {
      localStorage.setItem('sidebar', `${!prev}`);
      return !prev;
    });
  };

  return (
    <div data-testid="sidebar" className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}>
      <Button
        data-testid="toggle-sidebar"
        className={cls.toggleSidebar}
        onClick={toggleSidebar}
        theme={ThemeButton.GHOST_ICON}
        title={t('toggle_sidebar_title')}
      >
        <SidebarIcon width={24} height={24} />
      </Button>
      <div className={classNames(cls.links, { [cls.collapsed]: collapsed })}>
        <AppLink type={AppLinkType.BUTTON} to="/" title={t('main')}>
          <HomeIcon />
          <p>{t('main')}</p>
        </AppLink>
        <AppLink type={AppLinkType.BUTTON} to="/about" title={t('about')}>
          <HomeIcon />
          <p>{t('about')}</p>
        </AppLink>
      </div>
      <div className={cls.switchers}>
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </div>
  );
};
