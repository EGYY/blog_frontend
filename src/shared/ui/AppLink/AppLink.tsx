import { FC, memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export enum AppLinkType {
  BUTTON = 'button',
  LINK = 'link'
}

interface AppLinkProps extends LinkProps {
    className?: string,
    type?: AppLinkType
}

export const AppLink: FC<AppLinkProps> = memo((props) => {
  const {
    to, className, children, type = AppLinkType.LINK, ...otherProps
  } = props;
  return (
    <Link
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
      to={to}
      className={classNames(cls.link, {}, [className, cls[type]])}
    >
      {children}
    </Link>
  );
});
