import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { SidebarItemType } from '../../model/types/sidebar';

import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Tooltip } from '@/shared/ui/Tooltip/Tooltip';

interface SidebarItemProps {
    item: SidebarItemType
    collapsed: boolean
}

export const SidebarItem = memo((props: SidebarItemProps) => {
  const { item, collapsed } = props;
  const { t } = useTranslation();

  const renderItem = useMemo(() => {
    const content = (
      <AppLink type="button" to={item.path}>
        <item.icon />
        <p>{t(item.translate_key)}</p>
      </AppLink>
    );
    if (collapsed) {
      return (
        <Tooltip preferredPlacement="right" content={t(item.translate_key)}>{content}</Tooltip>
      );
    }
    return content;
  }, [collapsed, item, t]);

  return renderItem;
});
