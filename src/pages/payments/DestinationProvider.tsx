import { BulkPaymentRequest, MpesaB2BRequest, Payment, SidoohTransaction, TendePayRequest } from '@/lib/types/models';
import moment from 'moment';
import { PaymentSubType, PaymentType } from '@/lib/enums';
import AlertInfo from '@/components/alerts/AlertInfo.tsx';
import { currencyFormat } from '@/lib/utils.ts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import Phone from '@/components/common/Phone.tsx';
import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx';
import TableDate from '@/components/common/TableDate.tsx';

const B2CTable = ({ destination }: { destination: BulkPaymentRequest }) => (
    <Table className="border-muted">
        <TableHeader className="bg-slate-100">
            <TableRow className={'border-muted'}>
                <TableHead>ID</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-end">Created</TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
            <TableRow>
                <TableCell>
                    <h6>{destination.command_id}</h6>
                    <h6>{destination.conversation_id}</h6>
                </TableCell>
                <TableCell>
                    <Phone phone={destination.phone} />
                </TableCell>
                <TableCell>{currencyFormat(destination.amount)}</TableCell>
                <TableCell>{destination.response?.result_desc}</TableCell>
                <TableCell className="text-end">
                    <TableDate date={destination.created_at} />
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
);

const TendeB2BTable = ({ destination }: { destination: TendePayRequest }) => (
    <>
        <Table className="border-muted">
            <TableHeader className="bg-slate-100">
                <TableRow className={'border-muted'}>
                    <TableHead>Transaction Reference</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>MSISDN</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                <TableRow>
                    <TableCell>{destination.transaction_reference}</TableCell>
                    <TableCell>{destination.service}</TableCell>
                    <TableCell>{currencyFormat(destination.text?.amount)}</TableCell>
                    <TableCell>
                        <Phone phone={destination.msisdn} />
                    </TableCell>
                    <TableCell>{destination.status}</TableCell>
                    <TableCell colSpan={2} className="text-end">
                        <TableDate date={destination.created_at} />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        <Table>
            <TableHeader className="bg-slate-100">
                <TableRow className={'border-muted'}>
                    <TableHead>Initiator Reference</TableHead>
                    <TableHead>Receiver</TableHead>
                    <TableHead>Account Reference</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-end">Created</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>{destination.callback?.initiator_reference}</TableCell>
                    <TableCell>{destination.callback?.receiver_party_name}</TableCell>
                    <TableCell>{destination.callback?.account_reference}</TableCell>
                    <TableCell>{currencyFormat(destination.callback?.amount)}</TableCell>
                    <TableCell>{destination.callback?.confirmation_code}</TableCell>
                    <TableCell>{destination.callback?.status_description}</TableCell>
                    <TableCell colSpan={2} className="text-end">
                        <TableDate date={destination.callback?.created_at} />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </>
);

const MpesaB2BTable = ({ request }: { request: MpesaB2BRequest }) => (
    <>
        <Table className="border-muted">
            <TableHeader className="bg-slate-100">
                <TableRow className={'border-muted'}>
                    <TableHead>Command ID</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Requester</TableHead>
                    <TableHead>Parties</TableHead>
                    <TableHead className="text-end">Created</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                <TableRow>
                    <TableCell>{request.command_id}</TableCell>
                    <TableCell>{request.response_description}</TableCell>
                    <TableCell>{currencyFormat(request.amount)}</TableCell>
                    <TableCell>
                        <Phone phone={request.requester} />
                    </TableCell>
                    <TableCell>
                        <p>A - {request.party_a}</p>
                        <p>B - {request.party_b}</p>
                    </TableCell>
                    <TableCell colSpan={2} className="text-end">
                        <TableDate date={request.created_at} />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        {request.response && (
            <Table>
                <TableHeader className="bg-slate-100">
                    <TableRow>
                        <TableHead className="whitespace-nowrap">Transaction ID</TableHead>
                        <TableHead>Credit Party Name</TableHead>
                        <TableHead>Debit Account Balance</TableHead>
                        <TableHead>Result Description</TableHead>
                        <TableHead className="text-end">Created</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>{request.response.transaction_id}</TableCell>
                        <TableCell>{request.response.credit_party_public_name ?? 'N/A'}</TableCell>
                        <TableCell>
                            {request.response.debit_account_balance
                                ? currencyFormat(Number(request.response.debit_account_balance?.split('|')[2]))
                                : 'N/A'}
                        </TableCell>
                        <TableCell>{request.response.result_desc}</TableCell>
                        <TableCell className="text-end">
                            {request.response.trans_completed_time ? (
                                <>
                                    <strong>
                                        {moment(request.response.trans_completed_time, 'YYYYMDHmss').format('H:mm:ss')}
                                    </strong>
                                    <br />
                                    <small>
                                        {moment(request.response.trans_completed_time, 'YYYYMDHmss').format('D.M.y')}
                                    </small>
                                </>
                            ) : (
                                'N/A'
                            )}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        )}
    </>
);

const FloatOrVoucherTable = ({ destination }: { destination: SidoohTransaction }) => (
    <Table className="border-muted">
        <TableHeader className="bg-slate-100">
            <TableRow className={'border-muted'}>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-end">Created</TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
            <TableRow>
                <TableCell>
                    <h6 className="mb-0 text-nowrap">{destination.type}</h6>
                </TableCell>
                <TableCell>{destination.description}</TableCell>
                <TableCell>{currencyFormat(destination.amount)}</TableCell>
                <TableCell className="text-end">
                    <TableDate date={destination.created_at} />
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
);

const DestinationProvider = ({ payment }: { payment: Payment }) => {
    const destination = payment.destination_provider;

    if (!destination) return <AlertInfo title={'Destination Not Found.'} />;

    return (
        <Card>
            <CardHeader className={'flex-row gap-1'}>
                Destination - <i className={'text-muted-foreground'}>{payment.destination_subtype}</i>
            </CardHeader>
            <CardContent>
                {payment.destination_type === PaymentType.SIDOOH && (
                    <FloatOrVoucherTable destination={destination as SidoohTransaction} />
                )}
                {payment.destination_subtype === PaymentSubType.B2C && (
                    <B2CTable destination={destination as BulkPaymentRequest} />
                )}
                {payment.destination_subtype === PaymentSubType.B2B &&
                    payment.destination_type === PaymentType.TENDE && (
                        <TendeB2BTable destination={destination as TendePayRequest} />
                    )}
                {payment.destination_subtype === PaymentSubType.B2B &&
                    payment.destination_type === PaymentType.MPESA && (
                        <MpesaB2BTable request={destination as MpesaB2BRequest} />
                    )}
            </CardContent>
        </Card>
    );
};

export default DestinationProvider;
