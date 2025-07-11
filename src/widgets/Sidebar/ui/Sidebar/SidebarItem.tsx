import { useTranslation } from 'react-i18next';
import { memo, useMemo } from 'react';
import { AppLink, AppLinkType } from '@/shared/ui/AppLink/AppLink';
import { SidebarItemType } from '../../model/types/sidebar';
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
      <AppLink type={AppLinkType.BUTTON} to={item.path}>
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
