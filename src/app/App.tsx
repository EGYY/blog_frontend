import { Suspense, useEffect } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Router } from './providers/router';
import { Sidebar } from '@/widgets/Sidebar';
import { useTheme } from '@/shared/config/theme/useTheme';

export const App = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="app" className={classNames('app')}>
      <Suspense fallback="">
        <div className="page">
          <Sidebar />
          <Router />
        </div>
      </Suspense>
    </div>
  );
};
