/* eslint-disable react/no-danger */
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cls from './ArticleListItem.module.scss';
import { Article, ArticleView } from '../../model/types/article';
import CalendarIcon from '@/shared/assets/calendar.svg';
import { formatDate } from '@/shared/lib/helpers/formatDate/formatDate';
import { Tag } from '@/shared/ui/Tag/Tag';
import { Card } from '@/shared/ui/Card/Card';
import { RoutePath } from '@/shared/config/routes/routes';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { classNames } from '@/shared/lib/classNames/classNames';

interface ArticleListItemProps {
    article: Article,
    view?: ArticleView,
    className?: string,
}
export const ArticleListItem = (props: ArticleListItemProps) => {
  const { article, view = ArticleView.GRID, className } = props;
  const { t } = useTranslation('article');

  if (view === ArticleView.LIST) {
    return (
      <Link
        to={`${RoutePath.article_detail}${article.id}`}
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
            <Button theme={ThemeButton.GHOST}>
              {t('read_more')}
            </Button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`${RoutePath.article_detail}${article.id}`}>
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
            <Button theme={ThemeButton.GHOST}>
              {t('read_more')}
            </Button>
          </div>
        </div>
      </Card>
    </Link>

  );
};
