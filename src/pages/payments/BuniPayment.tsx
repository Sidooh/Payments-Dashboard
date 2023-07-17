import { Card, Table } from 'react-bootstrap';
import { BuniStkRequest, Payment } from 'utils/types';
import moment from 'moment';
import { currencyFormat, StatusChip } from '@nabcellent/sui-react';

const MpesaPayment = ({payment}: { payment: Payment }) => {
    const provider: BuniStkRequest = payment.provider as BuniStkRequest;

    return (
        <Card className="mb-3">
            <Card.Header className="pb-0">
                <h5 className="fs-0">Source - <i className={'text-secondary'}>{payment.subtype}</i></h5>
            </Card.Header>
            <div className="card-body">
                <Table striped responsive className="border-bottom fs--1">
                    <thead className="bg-200 text-900">
                    <tr>
                        <th className="border-0">Reference</th>
                        <th className="border-0">Amount</th>
                        <th className="border-0">Result</th>
                        <th className="border-0">Receipt</th>
                        <th className="border-0 text-center">Status</th>
                        <th className="border-0 text-end">Date</th>
                    </tr>
                    </thead>
                    <tbody>

                    <tr className="border-200">
                        <td className="align-middle">
                            <h6 className="mb-0 text-nowrap">{provider?.invoice_number}</h6>
                            <p className="mb-0">{provider?.phone_number}</p>
                        </td>
                        <td className="align-middle">{currencyFormat(provider?.amount)}</td>
                        <td className="align-middle">{provider.callback?.result_desc}</td>
                        <td className="align-middle">{provider.callback?.mpesa_receipt_number || 'N/A'}</td>
                        <td className="align-middle text-center">
                            <StatusChip status={provider?.status} bg={false}/>
                        </td>
                        <td className="text-end">
                            {moment(provider?.callback?.created_at || provider?.created_at).format('MMM D, Y')}<br/>
                            <small>{moment(provider?.callback?.created_at || provider?.created_at).format('hh:mm A')}</small>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        </Card>
    );
};

export default MpesaPayment;
