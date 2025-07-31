import {
  FC, memo, useEffect, useState,
} from 'react';

import { classNames } from '../../../classNames/classNames';
import { useAppDispatch } from '../../../hooks/useAppDispatch/useAppDispatch';
import { toastActions } from '../model/slice/toastSlice';
import { Toast } from '../model/types/toast';

import cls from './Toast.module.scss';

interface ToastItemProps {
  toast: Toast;
}

export const ToastItem: FC<ToastItemProps> = memo(({ toast }) => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));

    const timeout = setTimeout(() => {
      setVisible(false);

      setTimeout(() => {
        dispatch(toastActions.removeToast(toast.id));
      }, 300);
    }, toast.duration ?? 3000);

    return () => clearTimeout(timeout);
  }, [dispatch, toast]);

  return (
    <div className={classNames(cls.toast, { [cls.enter]: visible, [cls.leave]: !visible }, [cls[toast.type]])}>
      {toast.message}
    </div>
  );
});
