import { FC, memo } from 'react';

import SpinIcon from '@/shared/assets/spin.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './PageLoader.module.scss';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader: FC<PageLoaderProps> = memo(({ className }) => {
    return (
        <div
            className={classNames(`${cls.pageLoader} content`, {}, [className])}
        >
            <SpinIcon className="spin" width={48} height={48} />
        </div>
    );
});
