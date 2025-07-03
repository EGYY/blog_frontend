import React from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Input.module.scss';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    label, error, className, ...props
  }, ref) => {
    return (
      <div className={styles.inputWrapper}>
        {label && (
          <label htmlFor={props.id} className={styles.label}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={classNames(styles.input, { [styles.errorInput]: error }, [className])}
          {...props}
        />
        {error && <p className={styles.errorText}>{error}</p>}
      </div>
    );
  },
);

export const Input = React.memo(InputComponent);
