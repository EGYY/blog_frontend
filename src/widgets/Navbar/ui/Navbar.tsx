import { FC, memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { NotificationList } from '@/entities/Notification';
import { getLoadingUser, getUser } from '@/entities/User';
import { AccountMenu, AccountMenuTrigger } from '@/features/AccountMenu';
import { LoginModal } from '@/features/AuthByEmail';
import BellIcon from '@/shared/assets/bell.svg';
import UserCircleIcon from '@/shared/assets/user-circle.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useBreadcrumbs } from '@/shared/lib/hooks/useBreadcrumbs/useBreadcrumbs';
import { useMobile } from '@/shared/lib/hooks/useMobile/useMobile';
import Breadcrumb from '@/shared/ui/Breadcrumb/Breadcrumb';
import { Button } from '@/shared/ui/Button/Button';
import { Dropdown } from '@/shared/ui/Dropdown/Dropdown';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Tooltip } from '@/shared/ui/Tooltip/Tooltip';

import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar: FC<NavbarProps> = memo(({ className }) => {
    const { t } = useTranslation(['navbar', 'notifications']);
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const user = useSelector(getUser);
    const loading = useSelector(getLoadingUser);
    const isMobile = useMobile();

    const breadcrumbs = useBreadcrumbs();

    const onShowModal = useCallback(() => {
        setOpenAuthModal(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setOpenAuthModal(false);
    }, []);

    if (loading) {
        return (
            <header className={classNames(cls.navbar, {}, [className])}>
                <div className={cls.actionBtns}>
                    <div className={cls.loadingProfile}>
                        <Skeleton circle height={40} />
                        <div className={cls.loadingProfileInfo}>
                            <Skeleton height={15} width={70} />
                            <Skeleton height={15} width={100} />
                        </div>
                    </div>
                </div>
            </header>
        );
    }

    if (user) {
        return (
            <header className={classNames(cls.navbar, {}, [className])}>
                {!isMobile && <Breadcrumb items={breadcrumbs} />}
                <div className={cls.actionBtns}>
                    <Dropdown
                        trigger={
                            <Tooltip content={t('notifications:notifications')}>
                                <Button theme="ghostIcon">
                                    <BellIcon width={20} />
                                </Button>
                            </Tooltip>
                        }
                    >
                        <NotificationList />
                    </Dropdown>
                    <Dropdown trigger={<AccountMenuTrigger />}>
                        <AccountMenu />
                    </Dropdown>
                </div>
            </header>
        );
    }

    return (
        <header className={classNames(cls.navbar, {}, [className])}>
            <Breadcrumb items={breadcrumbs} />
            <div className={cls.actionBtns}>
                <Tooltip
                    content={t('navbar:authorization')}
                    preferredPlacement="left"
                >
                    <Button theme="ghostIcon" onClick={onShowModal}>
                        <UserCircleIcon width={24} />
                        {t('navbar:login')}
                    </Button>
                </Tooltip>
            </div>
            <LoginModal open={openAuthModal} onClose={onCloseModal} />
        </header>
    );
});
