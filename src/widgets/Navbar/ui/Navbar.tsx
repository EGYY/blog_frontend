import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import UserCircleIcon from '@/shared/assets/user-circle.svg';
import { LoginModal } from '@/features/AuthByEmail';

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const { t } = useTranslation('navbar');
  const [openAuthModal, setOpenAuthModal] = useState(false);
  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <div className={cls.actionBtns}>
        <Button title={t('authorization')} theme={ThemeButton.GHOST_ICON} onClick={() => setOpenAuthModal(true)}>
          <UserCircleIcon width={24} />
          {t('login')}
        </Button>
      </div>
      <LoginModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
    </div>
  );
};
