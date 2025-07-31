import {
  ImgHTMLAttributes, memo,
} from 'react';

import { Image } from '../Image/Image';

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

  return (
    <Image
      {...otherProps}
      alt={alt}
      className={classNames(styles.avatar, {}, [className, styles[size]])}
      fallbackSrc={`${__SERVER_URL__}/uploads/no-user-image.png`}
    />
  );
});
