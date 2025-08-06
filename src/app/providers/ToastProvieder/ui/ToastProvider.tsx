import { PropsWithChildren } from 'react';

import { ToastContainer } from '@/shared/lib/components/Toast';

export const ToastProvider = ({ children }: PropsWithChildren) => {
    return (
        <>
            {children}
            <ToastContainer />
        </>
    );
};
