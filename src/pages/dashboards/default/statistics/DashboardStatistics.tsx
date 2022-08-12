import { Col, Row } from "react-bootstrap";
import { lazy, Suspense } from 'react';
import { ComponentLoader } from "@nabcellent/sui-react";

const RevenueChartWrapper = lazy(() => import('./revenue/RevenueChartWrapper'));
const PaymentSummaries = lazy(() => import('./summaries/PaymentSummaries'));

const DashboardStatistics = () => {
    return (
        <>
            <Row className="g-3 mb-3">
                <Col xxl={9}>
                    <RevenueChartWrapper/>
                </Col>
                <Col>
                    <Suspense fallback={<ComponentLoader/>}><PaymentSummaries/></Suspense>
                </Col>
            </Row>
        </>
    );
};

export default DashboardStatistics;
