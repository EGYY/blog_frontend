import React, { memo, useCallback, InputHTMLAttributes } from 'react';

import styles from './Checkbox.module.scss';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

const CheckboxComponent: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  className = '',
  name = 'checkbox',
  ...rest
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked);
    },
    [onChange],
  );

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={`${styles.checkboxWrapper} ${className} ${disabled ? styles.disabled : ''}`}>
      <input
        {...rest}
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <span className={styles.customBox}>
        {checked && (
          <svg
            className={styles.checkIcon}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};

export const Checkbox = memo(CheckboxComponent);
