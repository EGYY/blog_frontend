import { memo } from 'react';

import { ArticlesFilters } from '@/features/ArticlesFilters';
import { ArticlesViewSwitcher } from '@/features/ArticlesViewSwitcher';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ArticlesListHeader.module.scss';

interface ArticlesListHeaderProps {
    className?: string;
    isMobile?: boolean;
}
export const ArticlesListHeader = memo((props: ArticlesListHeaderProps) => {
    const { className, isMobile = false } = props;
    return (
        <div
            className={classNames(
                cls.articlesListHeader,
                { [cls.mobile]: isMobile },
                [className],
            )}
        >
            {isMobile && (
                <ArticlesViewSwitcher
                    isMobile={isMobile}
                    className={cls.articlesListSwitcher}
                />
            )}
            <ArticlesFilters isMobile={isMobile} />
            {!isMobile && (
                <ArticlesViewSwitcher
                    isMobile={isMobile}
                    className={cls.articlesListSwitcher}
                />
            )}
        </div>
    );
});
