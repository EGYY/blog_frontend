import { memo } from 'react';
import { ArticlesFilters } from '@/features/ArticlesFilters';
import { ArticlesViewSwitcher } from '@/features/ArticlesViewSwitcher';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesListHeader.module.scss';

interface ArticlesListHeaderProps {
    className?: string
}
export const ArticlesListHeader = memo((props: ArticlesListHeaderProps) => {
  const { className } = props;
  return (
    <div className={classNames(cls.articlesListHeader, {}, [className])}>
      <ArticlesFilters />
      <ArticlesViewSwitcher className={cls.articlesListSwitcher} />
    </div>
  );
});
