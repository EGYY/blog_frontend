import { FC } from "react"
import { classNames } from "@/shared/lib/classNames/classNames";
import ChevronIcon from '@/shared/assets/chevron.svg';
import cls from './Select.module.scss';

interface SelectProps {
    disabled?: boolean;
    value: string | null;
    placeholder?: string;
    onChangeValue: (value: string) => void;
    className?: string
}

export const Select: FC<SelectProps> = (props) => {
    const {
        disabled,
        className
    } = props;
    return (
        <div className={classNames(cls.selectContainer, {}, [className])}>
            <button
                className={classNames(cls.selectTrigger, { [cls.disabled]: disabled })}
            >
                <ChevronIcon />
            </button>
        </div>

    )
}