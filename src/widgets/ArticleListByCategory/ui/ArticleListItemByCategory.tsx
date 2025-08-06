import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ArticleType } from '@/entities/Article';
import { getRouteArticleDetail } from '@/shared/config/routes/routes';
import { Button } from '@/shared/ui/Button/Button';
import { Image } from '@/shared/ui/Image/Image';
import { Tag } from '@/shared/ui/Tag/Tag';

import styles from './ArticleListByCategory.module.scss';

interface ArticleListItemByCategoryProps {
    article: ArticleType;
}

export const ArticleListItemByCategory = (
    props: ArticleListItemByCategoryProps,
) => {
    const { article } = props;
    const { t } = useTranslation('article');
    return (
        <Link to={getRouteArticleDetail(article.id)} className={styles.card}>
            <Image
                className={styles.image}
                src={`${__SERVER_URL__}${article.poster}`}
                alt={article.title}
            />
            <div className={styles.overlay}>
                <span className={styles.category}>{article.category.name}</span>
                <h3 className={styles.title}>{article.title}</h3>
                <div className={styles.tags}>
                    {article.tags.map((tag) => (
                        <Tag key={tag.id}>{tag.name}</Tag>
                    ))}
                </div>
                <Button className={styles.button}>{t('read_more')}</Button>
            </div>
        </Link>
    );
};
