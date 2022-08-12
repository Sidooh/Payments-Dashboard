import { Col, Row } from "react-bootstrap";
import { lazy } from 'react';
import { useGetDashboardQuery } from "features/payments/paymentsAPI";
import { SectionError, SectionLoader } from "@nabcellent/sui-react";
import {lazy} from 'react';

const DashboardStatistics = lazy(() => import('./statistics/DashboardStatistics'));
const DashboardPayments = lazy(() => import('./payments/DashboardPayments'));

const Dashboard = () => {
    let { data, isError, error, isLoading, isSuccess } = useGetDashboardQuery();

    if (isError) return <SectionError error={error} />;
    if (isLoading || !isSuccess || !data) return <SectionLoader />;

    console.log(data);

    return (
        <>
            <DashboardStatistics/>

            <DashboardPayments/>
        </>
    );
};

export default Dashboard;
