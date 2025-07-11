import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import styles from './AccountMenu.module.scss';
import { getUser, logout } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import LogoutIcon from '@/shared/assets/logout.svg';
import UserIcon from '@/shared/assets/user-circle.svg';

export const AccountMenu = memo(() => {
  const { t } = useTranslation('navbar');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleGoToProfile = () => {
    navigate(`/profile/${user?.id}`);
  };

  return (
    <div className={styles.accountMenu}>
      <div className={classNames(styles.accountMenuTrigger, {})}>
        <img src={`${__SERVER_URL__}${user?.avatar}`} alt={user?.name || user?.email} />
        <div className={styles.accountMenuTriggerInfo}>
          <b>{user?.name}</b>
          <span>{user?.email}</span>
        </div>
      </div>
      <div className={classNames(styles.menuItems, {}, [styles.mt])}>
        <Button theme={ThemeButton.GHOST} onClick={handleGoToProfile}>
          <UserIcon />
          {t('profile')}
        </Button>
      </div>
      <div className={styles.separator} />
      <div className={styles.menuItems}>
        <Button theme={ThemeButton.GHOST} onClick={handleLogout}>
          <LogoutIcon />
          {t('logout')}
        </Button>
      </div>
    </div>
  );
});
