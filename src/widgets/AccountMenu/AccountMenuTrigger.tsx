import { useSelector } from 'react-redux';
import { getUser } from '@/entities/User';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { SERVER_URL } from '@/shared/config/api/api';
import styles from './AccountMenu.module.scss';

export const AccountMenuTrigger = () => {
  const user = useSelector(getUser);
  return (
    <Button theme={ThemeButton.GHOST} className={styles.accountMenuTrigger}>
      <img src={`${SERVER_URL}${user.avatar}`} alt={user.name || user.email} />
      <div className={styles.accountMenuTriggerInfo}>
        <b>{user.name}</b>
        <span>{user.email}</span>
      </div>
    </Button>
  );
};
