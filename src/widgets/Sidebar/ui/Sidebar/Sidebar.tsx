import { FC, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SidebarLinks } from '../../model/const/sidebar';

import { SidebarItem } from './SidebarItem';

import { LanguageSwitcher } from '@/features/LanguageSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import SidebarIcon from '@/shared/assets/sidebar.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button/Button';
import { Tooltip } from '@/shared/ui/Tooltip/Tooltip';

import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar: FC<SidebarProps> = memo(({ className }) => {
    const { t } = useTranslation('sidebar');
    const [collapsed, setCollapsed] = useState(
        Boolean(JSON.parse(localStorage.getItem('sidebar') || 'false')),
    );

    const toggleSidebar = () => {
        setCollapsed((prev) => {
            localStorage.setItem('sidebar', `${!prev}`);
            return !prev;
        });
    };

    return (
        <aside
            data-testid="sidebar"
            className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [
                className,
            ])}
        >
            <Tooltip
                className={cls.toggleSidebar}
                content={t('toggle_sidebar_title')}
                preferredPlacement="right"
            >
                <Button
                    data-testid="toggle-sidebar"
                    onClick={toggleSidebar}
                    className={cls.toggleSidebar}
                    theme="ghostIcon"
                >
                    <SidebarIcon width={24} height={24} />
                </Button>
            </Tooltip>
            <div
                role="navigation"
                className={classNames(cls.links, {
                    [cls.collapsed]: collapsed,
                })}
            >
                {SidebarLinks.map((item) => (
                    <SidebarItem
                        key={item.path}
                        item={item}
                        collapsed={collapsed}
                    />
                ))}
            </div>
            <div className={cls.switchers}>
                <LanguageSwitcher />
                <ThemeSwitcher />
            </div>
        </aside>
    );
});
