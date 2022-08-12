import { Col, Row } from "react-bootstrap";
import { lazy } from 'react';
import { useGetDashboardQuery } from "features/payments/paymentsAPI";
import { SectionError, SectionLoader } from "@nabcellent/sui-react";

const TotalRevenue = lazy(() => import('./TotalRevenue'));
const PaymentsCount = lazy(() => import('./PaymentsCount'));
const RecentPayments = lazy(() => import('./RecentPayments'));

const Dashboard = () => {
    let { data, isError, error, isLoading, isSuccess } = useGetDashboardQuery();

    if (isError) return <SectionError error={error} />;
    if (isLoading || !isSuccess || !data) return <SectionLoader />;

    console.log(data);

    return (
        <>
            <Row className="g-3 mb-3">
                <Col>
                    <Row className="g-3">
                        <Col>
                            <PaymentsCount total={data.total_payments} total_today={data.total_payments_today} />
                        </Col>
                        <Col>
                            <TotalRevenue total={data.total_revenue} total_today={data.total_revenue_today} />
                        </Col>
                    </Row>
                </Col>
            </Row>

            <RecentPayments payments={data.recent_payments} />
        </>
    );
};

export default Dashboard;
