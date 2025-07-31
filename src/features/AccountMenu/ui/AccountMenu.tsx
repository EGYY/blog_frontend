import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getUser, logout } from '@/entities/User';
import LogoutIcon from '@/shared/assets/logout.svg';
import UserIcon from '@/shared/assets/user-circle.svg';
import { getRouteMain } from '@/shared/config/routes/routes';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from '@/shared/ui/Button/Button';
import { Image } from '@/shared/ui/Image/Image';

import styles from './AccountMenu.module.scss';

interface AccountMenuProps {
  className?: string;
}

export const AccountMenu = memo((props: AccountMenuProps) => {
  const { className } = props;
  const { t } = useTranslation('navbar');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useSelector(getUser);

  const handleLogout = () => {
    dispatch(logout()).then(() => navigate(getRouteMain()));
  };

  const handleGoToProfile = () => {
    navigate(`/profile/${user?.id}`);
  };

  return (
    <div className={classNames(styles.accountMenu, {}, [className])}>
      <div className={classNames(styles.accountMenuTrigger, {})}>
        <Image src={`${__SERVER_URL__}${user?.avatar}`} alt={user?.name || user?.email} />
        <div className={styles.accountMenuTriggerInfo}>
          <b>{user?.name}</b>
          <span>{user?.email}</span>
        </div>
      </div>
      <div className={classNames(styles.menuItems, {}, [styles.mt])}>
        <Button theme="ghost" onClick={handleGoToProfile}>
          <UserIcon />
          {t('profile')}
        </Button>
      </div>
      <div className={styles.separator} />
      <div className={styles.menuItems}>
        <Button theme="ghost" onClick={handleLogout}>
          <LogoutIcon />
          {t('logout')}
        </Button>
      </div>
    </div>
  );
});
