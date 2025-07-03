import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { AppLink, AppLinkType } from '@/shared/ui/AppLink/AppLink';
import { SidebarItemType } from '../../model/types/sidebar';

interface SidebarItemProps {
    item: SidebarItemType
}

export const SidebarItem = memo((props: SidebarItemProps) => {
  const { item } = props;
  const { t } = useTranslation();
  return (
    <AppLink type={AppLinkType.BUTTON} to={item.path} title={t(item.translate_key)}>
      <item.icon />
      <p>{t(item.translate_key)}</p>
    </AppLink>
  );
});
