import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { articleActions, ArticleView, getArticlesView } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import GridIcon from '@/shared/assets/layout-grid.svg';
import ListIcon from '@/shared/assets/layout-list.svg';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Tooltip } from '@/shared/ui/Tooltip/Tooltip';

interface ArticlesViewSwitcherProps {
    className?: string
}

export const ArticlesViewSwitcher = memo((props: ArticlesViewSwitcherProps) => {
  const { className } = props;
  const { t } = useTranslation('article');
  const dispatch = useAppDispatch();
  const view = useSelector(getArticlesView);

  const onChangeView = useCallback(() => {
    dispatch(articleActions.setViewArticles(view === ArticleView.GRID ? ArticleView.LIST : ArticleView.GRID));
  }, [dispatch, view]);

  return (
    <Tooltip content={t('change_view')} className={className}>
      <Button
        onClick={onChangeView}
        theme={ThemeButton.GHOST_ICON}
      >
        {view === ArticleView.GRID ? <GridIcon width={20} /> : <ListIcon width={20} />}
      </Button>
    </Tooltip>
  );
});
