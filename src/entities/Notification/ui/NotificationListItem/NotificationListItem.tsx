import { Link } from 'react-router-dom';

import { Notification } from '../../model/types/notification';

import BellIcon from '@/shared/assets/bell.svg';
import { getRouteArticleDetail } from '@/shared/config/routes/routes';
import { timeAgo } from '@/shared/lib/helpers/formatDate/formatDate';

import cls from './NotificationListItem.module.scss';

interface NotificationListItemProps {
    item: Notification;
}

export const NotificationListItem = (props: NotificationListItemProps) => {
    const { item } = props;
    return (
        <Link
            to={getRouteArticleDetail(item.article.id)}
            target="_blank"
            className={cls.notificationItem}
        >
            <BellIcon width={20} />
            <div className={cls.notificationItemContent}>
                <p className={cls.notificationItemMessage}>{item.message}</p>
                <p className={cls.notificationItemTime}>
                    {timeAgo(item.createdAt)}
                </p>
            </div>
        </Link>
    );
};
