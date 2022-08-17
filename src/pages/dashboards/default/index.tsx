import { lazy } from 'react';

const DashboardStatistics = lazy(() => import('./statistics/DashboardStatistics'));
const DashboardPayments = lazy(() => import('./payments/DashboardPayments'));

const Dashboard = () => {
    return (
        <>
            <DashboardStatistics/>

            <DashboardPayments/>
        </>
    );
};

export default Dashboard;
