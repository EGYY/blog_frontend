import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Profile } from '../../model/types/profile';

import BookIcon from '@/shared/assets/book-open.svg';
import { getRouteArticleDetail } from '@/shared/config/routes/routes';
import { classNames } from '@/shared/lib/classNames/classNames';
import { timeAgo } from '@/shared/lib/helpers/formatDate/formatDate';
import { Card } from '@/shared/ui/Card/Card';
import { Tag } from '@/shared/ui/Tag/Tag';

import cls from './ProfileLastArticles.module.scss';

interface ProfileLastArticlesProps {
    className?: string
    profile: Profile | undefined
}

export const ProfileLastArticles = memo((props: ProfileLastArticlesProps) => {
  const { className, profile } = props;
  const { t } = useTranslation('profile');
  return (
    <Card className={classNames(cls.lastArticleWrapper, {}, [className])}>
      <h3>{t('last_articles')}</h3>
      <div className={cls.lastArticleList}>
        {profile?.articles && profile?.articles?.length > 0 ? profile?.articles.map((article) => (
          <Link key={article.id} to={getRouteArticleDetail(article.id)} className={cls.lastArticleItem}>
            <div className={cls.profileCardStatItemIcon}>
              <BookIcon width={20} />
            </div>
            <div className={cls.lastArticleItemInfo}>
              <p>{article.title}</p>
              <span>{timeAgo(article.createdAt)}</span>
            </div>
          </Link>
        )) : (
          <Tag>{t('no_articles')}</Tag>
        )}
      </div>
    </Card>
  );
});
