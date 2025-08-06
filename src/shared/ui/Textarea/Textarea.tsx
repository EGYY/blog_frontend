import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import styles from './Textarea.module.scss';

interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    className?: string;
}

export const Textarea: React.FC<TextareaProps> = memo(
    ({ label, error, className, ...props }) => {
        return (
            <div className={classNames(styles.wrapper, {}, [className])}>
                {label && (
                    <label htmlFor="textarea" className={styles.label}>
                        {label}
                    </label>
                )}
                <textarea
                    {...props}
                    className={classNames(
                        styles.textarea,
                        { [styles.error]: error },
                        [className],
                    )}
                />
                {error && <p className={styles.errorText}>{error}</p>}
            </div>
        );
    },
);
