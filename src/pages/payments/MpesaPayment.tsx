import {Card, Table} from 'react-bootstrap';
import {Payment, StkRequest} from 'utils/types';
import {currencyFormat, parsePhone} from 'utils/helpers';
import moment from 'moment';
import StatusChip from '../../components/chips/StatusChip';

const MpesaPayment = ({payment}: { payment: Payment }) => {
    const provider: StkRequest = payment.provider as StkRequest;

    console.log(payment);

    return (
        <Card className="mb-3">
            <Card.Header className="pb-0"><h5 className="fs-0">Provider - {payment.type}</h5></Card.Header>
            <div className="card-body">
                <Table striped responsive className="border-bottom fs--1">
                    <thead className="bg-200 text-900">
                    <tr>
                        <th className="border-0">Reference</th>
                        <th className="border-0">Amount</th>
                        <th className="border-0">Result</th>
                        <th className="border-0">Receipt</th>
                        <th className="border-0 text-center">Status</th>
                        <th className="border-0">Date</th>
                    </tr>
                    </thead>
                    <tbody>

                    <tr className="border-200">
                        <td className="align-middle">
                            <h6 className="mb-0 text-nowrap">{provider?.reference}</h6>
                            <p className="mb-0">{parsePhone(provider?.phone)}</p>
                        </td>
                        <td className="align-middle">{currencyFormat(provider?.amount)}</td>
                        <td className="align-middle">{provider.response?.result_desc}</td>
                        <td className="align-middle">{provider.response?.mpesa_receipt_number}</td>
                        <td className="align-middle text-center">
                            <StatusChip status={provider?.status} entity={'payment'} entityId={provider.id} bg={false}/>
                        </td>
                        <td className="text-end">
                            {moment(provider?.response?.created_at || provider?.created_at).format('MMM D, Y')}<br/>
                            <small>{moment(provider?.response?.created_at || provider?.created_at).format('hh:mm A')}</small>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        </Card>
    );
};

export default MpesaPayment;
