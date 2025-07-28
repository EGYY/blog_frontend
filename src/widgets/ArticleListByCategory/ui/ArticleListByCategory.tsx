import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleType, Category } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleListByCategory.module.scss';
import { ArticleListItemByCategory } from './ArticleListItemByCategory';
import { Tag } from '@/shared/ui/Tag/Tag';

interface ArticleListByCategoryProps {
  className?: string
  articles: ArticleType[]
  categories?: Category[]
  selectedCategory?: Category
  onChangeCategory?: (category: Category) => void
}

export const ArticleListByCategory = memo((props: ArticleListByCategoryProps) => {
  const {
    className, articles, categories = [], selectedCategory, onChangeCategory,
  } = props;
  const { t } = useTranslation('article');
  return (
    <div className={classNames(cls.articleListByCategoryContainer, {}, [className])}>
      {
        categories.length > 0 && (
          <div className={cls.tagsTop}>
            {
              categories.map((category) => (
                <Tag
                  className={classNames(cls.tag, { [cls.selectedTag]: selectedCategory?.id === category.id })}
                  key={category.id}
                  onClick={() => onChangeCategory?.(category)}
                >
                  {category.name}
                </Tag>
              ))
            }
          </div>
        )
      }
      <div className={classNames(cls.articleListByCategoryWrapper, {}, [className])}>
        {
        articles.length > 0
          ? articles.map((article) => (<ArticleListItemByCategory key={article.id} article={article} />))
          : <Tag className={cls.noData} variant="info">{t('data_empty')}</Tag>
        }
      </div>
    </div>
  );
});
