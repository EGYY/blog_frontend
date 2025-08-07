import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { routeConfig } from '../config/routeConfig';

import { ProtectedRoute } from './ProtectedRoute';

import { useMobile } from '@/shared/lib/hooks/useMobile/useMobile';
import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';

export const Router = () => {
    const mobile = useMobile();
    return (
        <main style={{ marginLeft: mobile ? '10px' : '0' }}>
            <Navbar />
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    {Object.values(routeConfig).map(
                        ({ element, path, authOnly }) => (
                            <Route
                                key={path}
                                path={path}
                                element={
                                    authOnly ? (
                                        <ProtectedRoute>
                                            {element as JSX.Element}
                                        </ProtectedRoute>
                                    ) : (
                                        element
                                    )
                                }
                            />
                        ),
                    )}
                </Routes>
            </Suspense>
        </main>
    );
};
