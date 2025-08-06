import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticlesListHeader } from './ArticlesListHeader';

import FilterIcon from '@/shared/assets/funnel.svg';
import { Button } from '@/shared/ui/Button/Button';
import { Drawer } from '@/shared/ui/Drawer/Drawer';

import cls from './ArticlesListHeader.module.scss';

function MobileArticleListHeaderComponent() {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation('article');
    return (
        <>
            <Button
                className={cls.mobileFilterButton}
                theme="outline"
                onClick={() => setOpen(true)}
            >
                <FilterIcon width={15} /> {t('filters')}
            </Button>
            <Drawer
                position="right"
                isOpen={open}
                onClose={() => setOpen(false)}
            >
                <ArticlesListHeader isMobile />
            </Drawer>
        </>
    );
}

export default MobileArticleListHeaderComponent;
