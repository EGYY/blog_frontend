import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Comment } from '../../model/types/comment';
import { CommentItem } from '../CommentItem/CommentItem';

import { CommentListLoading } from './CommentListLoading';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './CommentList.module.scss';

interface CommentListProps {
    className?: string;
    data?: Comment[];
    loading?: boolean;
}

export const CommentList: FC<CommentListProps> = memo(
    ({ className, data = [], loading = false }) => {
        const { t } = useTranslation();

        if (loading) {
            return <CommentListLoading />;
        }
        return (
            <div
                className={classNames(cls.commentListWrapper, {}, [className])}
            >
                <div className={cls.commentList}>
                    {data?.length > 0 ? (
                        data?.map((comment) => (
                            <CommentItem key={comment.id} comment={comment} />
                        ))
                    ) : (
                        <div className={cls.commentListEmpty}>
                            {t('comment_block_empty')}
                        </div>
                    )}
                </div>
            </div>
        );
    },
);
