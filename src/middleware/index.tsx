import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import moment from 'moment';
import { useAuth } from '../hooks/useAuth';
import { login } from '../features/auth/authSlice';

export const Middleware = {
    Guest: ({component}: { component: JSX.Element }) => {
        const {auth} = useAuth();
        const location = useLocation();

        if (auth) {
            // @ts-ignore
            let urlIntended: string = location.state?.from?.pathname || "/dashboard";
            return <Navigate to={urlIntended} replace/>;
        }

        return component;
    },
    Auth : ({component}: { component: JSX.Element }) => {
        const {auth} = useAuth();
        const location = useLocation();
        const dispatch = useAppDispatch();

        if (!auth) return <Navigate to="/login" state={{from: location}} replace/>;

        const expiresIn = moment.unix(auth.user.exp).diff(moment(), 'minutes');
        console.log(`Session expires in: ${expiresIn}minutes`);

        if (expiresIn < 1) dispatch(login(auth.credentials));

        return component;
    }
};