import {
  useState, useCallback, ReactNode, memo,
} from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import styles from './Tabs.module.scss';

export type Tab = {
  id: string;
  title: string;
  content: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  defaultTabId?: string;
  className?: string;
};

const Tabs = memo(({ tabs, defaultTabId, className }: TabsProps) => {
  const [activeTabId, setActiveTabId] = useState(
    defaultTabId ?? tabs[0]?.id,
  );

  const handleTabClick = useCallback((id: string) => {
    setActiveTabId(id);
  }, []);

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  return (
    <div className={classNames(styles.tabs, {}, [className])}>
      <div className={styles.tabList}>
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            className={classNames(styles.tabTrigger, { [styles.active]: tab.id === activeTabId })}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>
        {activeTab?.content}
      </div>
    </div>
  );
});

export default Tabs;
