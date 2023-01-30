import { Card, Table } from 'react-bootstrap';
import { Payment } from 'utils/types';
import moment from 'moment';
import { currencyFormat } from '@nabcellent/sui-react';

const DestinationProvider = ({payment}: { payment: Payment }) => {
    const destination = payment.destination_provider

    return (
        <Card className="mb-3">
            <Card.Header className="pb-0">
                <h5 className="fs-0">Destination - <i className={'text-secondary'}>{payment.destination_subtype}</i></h5>
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
                        <td><h6 className="mb-0 text-nowrap">{destination?.type}</h6></td>
                        <td>{destination?.description}</td>
                        <td>{currencyFormat(destination?.amount)}</td>
                        <td className="text-end">
                            {moment(destination?.created_at).format('MMM D, Y')}<br/>
                            <small>{moment(destination?.created_at).format('hh:mm A')}</small>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        </Card>
    );
};

export default DestinationProvider;
