import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '../config/routeConfig';
import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';

export const Router = () => {
  return (
    <main>
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {Object.values(routeConfig).map(({ element, path }) => (
            <Route
              key={path}
              path={path}
              element={(
                <div className="content">
                  {element}
                </div>
                          )}
            />
          ))}
        </Routes>
      </Suspense>
    </main>
  );
};
