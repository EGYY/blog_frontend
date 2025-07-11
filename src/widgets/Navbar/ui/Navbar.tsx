import {
  FC, memo, useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import UserCircleIcon from '@/shared/assets/user-circle.svg';
import { LoginModal } from '@/features/AuthByEmail';
import { getLoadingUser, getUser } from '@/entities/User';
import { Dropdown } from '@/shared/ui/Dropdown/Dropdown';
import { AccountMenu } from '@/widgets/AccountMenu/AccountMenu';
import { AccountMenuTrigger } from '@/widgets/AccountMenu/AccountMenuTrigger';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Tooltip } from '@/shared/ui/Tooltip/Tooltip';

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = memo(({ className }) => {
  const { t } = useTranslation('navbar');
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const user = useSelector(getUser);
  const loading = useSelector(getLoadingUser);

  const onShowModal = useCallback(() => {
    setOpenAuthModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setOpenAuthModal(false);
  }, []);

  if (loading) {
    return (
      <div className={classNames(cls.navbar, {}, [className])}>
        <div className={cls.actionBtns}>
          <div className={cls.loadingProfile}>
            <Skeleton circle height={40} />
            <div className={cls.loadingProfileInfo}>
              <Skeleton height={15} width={70} />
              <Skeleton height={15} width={100} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className={classNames(cls.navbar, {}, [className])}>
        <div className={cls.actionBtns}>
          <Dropdown trigger={<AccountMenuTrigger />}>
            <AccountMenu />
          </Dropdown>
        </div>
      </div>
    );
  }

  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <div className={cls.actionBtns}>
        <Tooltip content={t('authorization')} preferredPlacement="left">
          <Button theme={ThemeButton.GHOST_ICON} onClick={onShowModal}>
            <UserCircleIcon width={24} />
            {t('login')}
          </Button>
        </Tooltip>
      </div>
      <LoginModal open={openAuthModal} onClose={onCloseModal} />
    </div>
  );
});
