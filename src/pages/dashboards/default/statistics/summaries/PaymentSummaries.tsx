import { Card, Col, Row } from "react-bootstrap";
import { useGetDashboardSummariesQuery } from "features/payments/paymentsAPI";
import CardBgCorner from 'components/CardBgCorner';
import CountUp from 'react-countup';
import { Badge, ComponentLoader, SectionError } from "@nabcellent/sui-react";
import { logger } from 'utils/logger';

const PaymentSummaries = () => {
    const { data: stats, isError, error, isLoading, isSuccess } = useGetDashboardSummariesQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !stats) return <ComponentLoader/>;

    logger.log(stats);

    return (
        <Row className="g-3 g-xxl-0 h-100">
            <Col md={4} xxl={12} className={'mb-xxl-2'}>
                <Card className={'h-xl-100 d-flex'}>
                    <CardBgCorner corner={2}/>
                    <Card.Body className={'position-relative'}>
                        <h5 className="mb-md-0 mb-lg-2">Payments</h5>
                        <h5 className="fs-2 fw-normal text-700">
                            <CountUp end={stats.total_payments} separator=","/>
                        </h5>
                        <div className="position-absolute top-0 right-0 m-3">
                            <Badge pill>
                                <CountUp end={stats.total_payments_today} separator=","/>
                            </Badge>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={4} xxl={12} className={'mb-xxl-2'}>
                <Card className={'h-xl-100'}>
                    <CardBgCorner/>
                    <Card.Body className={'position-relative'}>
                        <h5 className="mb-md-0 mb-lg-2">Revenue</h5>
                        <h5 className="fs-2 fw-normal text-700 align-text-bottom">
                            <CountUp end={stats.total_revenue} prefix={'KES '} separator=","/>
                        </h5>
                        <div className="position-absolute top-0 right-0 m-3">
                            <Badge bg={'success'} pill>
                                <CountUp end={stats.total_revenue_today} prefix={'KES '} separator=","/>
                            </Badge>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={4} xxl={12} className={''}>
                <Card className={'h-xl-100'}>
                    <CardBgCorner corner={3}/>
                    <Card.Body className={'position-relative'}>
                        <h5 className="mb-md-0 mb-lg-2">Org. Mpesa Balance</h5>
                        <h5 className="fs-2 fw-normal text-700 align-text-bottom">
                            <CountUp end={stats.org_balance} prefix={'KES '} separator="," decimals={2}/>
                        </h5>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default PaymentSummaries;
