import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { useNotifications } from '../../api/notificationApi';
import { NotificationListItem } from '../NotificationListItem/NotificationListItem';
import cls from './NotificationList.module.scss';
import { Tag } from '@/shared/ui/Tag/Tag';

interface NotifcationListProps {
    className?: string;
}

export const NotifcationList = (props: NotifcationListProps) => {
  const { className } = props;
  const { t } = useTranslation('notifications');
  const { data: notifications, isLoading } = useNotifications(
    undefined,
    {
      pollingInterval: 10000,
      refetchOnMountOrArgChange: true,
    },
  );

  return (
    <div className={classNames(cls.notificationListWrapper, {}, [className])}>
      <h3>{t('notifications')}</h3>
      <div className="separator" />
      <div className={cls.notificationList}>
        {notifications && notifications?.length > 0
          ? notifications.map((notification) => (<NotificationListItem key={notification.id} item={notification} />))
          : <Tag variant="info">{t('empty')}</Tag>}
        {isLoading && (
        <>
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
        </>
        )}
      </div>
    </div>
  );
};
