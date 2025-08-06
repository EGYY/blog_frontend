import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { getUser } from '@/entities/User';
import { getRouteMain } from '@/shared/config/routes/routes';

interface ProtectedRouteProps {
    children: JSX.Element;
}

export const ProtectedRoute = (props: ProtectedRouteProps): JSX.Element => {
    const { children } = props;
    const auth = useSelector(getUser);
    const location = useLocation();

    if (!auth) {
        return (
            <Navigate to={getRouteMain()} state={{ from: location }} replace />
        );
    }

    return children;
};
