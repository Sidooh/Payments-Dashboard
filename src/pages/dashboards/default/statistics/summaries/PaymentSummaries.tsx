import {SectionError} from 'components/common/Error';
import {ComponentLoader} from 'components/common/Loader';
import {Card, Col, Row} from "react-bootstrap";
import {useGetDashboardSummariesQuery} from "features/payments/paymentsAPI";
import CardBgCorner from 'components/CardBgCorner';
import {Chip} from '@mui/material';
import CountUp from 'react-countup';

const PaymentSummaries = () => {
    const {data, isError, error, isLoading, isSuccess} = useGetDashboardSummariesQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !data) return <ComponentLoader/>;

    const {data: stats} = data;

    return (
        <>
            <Row className="g-3">
                <Col md={6} xxl={12}>
                    <Card style={{'height': '150px'}}>
                        <CardBgCorner corner={2}/>
                        <Card.Body>
                            <Row className="flex-between-center">
                                <Col className="d-md-flex d-lg-block flex-between-center">
                                    <h5 className="mb-md-0 mb-lg-2">Payments</h5>
                                    <Chip sx={{px: .5}} variant={'outlined'} color={'success'} className={`mt-2 mb-3`}
                                          label={<CountUp end={stats.total_payments_today} separator=","/>}/>
                                    <h4 className="fs-3 fw-normal text-700">
                                        <CountUp end={stats.total_payments} separator=","/>
                                    </h4>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xxl={12}>
                    <Card style={{'height': '150px'}}>
                        <CardBgCorner/>
                        <Card.Body>
                            <Row className="sflex-between-center">
                                <Col className="d-md-flex d-lg-block flex-between-center">
                                    <h5 className="mb-md-0 mb-lg-2">Revenue</h5>
                                    <Chip sx={{px: .5}} variant={'outlined'} color={'success'} className={`mt-2 mb-3`}
                                          label={<CountUp end={stats.total_revenue_today} prefix={' KES '}
                                                          separator=","/>}/>
                                    <h4 className="fs-3 fw-normal text-700 align-text-bottom">
                                        <CountUp end={stats.total_revenue} prefix={'KES '} separator=","/>
                                    </h4>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PaymentSummaries;
