import { FC, useState } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Sidebar.module.scss';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import SidebarIcon from '@/shared/assets/sidebar.svg';

interface SidebarProps {
    className?: string
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(prev => !prev);
    }

    return (
        <div className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}>
            <Button
                className={cls.toggleSidebar}
                onClick={toggleSidebar}
                theme={ThemeButton.GHOST_ICON}
                title={"Свернуть/Развернуть боковую панель"}
            >
                <SidebarIcon width={24} height={24} />
            </Button>
        </div>
    );
};