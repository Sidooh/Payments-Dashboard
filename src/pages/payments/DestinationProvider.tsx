import { Card, Table } from 'react-bootstrap';
import { BulkPaymentRequest, Payment, SidoohTransaction, TendePayRequest } from 'utils/types';
import moment from 'moment';
import { currencyFormat, PhoneChip } from '@nabcellent/sui-react';
import { PaymentSubType, PaymentType } from "utils/enums";
import CardHeader from "../../components/common/CardHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons/faInfo";

const B2CTable = ({ destination }: { destination: BulkPaymentRequest }) => (
    <Table striped responsive className="border-bottom fs--1">
        <thead className="bg-200 text-900">
        <tr>
            <th className="border-0">ID</th>
            <th className="border-0">Phone</th>
            <th className="border-0">Amount</th>
            <th className="border-0">Description</th>
            <th className="border-0 text-end">Created</th>
        </tr>
        </thead>

        <tbody>
        <tr className="border-200">
            <td><h6>{destination.command_id}</h6><h6>{destination.conversation_id}</h6></td>
            <td><PhoneChip phone={destination.phone}/></td>
            <td>{currencyFormat(destination.amount)}</td>
            <td>{destination.response?.result_desc}</td>
            <td className="text-end">
                {moment(destination.created_at).format('MMM D, Y')}<br/>
                <small>{moment(destination.created_at).format('hh:mm A')}</small>
            </td>
        </tr>
        </tbody>
    </Table>
)

const B2BTable = ({ destination }: { destination: TendePayRequest }) => (
    <>
        <Table striped responsive className="border-bottom fs--1">
            <thead className="bg-200 text-900">
            <tr>
                <th className="border-0">Transaction Reference</th>
                <th className="border-0">Service</th>
                <th className="border-0">Amount</th>
                <th className="border-0">MSISDN</th>
                <th className="border-0">Status</th>
                <th className="border-0">Created</th>
            </tr>
            </thead>

            <tbody>
            <tr className="border-200">
                <td>{destination.transaction_reference}</td>
                <td>{destination.service}</td>
                <td>{currencyFormat(destination.text?.amount)}</td>
                <td><PhoneChip phone={destination.msisdn}/></td>
                <td>{destination.status}</td>
                <td colSpan={2} className="text-end">
                    {moment(destination.created_at).format('MMM D, Y')}<br/>
                    <small>{moment(destination.created_at).format('hh:mm A')}</small>
                </td>
            </tr>
            </tbody>
        </Table>
        <Table>
            <thead className="bg-200 text-900">
            <tr className={'mb-3'}>
                <th className="border-0">Initiator Reference</th>
                <th className="border-0">Receiver</th>
                <th className="border-0">Account Reference</th>
                <th className="border-0">Amount</th>
                <th className="border-0">Code</th>
                <th className="border-0">Description</th>
                <th className="border-0 text-end">Created</th>
            </tr>
            </thead>
            <tbody>
            <tr className="border-200">
                <td>{destination.callback?.initiator_reference}</td>
                <td>{destination.callback?.receiver_party_name}</td>
                <td>{destination.callback?.account_reference}</td>
                <td>{currencyFormat(destination.callback?.amount)}</td>
                <td>{destination.callback?.confirmation_code}</td>
                <td>{destination.callback?.status_description}</td>
                <td colSpan={2} className="text-end">
                    {moment(destination.callback?.created_at).format('MMM D, Y')}<br/>
                    <small>{moment(destination.callback?.created_at).format('hh:mm A')}</small>
                </td>
            </tr>
            </tbody>
        </Table>
    </>
)

const FloatOrVoucherTable = ({ destination }: { destination: SidoohTransaction }) => (
    <Table striped responsive className="border-bottom fs--1">
        <thead className="bg-200 text-900">
        <tr>
            <th className="border-0">Type</th>
            <th className="border-0">Description</th>
            <th className="border-0">Amount</th>
            <th className="border-0 text-end">Created</th>
        </tr>
        </thead>

        <tbody>
        <tr className="border-200">
            <td><h6 className="mb-0 text-nowrap">{destination.type}</h6></td>
            <td>{destination.description}</td>
            <td>{currencyFormat(destination.amount)}</td>
            <td className="text-end">
                {moment(destination.created_at).format('MMM D, Y')}<br/>
                <small>{moment(destination.created_at).format('hh:mm A')}</small>
            </td>
        </tr>
        </tbody>
    </Table>
)

const DestinationProvider = ({ payment }: { payment: Payment }) => {
    const destination = payment.destination_provider

    if (!destination) return (
        <Card className={'mb-3 bg-soft-primary'}>
            <CardHeader title={'Destination Not Found.'}><FontAwesomeIcon icon={faInfo}/></CardHeader>
        </Card>
    )

    return (
        <Card className="mb-3">
            <Card.Header className="pb-0">
                <h5 className="fs-0">
                    Destination - <i className={'text-secondary'}>{payment.destination_subtype}</i>
                </h5>
            </Card.Header>
            <div className="card-body">
                {payment.destination_type === PaymentType.SIDOOH &&
                    <FloatOrVoucherTable destination={destination as (SidoohTransaction)}/>}
                {payment.destination_subtype === PaymentSubType.B2C &&
                    <B2CTable destination={destination as BulkPaymentRequest}/>}
                {payment.destination_subtype === PaymentSubType.B2B &&
                    <B2BTable destination={destination as TendePayRequest}/>}
            </div>
        </Card>
    );
};

export default DestinationProvider;
