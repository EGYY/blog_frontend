import { memo } from 'react';
import { useSelector } from 'react-redux';

import { getUser } from '@/entities/User';
import { Button } from '@/shared/ui/Button/Button';
import { Image } from '@/shared/ui/Image/Image';

import styles from './AccountMenu.module.scss';

export const AccountMenuTrigger = memo(() => {
  const user = useSelector(getUser);
  return (
    <Button theme="ghost" className={styles.accountMenuTrigger}>
      <Image src={`${__SERVER_URL__}${user?.avatar}`} alt={user?.name || user?.email} />
      <div className={styles.accountMenuTriggerInfo}>
        <b>{user?.name}</b>
        <span>{user?.email}</span>
      </div>
    </Button>
  );
});
