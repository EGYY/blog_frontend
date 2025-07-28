import {
  FC, memo, useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { Button } from '@/shared/ui/Button/Button';
import UserCircleIcon from '@/shared/assets/user-circle.svg';
import { LoginModal } from '@/features/AuthByEmail';
import { getLoadingUser, getUser } from '@/entities/User';
import { Dropdown } from '@/shared/ui/Dropdown/Dropdown';
import { AccountMenu } from '@/widgets/AccountMenu/AccountMenu';
import { AccountMenuTrigger } from '@/widgets/AccountMenu/AccountMenuTrigger';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Tooltip } from '@/shared/ui/Tooltip/Tooltip';
import Breadcrumb from '@/shared/ui/Breadcrumb/Breadcrumb';
import { useBreadcrumbs } from '@/shared/lib/hooks/useBreadcrumbs/useBreadcrumbs';
import { NotifcationList } from '@/entities/Notification';
import BellIcon from '@/shared/assets/bell.svg';

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = memo(({ className }) => {
  const { t } = useTranslation(['navbar', 'notifications']);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const user = useSelector(getUser);
  const loading = useSelector(getLoadingUser);

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
        <Breadcrumb items={breadcrumbs} />
        <div className={cls.actionBtns}>
          <Dropdown
            trigger={(
              <Tooltip content={t('notifications:notifications')}>
                <Button theme="ghostIcon">
                  <BellIcon width={20} />
                </Button>
              </Tooltip>
        )}
          >
            <NotifcationList />
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
        <Tooltip content={t('navbar:authorization')} preferredPlacement="left">
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
