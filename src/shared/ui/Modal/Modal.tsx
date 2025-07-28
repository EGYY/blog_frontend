import { FC, PropsWithChildren } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';
import { Button } from '../Button/Button';
import XIcon from '@/shared/assets/x.svg';
import { Overlay } from '../Overlay/Overlay';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';

interface ModalProps extends PropsWithChildren {
    className?: string;
    open: boolean;
    onClose: () => void;
}
export const Modal: FC<ModalProps> = (props) => {
  const {
    className, children, open, onClose,
  } = props;

  const {
    close,
    isClosing,
    isMounted,
  } = useModal({ isOpen: open, onClose });

  if (!isMounted) return null;

  return (
    <Portal>
      <Overlay onClick={close}>
        <div
          className={classNames(cls.content, { [cls.closed]: isClosing, [cls.opened]: open }, [className])}
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            className={cls.closeBtn}
            theme="ghostIcon"
            onClick={close}
          >
            <XIcon width={20} />
          </Button>
          {children}
        </div>
      </Overlay>
    </Portal>
  );
};
