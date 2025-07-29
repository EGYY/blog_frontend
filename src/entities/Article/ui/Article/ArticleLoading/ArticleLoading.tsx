import { memo } from 'react';

import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import styles from './ArticleLoading.module.scss';

export const ArticleLoading = memo(() => {
  return (
    <div className={styles.articleLoadingWrapper}>
      <div className={styles.articleLoadingAuthor}>
        <Skeleton circle width={40} height={40} />
        <Skeleton width={100} height={20} />
      </div>
      <div>
        <Skeleton style={{ width: '50%', marginBottom: 10 }} height={50} />
        <Skeleton style={{ width: '80%' }} height={30} />
      </div>
      <div>
        <Skeleton width={200} height={30} />
      </div>
      <div className={styles.tags}>
        <Skeleton width={50} height={20} />
        <Skeleton width={50} height={20} />
        <Skeleton width={50} height={20} />
      </div>
      <div>
        <Skeleton style={{ width: '100%', height: '40vh' }} />
      </div>
      <div>
        <Skeleton style={{ width: '100%', height: '15vh' }} />
      </div>
    </div>
  );
});
