import { Card, Table } from 'react-bootstrap';
import { Payment } from 'utils/types';
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
                        <th className="border-0">Reference</th>
                        <th className="border-0 text-center">Status</th>
                        <th className="border-0">Result</th>
                        <th className="border-0">Amount</th>
                        <th className="border-0">Date</th>
                    </tr>
                    </thead>
                    <tbody>

                    <tr className="border-200">
                        <td className="align-middle">
                            <h6 className="mb-0 text-nowrap">{payment.provider?.reference}</h6>
                            <p className="mb-0">{parsePhone(payment.provider?.phone)}</p>
                        </td>
                        <td className="align-middle text-center">{payment.provider?.status}</td>
                        <td className="align-middle">The service request is processed successfully.</td>
                        <td className="align-middle">{currencyFormat(payment.provider?.amount)}</td>
                        <td className="text-end">
                            {moment(payment.provider?.response?.created_at || payment.provider?.created_at).format('MMM D, Y')}<br/>
                            <small>{moment(payment.provider?.response?.created_at || payment.provider?.created_at).format('hh:mm A')}</small>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        </Card>
    );
};

export default MpesaPayment;
