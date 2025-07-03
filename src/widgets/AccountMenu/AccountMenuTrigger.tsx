import { useSelector } from 'react-redux';
import { memo } from 'react';
import { getUser } from '@/entities/User';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import styles from './AccountMenu.module.scss';

export const AccountMenuTrigger = memo(() => {
  const user = useSelector(getUser);
  return (
    <Button theme={ThemeButton.GHOST} className={styles.accountMenuTrigger}>
      <img src={`${__SERVER_URL__}${user?.avatar}`} alt={user?.name || user?.email} />
      <div className={styles.accountMenuTriggerInfo}>
        <b>{user?.name}</b>
        <span>{user?.email}</span>
      </div>
    </Button>
  );
});
