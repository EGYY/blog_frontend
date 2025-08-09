import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleListItemByCategory } from './ArticleListItemByCategory';

import { ArticleType, Category } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DisplayError } from '@/shared/ui/DisplayError/DisplayError';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Tag } from '@/shared/ui/Tag/Tag';

import cls from './ArticleListByCategory.module.scss';

interface ArticleListByCategoryProps {
    className?: string;
    articles: ArticleType[];
    categories?: Category[];
    selectedCategory?: Category;
    loadingArticles?: boolean;
    loadingCategories?: boolean;
    errorArticles?: boolean;
    onChangeCategory?: (category: Category) => void;
    refetchArticles?: () => void;
}

export const ArticleListByCategory = memo(
    (props: ArticleListByCategoryProps) => {
        const {
            className,
            articles,
            categories = [],
            selectedCategory,
            onChangeCategory,
            loadingArticles = false,
            loadingCategories = false,
            errorArticles = false,
            refetchArticles,
        } = props;
        const { t } = useTranslation('article');
        return (
            <div
                className={classNames(cls.articleListByCategoryContainer, {}, [
                    className,
                ])}
            >
                {loadingCategories ? (
                    <div className={cls.tagsTop}>
                        <Skeleton width={70} height={20} />
                        <Skeleton width={70} height={20} />
                        <Skeleton width={70} height={20} />
                    </div>
                ) : (
                    categories &&
                    categories.length > 0 && (
                        <div className={cls.tagsTop}>
                            {categories.map((category) => (
                                <Tag
                                    className={classNames(cls.tag, {
                                        [cls.selectedTag]:
                                            selectedCategory?.id ===
                                            category.id,
                                    })}
                                    key={category.id}
                                    onClick={() => onChangeCategory?.(category)}
                                >
                                    {category.name}
                                </Tag>
                            ))}
                        </div>
                    )
                )}
                {errorArticles && (
                    <DisplayError
                        errorTitle={t('error_articles_title')}
                        errorDescription={t('error_articles_description')}
                        actionText={t('error_articles_action_text')}
                        actionHandler={refetchArticles}
                        className={cls.articlesError}
                    />
                )}
                {!errorArticles && (
                    <div
                        className={classNames(
                            cls.articleListByCategoryWrapper,
                            {},
                            [className],
                        )}
                    >
                        {loadingArticles ? (
                            <>
                                <Skeleton height={300} className={cls.card} />
                                <Skeleton height={300} className={cls.card} />
                                <Skeleton height={300} className={cls.card} />
                                <Skeleton height={300} className={cls.card} />
                                <Skeleton height={300} className={cls.card} />
                                <Skeleton height={300} className={cls.card} />
                                <Skeleton height={300} className={cls.card} />
                            </>
                        ) : articles && articles.length > 0 ? (
                            articles.map((article) => (
                                <ArticleListItemByCategory
                                    key={article.id}
                                    article={article}
                                />
                            ))
                        ) : (
                            <Tag className={cls.noData} variant="info">
                                {t('data_empty')}
                            </Tag>
                        )}
                    </div>
                )}
            </div>
        );
    },
);
