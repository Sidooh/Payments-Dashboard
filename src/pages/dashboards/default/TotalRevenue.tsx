import { Card, Col, Row } from 'react-bootstrap';
import CountUp from 'react-countup';
import CardBgCorner from '../../../components/CardBgCorner';
import { Chip } from '@mui/material';

const TotalRevenue = ({total, total_today}: { total: number, total_today: number }) => {
    return (
        <Card className="h-100">
            <CardBgCorner/>
            <Card.Body>
                <Row className="flex-between-center">
                    <Col className="d-md-flex d-lg-block flex-between-center">
                        <h6 className="mb-md-0 mb-lg-2">Revenue</h6>
                        <Chip sx={{px: .5}} variant={'outlined'} color={'success'} className={`fs-8`}
                              label={<CountUp end={total_today} prefix={'<b>Today:</b> KES '} decimals={2}/>}/>
                    </Col>
                    <Col xs="auto">
                        <h4 className="fs-3 fw-normal text-700">
                            <CountUp end={total} prefix={'KES '} decimals={2}/>
                        </h4>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default TotalRevenue;
