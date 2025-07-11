import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import cls from './CommentList.module.scss';

export const CommentListLoading = () => {
  return (
    <div className={cls.commentLoadingWrapper}>
      <Skeleton width="80%" height={50} />
      <Skeleton width="80%" height={50} />
      <Skeleton width="80%" height={50} />
    </div>
  );
};
