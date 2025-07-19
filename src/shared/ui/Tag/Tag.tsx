import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Tag.module.scss';

type TagVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';

interface TagProps {
  children: React.ReactNode;
  variant?: TagVariant;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ children, variant = 'default', className }) => {
  return (
    <span className={classNames(styles.tag, {}, [className, styles[variant]])}>
      {children}
    </span>
  );
};
