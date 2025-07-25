import {
  ButtonHTMLAttributes,
  FC,
  ReactNode,
  memo,
  useMemo,
} from 'react';
import { Link, LinkProps } from 'react-router-dom';
import SpinIcon from '@/shared/assets/spin.svg';
import cls from './Button.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export enum ThemeButton {
  DEFUALT = 'default',
  SECONDARY = 'secondary',
  GHOST = 'ghost',
  GHOST_ICON = 'ghostIcon',
  OUTLINE = 'outline'
}

type ButtonBaseProps = {
  theme?: ThemeButton;
  loading?: boolean;
  children?: ReactNode;
  className?: string;
};

type ButtonVariantProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: undefined;
  };

type LinkVariantProps = ButtonBaseProps &
  Omit<LinkProps, 'type' | 'disabled'> & {
    to: string;
    disabled?: boolean;
  };

type ButtonProps = ButtonVariantProps | LinkVariantProps;

const isLinkVariant = (props: ButtonProps): props is LinkVariantProps => typeof props.to === 'string';

export const Button: FC<ButtonProps> = memo((props) => {
  const {
    children,
    loading = false,
    className,
    theme = ThemeButton.DEFUALT,
    disabled,
  } = props;

  const classes = useMemo(
    () => classNames(
      cls.button,
      {
        [cls.disabled]: disabled || loading,
        [cls.loading]: loading,
      },
      [className, cls[theme]],
    ),
    [className, theme, disabled, loading],
  );

  if (isLinkVariant(props)) {
    return (
      <Link
        {...props}
        className={classes}
      >
        {loading && <SpinIcon className="spin" width={16} height={16} />}
        {children}
      </Link>
    );
  }

  const { ...restButtonProps } = props;

  return (
    <button
      type="button"
      {...restButtonProps}
      className={classes}
    >
      {loading && <SpinIcon className="spin" width={16} height={16} />}
      {children}
    </button>
  );
});
