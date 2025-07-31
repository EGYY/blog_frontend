import {
  memo, HTMLAttributes, FC, useMemo,
} from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import styles from './Skeleton.module.scss';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  circle?: boolean;
}

export const Skeleton: FC<SkeletonProps> = memo(({
  className,
  width,
  height,
  radius,
  circle = false,
  style,
  ...props
}) => {
  const customStyle = useMemo(() => ({
    width: width ?? (circle ? height ?? '40px' : '100%'),
    height: height ?? '100%',
    borderRadius: circle ? '50%' : radius ?? '4px',
    ...style,
  }), [circle, height, radius, style, width]);

  return (
    <div
      className={classNames(styles.skeleton, {}, [className])}
      style={customStyle}
      {...props}
    />
  );
});
