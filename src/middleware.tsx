import { Navigate, useLocation } from 'react-router-dom';

import moment from 'moment';
import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch } from '@/app/store';
import { logout } from '@/features/auth/authSlice';
import { decodeJWT } from '@/lib/utils';

export const Middleware = {
    Guest: ({ component }: { component: JSX.Element }) => {
        const { token } = useAuth();
        const location = useLocation();

        if (token) {
            const urlIntended: string = location.state?.from?.pathname || '/';
            return <Navigate to={urlIntended} replace />;
        }

        return component;
    },
    Auth: ({ component }: { component: JSX.Element }) => {
        const { token } = useAuth();
        const location = useLocation();
        const dispatch = useAppDispatch();

        if (!token) return <Navigate to="/login" state={{ from: location }} replace />;

        const user = decodeJWT(token);

        if (moment.unix(user.exp).isBefore(moment())) {
            dispatch(logout());

            return <Navigate to="/login" state={{ from: location }} replace />;
        }

        return component;
    },
};
