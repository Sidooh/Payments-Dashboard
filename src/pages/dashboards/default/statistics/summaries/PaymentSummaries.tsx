import { Card, Col, Row } from "react-bootstrap";
import { useGetDashboardSummariesQuery } from "features/payments/paymentsAPI";
import CardBgCorner from 'components/CardBgCorner';
import CountUp from 'react-countup';
import { Badge, ComponentLoader, SectionError } from "@nabcellent/sui-react";

const PaymentSummaries = () => {
    const {data:stats, isError, error, isLoading, isSuccess} = useGetDashboardSummariesQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !stats) return <></>;

    console.log(stats);

    return (
        <>
            <Row className="g-3">
                <Col md={6} xxl={12}>
                    <Card>
                        <CardBgCorner corner={2}/>
                        <Card.Body as={Row}>
                            <Col className="d-md-flex d-lg-block flex-between-center">
                                <h5 className="mb-md-0 mb-lg-2">Payments</h5>
                                <h4 className="fs-3 fw-normal text-700">
                                    <CountUp end={stats.total_payments} separator=","/>
                                </h4>
                            </Col>
                            <Col className={'d-flex align-items-start justify-content-end'}>
                                <Badge pill>
                                    <CountUp end={stats.total_payments_today} separator=","/>
                                </Badge>
                            </Col>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xxl={12}>
                    <Card>
                        <CardBgCorner/>
                        <Card.Body as={Row}>
                            <Col className="d-md-flex d-lg-block flex-between-center">
                                <h5 className="mb-md-0 mb-lg-2">Revenue</h5>
                                <h4 className="fs-3 fw-normal text-700 align-text-bottom">
                                    <CountUp end={stats.total_revenue} prefix={'KES '} separator=","/>
                                </h4>
                            </Col>
                            <Col className={'d-flex align-items-start justify-content-end'}>
                                <Badge bg={'success'} pill>
                                    <CountUp end={stats.total_revenue_today} prefix={'KES '} separator=","/>
                                </Badge>
                            </Col>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PaymentSummaries;
