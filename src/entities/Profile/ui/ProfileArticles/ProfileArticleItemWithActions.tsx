import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleType } from '@/entities/Article';
import BookIcon from '@/shared/assets/book-open.svg';
import EditIcon from '@/shared/assets/edit.svg';
import DeleteIcon from '@/shared/assets/trash.svg';
import { getRouteArticleUpdate } from '@/shared/config/routes/routes';
import { timeAgo } from '@/shared/lib/helpers/formatDate/formatDate';
import { Button } from '@/shared/ui/Button/Button';
import Confirm from '@/shared/ui/Confirm/Confirm';
import { Tag } from '@/shared/ui/Tag/Tag';
import { Tooltip } from '@/shared/ui/Tooltip/Tooltip';

import cls from './ProfileArticles.module.scss';

interface ProfileArticleItemWithActionsProps {
    article: ArticleType;
    onDeleteArticle?: (id: string) => void;
}

export const ProfileArticleItemWithActions = ({
    article,
    onDeleteArticle,
}: ProfileArticleItemWithActionsProps) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const { t } = useTranslation('profile');
    return (
        <div className={cls.lastArticleItem}>
            <div className={cls.profileCardStatItemIcon}>
                <BookIcon width={20} />
            </div>
            <div className={cls.lastArticleItemInfo}>
                <p>{article.title}</p>
                <span>
                    {timeAgo(article.createdAt)}{' '}
                    {article?.published ? (
                        <Tag variant="success">{t('published')}</Tag>
                    ) : (
                        <Tag variant="error">{t('not_published')}</Tag>
                    )}
                </span>
            </div>
            <div className={cls.lastArticleActions}>
                <Tooltip content={t('edit')}>
                    <Button
                        to={getRouteArticleUpdate(article.id)}
                        theme="ghostIcon"
                    >
                        <EditIcon width={20} />
                    </Button>
                </Tooltip>
                <Tooltip content={t('delete')}>
                    <Button
                        onClick={() => setShowConfirm(true)}
                        theme="ghostIcon"
                    >
                        <DeleteIcon width={20} />
                    </Button>
                </Tooltip>
                <Confirm
                    open={showConfirm}
                    title={t('confirm_delete_title')}
                    description={t('confirm_delete_description')}
                    confirmText={t('delete')}
                    cancelText={t('cancel')}
                    onConfirm={() => {
                        setShowConfirm(false);
                        onDeleteArticle?.(article.id);
                    }}
                    onCancel={() => setShowConfirm(false)}
                />
            </div>
        </div>
    );
};
