import { PropsWithChildren } from 'react';
import { ToastContainer } from '@/features/Toast';

export const ToastProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};
