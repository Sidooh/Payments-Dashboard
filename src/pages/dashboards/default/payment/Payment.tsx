import { useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import PaymentChart from './PaymentChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

type LinePaymentType = {
    data: {
        all: number[],
        successful: number[],
        failed: number[]
    }
};

export type PaymentStatus = 'all' | 'successful' | 'failed'

const LinePayment = ({data}: LinePaymentType) => {
    const [paymentStatus, setPaymentStatus] = useState<string | PaymentStatus>('successful');

    return (
        <Card className="rounded-3 overflow-hidden h-100 shadow-none">
            <Card.Body className="bg-line-chart-gradient" as={Flex} justifyContent="between" direction="column">
                <Row className="align-items-center g-0">
                    <Col className="light">
                        <h4 className="text-white mb-0">Today $764.39</h4>
                        <p className="fs--1 fw-semi-bold text-white">
                            Yesterday <span className="opacity-50">$684.87</span>
                        </p>
                    </Col>
                    <Col xs="auto" className="d-none d-sm-flex align-items-center">
                        <button className="btn btn-sm btn-outline-light me-2 refresh-chart" type="button"
                                title="Update Chart">
                            <FontAwesomeIcon icon={faSync}/>
                        </button>
                        <Form.Select size="sm" value={paymentStatus} onChange={e => setPaymentStatus(e.target.value)}>
                            <option value="all">All Payments</option>
                            <option value="successful">Successful Payments</option>
                            <option value="failed">Failed Payments</option>
                        </Form.Select>
                    </Col>
                </Row>
                <PaymentChart data={data} paymentStatus={paymentStatus as PaymentStatus} style={{height: '200px'}}/>
            </Card.Body>
        </Card>
    );
};

export default LinePayment;
