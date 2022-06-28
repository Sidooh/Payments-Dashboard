import { lazy, memo, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Middleware } from '../middleware';
import MainLayout from './MainLayout';
import GuestLayout from './GuestLayout';
import { is } from 'utils/helpers';
import SettingsToggle from 'components/settings-panel/SettingsToggle';
import SettingsPanel from 'components/settings-panel/SettingsPanel';

const Login = lazy(() => import('pages/auth/Login'));
const Dashboard = lazy(() => import('pages/dashboards/default'));
const Analytics = lazy(() => import('pages/dashboards/analytics'));

const Layout = () => {
    const HTMLClassList = document.getElementsByTagName('html')[0].classList;

    useEffect(() => {
        if (is.windows()) HTMLClassList.add('windows');
        if (is.chrome()) HTMLClassList.add('chrome');
        if (is.firefox()) HTMLClassList.add('firefox');
    }, [HTMLClassList]);

    return (
        <>
            <Routes>
                <Route element={<GuestLayout/>}>
                    <Route path={'/login'} element={<Middleware.Guest component={<Login/>}/>}/>
                </Route>

                <Route element={<Middleware.Auth component={<MainLayout/>}/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path={'/dashboard'} element={<Dashboard/>}/>
                    <Route path={'/dashboard/analytics'} element={<Analytics/>}/>
                    <Route path={'*'} element={<Dashboard/>}/>
                </Route>
            </Routes>
            <SettingsToggle/>
            <SettingsPanel/>
        </>
    );
};

export default memo(Layout);