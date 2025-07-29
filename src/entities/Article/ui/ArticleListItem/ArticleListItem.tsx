import { HTMLAttributeAnchorTarget } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Article, ArticleView } from '../../model/types/article';

import CalendarIcon from '@/shared/assets/calendar.svg';
import { RoutePath } from '@/shared/config/routes/routes';
import { classNames } from '@/shared/lib/classNames/classNames';
import { formatDate } from '@/shared/lib/helpers/formatDate/formatDate';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Tag } from '@/shared/ui/Tag/Tag';

import cls from './ArticleListItem.module.scss';

interface ArticleListItemProps {
    article: Article,
    view?: ArticleView,
    className?: string,
    target?: HTMLAttributeAnchorTarget,
}
export const ArticleListItem = (props: ArticleListItemProps) => {
  const {
    article, view = ArticleView.GRID, className, target,
  } = props;
  const { t } = useTranslation('article');

  if (view === ArticleView.LIST) {
    return (
      <Link
        to={`${RoutePath.article_detail}${article.id}`}
        target={target}
        className={classNames(cls.articleListItem, {}, [className, cls[view]])}
      >
        <div className={classNames(cls.articleListItemPoster, {}, [cls[view]])}>
          <img src={`${__SERVER_URL__}${article.poster}`} alt={article.title} />
        </div>
        <div className={classNames(cls.articleListItemContent, {}, [cls[view]])}>
          <div className={classNames(cls.tags, {}, [cls[view]])}>
            {article.tags.map((tag) => <Tag variant="outline" key={tag.id}>{tag.name}</Tag>)}
          </div>
          <h3 className={cls[view]}>{article.title}</h3>
          <p className={cls[view]}>{article.subtitle}</p>
          <div className={classNames(cls.articleListItemInfo, {}, [cls[view]])}>
            <div className={classNames(cls.articleListItemInfoMuted, {}, [cls[view]])}>
              <CalendarIcon width={14} />
              {formatDate(article.createdAt)}
            </div>
            <Button theme="ghost">
              {t('read_more')}
            </Button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`${RoutePath.article_detail}${article.id}`} target={target}>
      <Card className={classNames(cls.articleListItem, {}, [className, cls[view]])}>
        <div className={classNames(cls.articleListItemPoster, {}, [cls[view]])}>
          <img src={`${__SERVER_URL__}${article.poster}`} alt={article.title} />
        </div>
        <div className={classNames(cls.articleListItemContent, {}, [cls[view]])}>
          <div className={classNames(cls.tags, {}, [cls[view]])}>
            {article.tags.map((tag) => <Tag variant="outline" key={tag.id}>{tag.name}</Tag>)}
          </div>
          <h3 className={cls[view]}>{article.title}</h3>
          <p className={cls[view]}>{article.subtitle}</p>
          <div className={classNames(cls.articleListItemInfo, {}, [cls[view]])}>
            <div className={classNames(cls.articleListItemInfoMuted, {}, [cls[view]])}>
              <CalendarIcon width={14} />
              {formatDate(article.createdAt)}
            </div>
            <Button theme="ghost">
              {t('read_more')}
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};
