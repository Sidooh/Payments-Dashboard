import { useParams } from 'react-router-dom';
import { usePaymentQuery } from '../../features/payments/paymentsAPI';
import { SectionError } from '../../components/common/Error';
import { SectionLoader } from '../../components/common/Loader';
import CardBgCorner from '../../components/CardBgCorner';
import StatusChip from '../../components/chips/StatusChip';
import moment from 'moment';
import { PaymentType } from '../../utils/enums';
import { Card } from 'react-bootstrap';
import Flex from '../../components/common/Flex';
import MpesaPayment from './MpesaPayment';
import VoucherPayment from './VoucherPayment';

const Show = () => {
    const {id} = useParams();
    const {data: payment, isError, error, isLoading, isSuccess} = usePaymentQuery(Number(id));
    console.log('Payment:', payment);

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !payment) return <SectionLoader/>;

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
                        <StatusChip status={payment.status} entity={'payment'} entityId={payment.id}/>
                    </div>
                </Card.Body>
            </Card>

            {payment?.type === PaymentType.MPESA && <MpesaPayment payment={payment}/>}
            {payment?.type === PaymentType.SIDOOH && <VoucherPayment payment={payment}/>}
        </>
    );
};

export default Show;
