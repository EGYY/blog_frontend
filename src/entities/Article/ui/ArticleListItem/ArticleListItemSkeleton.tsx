import { ArticleView } from '../../model/types/article';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import cls from './ArticleListItem.module.scss';

interface ArticleListItemSkeletonProps {
    view: ArticleView;
    className?: string;
}
export const ArticleListItemSkeleton = (
    props: ArticleListItemSkeletonProps,
) => {
    const { view, className } = props;
    return (
        <div
            className={classNames(cls.articleListItem, {}, [
                className,
                cls[view],
            ])}
        >
            <div
                className={classNames(cls.articleListItemPoster, {}, [
                    cls[view],
                ])}
            >
                <Skeleton
                    height={170}
                    width={view === ArticleView.GRID ? '100%' : 300}
                />
            </div>
            <div
                className={classNames(cls.articleListItemContent, {}, [
                    cls[view],
                ])}
            >
                <div
                    style={{ marginTop: 10 }}
                    className={classNames(cls.tags, {}, [cls[view]])}
                >
                    <Skeleton width={70} height={20} />
                    <Skeleton width={70} height={20} />
                    <Skeleton width={70} height={20} />
                </div>
                <Skeleton
                    style={{ marginBottom: 10 }}
                    width={200}
                    height={30}
                />
                <Skeleton width={100} height={30} />
                <div
                    className={classNames(cls.articleListItemInfo, {}, [
                        cls[view],
                    ])}
                >
                    <div
                        className={classNames(
                            cls.articleListItemInfoMuted,
                            {},
                            [cls[view]],
                        )}
                    >
                        <Skeleton width={100} height={30} />
                    </div>
                    <Skeleton width={100} height={30} />
                </div>
            </div>
        </div>
    );
};
