import { Card, Table } from 'react-bootstrap';
import { Payment, VoucherTransaction } from 'utils/types';
import { currencyFormat, parsePhone } from 'utils/helpers';
import moment from 'moment';

const MpesaPayment = ({payment}: { payment: Payment }) => {
    console.log(payment);

    return (
        <Card className="mb-3">
            <Card.Header className="pb-0"><h5 className="fs-0">Provider - {payment.type}</h5></Card.Header>
            <div className="card-body">
                <Table striped responsive className="border-bottom fs--1">
                    <thead className="bg-200 text-900">
                    <tr>
                        <th className="border-0">Type</th>
                        <th className="border-0">Description</th>
                        <th className="border-0">Amount</th>
                        <th className="border-0">Date</th>
                    </tr>
                    </thead>
                    <tbody>

                    <tr className="border-200">
                        <td><h6 className="mb-0 text-nowrap">{(payment.providable as VoucherTransaction)?.type}</h6></td>
                        <td>{(payment.providable as VoucherTransaction)?.description}</td>
                        <td>{currencyFormat(payment.providable?.amount)}</td>
                        <td className="text-end">
                            {moment(payment.providable?.created_at).format('MMM D, Y')}<br/>
                            <small>{moment(payment.providable?.created_at).format('hh:mm A')}</small>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        </Card>
    );
};

export default MpesaPayment;
