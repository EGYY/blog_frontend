import { Suspense, useEffect } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/config/theme/useTheme';
import { Router } from './providers/router';
import { Sidebar } from '@/widgets/Sidebar';

export const App = () => {
  const { theme } = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">
        <div className="page">
          <Sidebar />
          <Router />
        </div>
      </Suspense>
    </div>
  );
};
