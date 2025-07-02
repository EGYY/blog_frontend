import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Router } from './providers/router';
import { Sidebar } from '@/widgets/Sidebar';
import { useTheme } from '@/shared/config/theme/useTheme';
import { getProfileData } from '@/entities/User';

export const App = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.className = theme;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getProfileData());
  }, [dispatch]);

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
