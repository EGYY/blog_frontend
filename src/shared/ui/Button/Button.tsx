import { classNames } from "@/shared/lib/classNames/classNames";
import { ButtonHTMLAttributes, FC } from "react"
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
}

export const Button: FC<ButtonProps> = (props) => {
    const { children, className, theme = ThemeButton.DEFUALT, ...otherProps } = props;
    return (
        <button
            className={classNames(cls.button, {}, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </button>
    )
}