import { useParams } from 'react-router-dom';
import { usePaymentQuery } from 'features/payments/paymentsAPI';
import CardBgCorner from 'components/CardBgCorner';
import moment from 'moment';
import { PaymentType } from 'utils/enums';
import { Card } from 'react-bootstrap';
import MpesaPayment from './MpesaPayment';
import VoucherPayment from './VoucherPayment';
import { Flex, SectionError, SectionLoader, StatusChip } from '@nabcellent/sui-react';
import { logger } from 'utils/logger';

const Show = () => {
    const {id} = useParams();
    const {data: payment, isError, error, isLoading, isSuccess} = usePaymentQuery(Number(id));

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !payment) return <SectionLoader/>;

    logger.log('Payment:', payment);

    return (
        <>
            <Card className="mb-3">
                <CardBgCorner corner={4}/>
                <Card.Body className="position-relative">
                    <Flex justifyContent={'between'}>
                        <h5 className={'m-0'}>Payment Details: #{payment?.id}</h5>
                        <div className={'text-end'}>
                            <h4 className={'m-0'}>{payment?.type.toUpperCase()}</h4>
                            <small><b>{payment.subtype}</b></small>
                        </div>
                    </Flex>
                    <p className="fs--1">{moment(payment?.created_at).format("MMMM Do YYYY, h:mm A")}</p>
                    <div><strong className="me-2">Status: </strong>
                        <StatusChip status={payment.status}/>
                    </div>
                </Card.Body>
            </Card>

            {payment?.type === PaymentType.MPESA && <MpesaPayment payment={payment}/>}
            {payment?.type === PaymentType.SIDOOH && <VoucherPayment payment={payment}/>}
        </>
    );
};

export default Show;
