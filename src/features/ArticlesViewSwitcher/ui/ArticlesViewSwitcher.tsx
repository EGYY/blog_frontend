import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
    articleActions,
    ArticleView,
    getArticlesView,
} from '@/entities/Article';
import GridIcon from '@/shared/assets/layout-grid.svg';
import ListIcon from '@/shared/assets/layout-list.svg';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from '@/shared/ui/Button/Button';
import { Tooltip } from '@/shared/ui/Tooltip/Tooltip';

interface ArticlesViewSwitcherProps {
    className?: string;
    isMobile?: boolean;
}

export const ArticlesViewSwitcher = memo((props: ArticlesViewSwitcherProps) => {
    const { className, isMobile = false } = props;
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlesView);

    const onChangeView = useCallback(() => {
        dispatch(
            articleActions.setViewArticles(
                view === ArticleView.GRID ? ArticleView.LIST : ArticleView.GRID,
            ),
        );
    }, [dispatch, view]);

    return (
        <Tooltip content={t('change_view')} preferredPlacement="left">
            <Button
                onClick={onChangeView}
                theme="ghostIcon"
                className={className}
            >
                {view === ArticleView.GRID ? (
                    <GridIcon width={20} />
                ) : (
                    <ListIcon width={20} />
                )}
                {isMobile ? t('change_view') : ''}
            </Button>
        </Tooltip>
    );
});
