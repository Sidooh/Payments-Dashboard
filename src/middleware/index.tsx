import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '@/app/store';
import moment from 'moment';
import { useAuth } from '@/hooks/useAuth';
import { logout } from '@/features/auth/authSlice';
import { logger } from '@/utils/logger';
import { JWT } from '@nabcellent/sui-react';

export const Middleware = {
    Guest: ({ component }: { component: JSX.Element }) => {
        const { auth } = useAuth();
        const location = useLocation();

        if (auth) {
            // @ts-ignore
            let urlIntended: string = location.state?.from?.pathname || '/dashboard';
            return <Navigate to={urlIntended} replace />;
        }

        return component;
    },
    Auth: ({ component }: { component: JSX.Element }) => {
        const { auth } = useAuth();
        const location = useLocation();
        const dispatch = useAppDispatch();

        if (!auth) return <Navigate to="/login" state={{ from: location }} replace />;

        const user = JWT.decode(auth.token);
        const expiresIn = moment.unix(user.exp).diff(moment(), 'minutes');

        logger.log(`Session expires in: ${expiresIn} minutes`);

        if (moment.unix(user.exp).isBefore(moment())) {
            dispatch(logout());

            return <Navigate to="/login" state={{ from: location }} replace />;
        }

        return component;
    },
};
