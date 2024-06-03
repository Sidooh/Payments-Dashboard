import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import GuestLayout from './layouts/GuestLayout';
import { Middleware } from './middleware';
import MainLayout from './layouts/MainLayout';
import Login from '@/pages/auth/Login';

const Dashboard = lazy(() => import('@/pages/dashboards/default'));

const Payments = lazy(() => import('@/pages/payments'));
const ShowPayment = lazy(() => import('@/pages/payments/Show'));

const Vouchers = lazy(() => import('@/pages/vouchers'));
const ShowVoucher = lazy(() => import('@/pages/vouchers/Show'));
const VoucherTransactions = lazy(() => import('@/pages/vouchers/Transactions'));
const FloatAccounts = lazy(() => import('@/pages/float-accounts'));
const ShowFloatAccount = lazy(() => import('@/pages/float-accounts/Show'));
const FloatAccountsTransactions = lazy(() => import('@/pages/float-accounts/Transactions'));

function App() {
    return (
        <>
            <Routes>
                <Route element={<GuestLayout />}>
                    <Route path={'/login'} element={<Middleware.Guest component={<Login />} />} />
                </Route>

                <Route element={<Middleware.Auth component={<MainLayout />} />}>
                    <Route index element={<Dashboard />} />
                    <Route path={'/dashboard'} element={<Dashboard />} />

                    <Route path={'/payments'} element={<Payments />} />
                    <Route path={'/payments/:id'} element={<ShowPayment />} />

                    <Route path={'/vouchers'} element={<Vouchers />} />
                    <Route path={'/vouchers/:id'} element={<ShowVoucher />} />
                    <Route path={'/voucher/transactions'} element={<VoucherTransactions />} />

                    <Route path={'/float-accounts'} element={<FloatAccounts />} />
                    <Route path={'/float-accounts/:id'} element={<ShowFloatAccount />} />
                    <Route path={'/float-accounts/transactions'} element={<FloatAccountsTransactions />} />

                    <Route path={'*'} element={<Dashboard />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
