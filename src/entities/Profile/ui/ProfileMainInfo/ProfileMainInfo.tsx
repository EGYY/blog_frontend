import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Button } from '@/shared/ui/Button/Button';
import { Tooltip } from '@/shared/ui/Tooltip/Tooltip';
import BellIcon from '@/shared/assets/bell-ring.svg';
import cls from './ProfileMainInfo.module.scss';
import { formatDate } from '@/shared/lib/helpers/formatDate/formatDate';
import { classNames } from '@/shared/lib/classNames/classNames';
import { User } from '@/entities/User';

interface ProfileMainInfoProps {
    canSubscribe?: boolean
    className?: string
    profile: User | undefined
    t: any
}

export const ProfileMainInfo = memo((props: ProfileMainInfoProps) => {
  const {
    canSubscribe = false, profile, className, t,
  } = props;

  const displayRole = useMemo(() => {
    if (profile?.role) {
      switch (profile?.role) {
        case 'USER':
          return t('role_user');
        case 'ADMIN':
          return t('role_admin');
        case 'AUTHOR':
          return t('role_author');
        default:
          return t('role_user');
      }
    }
    return t('role_user');
  }, [profile?.role, t]);

  return (
    <div className={classNames(cls.profileCard, {}, [className])}>
      <div className={cls.profileInfo}>
        <Avatar style={{ width: 80, height: 80 }} src={`${__SERVER_URL__}${profile?.avatar}`} />
        <h3>{profile?.name || profile?.email}</h3>
        <Tooltip content={profile?.bio} preferredPlacement="bottom">
          <p>{profile?.bio}</p>
        </Tooltip>
      </div>
      {
      canSubscribe && (
        <Button>
          <BellIcon width={20} />
          {t('subscribe')}
        </Button>
      )
    }
      <div className={cls.profileCardInfoList}>
        <div>
          <span>{t('active since')}</span>
          <span>{formatDate(profile?.createdAt)}</span>
        </div>
        <div>
          <span>{t('role')}</span>
          <span>{displayRole}</span>
        </div>
      </div>
    </div>
  );
});
