import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { routeConfig } from '../config/routeConfig';

import { ProtectedRoute } from './ProtectedRoute';

import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';

export const Router = () => {
    return (
        <main>
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
