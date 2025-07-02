import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FC } from 'react';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import styles from './AccountMenu.module.scss';
import { SERVER_URL } from '@/shared/config/api/api';
import { getUser, logout } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import LogoutIcon from '@/shared/assets/logout.svg';

interface AccountMenuProps {
    onLogout?: () => void;
}

export const AccountMenu: FC<AccountMenuProps> = (props) => {
  const { t } = useTranslation('navbar');
  const { onLogout } = props;
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const handleLogout = () => {
    dispatch(logout());
    onLogout?.();
  };

  return (
    <div className={styles.accountMenu}>
      <div className={classNames(styles.accountMenuTrigger, {})}>
        <img src={`${SERVER_URL}${user.avatar}`} alt={user.name || user.email} />
        <div className={styles.accountMenuTriggerInfo}>
          <b>{user.name}</b>
          <span>{user.email}</span>
        </div>
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
};
