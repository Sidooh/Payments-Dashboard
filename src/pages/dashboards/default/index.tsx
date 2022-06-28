import { Col, Row } from "react-bootstrap";
import { lazy } from 'react';

const TotalRevenue = lazy(() => import('./TotalRevenue'));
const PaymentsCount = lazy(() => import('./PaymentsCount'));
const RecentPayments = lazy(() => import('./RecentPayments'));

const Dashboard = () => {
    // console.log(process.env);
    // const {data, isError, error, isLoading, isSuccess} = useGetDashboardQuery();
    // console.log(data);

    // if (isError) return <SectionError error={error}/>;
    // if (isLoading || !isSuccess || !data) return <SectionLoader/>;

    const data = {
        total_transactions: 3,
        total_transactions_today: 30,
        total_revenue: 100,
        total_revenue_today: 100,
        recent_payments: []
    };

    return (
        <>
            <Row className="g-3 mb-3">
                <Col>
                    <Row className="g-3">
                        <Col>
                            <PaymentsCount total={data.total_transactions} total_today={data.total_transactions_today}/>
                        </Col>
                        <Col>
                            <TotalRevenue total={data.total_revenue} total_today={data.total_revenue_today}/>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <RecentPayments payments={data.recent_payments}/>
        </>
    );
};

export default Dashboard;
