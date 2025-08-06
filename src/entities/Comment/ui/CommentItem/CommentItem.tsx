import { FC, memo } from 'react';

import { Comment } from '../../model/types/comment';

import { classNames } from '@/shared/lib/classNames/classNames';
import { timeAgo } from '@/shared/lib/helpers/formatDate/formatDate';
import { Avatar } from '@/shared/ui/Avatar/Avatar';

import cls from './CommentItem.module.scss';

interface CommentItemProps {
    className?: string;
    comment: Comment;
}

export const CommentItem: FC<CommentItemProps> = memo(
    ({ className, comment }) => {
        return (
            <div className={classNames(cls.comment, {}, [className])}>
                <Avatar
                    src={`${__SERVER_URL__}${comment.author.avatar}`}
                    alt={comment.author.name}
                />
                <div className={cls.commentContent}>
                    <div className={cls.commentInfo}>
                        <h4>{comment.author.name || comment.author.email}</h4>
                        <span>{timeAgo(comment.createdAt)}</span>
                    </div>
                    <div className={cls.commentText}>{comment.content}</div>
                </div>
            </div>
        );
    },
);
