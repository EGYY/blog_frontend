import { FC, PropsWithChildren } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Card.module.scss';

interface CardProps extends PropsWithChildren {
  className?: string
}

export const Card: FC<CardProps> = (props) => {
  const { children, className } = props;
  return (
    <div className={classNames(styles.card, {}, [className])}>
      <div className={styles.cardContent}>
        {children}
      </div>
    </div>
  );
};
