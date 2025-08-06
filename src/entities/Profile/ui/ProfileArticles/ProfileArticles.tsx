import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ProfileArticleItem } from './ProfileArticleItem';
import { ProfileArticleItemWithActions } from './ProfileArticleItemWithActions';

import { ArticleType } from '@/entities/Article';
import PlusIcon from '@/shared/assets/plus.svg';
import { getRouteArticleCreate } from '@/shared/config/routes/routes';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Tag } from '@/shared/ui/Tag/Tag';

import cls from './ProfileArticles.module.scss';

interface ProfileArticlesProps {
    className?: string;
    articles: ArticleType[] | undefined;
    loading?: boolean;
    title?: string;
    type?: 'default' | 'withActions';
    onDeleteArticle?: (id: string) => void;
}

export const ProfileArticles = memo((props: ProfileArticlesProps) => {
    const {
        className,
        articles = [],
        title,
        type = 'default',
        loading = false,
        onDeleteArticle,
    } = props;
    const { t } = useTranslation('profile');

    const renderArticles = useMemo(() => {
        if (loading) {
            return (
                <div className={cls.lastArticleList}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton
                            width="100%"
                            height={65}
                            key={`article-loading-${index}`}
                        />
                    ))}
                </div>
            );
        }
        if (type === 'default') {
            return (
                <div className={cls.lastArticleList}>
                    {articles?.length > 0 ? (
                        articles.map((article) => (
                            <ProfileArticleItem
                                key={article.id}
                                article={article}
                            />
                        ))
                    ) : (
                        <Tag>{t('no_articles')}</Tag>
                    )}
                </div>
            );
        }
        return (
            <div className={cls.lastArticleList}>
                {articles?.length > 0 ? (
                    articles.map((article) => (
                        <ProfileArticleItemWithActions
                            key={article.id}
                            article={article}
                            onDeleteArticle={onDeleteArticle}
                        />
                    ))
                ) : (
                    <Tag>{t('no_articles')}</Tag>
                )}
            </div>
        );
    }, [loading, type, articles, t, onDeleteArticle]);

    return (
        <Card className={classNames(cls.lastArticleWrapper, {}, [className])}>
            <div className={cls.lastArticlesHeader}>
                <h3>{title || t('last_articles')}</h3>
                {type === 'withActions' && (
                    <Button theme="outline" to={getRouteArticleCreate()}>
                        <PlusIcon width={20} />
                        {t('create')}
                    </Button>
                )}
            </div>
            {renderArticles}
        </Card>
    );
});
