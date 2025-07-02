import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import UserCircleIcon from '@/shared/assets/user-circle.svg';
import { LoginModal } from '@/features/AuthByEmail';
import { getUser, logout } from '@/entities/User';
import { Dropdown } from '@/shared/ui/Dropdown/Dropdown';
import { AccountMenu } from '@/widgets/AccountMenu/AccountMenu';
import { AccountMenuTrigger } from '@/widgets/AccountMenu/AccountMenuTrigger';

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const { t } = useTranslation('navbar');
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const user = useSelector(getUser);

  if (user) {
    return (
      <div className={classNames(cls.navbar, {}, [className])}>
        <div className={cls.actionBtns}>
          <Dropdown trigger={<AccountMenuTrigger />}>
            <AccountMenu onLogout={() => setOpenAuthModal(false)} />
          </Dropdown>
        </div>
      </div>
    );
  }

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
