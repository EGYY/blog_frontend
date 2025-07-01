/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useRef } from 'react';
import cls from './LoginForm.module.scss';
import { Input } from '@/shared/ui/Input/Input';
import { Button } from '@/shared/ui/Button/Button';

interface LoginFormProps {
  openModal?: boolean
}

export const LoginForm: FC<LoginFormProps> = ({ openModal = false }) => {
  const { t } = useTranslation('login_form');
  const inputEmailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (openModal && inputEmailRef.current) {
      requestAnimationFrame(() => {
        inputEmailRef.current?.focus();
      });
    }
  }, [openModal]);

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      console.error('Email or password is missing');
      return;
    }

    console.log('Submitted:', { email, password });
  };

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
        <Button type="submit">{t('login_btn')}</Button>
      </div>
    </form>
  );
};
