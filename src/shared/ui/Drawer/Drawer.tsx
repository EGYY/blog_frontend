import React, { memo } from 'react';
import X from '@/shared/assets/X.svg';
import styles from './Drawer.module.scss';
import { Button } from '../Button/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    position?: 'left' | 'right' | 'top' | 'bottom';
}

export const Drawer = memo(({
  isOpen, onClose, title, children, position = 'right',
}: DrawerProps) => {
  const {
    close,
    isClosing,
    isMounted,
  } = useModal({ isOpen, onClose });

  if (!isMounted) return null;

  return (
    <Portal>
      <Overlay onClick={close}>
        <div
          className={classNames(
            styles.drawer,
            { [styles.opened]: isOpen, [styles.closed]: isClosing },
            [styles[position]],
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.drawerHeader}>
            {title && <h2>{title}</h2>}
            <Button theme="ghostIcon" onClick={close}>
              <X width={20} />
            </Button>
          </div>
          <div className={styles.drawerContent}>{children}</div>
        </div>
      </Overlay>
    </Portal>
  );
});
