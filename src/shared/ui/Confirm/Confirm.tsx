import React, { useCallback, useEffect, useRef } from 'react';

import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';

import styles from './Confirm.module.scss';

export interface ConfirmProps {
    open: boolean;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const Confirm: React.FC<ConfirmProps> = React.memo(({
  open,
  title = 'Подтвердите действие',
  description = '',
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
  loading = false,
  onConfirm,
  onCancel,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onCancel();
  }, [onCancel]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, handleKeyDown]);

  return (
    <Modal open={open} onClose={onCancel}>
      <div className={styles.dialog} ref={dialogRef} role="dialog" aria-modal="true">
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        <div className={styles.footer}>
          <Button
            theme="outline"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            loading={loading}
          >
            {loading ? 'Загрузка...' : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
});

Confirm.displayName = 'Confirm';
export default Confirm;
