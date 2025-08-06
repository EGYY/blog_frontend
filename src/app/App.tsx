import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Router } from './providers/router';

import { getInitedUser, getProfileData } from '@/entities/User';
import { useTheme } from '@/shared/config/theme/useTheme';
import { classNames } from '@/shared/lib/classNames/classNames';
import { PageLoader } from '@/widgets/PageLoader';
import { Sidebar } from '@/widgets/Sidebar';

export const App = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const inited = useSelector(getInitedUser);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    useEffect(() => {
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
