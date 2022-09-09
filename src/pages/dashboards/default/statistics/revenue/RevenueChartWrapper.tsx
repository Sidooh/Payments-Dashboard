import { lazy, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { useGetDashboardRevenueDataQuery } from 'features/payments/paymentsAPI';
import CountUp from 'react-countup';
import { ComponentLoader, SectionError, Status } from '@nabcellent/sui-react';
import RevenueChart from './RevenueChart';
import { logger } from 'utils/logger';

const RevenueChartWrapper = () => {
    const {data, isError, error, isLoading, isSuccess} = useGetDashboardRevenueDataQuery();

    const [paymentStatus, setPaymentStatus] = useState<Status>(Status.COMPLETED);

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !data) return <ComponentLoader/>;

    logger.log(data);

    const total_today = data.today[paymentStatus]?.datasets.reduce((count, amount) => count += amount);
    const total_yesterday = data.yesterday[paymentStatus]?.datasets.reduce((count, amount) => count += amount);

    return (
        <Card className="rounded-3 overflow-hidden h-100 shadow-none">
            <Card.Body style={{backgroundImage: 'linear-gradient(-45deg, #414ba7, #198019)'}}
                       className="d-flex flex-column justify-content-between">
                <Row className="align-items-center g-0">
                    <Col className="light">
                        <h4 className="text-white mb-0">
                            Today <CountUp end={total_today} prefix={'KES '} decimals={2} separator={','}/>
                        </h4>
                        <p className="fs--1 fw-semi-bold text-white">
                            Yesterday {' '}
                            <span className="opacity-50">
                                <CountUp end={total_yesterday} prefix={'KES '} decimals={2} separator={','}/>
                            </span>
                        </p>
                    </Col>
                    <Col xs="auto" className="d-none d-sm-flex align-items-center">
                        <button className="btn btn-sm btn-outline-light me-2 refresh-chart" type="button"
                                title="Update Chart">
                            <FontAwesomeIcon icon={faSync}/>
                        </button>
                        <Form.Select size="sm" value={paymentStatus}
                                     onChange={e => setPaymentStatus(e.target.value as Status)}>
                            <option value="ALL">All Transactions</option>
                            {[Status.COMPLETED, Status.FAILED, Status.PENDING, Status.REFUNDED].map((status, i) => (
                                <option key={`status-${i}`} value={status}>{status} Payments</option>
                            ))}
                        </Form.Select>
                    </Col>
                </Row>
                <RevenueChart data={data} labels={data.yesterday["ALL"].labels} status={paymentStatus}
                              style={{height: '200px'}}/>
            </Card.Body>
        </Card>
    );
};

export default RevenueChartWrapper;
