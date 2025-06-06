import { ButtonHTMLAttributes, FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import SpinIcon from '@/shared/assets/spin.svg';
import cls from './Button.module.scss';

export enum ThemeButton {
    DEFUALT = 'default',
    SECONDARY = 'secondary',
    GHOST = 'ghost',
    GHOST_ICON = 'ghostIcon',
    OUTLINE = 'outline'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: ThemeButton;
    loading?: boolean;
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    disabled,
    loading,
    className,
    theme = ThemeButton.DEFUALT,
    ...otherProps
  } = props;
  return (
    <button
      type="button"
      className={classNames(
        cls.button,
        { [cls.disabled]: disabled || loading, [cls.loading]: loading },
        [className, cls[theme]],
      )}
      disabled={disabled}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
    >
      {loading && <SpinIcon className="spin" width={16} height={16} />}
      {children}
    </button>
  );
};
