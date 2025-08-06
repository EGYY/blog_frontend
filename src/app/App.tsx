import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Router } from './providers/router';

import { getInitedUser, getProfileData } from '@/entities/User';
import { useTheme } from '@/shared/config/theme/useTheme';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppEffect } from '@/shared/lib/hooks/useAppEffect/useAppEffect';
import { PageLoader } from '@/widgets/PageLoader';
import { Sidebar } from '@/widgets/Sidebar';

export const App = () => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getInitedUser);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    useAppEffect(() => {
        if (!inited) {
            dispatch(getProfileData());
        }
    }, [dispatch, inited]);

    if (!inited) {
        return (
            <div id="app" className={classNames('app center-page')}>
                <PageLoader />
            </div>
        );
    }

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
