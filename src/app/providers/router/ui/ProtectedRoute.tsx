import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { getUser, getUserRoles, UserRole } from '@/entities/User';
import { getRouteForbidden, getRouteMain } from '@/shared/config/routes/routes';

interface ProtectedRouteProps {
    children: JSX.Element;
    roles?: UserRole[];
}

export const ProtectedRoute = (props: ProtectedRouteProps): JSX.Element => {
    const { children, roles } = props;
    const auth = useSelector(getUser);
    const userRole = useSelector(getUserRoles);
    const location = useLocation();

    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            return true;
        }

        return roles.some((requiredRole) => {
            const hasRole = [userRole]?.includes(requiredRole);
            return hasRole;
        });
    }, [roles, userRole]);

    if (!auth) {
        return (
            <Navigate to={getRouteMain()} state={{ from: location }} replace />
        );
    }

    if (!hasRequiredRoles) {
        return (
            <Navigate
                to={getRouteForbidden()}
                state={{ from: location }}
                replace
            />
        );
    }

    return children;
};
