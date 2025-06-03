import { FC, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Sidebar.module.scss';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import SidebarIcon from '@/shared/assets/sidebar.svg';

interface SidebarProps {
    className?: string
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  const { t } = useTranslation('navbar');
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}>
      <Button
        className={cls.toggleSidebar}
        onClick={toggleSidebar}
        theme={ThemeButton.GHOST_ICON}
        title={t('toggle_sidebar_title')}
      >
        <SidebarIcon width={24} height={24} />
      </Button>
    </div>
  );
};
