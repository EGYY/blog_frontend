import { Link } from 'react-router-dom';

import { ArticleType } from '@/entities/Article';
import BookIcon from '@/shared/assets/book-open.svg';
import { getRouteArticleDetail } from '@/shared/config/routes/routes';
import { timeAgo } from '@/shared/lib/helpers/formatDate/formatDate';

import cls from './ProfileArticles.module.scss';

interface ProfileArticleItemProps {
    article: ArticleType;
}
export const ProfileArticleItem = ({ article }: ProfileArticleItemProps) => {
  return (
    <Link to={getRouteArticleDetail(article.id)} className={cls.lastArticleItem}>
      <div className={cls.profileCardStatItemIcon}>
        <BookIcon width={20} />
      </div>
      <div className={cls.lastArticleItemInfo}>
        <p>{article.title}</p>
        <span>{timeAgo(article.createdAt)}</span>
      </div>
    </Link>
  );
};
