import { FC, useEffect } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';
import { Button, ThemeButton } from '../Button/Button';
import XIcon from '@/shared/assets/x.svg';

interface ModalProps {
    className?: string;
    open: boolean;
    onClose: () => void;
}

export const Modal: FC<ModalProps> = (props) => {
  const {
    className, children, open, onClose,
  } = props;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <Portal>
      <div className={cls.overlay} onClick={onClose}>
        <div
          className={classNames(cls.content, {}, [className])}
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            className={cls.closeBtn}
            theme={ThemeButton.GHOST_ICON}
            onClick={onClose}
          >
            <XIcon width={20} />
          </Button>
          {children}
        </div>
      </div>
    </Portal>
  );
};
