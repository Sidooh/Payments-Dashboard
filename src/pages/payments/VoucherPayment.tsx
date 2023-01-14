import { Card, Table } from 'react-bootstrap';
import { Payment, VoucherTransaction } from 'utils/types';
import moment from 'moment';
import { currencyFormat } from '@nabcellent/sui-react';
import { logger } from 'utils/logger';

const VoucherPayment = ({payment}: { payment: Payment }) => (
    <Card className="mb-3">
        <Card.Header className="pb-0">
            <h5 className="fs-0">Source - <i className={'text-secondary'}>{payment.subtype}</i></h5>
        </Card.Header>
        <div className="card-body">
            <Table striped responsive className="border-bottom fs--1">
                <thead className="bg-200 text-900">
                <tr>
                    <th className="border-0">Type</th>
                    <th className="border-0">Description</th>
                    <th className="border-0">Amount</th>
                    <th className="border-0 text-end">Date</th>
                </tr>
                </thead>
                <tbody>

                <tr className="border-200">
                    <td><h6 className="mb-0 text-nowrap">{(payment.provider as VoucherTransaction)?.type}</h6></td>
                    <td>{(payment.provider as VoucherTransaction)?.description}</td>
                    <td>{currencyFormat(payment.provider?.amount)}</td>
                    <td className="text-end">
                        {moment(payment.provider?.created_at).format('MMM D, Y')}<br/>
                        <small>{moment(payment.provider?.created_at).format('hh:mm A')}</small>
                    </td>
                </tr>
                </tbody>
            </Table>
        </div>
    </Card>
);

export default VoucherPayment;
