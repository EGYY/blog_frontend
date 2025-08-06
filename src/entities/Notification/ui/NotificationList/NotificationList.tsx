import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '../../api/notificationApi';
import { NotificationListItem } from '../NotificationListItem/NotificationListItem';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Tag } from '@/shared/ui/Tag/Tag';

import cls from './NotificationList.module.scss';

interface NotificationListProps {
    className?: string;
}

export const NotificationList = (props: NotificationListProps) => {
    const { className } = props;
    const { t } = useTranslation('notifications');
    const { data: notifications, isLoading } = useNotifications(undefined, {
        pollingInterval: 10000,
        refetchOnMountOrArgChange: true,
    });

    const nonEmptyNotifications = useMemo(() => {
        return notifications?.filter((n) => Boolean(n.article));
    }, [notifications]);

    return (
        <div
            className={classNames(cls.notificationListWrapper, {}, [className])}
        >
            <h3>{t('notifications')}</h3>
            <div className="separator" />
            <div className={cls.notificationList}>
                {nonEmptyNotifications && nonEmptyNotifications?.length > 0 ? (
                    nonEmptyNotifications.map((notification) => (
                        <NotificationListItem
                            key={notification.id}
                            item={notification}
                        />
                    ))
                ) : (
                    <Tag variant="info">{t('empty')}</Tag>
                )}
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
