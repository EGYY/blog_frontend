import {
  ImgHTMLAttributes, memo, SyntheticEvent, useCallback,
} from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import styles from './Avatar.module.scss';

export type AvatarSize = 'sm' | 'md' |'lg'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string,
    size?: AvatarSize
}

export const Avatar = memo((props: AvatarProps) => {
  const {
    className, alt = 'avatar', size = 'md', ...otherProps
  } = props;

  const onErrorImage = useCallback((e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `${__SERVER_URL__}/uploads/no-user-image.png`;
  }, []);

  return (
    <img
      {...otherProps}
      alt={alt}
      className={classNames(styles.avatar, {}, [className, styles[size]])}
      onError={onErrorImage}
    />
  );
});
