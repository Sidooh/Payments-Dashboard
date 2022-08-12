import { ComponentLoader } from '@nabcellent/sui-react';
import {lazy, Suspense} from 'react';

const PendingPayments = lazy(() => import('./PendingPayments'));
const RecentPayments = lazy(() => import('./RecentPayments'));

const DashboardPayments = () => {
    return (
        <>
            <Suspense fallback={<ComponentLoader/>}><PendingPayments/></Suspense>

            <Suspense fallback={<ComponentLoader/>}><RecentPayments/></Suspense>
        </>
    );
};

export default DashboardPayments;