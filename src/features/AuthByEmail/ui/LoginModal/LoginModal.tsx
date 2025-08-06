import { FC, memo, Suspense, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getAuthTypeForm } from '../../model/selectors/getAuthTypeForm/getAuthTypeForm';
import { authReducer } from '../../model/slice/authSlice';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import { RegistrationFormAsync } from '../RegistrationForm/RegistrationForm.async';

import { LoadingModal } from './LoadingModal';

import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Modal } from '@/shared/ui/Modal/Modal';

const initialReducers: ReducersList = {
    auth: authReducer,
};

interface LoginModalProps {
    className?: string;
    open: boolean;
    onClose: () => void;
}

export const LoginModal: FC<LoginModalProps> = memo((props) => {
    const { open, onClose } = props;
    const typeForm = useSelector(getAuthTypeForm);

    const form = useMemo(() => {
        if (typeForm === 'auth') {
            return <LoginFormAsync openModal={open} onCloseModal={onClose} />;
        }
        return (
            <RegistrationFormAsync openModal={open} onCloseModal={onClose} />
        );
    }, [onClose, open, typeForm]);

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <Modal {...props}>
                <Suspense fallback={<LoadingModal />}>{form}</Suspense>
            </Modal>
        </DynamicModuleLoader>
    );
});
