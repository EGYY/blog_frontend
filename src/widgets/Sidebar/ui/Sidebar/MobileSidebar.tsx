import { useState } from 'react';

import { SidebarLinks } from '../../model/const/sidebar';

import { SidebarItem } from './SidebarItem';

import { LanguageSwitcher } from '@/features/LanguageSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import MenuIcon from '@/shared/assets/menu.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button/Button';
import { Drawer } from '@/shared/ui/Drawer/Drawer';

import cls from './Sidebar.module.scss';

const MobileSidebarComponent = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button
                className={cls.mobileMenuButton}
                theme="outline"
                onClick={() => setOpen(true)}
            >
                <MenuIcon width={15} />
            </Button>
            <Drawer
                position="right"
                isOpen={open}
                onClose={() => setOpen(false)}
            >
                <div
                    role="navigation"
                    className={classNames(cls.links, {
                        [cls.collapsed]: false,
                    })}
                >
                    {SidebarLinks.map((item) => (
                        <SidebarItem
                            key={item.path}
                            item={item}
                            collapsed={false}
                        />
                    ))}
                </div>
                <div className={cls.switchers}>
                    <LanguageSwitcher />
                    <ThemeSwitcher />
                </div>
            </Drawer>
        </>
    );
};

export default MobileSidebarComponent;
