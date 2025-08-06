import { classNames } from '@/shared/lib/classNames/classNames';

import styles from './Tag.module.scss';

type TagVariant =
    | 'default'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'outline';

interface TagProps {
    children: React.ReactNode;
    variant?: TagVariant;
    className?: string;
    onClick?: () => void;
}

export const Tag: React.FC<TagProps> = ({
    children,
    variant = 'default',
    className,
    onClick,
}) => {
    return (
        <span
            className={classNames(styles.tag, {}, [className, styles[variant]])}
            onClick={onClick}
        >
            {children}
        </span>
    );
};
