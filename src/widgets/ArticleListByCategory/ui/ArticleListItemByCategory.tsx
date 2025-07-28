import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArticleType } from '@/entities/Article';
import { RoutePath } from '@/shared/config/routes/routes';
import styles from './ArticleListByCategory.module.scss';
import { Button } from '@/shared/ui/Button/Button';
import { Tag } from '@/shared/ui/Tag/Tag';

interface ArticleListItemByCategoryProps {
    article: ArticleType
}

export const ArticleListItemByCategory = (props: ArticleListItemByCategoryProps) => {
  const { article } = props;
  const { t } = useTranslation('article');
  return (
    <Link
      to={`${RoutePath.article_detail}${article.id}`}
      className={styles.card}
    >
      <img className={styles.image} src={`${__SERVER_URL__}${article.poster}`} alt={article.title} />
      <div className={styles.overlay}>
        <span className={styles.category}>{article.category.name}</span>
        <h3 className={styles.title}>{article.title}</h3>
        <div className={styles.tags}>{article.tags.map((tag) => (<Tag key={tag.id}>{tag.name}</Tag>))}</div>
        <Button className={styles.button}>{t('read_more')}</Button>
      </div>
    </Link>
  );
};
