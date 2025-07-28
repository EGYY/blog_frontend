import { useTranslation } from 'react-i18next';
import {
  FC, memo, useCallback, useEffect, useRef,
} from 'react';
import { useSelector } from 'react-redux';
import cls from './LoginForm.module.scss';
import { Input } from '@/shared/ui/Input/Input';
import { Button } from '@/shared/ui/Button/Button';
import { getErrorAuthByEmail } from '../../model/selectors/getErrorAuthByEmail/getErrorAuthByEmail';
import { getLoadingAuthByEmail } from '../../model/selectors/getLoadingAuthByEmail/getLoadingAuthByEmail';
import { loginByEmail } from '../../model/services/loginByEmail/loginByEmail';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { authActions } from '../../model/slice/authSlice';

interface LoginFormProps {
  openModal?: boolean,
  onCloseModal?: () => void,
}

const LoginForm: FC<LoginFormProps> = memo(({ openModal = false, onCloseModal }) => {
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
    dispatch(authActions.setTypeForm('register'));
  }, [dispatch]);

  const handleSubmitForm = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const result = await dispatch(loginByEmail({ email, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      onCloseModal?.();
    }
  }, [dispatch, onCloseModal]);

  return (
    <form className={cls.loginForm} onSubmit={handleSubmitForm}>
      <div className={cls.loginFormHeader}>
        <div className={cls.loginFormHeaderTitle}>{t('title')}</div>
        <div className={cls.loginFormHeaderDescription}>{t('description')}</div>
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
          id="password"
          name="password"
          placeholder=""
          label={t('password_input')}
          type="password"
          required
          autoComplete="password"
        />
        <span className={cls.formAction} onClick={handleChangeFormType}>{t('dont_have_account')}</span>
        {error && <p style={{ color: '#e7000b' }}>{error}</p>}
        <Button loading={loading} type="submit">{t('login_btn')}</Button>
      </div>
    </form>
  );
});

export default LoginForm;
