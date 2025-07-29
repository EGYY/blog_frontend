import { ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Overlay.module.scss';

interface OverlayProps {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  isShow?: boolean;
  children: ReactNode;
}

export const Overlay = (props: OverlayProps) => {
  const {
    className, onClick, children, isShow = false,
  } = props;
  return (
    <div onClick={onClick} className={classNames(cls.overlay, { [cls.closed]: !isShow }, [className])}>
      {children}
    </div>
  );
};
