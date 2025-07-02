import { FC, Suspense } from 'react';
import { Modal } from '@/shared/ui/Modal/Modal';
import SpinIcon from '@/shared/assets/spin.svg';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
    className?: string;
    open: boolean;
    onClose: () => void;
}

export const LoginModal: FC<LoginModalProps> = (props) => {
  const { open } = props;
  return (
    <Modal {...props}>
      <Suspense fallback={(
        <div style={{
          width: '100%', height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        >
          <SpinIcon className="spin" width={24} height={24} />
        </div>
)}
      >
        <LoginFormAsync openModal={open} />
      </Suspense>
    </Modal>
  );
};
