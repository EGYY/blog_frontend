import { useTranslation } from 'react-i18next';
import cls from './ArticleRecommendations.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';

interface ArticleRecommendationsProps {
    className?: string;
    data: Article[];
}

export const ArticleRecommendations = (props: ArticleRecommendationsProps) => {
  const { className, data } = props;
  const { t } = useTranslation('article');
  return (
    <div className={classNames(cls.recommendationsWrapper, {}, [className])}>
      <h2>{t('related_articles')}</h2>
      <div className={cls.recommendations}>
        {data.map((article) => (
          <ArticleListItem
            target="_blank"
            className={cls.recommendationItem} key={article.id} article={article}
          />
        ))}
      </div>
    </div>
  );
};
