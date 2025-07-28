import { FC, memo } from 'react';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Article.module.scss';
import { Article as ArticleType } from '../../../model/types/article';
import { ArticleLoading } from '../ArticleLoading/ArticleLoading';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { formatDate } from '@/shared/lib/helpers/formatDate/formatDate';
import CalendarIcon from '@/shared/assets/calendar.svg';
import HeartIcon from '@/shared/assets/heart.svg';
import EyeIcon from '@/shared/assets/eye.svg';
import { Tag } from '@/shared/ui/Tag/Tag';
import { ArticleError } from '../ArticleError/ArticleError';
import { HoverCard } from '@/shared/ui/HoverCard/HoverCard';
import { ProfileMainInfo } from '@/entities/Profile';

interface ArticleProps {
  className?: string
  article: ArticleType | undefined
  loadingArticle?: boolean
  errorArticle?: string
}

export const Article: FC<ArticleProps> = memo(({
  className, article, loadingArticle, errorArticle,
}) => {
  const { t } = useTranslation('profile');
  if (loadingArticle) {
    return <ArticleLoading />;
  }

  if (errorArticle) {
    return <ArticleError error={errorArticle} />;
  }

  return (
    <article className={classNames(cls.articleWrapper, {}, [className])}>
      <HoverCard
        trigger={(
          <Link to={`/profile/${article?.author.id}`} className={cls.articleAuthor}>
            <Avatar src={`${__SERVER_URL__}${article?.author.avatar}`} />
            <span>{article?.author.name || article?.author.email}</span>
          </Link>
      )}
        content={<ProfileMainInfo t={t} profile={article?.author} />}
        side="bottom"
      />
      <div className={cls.articleContent}>
        <h1 className={cls.articleTitle}>{article?.title}</h1>
        <p className={cls.articleSubtitle}>{article?.subtitle}</p>
        <div className={cls.articleInfo}>
          <span>
            <CalendarIcon />
            {formatDate(article?.createdAt)}
          </span>
          <span>
            <EyeIcon />
            {article?.viewsCount}
          </span>
          <span>
            <HeartIcon />
            {article?.likesCount}
          </span>
        </div>
        <div className={cls.articleTags}>{article?.tags?.map((tag) => (<Tag key={tag.id}>{tag.name}</Tag>))}</div>
      </div>
      <div className={cls.artticlePoster}>
        <img src={`${__SERVER_URL__}${article?.poster}`} alt={article?.title} />
      </div>
      <div className={classNames('separator', {}, [cls.separator])} />
      {
        // eslint-disable-next-line react/no-danger
        article?.content && <div className={cls.articleHtml} dangerouslySetInnerHTML={{ __html: article?.content }} />
      }
    </article>
  );
});
