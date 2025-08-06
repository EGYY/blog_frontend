import { FC, memo, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getErrorAuthByEmail } from '../../model/selectors/getErrorAuthByEmail/getErrorAuthByEmail';
import { getLoadingAuthByEmail } from '../../model/selectors/getLoadingAuthByEmail/getLoadingAuthByEmail';
import { registrateByEmail } from '../../model/services/registrateByEmail/registrateByEmail';
import { authActions } from '../../model/slice/authSlice';
import cls from '../LoginForm/LoginForm.module.scss';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';

interface RegistrationFormProps {
    openModal?: boolean;
    onCloseModal?: () => void;
}

const RegistrationForm: FC<RegistrationFormProps> = memo(
    ({ openModal = false, onCloseModal }) => {
        const { t } = useTranslation('login_form');
        const inputEmailRef = useRef<HTMLInputElement>(null);
        const dispatch = useAppDispatch();
        const error = useSelector(getErrorAuthByEmail);
        const loading = useSelector(getLoadingAuthByEmail);

        useEffect(() => {
            if (openModal && inputEmailRef.current) {
                requestAnimationFrame(() => {
                    inputEmailRef.current?.focus();
                });
            }
        }, [openModal]);

        const handleChangeFormType = useCallback(() => {
            dispatch(authActions.setTypeForm('auth'));
        }, [dispatch]);

        const handleSubmitForm = useCallback(
            async (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const email = formData.get('email') as string;
                const password = formData.get('password') as string;
                const name = formData.get('name') as string;
                const result = await dispatch(
                    registrateByEmail({ email, password, name }),
                );
                if (result.meta.requestStatus === 'fulfilled') {
                    onCloseModal?.();
                }
            },
            [dispatch, onCloseModal],
        );

        return (
            <form className={cls.loginForm} onSubmit={handleSubmitForm}>
                <div className={cls.loginFormHeader}>
                    <div className={cls.loginFormHeaderTitle}>
                        {t('title_reg')}
                    </div>
                    <div className={cls.loginFormHeaderDescription}>
                        {t('description_reg')}
                    </div>
                </div>
                <div className={cls.loginFormContent}>
                    <Input
                        ref={inputEmailRef}
                        id="email"
                        name="email"
                        placeholder="m@example.com"
                        label={t('email_input')}
                        type="email"
                        required
                        autoFocus
                        autoComplete="email"
                    />
                    <Input
                        id="name"
                        name="name"
                        placeholder="Pukin"
                        label={t('name_input')}
                        type="text"
                        autoComplete="name"
                    />
                    <Input
                        id="password"
                        name="password"
                        placeholder=""
                        label={t('password_input')}
                        type="password"
                        required
                        autoComplete="password"
                    />
                    <span
                        className={cls.formAction}
                        onClick={handleChangeFormType}
                    >
                        {t('already_have_account')}
                    </span>
                    {error && <p style={{ color: '#e7000b' }}>{error}</p>}
                    <Button loading={loading} type="submit">
                        {t('reg_btn')}
                    </Button>
                </div>
            </form>
        );
    },
);

export default RegistrationForm;
