import { ButtonHTMLAttributes, FC, ReactNode, memo, useMemo } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import SpinIcon from '@/shared/assets/spin.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Button.module.scss';

type ThemeButton = 'default' | 'secondary' | 'ghost' | 'ghostIcon' | 'outline';

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

const isLinkVariant = (props: ButtonProps): props is LinkVariantProps =>
    typeof props.to === 'string';

export const Button: FC<ButtonProps> = memo((props) => {
    const {
        children,
        loading = false,
        className,
        theme = 'default',
        disabled,
    } = props;

    const classes = useMemo(
        () =>
            classNames(
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
            <Link {...props} className={classes}>
                {loading && (
                    <SpinIcon className="spin" width={16} height={16} />
                )}
                {children}
            </Link>
        );
    }

    const { loading: loadingButton, ...restButtonProps } = props;

    return (
        <button type="button" {...restButtonProps} className={classes}>
            {loadingButton && (
                <SpinIcon className="spin" width={16} height={16} />
            )}
            {children}
        </button>
    );
});
