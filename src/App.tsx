import { lazy, useEffect } from 'react';
import { is, PageLoader } from '@nabcellent/sui-react';
import { Route, Routes } from 'react-router-dom';
import GuestLayout from './layouts/GuestLayout';
import { Middleware } from './middleware';
import MainLayout from './layouts/MainLayout';
import SettingsToggle from './components/settings-panel/SettingsToggle';
import SettingsPanel from './components/settings-panel/SettingsPanel';
import { useAppSelector } from './app/hooks';
import { RootState } from './app/store';
import useTheme from './hooks/useTheme';

const Login = lazy(() => import('pages/auth/Login'));
const Dashboard = lazy(() => import('pages/dashboards/default'));
const Analytics = lazy(() => import('pages/dashboards/analytics'));
const Payments = lazy(() => import('pages/payments'));
const ShowPayment = lazy(() => import('pages/payments/Show'));

const STKPayments = lazy(() => import('pages/mpesa/STKPayments'));
const C2BPayments = lazy(() => import('pages/mpesa/C2BPayments'));
const B2CPayments = lazy(() => import('pages/mpesa/B2CPayments'));
const B2BPayments = lazy(() => import('pages/sidooh/B2BPayments'));

const Vouchers = lazy(() => import('pages/vouchers'));
const ShowVoucher = lazy(() => import('pages/vouchers/Show'));
const VoucherTransactions = lazy(() => import('pages/vouchers/Transactions'));
const FloatAccounts = lazy(() => import('pages/float-accounts'));
const ShowFloatAccount = lazy(() => import('pages/float-accounts/Show'));
const FloatAccountsTransactions = lazy(() => import('pages/float-accounts/Transactions'));

function App() {
    const HTMLClassList = document.getElementsByTagName('html')[0].classList;

    useEffect(() => {
        if (is.windows()) HTMLClassList.add('windows');
        if (is.chrome()) HTMLClassList.add('chrome');
        if (is.firefox()) HTMLClassList.add('firefox');
    }, [HTMLClassList]);

    const {isDark} = useAppSelector((state: RootState) => state.theme);
    const {isLoaded} = useTheme(isDark);

    if (!isLoaded) return <PageLoader isDark={isDark}/>;

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

                    <Route path={'/payments'} element={<Payments/>}/>
                    <Route path={'/payments/:id'} element={<ShowPayment/>}/>

                    <Route path={'/mpesa/stk'} element={<STKPayments/>}/>
                    <Route path={'/mpesa/c2b'} element={<C2BPayments/>}/>
                    <Route path={'/mpesa/b2c'} element={<B2CPayments/>}/>

                    <Route path={'/sidooh/b2c'} element={<B2BPayments/>}/>

                    <Route path={'/vouchers'} element={<Vouchers/>}/>
                    <Route path={'/vouchers/:id'} element={<ShowVoucher/>}/>
                    <Route path={'/voucher/transactions'} element={<VoucherTransactions/>}/>

                    <Route path={'/float-accounts'} element={<FloatAccounts/>}/>
                    <Route path={'/float-accounts/:id'} element={<ShowFloatAccount/>}/>
                    <Route path={'/float-accounts/transactions'} element={<FloatAccountsTransactions/>}/>

                    <Route path={'*'} element={<Dashboard/>}/>
                </Route>
            </Routes>
            <SettingsToggle/>
            <SettingsPanel/>
        </>
    );
}

export default App;