import { useSelector } from 'react-redux';
import { memo } from 'react';
import { ToastItem } from './ToastItem';
import styles from './Toast.module.scss';
import { getToasts } from '../model/selectors/getToasts/getToasts';

export const ToastContainer = memo(() => {
  const toasts = useSelector(getToasts);

  return (
    <div className={styles.toastContainer}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
});
