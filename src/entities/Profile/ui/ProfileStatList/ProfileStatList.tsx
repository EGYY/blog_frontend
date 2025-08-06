import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Profile } from '../../model/types/profile';

import BookIcon from '@/shared/assets/book-open.svg';
import HeartIcon from '@/shared/assets/heart.svg';
import InfoIcon from '@/shared/assets/info.svg';
import MessageIcon from '@/shared/assets/message-square.svg';
import UserIcon from '@/shared/assets/user-circle.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card/Card';

import cls from './ProfileStatList.module.scss';

interface ProfileStatListProps {
    className?: string;
    profile: Profile | undefined;
}

export const ProfileStatList = memo((props: ProfileStatListProps) => {
    const { className, profile } = props;
    const { t } = useTranslation('profile');

    const data = useMemo(() => {
        if (profile?._count) {
            const isNotEmpty = Object.keys(profile?._count).length > 0;

            if (isNotEmpty) {
                const stats = Object.entries(profile?._count).map(
                    ([key, value]) => {
                        let keyTranslation: string = key;
                        let icon = <InfoIcon width={20} />;
                        switch (key) {
                            case 'articles':
                                keyTranslation = t('total_articles');
                                icon = <BookIcon width={20} />;
                                break;
                            case 'comments':
                                keyTranslation = t('total_comments');
                                icon = <MessageIcon width={20} />;
                                break;
                            case 'likes':
                                keyTranslation = t('total_likes');
                                icon = <HeartIcon width={20} />;
                                break;
                            case 'followers':
                                keyTranslation = t('total_followers');
                                icon = <UserIcon width={20} />;
                                break;
                            case 'following':
                                keyTranslation = t('total_following');
                                icon = <UserIcon width={20} />;
                                break;
                            default:
                                break;
                        }
                        return {
                            key: keyTranslation,
                            icon,
                            value,
                        };
                    },
                );
                return stats;
            }
            return null;
        }
        return null;
    }, [profile?._count, t]);

    if (!data) {
        return null;
    }

    return (
        <div className={classNames(cls.profileCardStatList, {}, [className])}>
            {data.map((stat) => {
                return (
                    <Card key={stat.key} className={cls.profileCardStatItem}>
                        <div className={cls.profileCardStatItemIcon}>
                            {stat.icon}
                        </div>
                        <div className={cls.profileCardStatItemStat}>
                            <b>{stat.value}</b>
                            <span>{stat.key}</span>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
});
