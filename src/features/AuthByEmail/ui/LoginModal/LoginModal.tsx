import { FC } from 'react';
import { Modal } from '@/shared/ui/Modal/Modal';
import { LoginForm } from '../LoginForm/LoginForm';

interface LoginModalProps {
    className?: string;
    open: boolean;
    onClose: () => void;
}

export const LoginModal: FC<LoginModalProps> = (props) => {
  const { open } = props;
  return (
    <Modal {...props}>
      <LoginForm openModal={open} />
    </Modal>
  );
};
