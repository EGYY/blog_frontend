import { FC, memo, Suspense } from 'react';
import { Modal } from '@/shared/ui/Modal/Modal';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import { LoadingModal } from './LoadingModal';

interface LoginModalProps {
  className?: string;
  open: boolean;
  onClose: () => void;
}

export const LoginModal: FC<LoginModalProps> = memo((props) => {
  const { open, onClose } = props;
  return (
    <Modal {...props}>
      <Suspense fallback={<LoadingModal />}>
        <LoginFormAsync openModal={open} onCloseModal={onClose} />
      </Suspense>
    </Modal>
  );
});
