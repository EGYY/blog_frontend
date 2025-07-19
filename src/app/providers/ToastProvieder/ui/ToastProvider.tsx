import { FC } from 'react';
import { ToastContainer } from '@/features/Toast';

export const ToastProvider: FC = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};
