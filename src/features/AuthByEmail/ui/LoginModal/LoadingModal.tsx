import { memo } from 'react';

import SpinIcon from '@/shared/assets/spin.svg';

import styles from './LoadingModal.module.scss';

export const LoadingModal = memo(() => {
  return (
    <div className={styles.container}>
      <SpinIcon className="spin" width={24} height={24} />
    </div>
  );
});
