import { memo } from 'react';
import { useSelector } from 'react-redux';

import { getToasts } from '../model/selectors/getToasts/getToasts';

import { ToastItem } from './ToastItem';

import styles from './Toast.module.scss';

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
